import { useState } from "react";

export default function ExerciseLogItem({ clientId, routineEntry }) {
  const [expanded, setExpanded] = useState(false);
  
  // Extraemos objetivo
  const repsObj = routineEntry.reps_objetivo || routineEntry.reps || "-";
  const seriesObj = routineEntry.series_objetivo || routineEntry.series || "-";
  
  // Calculamos cuántas filas crear (por defecto 1 si falla el número)
  const numSeries = !isNaN(seriesObj) ? Number(seriesObj) : 1;

  // Estado que genera automáticamente un array con las X series planificadas
  const [sets, setSets] = useState(() => {
    return Array.from({ length: numSeries }, (_, i) => ({
      serie: i + 1,
      peso: "",
      reps: !isNaN(repsObj) ? repsObj.toString() : "",
    }));
  });

  const ejercicio = routineEntry.ejercicios || routineEntry.ejercicio || {};
  const nombre = ejercicio.nombre || routineEntry.nombre_ejercicio || "Ejercicio";
  const equipo = ejercicio.equipo;

  const videoUrl =
    ejercicio.video_url ||
    `https://www.youtube.com/results?search_query=${encodeURIComponent(
      nombre + " tecnica ejercicio",
    )}`;

  // Interceptora para Peso adaptada a múltiples filas
  const handlePesoChange = (index, e) => {
    let val = e.target.value;
    if (val !== '') {
      const regex = /^\d*[.,]?\d{0,2}$/;
      if (!regex.test(val)) return;
      const numVal = Number(val.replace(',', '.'));
      if (numVal > 999) return;
    }
    
    const newSets = [...sets];
    newSets[index].peso = val;
    setSets(newSets);
  };

  // Interceptora para Reps adaptada a múltiples filas
  const handleRepsChange = (index, e) => {
    let val = e.target.value;
    if (val !== '') {
      const regex = /^\d+$/; // Solo enteros
      if (!regex.test(val)) return;
      const numVal = Number(val);
      if (numVal < 0 || numVal > 99) return;
    }

    const newSets = [...sets];
    newSets[index].reps = val;
    setSets(newSets);
  };

  // Guardar en bloque
  const handleSaveAll = () => {
    // Filtramos para evitar guardar series totalmente vacías
    const validSets = sets.filter(s => s.peso !== "" && s.reps !== "");
    
    if (validSets.length === 0) {
      return alert("Rellena al menos el peso de una serie antes de guardar.");
    }

    // Aquí iría tu llamada a Supabase. Ejemplo:
    // await saveExerciseHistoryBatch({ clientId, exerciseId: ejercicio.id, sets: validSets })

    const resumen = validSets.map(s => `• Serie ${s.serie}: ${s.peso}kg x ${s.reps} reps`).join('\n');
    alert(`¡Series guardadas con éxito!\n\n${resumen}`);
    
    // Opcional: Cerrar el acordeón tras guardar
    setExpanded(false);
  };

  return (
    <div className="mb-3 overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
      {/* CABECERA (RESUMEN ESTILO APP NATIVA) */}
      <div className="flex items-center gap-4 p-3 sm:p-4">
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200"
        >
          {ejercicio.imagen_url ? (
            <img
              src={ejercicio.imagen_url}
              alt={nombre}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300 transition-colors group-hover:bg-slate-200 group-hover:text-slate-400">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center bg-navy/40 opacity-0 transition-opacity group-hover:opacity-100">
            <svg className="h-6 w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          </div>
        </a>

        <div className="min-w-0 flex-1">
          <a href={videoUrl} target="_blank" rel="noopener noreferrer" className="block truncate">
            <h3 className="truncate font-display text-sm font-extrabold text-navy transition-colors hover:text-orange sm:text-base">
              {nombre}
            </h3>
            <p className="truncate text-[11px] font-semibold text-slate-400 sm:text-xs">
              {equipo}
            </p>
          </a>
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          <div className="hidden rounded-lg bg-slate-50 px-2.5 py-1 ring-1 ring-slate-200/60 sm:block">
            <span className="text-[11px] font-extrabold text-navy">
              {seriesObj} × {repsObj}
            </span>
          </div>

          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95 ${
              expanded
                ? "bg-orange text-white shadow-md shadow-orange/20"
                : "bg-slate-50 text-slate-400 ring-1 ring-slate-200/60 hover:bg-slate-100 hover:text-navy"
            }`}
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
          </button>
        </div>
      </div>

      {/* ZONA DESPLEGABLE: APUNTAR PESOS (Aparece al tocar el cuaderno) */}
      {expanded && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-4 animate-fade-in">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Registrar series
            </p>
            <p className="text-[11px] font-semibold text-slate-500">
              Objetivo:{" "}
              <span className="font-extrabold text-navy">
                {seriesObj} × {repsObj}
              </span>
            </p>
          </div>

          {/* CABECERA DE COLUMNAS */}
          <div className="mb-2 flex gap-2 px-1 sm:gap-3">
            <div className="w-10 shrink-0 text-[10px] font-extrabold uppercase text-slate-400 sm:w-14">#</div>
            <div className="flex-1 text-[10px] font-extrabold uppercase text-slate-400">KG</div>
            <div className="flex-1 text-[10px] font-extrabold uppercase text-slate-400">Reps</div>
          </div>

          {/* LISTA AUTOMÁTICA DE SERIES */}
          <div className="space-y-2">
            {sets.map((set, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                
                {/* Número de serie (Fijo) */}
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-100 text-sm font-extrabold text-slate-400 sm:w-14">
                  {set.serie}
                </div>

                {/* Input Peso */}
                <div className="flex-1">
                  <input
                    type="text"
                    inputMode="decimal"
                    placeholder="Ej: 20.5"
                    value={set.peso}
                    onChange={(e) => handlePesoChange(index, e)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>

                {/* Input Reps */}
                <div className="flex-1">
                  <input
                    type="text"
                    inputMode="numeric"
                    placeholder={repsObj.toString()}
                    value={set.reps}
                    onChange={(e) => handleRepsChange(index, e)}
                    className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange"
                  />
                </div>
              </div>
            ))}
          </div>

          {/* BOTÓN ENVIAR BLOQUE ENTERO */}
          <button
            onClick={handleSaveAll}
            className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-navy py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-orange active:scale-95"
          >
            <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
            </svg>
            Guardar {numSeries > 1 ? 'todas las series' : 'serie'}
          </button>
        </div>
      )}
    </div>
  );
}