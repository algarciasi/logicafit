import { useEffect, useMemo, useState } from "react";
import { DIAS_SEMANA, diaLabel } from "../../lib/routines";
import {
  addDietInstruction,
  deleteDietInstruction,
  listClientDietInstructions,
  updateDietInstruction,
} from "../../lib/dietInstructions";

export default function DietInstructionEditor({
  clientId,
  mealId = null,
  mealLabel = "",
  compact = false,
}) {
  const [instructions, setInstructions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  const [editingId, setEditingId] = useState(null);
  const [day, setDay] = useState("");
  const [option, setOption] = useState("");
  const [text, setText] = useState("");

  const isMeal = Boolean(mealId);

  const load = async () => {
    if (!clientId) return;

    setLoading(true);

    const { instructions, error } =
      await listClientDietInstructions(clientId);

    if (error) {
      console.error("Error cargando indicaciones de dieta:", error);
    }

    setInstructions(instructions || []);
    setLoading(false);
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientId]);

  const visibleInstructions = useMemo(
    () =>
      instructions.filter((item) =>
        isMeal
          ? item.momento_dia === mealId
          : !item.momento_dia,
      ),
    [instructions, isMeal, mealId],
  );

  const resetForm = () => {
    setEditingId(null);
    setDay("");
    setOption("");
    setText("");
  };

  const handleEdit = (item) => {
    setEditingId(item.id);
    setDay(
      item.dia_semana === null ||
        item.dia_semana === undefined
        ? ""
        : String(item.dia_semana),
    );
    setOption(
      item.opcion === null ||
        item.opcion === undefined
        ? ""
        : String(item.opcion),
    );
    setText(item.indicaciones || "");
  };

  const handleSave = async () => {
    const cleanText = text.trim();
    if (!cleanText) return;

    setSaving(true);

    const payload = {
      momentoDia: mealId || null,
      diaSemana: day === "" ? null : Number(day),
      opcion:
        !isMeal || option === ""
          ? null
          : Number(option),
      indicaciones: cleanText,
    };

    const result = editingId
      ? await updateDietInstruction(
          editingId,
          payload,
        )
      : await addDietInstruction({
          clientId,
          ...payload,
        });

    setSaving(false);

    if (result.error) {
      alert(
        "No se pudo guardar la indicación: " +
          result.error.message,
      );
      return;
    }

    resetForm();
    await load();
  };

  const handleDelete = async (id) => {
    if (
      !window.confirm(
        "¿Eliminar esta indicación?",
      )
    ) {
      return;
    }

    const { error } =
      await deleteDietInstruction(id);

    if (error) {
      alert(
        "No se pudo eliminar: " +
          error.message,
      );
      return;
    }

    if (editingId === id) {
      resetForm();
    }

    await load();
  };

  return (
    <div
      className={`rounded-2xl border border-slate-100 ${
        compact
          ? "mt-4 bg-slate-50/70 p-3.5"
          : "bg-white p-4 shadow-sm"
      }`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-orange">
            {isMeal
              ? "Indicaciones de la comida"
              : "Indicaciones generales"}
          </p>

          <h3
            className={`mt-1 font-display font-extrabold text-navy ${
              compact ? "text-sm" : "text-base"
            }`}
          >
            {isMeal
              ? mealLabel
              : "Notas del día"}
          </h3>
        </div>

        {editingId && (
          <button
            type="button"
            onClick={resetForm}
            className="text-[10px] font-bold uppercase tracking-wider text-slate-400 hover:text-navy"
          >
            Cancelar
          </button>
        )}
      </div>

      {!loading &&
        visibleInstructions.length > 0 && (
          <div className="mt-3 space-y-2">
            {visibleInstructions.map(
              (item) => (
                <div
                  key={item.id}
                  className="rounded-xl bg-white px-3 py-2.5 ring-1 ring-slate-100"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap gap-1.5">
                        <span className="rounded-full bg-slate-100 px-2 py-0.5 text-[9px] font-bold text-slate-500">
                          {item.dia_semana
                            ? diaLabel(
                                Number(
                                  item.dia_semana,
                                ),
                              )
                            : "Todos los días"}
                        </span>

                        {isMeal &&
                          item.opcion && (
                            <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[9px] font-bold text-orange">
                              Opción{" "}
                              {item.opcion}
                            </span>
                          )}

                        {isMeal &&
                          !item.opcion && (
                            <span className="rounded-full bg-navy/5 px-2 py-0.5 text-[9px] font-bold text-navy">
                              Toda la comida
                            </span>
                          )}
                      </div>

                      <p className="mt-2 whitespace-pre-line text-xs font-medium leading-5 text-slate-600">
                        {item.indicaciones}
                      </p>
                    </div>

                    <div className="flex shrink-0 gap-1">
                      <button
                        type="button"
                        onClick={() =>
                          handleEdit(item)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition hover:bg-slate-100 hover:text-navy"
                        aria-label="Editar indicación"
                      >
                        <svg
                          className="h-4 w-4"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
                          />
                        </svg>
                      </button>

                      <button
                        type="button"
                        onClick={() =>
                          handleDelete(item.id)
                        }
                        className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-50 text-slate-400 transition hover:bg-red-50 hover:text-red-500"
                        aria-label="Eliminar indicación"
                      >
                        ×
                      </button>
                    </div>
                  </div>
                </div>
              ),
            )}
          </div>
        )}

      <div className="mt-3 grid gap-2 sm:grid-cols-2">
        <select
          value={day}
          onChange={(event) =>
            setDay(event.target.value)
          }
          className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
        >
          <option value="">
            Todos los días
          </option>

          {DIAS_SEMANA.map((item) => (
            <option
              key={item.value}
              value={item.value}
            >
              {item.label}
            </option>
          ))}
        </select>

        {isMeal && (
          <select
            value={option}
            onChange={(event) =>
              setOption(event.target.value)
            }
            className="rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-xs font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
          >
            <option value="">
              Toda la comida
            </option>

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
        )}
      </div>

      <textarea
        value={text}
        onChange={(event) =>
          setText(event.target.value)
        }
        rows={compact ? 2 : 3}
        maxLength={700}
        placeholder={
          isMeal
            ? "Ej.: Hazte una tortilla con los huevos y las claras..."
            : "Ej.: Bebe al menos 2 litros de agua durante el día..."
        }
        className="mt-2 w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-xs font-medium leading-5 text-navy outline-none placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
      />

      <div className="mt-2 flex items-center justify-between gap-3">
        <span className="text-[9px] font-medium text-slate-300">
          {text.length}/700
        </span>

        <button
          type="button"
          onClick={handleSave}
          disabled={
            saving || !text.trim()
          }
          className="rounded-xl bg-navy px-4 py-2 text-[11px] font-extrabold text-white transition hover:bg-navy-light disabled:opacity-40"
        >
          {saving
            ? "Guardando…"
            : editingId
              ? "Guardar cambios"
              : "Añadir indicación"}
        </button>
      </div>
    </div>
  );
}
