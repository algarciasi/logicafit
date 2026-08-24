export default function InicioTab() {
  return (
    <div>
      <p className="font-display text-lg font-bold text-navy">Hola, Marina 👋</p>

      <div className="mt-4 rounded-2xl bg-gradient-to-br from-navy to-navy-light p-5 text-white">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-light">
              Próximo entreno
            </p>
            <p className="mt-1 font-display text-base font-bold">
              Sesión 3 — Pierna · Glúteo
            </p>
          </div>
          <span className="text-2xl">→</span>
        </div>
        <div className="mt-4">
          <div className="flex items-center justify-between text-[11px] text-slate-300">
            <span>Progreso del microciclo</span>
            <span>2/4</span>
          </div>
          <div className="mt-1.5 h-1.5 w-full overflow-hidden rounded-full bg-white/20">
            <div className="h-full w-1/2 rounded-full bg-orange" />
          </div>
        </div>
      </div>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Peso registrado
          </p>
          <p className="mt-1 font-display text-xl font-extrabold text-navy">62.5 kg</p>
          <p className="text-[11px] text-orange-dark">Último: 10 may</p>
        </div>
        <div className="rounded-2xl border border-slate-100 p-4">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Última revisión
          </p>
          <p className="mt-1 font-display text-sm font-bold text-navy">Informe M2</p>
          <p className="text-[11px] text-text-secondary">3 may</p>
        </div>
      </div>

      <div className="mt-3 rounded-2xl border border-slate-100 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          Macros de hoy
        </p>
        <p className="mt-1 font-display text-xl font-extrabold text-navy">2.200 kcal</p>
        <div className="mt-3 flex gap-2 text-center text-[11px] font-semibold">
          <div className="flex-1 rounded-xl bg-orange/10 py-2 text-orange-dark">130g<br/>Prot</div>
          <div className="flex-1 rounded-xl bg-amber-100 py-2 text-amber-700">240g<br/>Carbs</div>
          <div className="flex-1 rounded-xl bg-indigo-100 py-2 text-indigo-700">65g<br/>Grasas</div>
        </div>
      </div>
    </div>
  )
}