export default function BrowserFrame({ children, compact = false }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-2 border-b border-slate-100 bg-surface-soft px-4 py-3">
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="h-2.5 w-2.5 rounded-full bg-slate-300" />
        <span className="ml-3 rounded-full bg-white px-3 py-1 text-[11px] text-text-secondary ring-1 ring-slate-200">
          app.logicafit.com
        </span>
      </div>
      <div className={compact ? 'p-4' : 'p-6'}>{children}</div>
    </div>
  )
}