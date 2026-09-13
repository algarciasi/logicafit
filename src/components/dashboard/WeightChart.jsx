export default function WeightChart({ points }) {
  if (!points || points.length < 2) {
    return (
      <p className="rounded-2xl border border-dashed border-slate-200 px-5 py-8 text-center text-sm text-text-secondary">
        Necesitas al menos 2 registros de peso para ver la gráfica.
      </p>
    )
  }

  const values = points.map((p) => p.peso)
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 270 + 5
    const y = 80 - ((p.peso - min) / range) * 65
    return { x, y }
  })

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(' ')
  
  // Extraemos primer, último y penúltimo registro
  const first = points[0]
  const last = points[points.length - 1]
  const prev = points[points.length - 2] 

  // Calculamos ambas diferencias
  const diffTotal = (last.peso - first.peso).toFixed(1)
  const diffLast = (last.peso - prev.peso).toFixed(1)

  return (
    <div className="rounded-2xl border border-slate-100 p-4 shadow-sm bg-white">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
            Evolución de peso
          </p>
          <p className="mt-1 font-display text-2xl font-extrabold text-navy">
            {last.peso} <span className="text-base text-slate-400">kg</span>
          </p>
        </div>
        
        {/* Badges de Incremento */}
        <div className="flex gap-2">
          <div className="flex flex-col items-end">
            <span className="mb-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">Último</span>
            <span
              className={`rounded-md px-2 py-1 text-[11px] font-bold ${
                diffLast <= 0 ? 'bg-orange/10 text-orange-dark' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {diffLast > 0 ? '+' : ''}{diffLast} kg
            </span>
          </div>

          <div className="flex flex-col items-end">
            <span className="mb-1 text-[9px] font-bold uppercase tracking-wider text-slate-400">Total</span>
            <span
              className={`rounded-md px-2 py-1 text-[11px] font-bold ${
                diffTotal <= 0 ? 'bg-orange/10 text-orange-dark' : 'bg-slate-100 text-slate-500'
              }`}
            >
              {diffTotal > 0 ? '+' : ''}{diffTotal} kg
            </span>
          </div>
        </div>
      </div>

      <svg viewBox="0 0 280 90" className="mt-4 h-24 w-full">
        <polyline
          fill="none"
          stroke="#f97316"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={linePoints}
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="3" fill="#f97316" className="ring-2 ring-white" />
        ))}
      </svg>

      <div className="mt-2 flex justify-between text-[10px] font-semibold text-slate-400">
        <span>{new Date(first.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
        <span>{new Date(last.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}</span>
      </div>
    </div>
  )
}