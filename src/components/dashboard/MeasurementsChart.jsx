import { useState } from 'react'
import { MEASUREMENT_FIELDS } from '../../lib/notes'

function ChartBody({ points, metric, unit }) {
  const values = points.map((p) => p[metric])
  const max = Math.max(...values)
  const min = Math.min(...values)
  const range = max - min || 1

  const coords = points.map((p, i) => {
    const x = (i / (points.length - 1)) * 270 + 5
    const y = 80 - ((p[metric] - min) / range) * 65
    return { x, y }
  })

  const linePoints = coords.map((c) => `${c.x},${c.y}`).join(' ')
  const first = points[0]
  const last = points[points.length - 1]
  const diff = (last[metric] - first[metric]).toFixed(1)

  return (
    <div>
      <div className="mt-3 flex items-baseline justify-between">
        <p className="font-display text-2xl font-extrabold text-navy">
          {last[metric]} {unit}
        </p>
        <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[11px] font-semibold text-orange-dark">
          {diff > 0 ? '+' : ''}
          {diff} {unit}
        </span>
      </div>

      <svg viewBox="0 0 280 90" className="mt-2 h-24 w-full">
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

export default function MeasurementsChart({ entries }) {
  const [metric, setMetric] = useState('peso')
  const field = MEASUREMENT_FIELDS.find((f) => f.key === metric)
  const points = entries.filter((e) => e[metric] !== null && e[metric] !== undefined)

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          Evolución
        </p>
        <select
          value={metric}
          onChange={(e) => setMetric(e.target.value)}
          className="rounded-full border border-slate-200 px-2.5 py-1 text-xs text-navy"
        >
          {MEASUREMENT_FIELDS.map((f) => (
            <option key={f.key} value={f.key}>
              {f.label}
            </option>
          ))}
        </select>
      </div>

      {points.length < 2 ? (
        <p className="mt-6 text-center text-xs text-text-secondary">
          Necesitas al menos 2 registros de "{field.label}" para ver la gráfica.
        </p>
      ) : (
        <ChartBody points={points} metric={metric} unit={field.unit} />
      )}
    </div>
  )
}