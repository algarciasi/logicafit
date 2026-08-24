import { formatPace, formatSecondsToTime } from '../../lib/running'

export default function RunningResults({ pace, predictions, knownLabel }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6">
      <div className="text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
          Tu ritmo estimado
        </p>
        <p className="mt-1 font-display text-3xl font-extrabold text-navy">
          {formatPace(pace)}
        </p>
        <p className="mt-1 text-xs text-text-secondary">basado en tu marca de {knownLabel}</p>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {predictions.map((p) => (
          <div key={p.label} className="rounded-xl bg-surface-soft p-3 text-center">
            <p className="text-[11px] font-semibold text-text-secondary">{p.label}</p>
            <p className="mt-1 font-display text-base font-bold text-navy">
              {formatSecondsToTime(p.seconds)}
            </p>
          </div>
        ))}
      </div>

      <p className="mt-4 text-center text-[11px] text-text-secondary">
        Predicción orientativa (fórmula de Riegel). El resultado real depende
        de tu entrenamiento específico para esa distancia.
      </p>
    </div>
  )
}