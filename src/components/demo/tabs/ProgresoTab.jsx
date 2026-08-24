const WEIGHT_POINTS = [64, 63.6, 63.2, 62.9, 62.7, 62.5]
const LABELS = ['5 abr', '', '', '19 abr', '', '3 may']

export default function ProgresoTab() {
  const max = Math.max(...WEIGHT_POINTS)
  const min = Math.min(...WEIGHT_POINTS)
  const range = max - min || 1

  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold text-navy">Tu progreso</p>
        <span className="rounded-full bg-surface-soft px-3 py-1 text-[11px] font-semibold text-text-secondary">
          5 abr — 13 jun
        </span>
      </div>

      <div className="mt-4 grid grid-cols-3 gap-3 text-center">
        <div className="rounded-2xl border border-slate-100 p-3">
          <p className="font-display text-lg font-extrabold text-navy">10</p>
          <p className="text-[11px] text-text-secondary">Sesiones</p>
        </div>
        <div className="rounded-2xl border border-slate-100 p-3">
          <p className="font-display text-lg font-extrabold text-navy">7.6</p>
          <p className="text-[11px] text-text-secondary">Esfuerzo medio</p>
        </div>
        <div className="rounded-2xl border border-slate-100 p-3">
          <p className="font-display text-lg font-extrabold text-navy">7.8</p>
          <p className="text-[11px] text-text-secondary">Motivación</p>
        </div>
      </div>

      <div className="mt-4 rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Peso corporal
          </p>
          <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[11px] font-semibold text-orange-dark">
            -1.5 kg
          </span>
        </div>
        <p className="mt-1 font-display text-2xl font-extrabold text-navy">62.5 kg</p>

        <svg viewBox="0 0 280 90" className="mt-3 h-20 w-full">
          <polyline
            fill="none"
            stroke="#f97316"
            strokeWidth="2.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            points={WEIGHT_POINTS.map((w, i) => {
              const x = (i / (WEIGHT_POINTS.length - 1)) * 270 + 5
              const y = 80 - ((w - min) / range) * 65
              return `${x},${y}`
            }).join(' ')}
          />
          {WEIGHT_POINTS.map((w, i) => {
            const x = (i / (WEIGHT_POINTS.length - 1)) * 270 + 5
            const y = 80 - ((w - min) / range) * 65
            return <circle key={i} cx={x} cy={y} r="3" fill="#f97316" />
          })}
        </svg>
        <div className="flex justify-between text-[10px] text-text-secondary">
          {LABELS.map((l, i) => (
            <span key={i}>{l}</span>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-orange-light bg-orange/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-dark">
          Tu última revisión
        </p>
        <p className="mt-1 font-display text-sm font-bold text-navy">
          Lee tu informe M2 · 3 de mayo
        </p>
      </div>
    </div>
  )
}