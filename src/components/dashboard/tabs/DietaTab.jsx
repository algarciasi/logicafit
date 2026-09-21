import { useEffect, useState } from "react";
import { listClientDiet } from "../../../lib/diets";
import { listClientDietInstructions } from "../../../lib/dietInstructions";
import { MEALS } from "../../../lib/macros";
import EmptyState from "../EmptyState";
import RecipesModal from "../RecipesModal";

const DAYS_MAP = {
  1: "Lun",
  2: "Mar",
  3: "Mié",
  4: "Jue",
  5: "Vie",
  6: "Sáb",
  7: "Dom",
};

const FULL_DAYS_MAP = {
  1: "Lunes",
  2: "Martes",
  3: "Miércoles",
  4: "Jueves",
  5: "Viernes",
  6: "Sábado",
  7: "Domingo",
};

const BRAND_YELLOW = "#FDE349";
const BRAND_GOLD = "#DBAA1E";

const getTodayAppDay = () => {
  const day = new Date().getDay();
  return day === 0 ? 7 : day;
};

const getMacroVal = (food, keys) => {
  for (const key of keys) {
    if (food?.[key] !== undefined && food?.[key] !== null) {
      return Number(food[key]);
    }
  }

  return 0;
};

/*
  IMPORTANTE:
  Esta función calcula la MEDIA entre las distintas opciones de una comida.

  El selector visual de Opción 1 / 2 / 3 NO interviene aquí.
  Por tanto:
    - kcal: no cambian al pulsar una opción
    - proteínas: no cambian
    - carbohidratos: no cambian
    - grasas: no cambian
*/
const calcTodayMealAverage = (todayItems, macroKeys) => {
  if (!todayItems?.length) return 0;

  const optionsMap = {};
  let commonTotal = 0;

  todayItems.forEach((entry) => {
    if (!entry.foods) return;

    const value =
      (getMacroVal(entry.foods, macroKeys) * (Number(entry.cantidad_g) || 0)) /
      100;

    const hasExplicitOption =
      entry.opcion !== undefined &&
      entry.opcion !== null &&
      entry.opcion !== "";

    if (!hasExplicitOption) {
      commonTotal += value;
      return;
    }

    const option = Number(entry.opcion);

    if (!Number.isFinite(option)) {
      commonTotal += value;
      return;
    }

    if (!optionsMap[option]) {
      optionsMap[option] = 0;
    }

    optionsMap[option] += value;
  });

  const optionTotals = Object.values(optionsMap);

  if (optionTotals.length === 0) {
    return commonTotal;
  }

  const optionsAverage =
    optionTotals.reduce((sum, optionTotal) => sum + optionTotal, 0) /
    optionTotals.length;

  return commonTotal + optionsAverage;
};

const formatNumber = (value, maxDecimals = 2) =>
  Number(value || 0).toLocaleString("es-ES", {
    minimumFractionDigits: 0,
    maximumFractionDigits: maxDecimals,
  });

const getAvailableOptions = (items) => {
  return [
    ...new Set(
      items
        .map((item) => {
          if (
            item.opcion === undefined ||
            item.opcion === null ||
            item.opcion === ""
          ) {
            return null;
          }

          const option = Number(item.opcion);
          return Number.isFinite(option) ? option : null;
        })
        .filter((option) => option !== null),
    ),
  ].sort((a, b) => a - b);
};

const isCommonItem = (item) =>
  item.opcion === undefined || item.opcion === null || item.opcion === "";

export default function DietaTab({ client }) {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [instructions, setInstructions] = useState([]);
  const [instructionsError, setInstructionsError] = useState(null);
  const [recipesOpen, setRecipesOpen] = useState(false);

  /*
    Estado EXCLUSIVAMENTE VISUAL.

    Ejemplo:
      {
        desayuno: 2,
        comida: 1
      }

    No se guarda en Supabase y no interviene en ningún cálculo.
  */
  const [selectedOptions, setSelectedOptions] = useState({});

  const [openMeals, setOpenMeals] = useState(() => {
    const initialState = {};

    MEALS.forEach((meal) => {
      initialState[meal.id] = true;
    });

    return initialState;
  });

  const today = getTodayAppDay();
  const todayName = FULL_DAYS_MAP[today];

  useEffect(() => {
    if (!client?.id) {
      setLoading(false);
      return;
    }

    setLoading(true);

    Promise.all([
      listClientDiet(client.id),
      listClientDietInstructions(client.id),
    ]).then(
      ([
        { entries, error: dietError },
        { instructions: loadedInstructions, error: loadedInstructionsError },
      ]) => {
        setEntries(entries || []);
        setInstructions(loadedInstructions || []);
        setError(dietError || null);
        setInstructionsError(loadedInstructionsError || null);
        setLoading(false);
      },
    );
  }, [client?.id]);

  const toggleMeal = (mealId) => {
    setOpenMeals((current) => ({
      ...current,
      [mealId]: !current[mealId],
    }));
  };

  const selectOption = (mealId, option) => {
    setSelectedOptions((current) => ({
      ...current,
      [mealId]: option,
    }));
  };

  if (!client) {
    return (
      <EmptyState
        icon="🔍"
        title="Ficha no encontrada"
        body="Escríbeme para revisarlo."
      />
    );
  }

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-6 p-2">
        <div className="h-20 w-full rounded-2xl bg-slate-100" />
        <div className="h-48 w-full rounded-[2rem] border border-slate-100 bg-white shadow-sm" />
        <div className="h-28 w-full rounded-[1.5rem] border border-slate-100 bg-white shadow-sm" />
        <div className="h-28 w-full rounded-[1.5rem] border border-slate-100 bg-white shadow-sm" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-4 shadow-sm">
        <p className="text-sm font-bold text-red-600">
          Error al cargar tu dieta
        </p>

        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      </div>
    );
  }

  /*
    SOLO dieta de hoy:
      - entradas de "todos los días"
      - entradas específicas del día actual

    Este array sigue siendo el origen de TODOS los cálculos.
  */
  const entriesForToday = entries.filter(
    (entry) => !entry.dia_semana || Number(entry.dia_semana) === today,
  );

  let totalKcal = 0;
  let totalP = 0;
  let totalC = 0;
  let totalF = 0;

  /*
    MUY IMPORTANTE:
    Los cálculos se hacen sobre `items`, que contiene TODAS las opciones.

    El selector Opción 1/2/3 solo se aplica después, al pintar los alimentos.
  */
  const entriesByMeal = MEALS.map((meal) => {
    const items = entriesForToday.filter(
      (entry) => entry.momento_dia === meal.id,
    );

    const mealKcal = calcTodayMealAverage(items, ["calorias", "kcal"]);

    const mealP = calcTodayMealAverage(items, ["proteinas", "p"]);

    const mealC = calcTodayMealAverage(items, ["carbos", "carbohidratos", "c"]);

    const mealF = calcTodayMealAverage(items, ["grasas", "f"]);

    totalKcal += mealKcal;
    totalP += mealP;
    totalC += mealC;
    totalF += mealF;

    return {
      meal,
      items,
      mealKcal,
      mealP,
      mealC,
      mealF,
    };
  }).filter((group) => group.items.length > 0);

  const totalMacros = totalP + totalC + totalF || 1;

  const pctP = Math.round((totalP / totalMacros) * 100);
  const pctC = Math.round((totalC / totalMacros) * 100);
  const pctF = Math.round((totalF / totalMacros) * 100);

  /*
    Normalizamos momento_dia porque una indicación general puede llegar
    de Supabase como null, "", "general", "dia" o "día" si existen filas
    creadas durante versiones anteriores del editor.
  */
  const normalizeInstructionMeal = (value) => {
    if (value === null || value === undefined) return null;

    const normalized = String(value).trim().toLowerCase();

    if (
      normalized === "" ||
      normalized === "general" ||
      normalized === "dia" ||
      normalized === "día"
    ) {
      return null;
    }

    return normalized;
  };

  const instructionAppliesToday = (instruction) => {
    if (
      instruction.dia_semana === null ||
      instruction.dia_semana === undefined ||
      instruction.dia_semana === ""
    ) {
      return true;
    }

    return Number(instruction.dia_semana) === today;
  };

  const generalDayInstructions = instructions.filter(
    (instruction) =>
      normalizeInstructionMeal(instruction.momento_dia) === null &&
      instructionAppliesToday(instruction),
  );

  return (
    <>
      <div className="flex flex-col gap-6 pb-24 animate-fade-in">
        {/* =====================================================
            CABECERA
        ====================================================== */}
        <div>
          <p className="text-sm font-bold uppercase tracking-widest text-orange">
            Tu plan activo
          </p>

          <div className="mt-1 flex items-center justify-between gap-4">
            <h2 className="font-display text-3xl font-extrabold text-navy">
              Nutrición
            </h2>

            <div className="rounded-xl border border-orange/20 bg-orange/10 px-3 py-1.5">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-orange">
                Hoy ({todayName})
              </span>
            </div>
          </div>

          <p className="mt-2 max-w-xl text-sm font-medium leading-relaxed text-slate-500">
            Elige la opción de cada comida que quieras consultar. Tus macros
            siguen calculándose sobre la media completa de tu planificación.
          </p>
        </div>

        {instructionsError && (
          <div className="rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3">
            <p className="text-xs font-bold text-amber-700">
              No se pudieron cargar las indicaciones del plan.
            </p>
            <p className="mt-1 text-[11px] text-amber-600">
              {instructionsError.message}
            </p>
          </div>
        )}

        {/* =====================================================
            RECETAS
        ====================================================== */}
        <button
          type="button"
          onClick={() => setRecipesOpen(true)}
          className="brand-gradient group flex w-full items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 text-left text-navy shadow-[0_10px_28px_rgba(219,170,30,0.16)] transition hover:-translate-y-0.5 hover:shadow-[0_14px_34px_rgba(219,170,30,0.22)] active:translate-y-0"
        >
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl bg-navy/10 text-2xl">
              🍳
            </div>

            <div className="min-w-0">
              <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-navy/55">
                Ideas para tu plan
              </p>

              <p className="mt-0.5 font-display text-lg font-extrabold">
                Recetas
              </p>

              <p className="mt-0.5 text-xs font-semibold text-navy/65">
                Preparaciones sencillas con macros incluidos
              </p>
            </div>
          </div>

          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-navy text-white transition-transform group-hover:translate-x-0.5">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="m9 5 7 7-7 7"
              />
            </svg>
          </div>
        </button>

        {generalDayInstructions.length > 0 && (
          <section className="rounded-[1.5rem] bg-navy px-5 py-4 text-white shadow-[0_10px_30px_rgba(30,41,59,0.14)] ring-1 ring-white/5 sm:px-6 sm:py-5">
            <div className="flex items-start gap-3.5">
              <div className="brand-gradient flex h-10 w-10 shrink-0 items-center justify-center rounded-xl text-navy shadow-sm">
                <svg
                  className="h-4.5 w-4.5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5A4.5 4.5 0 003 9.5v8A4.5 4.5 0 017.5 13c1.746 0 3.332.477 4.5 1.253m0-8C13.168 5.477 14.754 5 16.5 5A4.5 4.5 0 0121 9.5v8a4.5 4.5 0 00-4.5-4.5c-1.746 0-3.332.477-4.5 1.253"
                  />
                </svg>
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex items-center justify-between gap-3">
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-white/55">
                    Indicaciones del día
                  </p>

                  <span className="shrink-0 rounded-full bg-white/10 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-white/60">
                    Hoy
                  </span>
                </div>

                <div className="mt-2 space-y-2.5">
                  {generalDayInstructions.map((instruction, index) => (
                    <div
                      key={instruction.id}
                      className={
                        index === 0 ? "" : "border-t border-white/10 pt-2.5"
                      }
                    >
                      <p className="whitespace-pre-line text-[13px] font-semibold leading-5 text-slate-100 sm:text-sm sm:leading-6">
                        {instruction.indicaciones}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        )}

        {entriesForToday.length === 0 ? (
          <EmptyState
            icon="🍽️"
            title="Día libre"
            body={`No tienes alimentos asignados para hoy (${todayName}).`}
          />
        ) : (
          <>
            {/* =================================================
                RESUMEN DIARIO
            ================================================== */}
            <div className="mb-2 overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100">
              <div className="flex flex-col items-center gap-8 sm:flex-row">
                {/* Kcal */}
                <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
                  <svg
                    className="absolute inset-0 h-full w-full -rotate-90 transform"
                    viewBox="0 0 100 100"
                  >
                    <defs>
                      <linearGradient
                        id="diet-ring-gradient"
                        x1="0%"
                        y1="0%"
                        x2="100%"
                        y2="100%"
                      >
                        <stop offset="0%" stopColor={BRAND_YELLOW} />

                        <stop offset="100%" stopColor={BRAND_GOLD} />
                      </linearGradient>
                    </defs>

                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="#f1f5f9"
                      strokeWidth="8"
                    />

                    <circle
                      cx="50"
                      cy="50"
                      r="42"
                      fill="none"
                      stroke="url(#diet-ring-gradient)"
                      strokeWidth="8"
                      strokeLinecap="round"
                      strokeDasharray={`${2 * Math.PI * 42}`}
                      strokeDashoffset={0}
                      className="drop-shadow-md transition-all duration-1000 ease-out"
                    />
                  </svg>

                  <div className="flex flex-col items-center justify-center text-center px-4">
                    {/* Reducimos un pelín la fuente a text-2xl y quitamos los decimales pasando un '0' a formatNumber */}
                    <span className="font-display text-2xl font-extrabold leading-none tracking-tight text-navy">
                      {formatNumber(totalKcal, 0)}
                    </span>

                    <span className="mt-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">
                      Kcal de hoy
                    </span>
                  </div>
                </div>

                {/* Macros */}
                <div className="flex w-full flex-1 flex-col gap-4">
                  <MacroBar
                    label="Proteínas"
                    value={totalP}
                    percentage={pctP}
                    className="bg-navy"
                  />

                  <MacroBar
                    label="Carbohidratos"
                    value={totalC}
                    percentage={pctC}
                    className="bg-[#3B82F6]"
                  />

                  <MacroBar
                    label="Grasas"
                    value={totalF}
                    percentage={pctF}
                    className="brand-gradient"
                  />
                </div>
              </div>

              <div className="mt-5 flex items-start gap-2 rounded-xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-100">
                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-400"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>

                <p className="text-[11px] font-medium leading-4 text-slate-500">
                  Los valores diarios son la media de las distintas opciones de
                  cada comida. Cambiar de opción abajo solo modifica la
                  visualización.
                </p>
              </div>
            </div>

            {/* =================================================
                COMIDAS
            ================================================== */}
            <div className="flex flex-col gap-5">
              {entriesByMeal.map(({ meal, items, mealKcal }) => {
                const isOpen = openMeals[meal.id];

                const availableOptions = getAvailableOptions(items);

                /*
                    Si el usuario todavía no ha seleccionado nada,
                    mostramos automáticamente la primera opción disponible.
                  */
                const requestedOption = selectedOptions[meal.id];

                const selectedOption = availableOptions.includes(
                  Number(requestedOption),
                )
                  ? Number(requestedOption)
                  : availableOptions[0] ?? null;

                /*
                    ÚNICO FILTRO VISUAL.

                    No se utiliza en:
                      - calcTodayMealAverage()
                      - totalKcal
                      - totalP/C/F
                      - PDF
                      - ExtrasTab / lista de compra
                  */
                const visibleItems =
                  selectedOption === null
                    ? items
                    : items.filter(
                        (item) =>
                          isCommonItem(item) ||
                          Number(item.opcion) === Number(selectedOption),
                      );

                const hasSeveralOptions = availableOptions.length > 1;

                const mealInstructions = instructions.filter((instruction) => {
                  const instructionMeal = normalizeInstructionMeal(
                    instruction.momento_dia,
                  );

                  const sameMeal =
                    instructionMeal === String(meal.id).trim().toLowerCase();

                  const sameDay = instructionAppliesToday(instruction);

                  const appliesToWholeMeal =
                    instruction.opcion === null ||
                    instruction.opcion === undefined ||
                    instruction.opcion === "";

                  const sameOption =
                    selectedOption !== null &&
                    Number(instruction.opcion) === Number(selectedOption);

                  return (
                    sameMeal && sameDay && (appliesToWholeMeal || sameOption)
                  );
                });

                return (
                  <section
                    key={meal.id}
                    className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-100 transition-all"
                  >
                    {/* CABECERA COMIDA */}
                    <button
                      type="button"
                      onClick={() => toggleMeal(meal.id)}
                      className="flex w-full items-center justify-between p-5 text-left transition-colors hover:bg-slate-50 active:bg-slate-100"
                    >
                      <div className="flex min-w-0 items-center gap-3">
                        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-2xl bg-navy/5 text-xl">
                          {meal.icon}
                        </span>

                        <div className="min-w-0">
                          <h3 className="font-display text-lg font-bold capitalize leading-tight text-navy">
                            {meal.label}
                          </h3>

                          <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-[11px] font-semibold text-slate-400">
                            <span>
                              {formatNumber(mealKcal)} kcal
                              {hasSeveralOptions ? " de media" : ""}
                            </span>

                            {hasSeveralOptions && (
                              <>
                                <span className="text-slate-300">·</span>

                                <span>{availableOptions.length} opciones</span>
                              </>
                            )}
                          </div>
                        </div>
                      </div>

                      <div
                        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-transform duration-300 ${
                          isOpen ? "rotate-180" : ""
                        }`}
                      >
                        <svg
                          className="h-5 w-5"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2.5"
                            d="M19 9l-7 7-7-7"
                          />
                        </svg>
                      </div>
                    </button>

                    {isOpen && (
                      <div className="border-t border-slate-50 animate-fade-in">
                        {/* SELECTOR DE OPCIONES */}
                        {hasSeveralOptions && (
                          <div className="px-5 pt-4">
                            <div className="rounded-2xl bg-slate-50 p-2 ring-1 ring-slate-100">
                              <div className="mb-2 flex items-center justify-between gap-3 px-1">
                                <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                                  Elige una opción
                                </p>

                                <p className="text-[10px] font-semibold text-slate-400">
                                  Solo cambia la vista
                                </p>
                              </div>

                              <div
                                className="grid gap-2"
                                style={{
                                  gridTemplateColumns: `repeat(${Math.min(
                                    availableOptions.length,
                                    3,
                                  )}, minmax(0, 1fr))`,
                                }}
                              >
                                {availableOptions.map((option) => {
                                  const active =
                                    Number(selectedOption) === Number(option);

                                  return (
                                    <button
                                      key={option}
                                      type="button"
                                      onClick={() =>
                                        selectOption(meal.id, option)
                                      }
                                      className={`min-h-10 rounded-xl px-3 py-2 text-xs font-extrabold transition-all active:scale-[0.98] ${
                                        active
                                          ? "brand-gradient text-navy shadow-sm ring-1 ring-[#DBAA1E]/30"
                                          : "bg-white text-slate-500 ring-1 ring-slate-200 hover:text-navy"
                                      }`}
                                    >
                                      Opción {option}
                                    </button>
                                  );
                                })}
                              </div>
                            </div>
                          </div>
                        )}

                        {mealInstructions.length > 0 && (
                          <div className="px-5 pt-4">
                            <div className="rounded-2xl border border-orange/15 bg-orange/5 px-4 py-3.5">
                              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-orange">
                                Indicaciones
                              </p>

                              <div className="mt-2 space-y-2">
                                {mealInstructions.map((instruction) => (
                                  <div key={instruction.id}>
                                    {instruction.opcion && (
                                      <p className="mb-0.5 text-[9px] font-bold uppercase tracking-wider text-slate-400">
                                        Opción {instruction.opcion}
                                      </p>
                                    )}

                                    <p className="whitespace-pre-line text-xs font-medium leading-5 text-slate-600">
                                      {instruction.indicaciones}
                                    </p>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        )}

                        {/* ALIMENTOS DE LA OPCIÓN ELEGIDA */}
                        <div className="px-5 pb-5 pt-4">
                          <div className="mb-2 flex items-center justify-between gap-3">
                            <p className="text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                              {selectedOption !== null
                                ? `Opción ${selectedOption}`
                                : "Alimentos"}
                            </p>

                            <span className="text-[10px] font-semibold text-slate-400">
                              {visibleItems.length}{" "}
                              {visibleItems.length === 1
                                ? "alimento"
                                : "alimentos"}
                            </span>
                          </div>

                          <ul className="flex flex-col divide-y divide-slate-100">
                            {visibleItems.map((item) => {
                              const foodKcal = Math.round(
                                ((Number(
                                  item.foods?.calorias || item.foods?.kcal,
                                ) || 0) *
                                  (Number(item.cantidad_g) || 0)) /
                                  100,
                              );

                              const dayLabel = item.dia_semana
                                ? DAYS_MAP[item.dia_semana]
                                : "Todos los días";

                              const urlCompra = item.foods?.url_compra;

                              const unit = item.unidad || "g";

                              return (
                                <li
                                  key={item.id}
                                  className="py-4 first:pt-2 last:pb-0"
                                >
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="min-w-0 flex-1">
                                      <p className="font-display text-sm font-extrabold leading-snug text-navy">
                                        {item.foods?.nombre}
                                      </p>

                                      <div className="mt-1 flex flex-wrap items-center gap-x-1.5 gap-y-1 text-[11px] font-bold text-slate-400">
                                        <span>
                                          {item.cantidad_g}
                                          {unit}
                                        </span>

                                        <span>·</span>

                                        <span>{dayLabel}</span>

                                        {urlCompra && (
                                          <>
                                            <span>·</span>

                                            <a
                                              href={urlCompra}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                              className="font-extrabold text-orange transition hover:underline"
                                            >
                                              Ver producto ↗
                                            </a>
                                          </>
                                        )}
                                      </div>

                                      {/* INDICACIONES */}
                                      {item.notas && (
                                        <div className="mt-3 rounded-xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-100">
                                          <div className="flex gap-2.5">
                                            <div className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-lg bg-orange/10 text-orange">
                                              <svg
                                                className="h-3.5 w-3.5"
                                                fill="none"
                                                viewBox="0 0 24 24"
                                                stroke="currentColor"
                                              >
                                                <path
                                                  strokeLinecap="round"
                                                  strokeLinejoin="round"
                                                  strokeWidth="2"
                                                  d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5A4.5 4.5 0 003 9.5v8A4.5 4.5 0 017.5 13c1.746 0 3.332.477 4.5 1.253m0-8C13.168 5.477 14.754 5 16.5 5A4.5 4.5 0 0121 9.5v8a4.5 4.5 0 00-4.5-4.5c-1.746 0-3.332.477-4.5 1.253"
                                                />
                                              </svg>
                                            </div>

                                            <div>
                                              <p className="text-[9px] font-extrabold uppercase tracking-[0.14em] text-slate-400">
                                                Indicaciones
                                              </p>

                                              <p className="mt-1 whitespace-pre-line text-xs font-medium leading-5 text-slate-600">
                                                {item.notas}
                                              </p>
                                            </div>
                                          </div>
                                        </div>
                                      )}
                                    </div>

                                    <span className="shrink-0 rounded-lg bg-slate-50 px-2.5 py-1.5 text-xs font-extrabold text-navy ring-1 ring-slate-100">
                                      {foodKcal} kcal
                                    </span>
                                  </div>
                                </li>
                              );
                            })}
                          </ul>
                        </div>
                      </div>
                    )}
                  </section>
                );
              })}
            </div>
          </>
        )}
      </div>

      <RecipesModal open={recipesOpen} onClose={() => setRecipesOpen(false)} />
    </>
  );
}

function MacroBar({ label, value, percentage, className }) {
  return (
    <div>
      <div className="mb-1.5 flex justify-between text-xs font-bold">
        <span className="text-navy">{label}</span>

        <span className="text-slate-500">
          {formatNumber(value)}g{" "}
          <span className="font-medium text-slate-300">({percentage}%)</span>
        </span>
      </div>

      <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
        <div
          className={`h-full rounded-full transition-all duration-1000 ease-out ${className}`}
          style={{
            width: `${Math.min(100, Math.max(0, percentage))}%`,
          }}
        />
      </div>
    </div>
  );
}
