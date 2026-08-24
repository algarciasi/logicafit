const PLAN_DAYS = [
  { day: 'Lun', label: 'Fuerza · 40 min', done: true },
  { day: 'Mar', label: 'Vida real', muted: true },
  { day: 'Mié', label: 'Running · 5K', done: true },
  { day: 'Jue', label: 'Vida real', muted: true },
  { day: 'Vie', label: 'Fuerza · 35 min', done: true },
  { day: 'Sáb', label: 'Libre / cena', muted: true },
  { day: 'Dom', label: 'Movilidad · 15 min' },
]

export default function WeeklyPlanCard() {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-navy">Tu semana, tal cual es</p>
        <span className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-text-secondary">
          Semana 6
        </span>
      </div>

      <ul className="mt-5 space-y-2">
        {PLAN_DAYS.map(({ day, label, done, muted }) => (
          <li
            key={day}
            className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
              muted ? 'bg-transparent' : 'bg-surface-soft'
            }`}
          >
            <span className="w-10 shrink-0 font-display font-bold text-navy">{day}</span>
            <span className={`flex-1 px-3 ${muted ? 'text-text-secondary/70' : 'text-navy-light'}`}>
              {label}
            </span>
            {done && (
              <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-white">
                ✓
              </span>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-text-secondary">
        3 sesiones planificadas, no 5 a medias. Ajustado a tu horario real de esta semana.
      </p>
    </div>
  )
}