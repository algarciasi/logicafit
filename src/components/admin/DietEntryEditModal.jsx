import { useEffect, useMemo, useState } from "react";
import { listAllFoods } from "../../lib/foods";
import { MEALS } from "../../lib/macros";
import {
  DIAS_SEMANA,
  diaLabel,
} from "../../lib/routines";
import { updateDietEntry } from "../../lib/diets";

export default function DietEntryEditModal({
  entry,
  open,
  onClose,
  onSaved,
}) {
  const [foods, setFoods] = useState([]);
  const [loadingFoods, setLoadingFoods] =
    useState(false);
  const [saving, setSaving] =
    useState(false);

  const [foodId, setFoodId] =
    useState("");
  const [searchText, setSearchText] =
    useState("");
  const [mealId, setMealId] =
    useState("");
  const [amount, setAmount] =
    useState(100);
  const [unit, setUnit] =
    useState("g");
  const [option, setOption] =
    useState(1);
  const [day, setDay] =
    useState("");
  const [notes, setNotes] =
    useState("");

  useEffect(() => {
    if (!open || !entry) return;

    setFoodId(
      String(entry.food_id || ""),
    );
    setSearchText(
      entry.foods?.nombre || "",
    );
    setMealId(
      entry.momento_dia || "",
    );
    setAmount(
      entry.cantidad_g ?? 100,
    );
    setUnit(entry.unidad || "g");
    setOption(
      Number(entry.opcion || 1),
    );
    setDay(
      entry.dia_semana === null ||
        entry.dia_semana === undefined
        ? ""
        : String(entry.dia_semana),
    );
    setNotes(entry.notas || "");
  }, [open, entry]);

  useEffect(() => {
    if (!open || foods.length > 0)
      return;

    setLoadingFoods(true);

    listAllFoods().then(
      ({ foods }) => {
        setFoods(foods || []);
        setLoadingFoods(false);
      },
    );
  }, [open, foods.length]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow =
      document.body.style.overflow;
    document.body.style.overflow =
      "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener(
      "keydown",
      handleKeyDown,
    );

    return () => {
      document.body.style.overflow =
        previousOverflow;
      window.removeEventListener(
        "keydown",
        handleKeyDown,
      );
    };
  }, [open, onClose]);

  const foodLabels = useMemo(
    () =>
      foods.map((food) => ({
        ...food,
        label: food.supermercado
          ? `${food.nombre} (${food.supermercado})`
          : food.nombre,
      })),
    [foods],
  );

  if (!open || !entry) return null;

  const handleSearchChange = (event) => {
    const value = event.target.value;
    setSearchText(value);

    const found = foodLabels.find(
      (food) => food.label === value,
    );

    if (found) {
      setFoodId(String(found.id));
    }
  };

  const handleSave = async () => {
    if (
      !foodId ||
      !mealId ||
      Number(amount) <= 0
    ) {
      alert(
        "Revisa alimento, comida y cantidad.",
      );
      return;
    }

    setSaving(true);

    const { error } =
      await updateDietEntry(
        entry.id,
        {
          foodId: Number(foodId),
          momentoDia: mealId,
          diaSemana:
            day === ""
              ? null
              : Number(day),
          opcion: Number(option),
          cantidadG: Number(amount),
          unidad: unit,
          notas: notes,
        },
      );

    setSaving(false);

    if (error) {
      alert(
        "No se pudo actualizar el alimento: " +
          error.message,
      );
      return;
    }

    await onSaved?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[130] flex items-end justify-center bg-navy/70 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (
          event.target ===
          event.currentTarget
        ) {
          onClose();
        }
      }}
    >
      <div className="max-h-[94vh] w-full max-w-lg overflow-y-auto rounded-t-[2rem] bg-white p-5 shadow-2xl sm:rounded-[2rem] sm:p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-orange">
              Editar dieta
            </p>

            <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">
              Alimento asignado
            </h2>

            <p className="mt-1 text-xs leading-5 text-slate-500">
              Puedes cambiar alimento,
              cantidad, comida, opción,
              día e indicaciones sin
              borrarlo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 hover:bg-slate-200"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Alimento
            </label>

            <input
              list={`edit-foods-${entry.id}`}
              value={searchText}
              onChange={
                handleSearchChange
              }
              disabled={loadingFoods}
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            />

            <datalist
              id={`edit-foods-${entry.id}`}
            >
              {foodLabels.map(
                (food) => (
                  <option
                    key={food.id}
                    value={food.label}
                  />
                ),
              )}
            </datalist>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Comida
            </label>

            <select
              value={mealId}
              onChange={(event) =>
                setMealId(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            >
              {MEALS.map((meal) => (
                <option
                  key={meal.id}
                  value={meal.id}
                >
                  {meal.label}
                </option>
              ))}
            </select>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Cantidad
              </label>

              <input
                type="number"
                min="1"
                value={amount}
                onChange={(event) =>
                  setAmount(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Unidad
              </label>

              <select
                value={unit}
                onChange={(event) =>
                  setUnit(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              >
                <option value="g">
                  g
                </option>
                <option value="ml">
                  ml
                </option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Opción
              </label>

              <select
                value={option}
                onChange={(event) =>
                  setOption(
                    Number(
                      event.target
                        .value,
                    ),
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              >
                {[1, 2, 3, 4, 5].map(
                  (number) => (
                    <option
                      key={number}
                      value={number}
                    >
                      Opción {number}
                    </option>
                  ),
                )}
              </select>
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Día
              </label>

              <select
                value={day}
                onChange={(event) =>
                  setDay(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              >
                <option value="">
                  Todos los días
                </option>

                {DIAS_SEMANA.map(
                  (item) => (
                    <option
                      key={
                        item.value
                      }
                      value={
                        item.value
                      }
                    >
                      {item.label}
                    </option>
                  ),
                )}
              </select>
            </div>
          </div>

          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Indicaciones del alimento
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(
                  event.target.value,
                )
              }
              rows={3}
              maxLength={500}
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium leading-5 text-navy outline-none placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
            />
          </div>

          <div className="rounded-xl bg-slate-50 px-3.5 py-3 text-[11px] font-medium leading-5 text-slate-500">
            Actualmente:{" "}
            <strong className="text-navy">
              {entry.foods?.nombre}
            </strong>{" "}
            ·{" "}
            {entry.dia_semana
              ? diaLabel(
                  Number(
                    entry.dia_semana,
                  ),
                )
              : "Todos los días"}{" "}
            · Opción{" "}
            {entry.opcion || 1}
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="brand-button flex w-full items-center justify-center rounded-xl py-3.5 text-sm font-extrabold disabled:opacity-50"
          >
            {saving
              ? "Guardando…"
              : "Guardar cambios"}
          </button>
        </div>
      </div>
    </div>
  );
}
