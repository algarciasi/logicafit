const TOTAL_SPOTS = 20

export default function FounderSpots({ taken = 0 }) {
  const left = TOTAL_SPOTS - taken
  const pct = Math.round((taken / TOTAL_SPOTS) * 100)

  return (
    <div className="mx-auto max-w-2xl rounded-2xl border border-orange-light bg-orange/5 px-6 py-5">
      <div className="flex items-center justify-between gap-4 text-sm">
        <p className="font-display font-bold text-navy">
          {left} plazas de fundador disponibles
        </p>
        <span className="whitespace-nowrap text-xs font-semibold text-orange-dark">
          {taken}/{TOTAL_SPOTS}
        </span>
      </div>
      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-soft">
        <div
          className="h-full rounded-full bg-orange transition-all"
          style={{ width: `${pct}%` }}
        />
      </div>
      <p className="mt-3 text-xs text-text-secondary">
        Soy nuevo dando el servicio online y quiero dedicar tiempo real a los
        primeros clientes. Por eso limito las plazas de lanzamiento a este
        precio — cuando se cubran, el precio sube para los siguientes.
      </p>
    </div>
  )
}
