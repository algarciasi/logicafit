import { useState } from 'react'

export default function ExerciseLogItem({ clientId, routineEntry }) {
  const [expanded, setExpanded] = useState(false)
  const [serie, setSerie] = useState(1)
  const [peso, setPeso] = useState('')
  const [reps, setReps] = useState('')

  // Extracción segura de datos (por si vienen de un JOIN en Supabase)
  const ejercicio = routineEntry.ejercicios || routineEntry.ejercicio || {}
  const nombre = ejercicio.nombre || routineEntry.nombre_ejercicio || 'Ejercicio'
  const equipo = ejercicio.equipo || 'Peso libre / Máquina'
  
  const seriesObj = routineEntry.series_objetivo || routineEntry.series || '-'
  const repsObj = routineEntry.reps_objetivo || routineEntry.reps || '-'

  // Si no hay video en la DB, generamos una búsqueda exacta en YouTube
  const videoUrl = ejercicio.video_url || `https://www.youtube.com/results?search_query=${encodeURIComponent(nombre + ' tecnica ejercicio')}`

  const handleSave = () => {
    if (!peso || !reps) return alert("Rellena peso y reps")
    // Aquí iría tu función real para guardar en Supabase:
    // await saveExerciseHistory({ clientId, exerciseId: ejercicio.id, serie, peso, reps })
    alert(`¡Guardado! Serie ${serie}: ${peso}kg x ${reps} reps`)
    setSerie(prev => Number(prev) + 1)
    setPeso('')
    setReps('')
  }

  return (
    <div className="mb-3 overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
      
      {/* CABECERA (RESUMEN ESTILO APP NATIVA) */}
      <div className="flex items-center gap-4 p-3 sm:p-4">
        
        {/* 1. Miniatura (Clickeable -> YouTube) */}
        <a 
          href={videoUrl} 
          target="_blank" 
          rel="noopener noreferrer" 
          className="group relative block h-14 w-14 shrink-0 overflow-hidden rounded-xl bg-slate-100 ring-1 ring-slate-200"
        >
          {ejercicio.imagen_url ? (
            <img src={ejercicio.imagen_url} alt={nombre} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110" />
          ) : (
            // Placeholder si no hay foto en tu base de datos
            <div className="flex h-full w-full items-center justify-center bg-slate-50 text-slate-300 transition-colors group-hover:bg-slate-200 group-hover:text-slate-400">
              <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
              </svg>
            </div>
          )}
          {/* Icono de Play overlay al pasar el ratón */}
          <div className="absolute inset-0 flex items-center justify-center bg-navy/40 opacity-0 transition-opacity group-hover:opacity-100">
            <svg className="h-6 w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 24 24"><path d="M8 5v14l11-7z"/></svg>
          </div>
        </a>

        {/* 2. Info Título y Equipo (Clickeable -> YouTube) */}
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

        {/* 3. Badges y Botón de Cuaderno */}
        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {/* Badge de series (Gris/Navy) */}
          <div className="hidden rounded-lg bg-slate-50 px-2.5 py-1 ring-1 ring-slate-200/60 sm:block">
            <span className="text-[11px] font-extrabold text-navy">{seriesObj} series</span>
          </div>

          {/* Botón Cuaderno (Activa el desplegable) */}
          <button
            onClick={() => setExpanded(!expanded)}
            className={`flex h-10 w-10 items-center justify-center rounded-xl transition-all active:scale-95 ${
              expanded 
                ? 'bg-orange text-white shadow-md shadow-orange/20' 
                : 'bg-slate-50 text-slate-400 ring-1 ring-slate-200/60 hover:bg-slate-100 hover:text-navy'
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
          
          <div className="mb-3 flex items-center justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Registrar serie
            </p>
            <p className="text-[11px] font-semibold text-slate-500">
              Objetivo: <span className="font-extrabold text-navy">{seriesObj} × {repsObj}</span>
            </p>
          </div>

          <div className="flex items-end gap-2 sm:gap-3">
            <div className="w-14 shrink-0">
              <label className="mb-1 ml-1 block text-[10px] font-extrabold uppercase text-slate-400">#</label>
              <input 
                type="number" 
                value={serie} 
                onChange={(e) => setSerie(e.target.value)} 
                className="h-10 w-full rounded-xl border border-slate-200 bg-white text-center text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange" 
              />
            </div>
            
            <div className="flex-1">
              <label className="mb-1 ml-1 block text-[10px] font-extrabold uppercase text-slate-400">KG</label>
              <input 
                type="number" 
                placeholder="Ej: 20" 
                value={peso} 
                onChange={(e) => setPeso(e.target.value)} 
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange" 
              />
            </div>
            
            <div className="flex-1">
              <label className="mb-1 ml-1 block text-[10px] font-extrabold uppercase text-slate-400">Reps</label>
              <input 
                type="number" 
                placeholder={repsObj.toString()} 
                value={reps} 
                onChange={(e) => setReps(e.target.value)} 
                className="h-10 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm font-bold text-navy outline-none placeholder:font-medium placeholder:text-slate-300 focus:border-orange focus:ring-1 focus:ring-orange" 
              />
            </div>

            {/* Botón Guardar Serie */}
            <button 
              onClick={handleSave}
              className="flex h-10 w-12 shrink-0 items-center justify-center rounded-xl bg-navy text-white shadow-md transition-all hover:bg-orange active:scale-95"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </button>
          </div>

        </div>
      )}
    </div>
  )
}