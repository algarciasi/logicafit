import { useEffect, useState } from "react";
import { listMuscleGroups, listExercisesByGroup } from "../../lib/exercises";
import {
  DIAS_SEMANA,
  addRoutineEntry,
  deleteRoutineEntry,
  reorderRoutineDay,
} from "../../lib/routines";
import RoutineEntryEditModal from "./RoutineEntryEditModal";

export default function AdminRoutineEditor({ clientId, entries, onChange }) {
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState("");
  const [exercisesInGroup, setExercisesInGroup] = useState([]);
  const [selectedExerciseId, setSelectedExerciseId] = useState("");

  const [todosLosDias, setTodosLosDias] = useState(false);
  const [selectedDays, setSelectedDays] = useState([1]);

  const [seriesObjetivo, setSeriesObjetivo] = useState(3);
  const [repsObjetivo, setRepsObjetivo] = useState(10);
  const [notas, setNotas] = useState("");

  const [stagedExercises, setStagedExercises] = useState([]);
  const [saving, setSaving] = useState(false);

  const [groupOpen, setGroupOpen] = useState(false);
  const [exerciseOpen, setExerciseOpen] = useState(false);

  const [editingEntry, setEditingEntry] = useState(null);

  // Reordenación
  const [selectedEntryId, setSelectedEntryId] = useState(null);
  const [movingEntryId, setMovingEntryId] = useState(null);

  useEffect(() => {
    listMuscleGroups().then(({ groups }) => {
      const nextGroups = groups || [];
      setGroups(nextGroups);

      if (nextGroups.length > 0) {
        setSelectedGroup(nextGroups[0]);
      }
    });
  }, []);

  useEffect(() => {
    if (!selectedGroup) return;

    listExercisesByGroup(selectedGroup).then(({ exercises }) => {
      const nextExercises = exercises || [];
      setExercisesInGroup(nextExercises);

      if (nextExercises.length > 0) {
        setSelectedExerciseId(nextExercises[0].id);
      } else {
        setSelectedExerciseId("");
      }
    });
  }, [selectedGroup]);

  /*
    Aunque Supabase ya devuelve la rutina ordenada, también ordenamos aquí
    para que la UI siempre dependa explícitamente de "orden".
  */
  const entriesByDay = DIAS_SEMANA.map((dia) => ({
    dia,
    items: entries
      .filter((entry) => Number(entry.dia_semana) === Number(dia.value))
      .sort((a, b) => {
        const orderA = Number(a.orden) || 0;
        const orderB = Number(b.orden) || 0;

        if (orderA !== orderB) {
          return orderA - orderB;
        }

        return Number(a.id) - Number(b.id);
      }),
  }));

  const toggleDay = (value) => {
    setSelectedDays((current) =>
      current.includes(value)
        ? current.filter((day) => day !== value)
        : [...current, value],
    );
  };

  const handleStageExercise = () => {
    if (!selectedExerciseId) return;

    const exerciseData = exercisesInGroup.find(
      (exercise) => Number(exercise.id) === Number(selectedExerciseId),
    );

    if (!exerciseData) return;

    const daysToAdd = todosLosDias
      ? DIAS_SEMANA.map((day) => day.value)
      : selectedDays;

    const newItems = daysToAdd.map((day) => ({
      exercise: exerciseData,
      dia: day,
      series: Number(seriesObjetivo),
      reps: Number(repsObjetivo),
      notas,
    }));

    setStagedExercises((current) => [...current, ...newItems]);

    setNotas("");
  };

  const handleRemoveStaged = (indexToRemove) => {
    setStagedExercises((current) =>
      current.filter((_, index) => index !== indexToRemove),
    );
  };

  /*
    Guarda los ejercicios en el mismo orden en el que los has
    pre-añadido. Cada día mantiene su contador independiente.
  */
  const handleSaveAll = async () => {
    if (stagedExercises.length === 0) return;

    setSaving(true);

    const failedItems = [];
    const lastOrderByDay = {};

    for (const item of stagedExercises) {
      const day = Number(item.dia);

      if (lastOrderByDay[day] === undefined) {
        const entriesForDay = entries.filter(
          (entry) => Number(entry.dia_semana) === day,
        );

        const maxExistingOrder = entriesForDay.reduce(
          (max, entry) => Math.max(max, Number(entry.orden) || 0),
          0,
        );

        lastOrderByDay[day] = maxExistingOrder;
      }

      const nextOrder = lastOrderByDay[day] + 1;

      const { error } = await addRoutineEntry({
        clientId,
        diaSemana: day,
        ejercicioId: item.exercise.id,
        orden: nextOrder,
        seriesObjetivo: item.series,
        repsObjetivo: item.reps,
        notasEntrenador: item.notas,
      });

      if (error) {
        console.error(
          `Error guardando ${item.exercise.nombre} en el día ${day}:`,
          error,
        );

        failedItems.push(item);
        continue;
      }

      lastOrderByDay[day] = nextOrder;
    }

    setStagedExercises(failedItems);
    setSaving(false);

    await onChange?.();

    if (failedItems.length > 0) {
      alert(
        `${failedItems.length} ejercicio(s) no pudieron guardarse. ` +
          "Se mantienen en la lista para que puedas reintentarlo.",
      );
    }
  };

  const handleDelete = async (id) => {
    const { error } = await deleteRoutineEntry(id);

    if (error) {
      alert("Error al borrar: " + error.message);
      return;
    }

    if (selectedEntryId === id) {
      setSelectedEntryId(null);
    }

    await onChange?.();
  };

  /*
    Seleccionar un ejercicio NO abre edición.
    Solo activa/desactiva el modo de reordenación.
  */
  const handleSelectForMove = (entryId) => {
    if (movingEntryId) return;

    setSelectedEntryId((current) => (current === entryId ? null : entryId));
  };

  /*
    Intercambia el ejercicio seleccionado con el anterior o siguiente
    y después normaliza TODO el día como 1, 2, 3, 4...
  */
  const handleMoveExercise = async (dayItems, entryId, direction) => {
    if (movingEntryId) return;

    const ordered = [...dayItems].sort(
      (a, b) => (Number(a.orden) || 0) - (Number(b.orden) || 0),
    );

    const currentIndex = ordered.findIndex((entry) => entry.id === entryId);

    if (currentIndex === -1) return;

    const targetIndex =
      direction === "up" ? currentIndex - 1 : currentIndex + 1;

    if (targetIndex < 0 || targetIndex >= ordered.length) {
      return;
    }

    const reordered = [...ordered];

    [reordered[currentIndex], reordered[targetIndex]] = [
      reordered[targetIndex],
      reordered[currentIndex],
    ];

    setMovingEntryId(entryId);

    const { error } = await reorderRoutineDay(reordered);

    setMovingEntryId(null);

    if (error) {
      alert("No se pudo cambiar el orden: " + error.message);
      return;
    }

    await onChange?.();
  };

  const canStage =
    selectedExerciseId && (todosLosDias || selectedDays.length > 0);

  const selectedExerciseData = exercisesInGroup.find(
    (exercise) => Number(exercise.id) === Number(selectedExerciseId),
  );

  return (
    <div>
      {/* =====================================================
          LISTA TEMPORAL
      ====================================================== */}
      {stagedExercises.length > 0 && (
        <div className="mb-5 rounded-xl bg-white p-4 shadow-sm ring-1 ring-slate-200/60 animate-fade-in-up">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Ejercicios listos para guardar ({stagedExercises.length})
            </p>
          </div>

          <ul className="mb-4 space-y-2">
            {stagedExercises.map((item, index) => {
              const dayName =
                DIAS_SEMANA.find(
                  (day) => Number(day.value) === Number(item.dia),
                )?.label.slice(0, 3) || "?";

              return (
                <li
                  key={`${item.exercise.id}-${item.dia}-${index}`}
                  className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50 px-3 py-2 text-xs"
                >
                  <span className="flex min-w-0 items-center gap-2 pr-2 font-bold text-navy">
                    <span className="shrink-0 rounded bg-navy px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-white">
                      {dayName}
                    </span>

                    <span className="truncate">{item.exercise.nombre}</span>

                    <span className="ml-1 shrink-0 font-extrabold text-orange">
                      {item.series}×{item.reps}
                    </span>
                  </span>

                  <button
                    type="button"
                    onClick={() => handleRemoveStaged(index)}
                    className="px-2 py-1 font-bold text-slate-400 transition-colors hover:text-red-500"
                  >
                    ✕
                  </button>
                </li>
              );
            })}
          </ul>

          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-orange active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              "Guardando ejercicios..."
            ) : (
              <>
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
                    d="M5 13l4 4L19 7"
                  />
                </svg>
                Confirmar y guardar todos
              </>
            )}
          </button>
        </div>
      )}

      {/* =====================================================
          FORMULARIO DE ALTA
      ====================================================== */}
      <div className="relative z-10 rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
        <div className="grid gap-4 sm:grid-cols-2">
          {/* GRUPO MUSCULAR */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Grupo muscular
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setGroupOpen(!groupOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none transition-colors hover:border-slate-300 focus:border-orange focus:ring-1"
              >
                <span className="truncate">
                  {selectedGroup || "Selecciona..."}
                </span>

                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    groupOpen ? "rotate-180" : ""
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

              {groupOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setGroupOpen(false)}
                  />

                  <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                    {groups.map((group) => (
                      <button
                        key={group}
                        type="button"
                        onClick={() => {
                          setSelectedGroup(group);
                          setGroupOpen(false);
                        }}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${
                          selectedGroup === group
                            ? "bg-orange/10 text-orange"
                            : "text-navy hover:bg-slate-50"
                        }`}
                      >
                        {group}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* EJERCICIO */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Ejercicio
            </label>

            <div className="relative">
              <button
                type="button"
                onClick={() => setExerciseOpen(!exerciseOpen)}
                disabled={exercisesInGroup.length === 0}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none transition-colors hover:border-slate-300 focus:border-orange focus:ring-1 disabled:bg-slate-50 disabled:opacity-50"
              >
                <span className="truncate">
                  {selectedExerciseData?.nombre || "Selecciona ejercicio..."}
                </span>

                <svg
                  className={`h-4 w-4 text-slate-400 transition-transform ${
                    exerciseOpen ? "rotate-180" : ""
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

              {exerciseOpen && (
                <>
                  <div
                    className="fixed inset-0 z-40"
                    onClick={() => setExerciseOpen(false)}
                  />

                  <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                    {exercisesInGroup.map((exercise) => (
                      <button
                        key={exercise.id}
                        type="button"
                        onClick={() => {
                          setSelectedExerciseId(exercise.id);
                          setExerciseOpen(false);
                        }}
                        className={`block w-full rounded-lg px-3 py-2.5 text-left text-xs font-extrabold transition-colors ${
                          Number(selectedExerciseId) === Number(exercise.id)
                            ? "bg-orange/10 text-orange"
                            : "text-navy hover:bg-slate-50"
                        }`}
                      >
                        {exercise.nombre}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* SERIES / REPS / NOTA */}
        <div className="relative z-0 mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3">
            <div className="relative flex-1">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Series
              </label>

              <input
                type="number"
                min="1"
                value={seriesObjetivo}
                onChange={(event) => setSeriesObjetivo(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>

            <div className="relative flex-1">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Reps
              </label>

              <input
                type="number"
                min="1"
                value={repsObjetivo}
                onChange={(event) => setRepsObjetivo(event.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-center text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Nota (opcional)
            </label>

            <input
              type="text"
              placeholder="ej. 'controla la bajada'"
              value={notas}
              onChange={(event) => setNotas(event.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
            />
          </div>
        </div>

        {/* DÍAS */}
        <div className="relative z-0 mt-5 flex flex-col justify-between gap-4 border-t border-slate-200/60 pt-5 sm:flex-row sm:items-center">
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
                    className={`flex cursor-pointer items-center justify-center rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
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
            onClick={handleStageExercise}
            disabled={!canStage}
            className="shrink-0 rounded-xl border border-orange/20 bg-orange/10 px-6 py-2.5 text-xs font-extrabold text-orange transition-all hover:bg-orange/20 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            + Pre-añadir ejercicio
          </button>
        </div>
      </div>

      {/* =====================================================
          RUTINA GUARDADA
      ====================================================== */}
      <div className="relative z-0 mt-6 space-y-4">
        {entriesByDay.map(({ dia, items }) => {
          if (items.length === 0) return null;

          return (
            <div
              key={dia.value}
              className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-4 flex items-end justify-between gap-4">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                    Día {dia.value}
                  </p>

                  <p className="mt-0.5 font-display text-lg font-bold text-navy">
                    {dia.label}
                  </p>
                </div>

                <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[9px] font-extrabold uppercase tracking-wider text-slate-400">
                  {items.length}{" "}
                  {items.length === 1 ? "ejercicio" : "ejercicios"}
                </span>
              </div>

              <ul className="space-y-2">
                {items.map((item, index) => {
                  const isSelected = selectedEntryId === item.id;

                  const isMoving = movingEntryId === item.id;

                  const canMoveUp = index > 0 && !movingEntryId;

                  const canMoveDown =
                    index < items.length - 1 && !movingEntryId;

                  return (
                    <li
                      key={item.id}
                      className={`overflow-hidden rounded-xl border transition-all ${
                        isSelected
                          ? "border-orange/30 bg-orange/5 shadow-sm ring-2 ring-orange/10"
                          : "border-slate-100 bg-slate-50 hover:border-slate-200 hover:bg-slate-100"
                      }`}
                    >
                      {/* FILA PRINCIPAL: pulsar selecciona para mover */}
                      <button
                        type="button"
                        onClick={() => handleSelectForMove(item.id)}
                        className="flex w-full items-start gap-3 px-3 py-3 text-left sm:px-4"
                        aria-pressed={isSelected}
                      >
                        {/* ORDEN */}
                        <div
                          className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-xl text-xs font-extrabold ${
                            isSelected
                              ? "brand-gradient text-navy"
                              : "border border-slate-200 bg-white text-slate-400"
                          }`}
                        >
                          {String(index + 1).padStart(2, "0")}
                        </div>

                        {/* CONTENIDO */}
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:gap-3">
                            <span className="font-display text-sm font-extrabold leading-snug text-navy">
                              {item.ejercicios?.nombre}
                            </span>

                            <span className="w-fit rounded-md border border-slate-200 bg-white px-2 py-0.5 text-[11px] font-extrabold text-orange shadow-sm">
                              {item.series_objetivo} ×{" "}
                              {item.reps_objetivo ?? "?"}
                            </span>
                          </div>

                          {item.notas_entrenador && (
                            <p className="mt-1.5 text-xs font-medium italic leading-5 text-slate-400">
                              “{item.notas_entrenador}”
                            </p>
                          )}

                          {isSelected && (
                            <p className="mt-2 text-[10px] font-bold uppercase tracking-wider text-orange">
                              Seleccionado para mover
                            </p>
                          )}
                        </div>

                        {/* ACCIONES */}
                        <div
                          className="flex shrink-0 items-center gap-1.5"
                          onClick={(event) => event.stopPropagation()}
                        >
                          <button
                            type="button"
                            onClick={() => setEditingEntry(item)}
                            title="Editar ejercicio"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-400 shadow-sm transition-colors hover:border-orange/20 hover:bg-orange/10 hover:text-orange"
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
                            onClick={() => handleDelete(item.id)}
                            title="Eliminar ejercicio"
                            className="flex h-8 w-8 items-center justify-center rounded-full border border-slate-100 bg-white text-slate-300 shadow-sm transition-colors hover:border-red-100 hover:bg-red-50 hover:text-red-500"
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
                                strokeWidth="2.5"
                                d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                              />
                            </svg>
                          </button>
                        </div>
                      </button>

                      {/* CONTROLES DE REORDENACIÓN */}
                      {isSelected && (
                        <div className="border-t border-orange/10 bg-white/70 px-3 py-3 sm:px-4">
                          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                              <p className="text-[9px] font-extrabold uppercase tracking-[0.15em] text-slate-400">
                                Posición actual
                              </p>

                              <p className="mt-0.5 text-xs font-bold text-navy">
                                {index + 1} de {items.length}
                              </p>
                            </div>

                            <div className="grid grid-cols-2 gap-2 sm:flex">
                              <button
                                type="button"
                                disabled={!canMoveUp}
                                onClick={() =>
                                  handleMoveExercise(items, item.id, "up")
                                }
                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-navy transition hover:border-orange/30 hover:bg-orange/5 disabled:cursor-not-allowed disabled:opacity-30"
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
                                    strokeWidth="2.5"
                                    d="M5 15l7-7 7 7"
                                  />
                                </svg>
                                Subir
                              </button>

                              <button
                                type="button"
                                disabled={!canMoveDown}
                                onClick={() =>
                                  handleMoveExercise(items, item.id, "down")
                                }
                                className="inline-flex min-h-10 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-xs font-extrabold text-navy transition hover:border-orange/30 hover:bg-orange/5 disabled:cursor-not-allowed disabled:opacity-30"
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
                                    strokeWidth="2.5"
                                    d="M19 9l-7 7-7-7"
                                  />
                                </svg>
                                Bajar
                              </button>
                            </div>
                          </div>

                          {isMoving && (
                            <p className="mt-2 text-center text-[10px] font-bold uppercase tracking-wider text-orange sm:text-right">
                              Guardando nuevo orden…
                            </p>
                          )}
                        </div>
                      )}
                    </li>
                  );
                })}
              </ul>

              <p className="mt-3 text-[10px] font-medium leading-4 text-slate-400">
                Pulsa un ejercicio para seleccionarlo y cambiar su posición.
              </p>
            </div>
          );
        })}
      </div>

      <RoutineEntryEditModal
        entry={editingEntry}
        entries={entries}
        open={Boolean(editingEntry)}
        onClose={() => setEditingEntry(null)}
        onSaved={onChange}
      />
    </div>
  );
}
