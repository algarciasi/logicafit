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
  const first = points[0]
  const last = points[points.length - 1]
  const diff = (last.peso - first.peso).toFixed(1)

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          Evolución de peso
        </p>
        <span
          className={`rounded-full px-2 py-0.5 text-[11px] font-semibold ${
            diff <= 0 ? 'bg-orange/10 text-orange-dark' : 'bg-slate-100 text-navy-light'
          }`}
        >
          {diff > 0 ? '+' : ''}
          {diff} kg
        </span>
      </div>
      <p className="mt-1 font-display text-2xl font-extrabold text-navy">{last.peso} kg</p>

      <svg viewBox="0 0 280 90" className="mt-3 h-24 w-full">
        <polyline
          fill="none"
          stroke="#f97316"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          points={linePoints}
        />
        {coords.map((c, i) => (
          <circle key={i} cx={c.x} cy={c.y} r="3" fill="#f97316" />
        ))}
      </svg>

      <div className="flex justify-between text-[10px] text-text-secondary">
        <span>{new Date(first.created_at).toLocaleDateString('es-ES')}</span>
        <span>{new Date(last.created_at).toLocaleDateString('es-ES')}</span>
      </div>
    </div>
  )
}