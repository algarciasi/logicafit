import { useState } from "react";

export default function ExerciseLogItem({ clientId, routineEntry, position }) {
  const [expanded, setExpanded] = useState(false);

  const repsObj = routineEntry.reps_objetivo ?? routineEntry.reps ?? "-";

  const seriesObj = routineEntry.series_objetivo ?? routineEntry.series ?? "-";

  const numSeries =
    Number.isFinite(Number(seriesObj)) && Number(seriesObj) > 0
      ? Number(seriesObj)
      : 1;

  const [sets, setSets] = useState(() =>
    Array.from({ length: numSeries }, (_, index) => ({
      serie: index + 1,
      peso: "",
      reps: Number.isFinite(Number(repsObj)) ? String(repsObj) : "",
    })),
  );

  const ejercicio = routineEntry.ejercicios || routineEntry.ejercicio || {};

  const nombre =
    ejercicio.nombre || routineEntry.nombre_ejercicio || "Ejercicio";

  const grupo = ejercicio.grupo_muscular || routineEntry.grupo_muscular || "";

  const equipo = ejercicio.equipo || routineEntry.equipo || "";

  const notas =
    routineEntry.notas_entrenador?.trim() || routineEntry.notas?.trim() || "";

  /*
    Mostramos posición visual consecutiva (01, 02, 03...)
    para que rutinas antiguas con orden 999 no queden feas.
  */
  const displayOrder = String(position ?? routineEntry.orden ?? 1).padStart(
    2,
    "0",
  );

  const videoUrl =
    ejercicio.video_url ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      `${nombre} tecnica ejercicio`,
    )}`;

  const handlePesoChange = (index, event) => {
    const value = event.target.value;

    if (value !== "") {
      const regex = /^\d*[.,]?\d{0,2}$/;
      if (!regex.test(value)) return;

      const numberValue = Number(value.replace(",", "."));
      if (numberValue > 999) return;
    }

    setSets((current) =>
      current.map((set, setIndex) =>
        setIndex === index ? { ...set, peso: value } : set,
      ),
    );
  };

  const handleRepsChange = (index, event) => {
    const value = event.target.value;

    if (value !== "") {
      const regex = /^\d+$/;
      if (!regex.test(value)) return;

      const numberValue = Number(value);
      if (numberValue < 0 || numberValue > 99) return;
    }

    setSets((current) =>
      current.map((set, setIndex) =>
        setIndex === index ? { ...set, reps: value } : set,
      ),
    );
  };

  const handleSaveAll = () => {
    const validSets = sets.filter((set) => set.peso !== "" && set.reps !== "");

    if (validSets.length === 0) {
      return alert("Rellena al menos el peso de una serie antes de guardar.");
    }

    /*
      Aquí mantiene tu lógica actual.
      Cuando conectes el histórico real:
      await saveExerciseHistoryBatch({
        clientId,
        exerciseId: ejercicio.id,
        sets: validSets,
      })
    */
    const resumen = validSets
      .map((set) => `• Serie ${set.serie}: ${set.peso}kg x ${set.reps} reps`)
      .join("\n");

    alert(`¡Series guardadas con éxito!\n\n${resumen}`);
    setExpanded(false);
  };

  return (
    <article className="overflow-hidden rounded-[1.5rem] border border-slate-200/80 bg-white shadow-[0_6px_24px_rgba(15,23,42,0.045)] transition-shadow hover:shadow-[0_10px_30px_rgba(15,23,42,0.07)]">
      {/* =====================================================
          CABECERA DEL EJERCICIO
      ====================================================== */}
      <div className="p-4 sm:p-5">
        <div className="flex items-start gap-3 sm:gap-4">
          {/* Orden */}
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-orange/20 bg-orange/10 sm:h-11 sm:w-11">
            <span className="font-display text-sm font-extrabold text-orange">
              {displayOrder}
            </span>
          </div>

          {/* Información principal */}
          <div className="min-w-0 flex-1">
            <a
              href={videoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group block"
            >
              <div className="flex items-start gap-2">
                <h3 className="min-w-0 font-display text-[15px] font-extrabold leading-snug text-navy transition-colors group-hover:text-orange sm:text-base">
                  {nombre}
                </h3>

                <svg
                  className="mt-0.5 h-4 w-4 shrink-0 text-slate-300 transition-colors group-hover:text-orange"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                >
                  <path d="M8 5v14l11-7z" />
                </svg>
              </div>
            </a>

            {/* Meta: series, reps, grupo/equipo */}
            <div className="mt-2 flex flex-wrap items-center gap-2">
              <span className="rounded-lg bg-slate-100 px-2.5 py-1 text-[11px] font-extrabold text-navy">
                {seriesObj} × {repsObj}
              </span>

              {(grupo || equipo) && (
                <span className="text-[11px] font-semibold text-slate-400">
                  {equipo || grupo}
                </span>
              )}
            </div>

            {/* Comentario del entrenador SIEMPRE visible */}
            {notas && (
              <div className="mt-3 border-l-2 border-orange/50 pl-3">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-slate-400">
                  Indicaciones
                </p>

                <p className="mt-1 text-sm font-medium leading-5 text-slate-600">
                  {notas}
                </p>
              </div>
            )}
          </div>

          {/* Cuaderno */}
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-expanded={expanded}
            aria-label={
              expanded
                ? `Cerrar registro de ${nombre}`
                : `Registrar series de ${nombre}`
            }
            className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl transition-all active:scale-95 ${
              expanded
                ? "brand-gradient text-navy shadow-md"
                : "bg-slate-50 text-slate-400 ring-1 ring-slate-200/80 hover:bg-slate-100 hover:text-navy"
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
                strokeWidth="2"
                d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"
              />
            </svg>
          </button>
        </div>
      </div>

      {/* =====================================================
          REGISTRO DE SERIES
      ====================================================== */}
      {expanded && (
        <div className="animate-fade-in border-t border-slate-100 bg-slate-50/70 p-4 sm:p-5">
          <div className="mb-4 flex items-center justify-between gap-4">
            <div>
              <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
                Registrar series
              </p>

              <p className="mt-1 text-xs font-semibold text-slate-500">
                Introduce el peso realmente utilizado.
              </p>
            </div>

            <div className="shrink-0 rounded-lg bg-white px-2.5 py-1.5 ring-1 ring-slate-200">
              <span className="text-[11px] font-extrabold text-navy">
                Objetivo {seriesObj} × {repsObj}
              </span>
            </div>
          </div>

          <div className="mb-2 grid grid-cols-[42px_1fr_1fr] gap-2 px-1 sm:grid-cols-[56px_1fr_1fr] sm:gap-3">
            <div className="text-[10px] font-extrabold uppercase text-slate-400">
              #
            </div>
            <div className="text-[10px] font-extrabold uppercase text-slate-400">
              Kg
            </div>
            <div className="text-[10px] font-extrabold uppercase text-slate-400">
              Reps
            </div>
          </div>

          <div className="space-y-2">
            {sets.map((set, index) => (
              <div
                key={set.serie}
                className="grid grid-cols-[42px_1fr_1fr] items-center gap-2 sm:grid-cols-[56px_1fr_1fr] sm:gap-3"
              >
                <div className="flex h-10 items-center justify-center rounded-xl bg-slate-100 text-sm font-extrabold text-slate-400">
                  {set.serie}
                </div>

                <input
                  type="text"
                  inputMode="decimal"
                  aria-label={`Peso serie ${set.serie}`}
                  placeholder="Ej. 20"
                  value={set.peso}
                  onChange={(event) => handlePesoChange(index, event)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
                />

                <input
                  type="text"
                  inputMode="numeric"
                  aria-label={`Repeticiones serie ${set.serie}`}
                  placeholder={String(repsObj)}
                  value={set.reps}
                  onChange={(event) => handleRepsChange(index, event)}
                  className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
                />
              </div>
            ))}
          </div>

          <button
            type="button"
            onClick={handleSaveAll}
            className="brand-button mt-5 flex w-full items-center justify-center gap-2 rounded-xl py-3 text-sm font-extrabold"
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
                d="M5 13l4 4L19 7"
              />
            </svg>
            Guardar {numSeries > 1 ? "todas las series" : "serie"}
          </button>
        </div>
      )}
    </article>
  );
}
