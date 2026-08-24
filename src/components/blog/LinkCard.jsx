export default function LinkCard({ title, source, blurb, url }) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group flex flex-col rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-orange-light hover:shadow-md"
    >
      <div className="flex items-start justify-between gap-3">
        <p className="font-display font-bold text-navy group-hover:text-orange-dark">{title}</p>
        <span className="mt-0.5 shrink-0 text-orange">↗</span>
      </div>
      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        {source}
      </p>
      <p className="mt-2 text-sm text-navy-light">{blurb}</p>
    </a>
  )
}