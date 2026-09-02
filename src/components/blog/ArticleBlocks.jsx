import { Link } from 'react-router-dom'

// 1. NOTA DEL ENTRENADOR (CoachNote)
export function CoachNote({ title = "Lo que hago yo", children }) {
  return (
    <div className="my-10 border-l-2 border-navy bg-slate-50 p-6 sm:p-8">
      <p className="mb-3 text-xs font-bold uppercase tracking-widest text-navy">{title}</p>
      <div className="text-base italic leading-relaxed text-slate-700">
        {children}
      </div>
    </div>
  )
}

// 2. VÍDEO DE EJERCICIO (ExerciseVideo)
export function ExerciseVideo({ videoUrl, poster, caption }) {
  return (
    <figure className="my-10">
      <div className="aspect-video w-full overflow-hidden rounded-sm bg-slate-100">
        {videoUrl ? (
          <video 
            controls 
            poster={poster} 
            className="h-full w-full object-cover"
            preload="none"
          >
            <source src={videoUrl} type="video/mp4" />
            Tu navegador no soporta el formato de vídeo.
          </video>
        ) : (
          <img src={poster} alt="Miniatura del vídeo" className="h-full w-full object-cover" />
        )}
      </div>
      {caption && <figcaption className="mt-3 text-sm text-slate-500">{caption}</figcaption>}
    </figure>
  )
}

// 3. TABLA DE RUTINA (RoutineTable)
export function RoutineTable({ headers, rows }) {
  return (
    <div className="my-10 w-full overflow-x-auto">
      <table className="w-full text-left text-sm text-slate-600">
        <thead className="border-b border-slate-900 text-xs font-semibold uppercase text-navy">
          <tr>
            {headers.map((h, i) => <th key={i} className="py-3 pr-4">{h}</th>)}
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {rows.map((row, i) => (
            <tr key={i}>
              {row.map((cell, j) => (
                <td key={j} className={`py-4 pr-4 ${j === 0 ? 'font-medium text-navy' : ''}`}>
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

// 4. AUTOR Y CTA (Se usa al final del artículo)
export function ArticleFooter() {
  return (
    <div className="mt-16 border-t-2 border-slate-900 pt-10">
      <div className="flex flex-col gap-6 sm:flex-row sm:items-center">
        <div className="h-20 w-20 shrink-0 overflow-hidden rounded-full bg-slate-100">
          <img src="/brand/alberto-gym.jpg" alt="Alberto, Entrenador Personal" className="h-full w-full object-cover object-top" />
        </div>
        <div>
          <p className="font-display text-lg font-bold text-navy">Alberto</p>
          <p className="text-sm font-medium text-slate-500">Entrenador personal · Lógica Fit</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-600">
            Entreno desde hace más de 20 años y sigo aprendiendo. En Lógica Fit intento explicar entrenamiento y nutrición deportiva sin convertirlo todo en algo más complicado de lo necesario.
          </p>
          <Link to="/conoceme" className="mt-3 inline-block text-sm font-semibold text-orange hover:underline">
            Conóceme →
          </Link>
        </div>
      </div>

      <div className="mt-16 rounded-sm bg-slate-50 p-8 text-center sm:p-12">
        <p className="font-display text-2xl font-bold text-navy">¿Necesitas algo adaptado a ti?</p>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-slate-600">
          Puedes encontrar miles de rutinas y dietas tanto en reels de gurús como en IAs e internet. El problema normalmente no es encontrar otra rutina o dieta, sino saber cuál encaja contigo y cómo ir ajustándola.
        </p>
        <div className="mt-8 flex flex-col justify-center gap-4 sm:flex-row">
          <a
            href="https://wa.me/34678951544?text=Hola!%20He%20le%C3%ADdo%20tu%20historia%20y%20me%20gustar%C3%ADa%20contarte%20mi%20caso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-whatsapp/25 transition hover:brightness-95 sm:w-auto"
          >
            Hablar con Alberto
          </a>
        </div>
      </div>
    </div>
  )
}