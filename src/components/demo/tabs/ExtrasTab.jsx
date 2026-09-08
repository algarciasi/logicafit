export default function ExtrasTab() {
  return (
    <div className="flex flex-col gap-5">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-orange">Material adicional</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">Extras</h2>
      </div>

      <div className="flex flex-col items-center justify-center rounded-[1.5rem] bg-white px-5 py-12 text-center shadow-sm ring-1 ring-slate-100">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-orange/10">
          <svg className="h-6 w-6 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>
        <p className="mt-4 font-display text-base font-bold text-navy">En construcción</p>
        <p className="mt-2 max-w-[220px] text-[11px] text-slate-400">
          Material adicional para tu entrenamiento, muy pronto.
        </p>
      </div>
    </div>
  )
}