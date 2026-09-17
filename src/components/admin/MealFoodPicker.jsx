import { useEffect, useState } from "react";
import { listAllFoods } from "../../lib/foods";
import { DIAS_SEMANA, diaLabel } from "../../lib/routines";

// Cache simple en memoria
let cachedFoods = null;

export default function MealFoodPicker({ mealId, onAdd }) {
  const [foods, setFoods] = useState(cachedFoods || []);
  const [loading, setLoading] = useState(!cachedFoods);

  const [superFilter, setSuperFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const [cantidad, setCantidad] = useState(100);
  const [unidad, setUnidad] = useState("g");
  const [opcion, setOpcion] = useState(1);
  const [notas, setNotas] = useState("");

  const [todosLosDias, setTodosLosDias] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);

  const [stagedItems, setStagedItems] = useState([]);
  const [saving, setSaving] = useState(false);

  const [superOpen, setSuperOpen] = useState(false);
  const [unidadOpen, setUnidadOpen] = useState(false);
  const [opcionOpen, setOpcionOpen] = useState(false);

  useEffect(() => {
    if (cachedFoods) return;

    listAllFoods().then(({ foods }) => {
      cachedFoods = foods;
      setFoods(foods || []);
      setLoading(false);
    });
  }, []);

  const supermarkets = [
    ...new Set(foods.map((f) => f.supermercado).filter(Boolean)),
  ].sort();

  const filteredFoods = foods.filter(
    (f) => !superFilter || f.supermercado === superFilter,
  );

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const found = filteredFoods.find((food) => {
      const label = food.supermercado
        ? `${food.nombre} (${food.supermercado})`
        : food.nombre;

      return label === value;
    });

    setSelectedId(found ? found.id : "");
  };

  const toggleDay = (value) => {
    setSelectedDays((current) =>
      current.includes(value)
        ? current.filter((day) => day !== value)
        : [...current, value],
    );
  };

  const handleStageItem = () => {
    if (!selectedId) return;

    const food = foods.find((item) => item.id === Number(selectedId));
    if (!food) return;

    const baseItem = {
      food,
      cantidad: Number(cantidad),
      opcion: Number(opcion),
      unidad,
      notas: notas.trim(),
    };

    const newItems = todosLosDias
      ? [{ ...baseItem, dia: null }]
      : selectedDays.map((dia) => ({ ...baseItem, dia }));

    setStagedItems((current) => [...current, ...newItems]);

    // Limpiamos los campos propios del alimento para preparar el siguiente.
    setSelectedId("");
    setSearchText("");
    setCantidad(100);
    setNotas("");
  };

  const handleRemoveStaged = (indexToRemove) => {
    setStagedItems((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  };

  const handleSaveAll = async () => {
    if (stagedItems.length === 0) return;

    setSaving(true);

    try {
      for (const item of stagedItems) {
        // IMPORTANTE:
        // Se añade "item.notas" como séptimo parámetro.
        // El componente padre debe recibirlo y pasarlo a addDietEntry({ notas }).
        // eslint-disable-next-line no-await-in-loop
        await onAdd(
          mealId,
          item.food,
          item.cantidad,
          item.dia,
          item.opcion,
          item.unidad,
          item.notas,
        );
      }

      setStagedItems([]);
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <p className="mt-4 text-xs font-medium text-slate-400">
        Cargando base de datos de alimentos…
      </p>
    );
  }

  const canStage =
    selectedId &&
    Number(cantidad) > 0 &&
    (todosLosDias || selectedDays.length > 0);

  return (
    <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">

      {/* LISTA TEMPORAL */}
      {stagedItems.length > 0 && (
        <div className="mb-5 rounded-xl bg-white p-3 shadow-sm ring-1 ring-slate-200/60 animate-fade-in-up">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Listos para guardar ({stagedItems.length})
            </p>
          </div>

          <ul className="mb-3 space-y-2">
            {stagedItems.map((item, index) => (
              <li
                key={`${item.food.id}-${item.dia ?? "all"}-${item.opcion}-${index}`}
                className="rounded-xl bg-slate-50 px-3 py-2.5 text-xs"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug text-navy">
                      {item.food.nombre} —{" "}
                      <span className="text-orange">
                        {item.cantidad}
                        {item.unidad}
                      </span>
                    </p>

                    <p className="mt-0.5 text-[10px] font-medium text-slate-400">
                      {item.dia
                        ? diaLabel(item.dia).slice(0, 3)
                        : "Todos los días"}{" "}
                      · Opción {item.opcion}
                    </p>

                    {item.notas && (
                      <div className="mt-2 border-l-2 border-orange/40 pl-2.5">
                        <p className="text-[10px] font-bold uppercase tracking-[0.12em] text-slate-400">
                          Indicaciones
                        </p>
                        <p className="mt-0.5 text-[11px] font-medium leading-4 text-slate-600">
                          {item.notas}
                        </p>
                      </div>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => handleRemoveStaged(index)}
                    className="shrink-0 px-1 font-bold text-slate-400 transition hover:text-red-500"
                    aria-label={`Quitar ${item.food.nombre}`}
                  >
                    ✕
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="w-full rounded-xl bg-navy py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-navy-light active:scale-95 disabled:opacity-50"
          >
            {saving ? "Guardando todos…" : "Confirmar y guardar en el plan"}
          </button>
        </div>
      )}

      {/* FILA 1: SUPERMERCADO + ALIMENTO */}
      <div className="relative z-30 mb-3 flex flex-col gap-3 sm:flex-row">
        <div className="relative shrink-0 sm:w-48">
          <button
            type="button"
            onClick={() => setSuperOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none transition hover:border-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
          >
            <span className="truncate">{superFilter || "Todos los súpers"}</span>

            <svg
              className={`h-4 w-4 text-slate-400 transition-transform ${
                superOpen ? "rotate-180" : ""
              }`}
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
          </button>

          {superOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setSuperOpen(false)}
              />

              <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                <button
                  type="button"
                  onClick={() => {
                    setSuperFilter("");
                    setSearchText("");
                    setSelectedId("");
                    setSuperOpen(false);
                  }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${
                    !superFilter
                      ? "bg-orange/10 text-orange"
                      : "text-navy hover:bg-slate-50"
                  }`}
                >
                  Todos los súpers
                </button>

                {supermarkets.map((supermarket) => (
                  <button
                    key={supermarket}
                    type="button"
                    onClick={() => {
                      setSuperFilter(supermarket);
                      setSearchText("");
                      setSelectedId("");
                      setSuperOpen(false);
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${
                      superFilter === supermarket
                        ? "bg-orange/10 text-orange"
                        : "text-navy hover:bg-slate-50"
                    }`}
                  >
                    {supermarket}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="relative flex-1">
          <input
            list={`foods-list-${mealId}`}
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Buscar o escribir alimento..."
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
          />

          <datalist id={`foods-list-${mealId}`}>
            {filteredFoods.map((food) => (
              <option
                key={food.id}
                value={
                  food.supermercado
                    ? `${food.nombre} (${food.supermercado})`
                    : food.nombre
                }
              />
            ))}
          </datalist>
        </div>
      </div>

      {/* FILA 2: CANTIDAD + UNIDAD + OPCIÓN */}
      <div className="relative z-20 flex flex-col gap-3 sm:flex-row">
        <div className="flex w-full gap-2 sm:w-auto">
          <div className="relative w-24 shrink-0">
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(event) => setCantidad(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-center text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            />
          </div>

          <div className="relative w-20 shrink-0">
            <button
              type="button"
              onClick={() => setUnidadOpen((value) => !value)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-500 outline-none transition hover:border-slate-300"
            >
              <span>{unidad}</span>

              <svg
                className={`h-3 w-3 text-slate-400 transition-transform ${
                  unidadOpen ? "rotate-180" : ""
                }`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="3"
                  d="M19 9l-7 7-7-7"
                />
              </svg>
            </button>

            {unidadOpen && (
              <>
                <div
                  className="fixed inset-0 z-40"
                  onClick={() => setUnidadOpen(false)}
                />

                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                  {["g", "ml"].map((unit) => (
                    <button
                      key={unit}
                      type="button"
                      onClick={() => {
                        setUnidad(unit);
                        setUnidadOpen(false);
                      }}
                      className={`block w-full rounded-lg px-2 py-2 text-center text-xs font-extrabold transition-colors ${
                        unidad === unit
                          ? "bg-orange/10 text-orange"
                          : "text-slate-500 hover:bg-slate-50"
                      }`}
                    >
                      {unit}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        <div className="relative z-10 w-full shrink-0 sm:w-36">
          <button
            type="button"
            onClick={() => setOpcionOpen((value) => !value)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-orange outline-none transition hover:border-slate-300"
          >
            <span>Opción {opcion}</span>

            <svg
              className={`h-3 w-3 text-orange transition-transform ${
                opcionOpen ? "rotate-180" : ""
              }`}
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="3"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>

          {opcionOpen && (
            <>
              <div
                className="fixed inset-0 z-40"
                onClick={() => setOpcionOpen(false)}
              />

              <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                {[1, 2, 3, 4, 5].map((number) => (
                  <button
                    key={number}
                    type="button"
                    onClick={() => {
                      setOpcion(number);
                      setOpcionOpen(false);
                    }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${
                      opcion === number
                        ? "bg-orange/10 text-orange"
                        : "text-navy hover:bg-slate-50"
                    }`}
                  >
                    Opción {number}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* INDICACIONES */}
      <div className="mt-3">
        <label
          htmlFor={`diet-notes-${mealId}`}
          className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-[0.14em] text-slate-400"
        >
          Indicaciones para este alimento
        </label>

        <textarea
          id={`diet-notes-${mealId}`}
          value={notas}
          onChange={(event) => setNotas(event.target.value)}
          rows={3}
          maxLength={500}
          placeholder="Ej.: puedes sustituirlo por..., preparar a la plancha, añadir canela, tomar antes de entrenar..."
          className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium leading-5 text-navy outline-none placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
        />

        <div className="mt-1 flex justify-end">
          <span className="text-[10px] font-medium text-slate-300">
            {notas.length}/500
          </span>
        </div>
      </div>

      {/* FILA 3: DÍAS + PRE-AÑADIR */}
      <div className="relative z-0 mt-4 flex flex-col justify-between gap-4 border-t border-slate-200/60 pt-4 sm:flex-row sm:items-center">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex cursor-pointer items-center gap-2 text-xs font-bold text-navy">
            <input
              type="checkbox"
              checked={todosLosDias}
              onChange={(event) => {
                setTodosLosDias(event.target.checked);

                if (event.target.checked) {
                  setSelectedDays([]);
                }
              }}
              className="h-4 w-4 rounded border-slate-300 text-orange focus:ring-orange"
            />
            Todos los días
          </label>

          {!todosLosDias && (
            <div className="flex flex-wrap gap-2 border-l border-slate-200 pl-3">
              {DIAS_SEMANA.map((day) => (
                <label
                  key={day.value}
                  className={`flex cursor-pointer items-center justify-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedDays.includes(day.value)
                      ? "bg-navy text-white"
                      : "border border-slate-200 bg-white text-slate-400 hover:border-navy hover:text-navy"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedDays.includes(day.value)}
                    onChange={() => toggleDay(day.value)}
                  />
                  {day.label.slice(0, 3)}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleStageItem}
          disabled={!canStage}
          className="shrink-0 rounded-xl border border-orange/20 bg-orange/10 px-6 py-2.5 text-xs font-extrabold text-orange transition-all hover:bg-orange/20 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          + Pre-añadir alimento
        </button>
      </div>
    </div>
  );
}
