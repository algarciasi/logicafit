const EXERCISES = [
  {
    icon: '🏋️',
    name: 'Sentadilla con barra',
    scheme: 'Top set 1×5 @85-88% + back-off 2×8 @70%',
    tip: 'Profundidad cómoda, rodillas en línea con el pie.',
  },
  {
    icon: '🧱',
    name: 'Press banca mancuernas',
    scheme: '3×10 · última serie dropset -30%',
    tip: 'Escápulas retraídas, recorrido completo.',
  },
  {
    icon: '💥',
    name: 'Peso muerto rumano',
    scheme: 'Top set 1×6 + 2×8 tempo 3-1-1',
    tip: 'Barra cerca del cuerpo, cadera atrás.',
  },
  {
    icon: '🔗',
    name: 'Remo polea + Face pulls',
    scheme: 'Superserie 3×12 / 3×15',
    tip: 'Escápulas atrás y abajo, sin encoger hombros.',
  },
  {
    icon: '🔥',
    name: 'Press militar de pie',
    scheme: '1×5 @RPE8 + back-off 2×10 @60-65%',
    tip: 'Core firme, sin arquear lumbar.',
  },
  {
    icon: '💪',
    name: 'Curl Z + Fondos banco',
    scheme: 'Superserie 3×12 / 3×15',
    tip: 'Cierre metabólico, bombeo final.',
  },
  {
    icon: '🧠',
    name: 'Plancha + arrastre lateral',
    scheme: '3×10 por lado',
    tip: 'Cadera estable, respiración controlada.',
  },
]

export default function EntrenoTab() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="font-display text-lg font-bold text-navy">Sesión 3 — Pierna · Glúteo</p>
        <span className="rounded-full bg-orange/10 px-2.5 py-1 text-[11px] font-semibold text-orange-dark">
          7 ejercicios
        </span>
      </div>

      <ul className="mt-4 space-y-2">
        {EXERCISES.map((ex, i) => (
          <li key={ex.name} className="flex gap-3 rounded-2xl border border-slate-100 p-3">
            <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-soft text-sm">
              {ex.icon}
            </span>
            <div className="min-w-0">
              <p className="font-display text-sm font-bold text-navy">
                {i + 1}. {ex.name}
              </p>
              <p className="text-[11px] text-orange-dark">{ex.scheme}</p>
              <p className="mt-0.5 text-[11px] text-text-secondary">{ex.tip}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}