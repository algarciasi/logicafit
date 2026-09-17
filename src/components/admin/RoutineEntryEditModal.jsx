import { useEffect, useMemo, useState } from "react";
import {
  listExercisesByGroup,
  listMuscleGroups,
} from "../../lib/exercises";
import {
  DIAS_SEMANA,
  updateRoutineEntry,
} from "../../lib/routines";

export default function RoutineEntryEditModal({
  entry,
  entries = [],
  open,
  onClose,
  onSaved,
}) {
  const [groups, setGroups] = useState([]);
  const [exercises, setExercises] = useState([]);

  const [group, setGroup] = useState("");
  const [exerciseId, setExerciseId] = useState("");
  const [day, setDay] = useState(1);
  const [series, setSeries] = useState(3);
  const [reps, setReps] = useState(10);
  const [notes, setNotes] = useState("");

  const [loadingExercises, setLoadingExercises] =
    useState(false);
  const [saving, setSaving] = useState(false);

  /*
    Si cambias el ejercicio a otro día, lo colocamos automáticamente
    al final de ese día. Si permanece en el mismo día, conserva su orden.
  */
  const targetOrder = useMemo(() => {
    if (!entry) return 1;

    const originalDay = Number(entry.dia_semana);
    const selectedDay = Number(day);

    if (selectedDay === originalDay) {
      return Number(entry.orden) || 1;
    }

    const maxOrder = entries
      .filter(
        (item) =>
          Number(item.dia_semana) === selectedDay &&
          item.id !== entry.id,
      )
      .reduce(
        (max, item) =>
          Math.max(max, Number(item.orden) || 0),
        0,
      );

    return maxOrder + 1;
  }, [day, entries, entry]);

  useEffect(() => {
    if (!open) return;

    listMuscleGroups().then(({ groups }) => {
      setGroups(groups || []);
    });
  }, [open]);

  useEffect(() => {
    if (!open || !entry) return;

    setGroup(entry.ejercicios?.grupo_muscular || "");
    setExerciseId(String(entry.ejercicio_id || ""));
    setDay(Number(entry.dia_semana) || 1);
    setSeries(Number(entry.series_objetivo) || 1);
    setReps(
      entry.reps_objetivo === null ||
        entry.reps_objetivo === undefined
        ? ""
        : entry.reps_objetivo,
    );
    setNotes(entry.notas_entrenador || "");
  }, [open, entry]);

  useEffect(() => {
    if (!open || !group) {
      setExercises([]);
      return;
    }

    setLoadingExercises(true);

    listExercisesByGroup(group).then(
      ({ exercises }) => {
        setExercises(exercises || []);
        setLoadingExercises(false);
      },
    );
  }, [open, group]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow =
      document.body.style.overflow;

    document.body.style.overflow = "hidden";

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

  if (!open || !entry) return null;

  const handleGroupChange = (value) => {
    setGroup(value);

    /*
      Si el usuario cambia de grupo muscular, vaciamos el ejercicio
      para obligarle a seleccionar uno válido de ese grupo.
    */
    if (
      value !== entry.ejercicios?.grupo_muscular
    ) {
      setExerciseId("");
    } else {
      setExerciseId(
        String(entry.ejercicio_id || ""),
      );
    }
  };

  const handleSave = async () => {
    if (!exerciseId) {
      alert("Selecciona un ejercicio.");
      return;
    }

    if (Number(series) < 1) {
      alert("Las series deben ser al menos 1.");
      return;
    }

    if (
      reps !== "" &&
      Number(reps) < 1
    ) {
      alert(
        "Las repeticiones deben ser al menos 1.",
      );
      return;
    }

    setSaving(true);

    const { error } =
      await updateRoutineEntry(entry.id, {
        diaSemana: Number(day),
        ejercicioId: Number(exerciseId),
        orden: targetOrder,
        seriesObjetivo: Number(series),
        repsObjetivo:
          reps === "" ? null : Number(reps),
        notasEntrenador: notes,
      });

    setSaving(false);

    if (error) {
      alert(
        "No se pudo actualizar el ejercicio: " +
          error.message,
      );
      return;
    }

    await onSaved?.();
    onClose();
  };

  return (
    <div
      className="fixed inset-0 z-[140] flex items-end justify-center bg-navy/70 backdrop-blur-sm sm:items-center sm:p-6"
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

        {/* CABECERA */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-orange">
              Editar rutina
            </p>

            <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">
              {entry.ejercicios?.nombre ||
                "Ejercicio"}
            </h2>

            <p className="mt-1 text-xs font-medium leading-5 text-slate-500">
              Modifica el ejercicio, el día, las
              series, repeticiones o las
              indicaciones sin borrarlo.
            </p>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xl text-slate-500 transition hover:bg-slate-200 hover:text-navy"
            aria-label="Cerrar"
          >
            ×
          </button>
        </div>

        <div className="mt-6 space-y-4">

          {/* GRUPO */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Grupo muscular
            </label>

            <select
              value={group}
              onChange={(event) =>
                handleGroupChange(
                  event.target.value,
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            >
              <option value="">
                Selecciona grupo
              </option>

              {groups.map((item) => (
                <option
                  key={item}
                  value={item}
                >
                  {item}
                </option>
              ))}
            </select>
          </div>

          {/* EJERCICIO */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Ejercicio
            </label>

            <select
              value={exerciseId}
              onChange={(event) =>
                setExerciseId(
                  event.target.value,
                )
              }
              disabled={
                !group || loadingExercises
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange disabled:bg-slate-50 disabled:text-slate-400"
            >
              <option value="">
                {loadingExercises
                  ? "Cargando ejercicios…"
                  : "Selecciona ejercicio"}
              </option>

              {exercises.map((exercise) => (
                <option
                  key={exercise.id}
                  value={exercise.id}
                >
                  {exercise.nombre}
                </option>
              ))}
            </select>
          </div>

          {/* DÍA */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Día
            </label>

            <select
              value={day}
              onChange={(event) =>
                setDay(
                  Number(event.target.value),
                )
              }
              className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            >
              {DIAS_SEMANA.map((item) => (
                <option
                  key={item.value}
                  value={item.value}
                >
                  {item.label}
                </option>
              ))}
            </select>

            <p className="mt-1.5 text-[10px] font-medium leading-4 text-slate-400">
              {Number(day) ===
              Number(entry.dia_semana)
                ? `Mantendrá su posición actual: ${entry.orden || 1}.`
                : `Al moverlo de día se añadirá al final con posición ${targetOrder}.`}
            </p>
          </div>

          {/* SERIES / REPS */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Series
              </label>

              <input
                type="number"
                min="1"
                max="99"
                value={series}
                onChange={(event) =>
                  setSeries(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-center text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>

            <div>
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
                Repeticiones
              </label>

              <input
                type="number"
                min="1"
                max="999"
                value={reps}
                onChange={(event) =>
                  setReps(
                    event.target.value,
                  )
                }
                className="w-full rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-center text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>

          {/* NOTAS */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Indicaciones
            </label>

            <textarea
              value={notes}
              onChange={(event) =>
                setNotes(
                  event.target.value,
                )
              }
              rows={3}
              maxLength={700}
              placeholder="Ej.: controla la bajada, pausa un segundo abajo..."
              className="w-full resize-none rounded-xl border border-slate-200 bg-white px-3.5 py-3 text-sm font-medium leading-5 text-navy outline-none placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
            />

            <div className="mt-1 text-right text-[10px] font-medium text-slate-300">
              {notes.length}/700
            </div>
          </div>

          {/* RESUMEN */}
          <div className="rounded-xl bg-slate-50 px-3.5 py-3 ring-1 ring-slate-100">
            <p className="text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
              Resultado
            </p>

            <p className="mt-1 text-xs font-bold text-navy">
              {
                DIAS_SEMANA.find(
                  (item) =>
                    Number(item.value) ===
                    Number(day),
                )?.label
              }{" "}
              · posición {targetOrder} ·{" "}
              {series} × {reps || "—"}
            </p>
          </div>

          <button
            type="button"
            onClick={handleSave}
            disabled={
              saving ||
              !exerciseId ||
              !series
            }
            className="brand-button flex w-full items-center justify-center gap-2 rounded-xl py-3.5 text-sm font-extrabold disabled:opacity-50"
          >
            {saving ? (
              "Guardando cambios…"
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>

                Guardar cambios
              </>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
