export default function PricingCard({
  icon,
  name,
  tagline,
  audience,
  price,
  billingNote,
  features,
  featured = false,
  badge,
  ctaLabel = 'Empezar',
}) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-7 transition ${
        featured
          ? 'border-orange bg-white shadow-2xl shadow-orange/15 md:-translate-y-3 md:scale-[1.03]'
          : 'border-slate-200 bg-white'
      }`}
    >
      {badge && (
        <span
          className={`absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full px-4 py-1 text-xs font-bold shadow-sm ${
            featured ? 'bg-orange text-white' : 'bg-navy text-white'
          }`}
        >
          {badge}
        </span>
      )}

      <div
        className={`flex h-10 w-10 items-center justify-center rounded-xl text-lg ${
          featured ? 'bg-orange/10' : 'bg-surface-soft'
        }`}
      >
        {icon}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-navy">{name}</h3>
      <p className="mt-1 text-sm text-orange-dark">{tagline}</p>
      {audience && <p className="mt-2 text-xs text-text-secondary">{audience}</p>}

      <div className="mt-5">
        <span className="font-display text-3xl font-extrabold text-navy">{price}</span>
        <span className="text-sm text-text-secondary">€/mes</span>
        {billingNote && <p className="mt-1 text-[11px] text-text-secondary">{billingNote}</p>}
      </div>

      <ul className="mt-6 flex-1 space-y-3 text-sm text-navy-light">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-2">
            <span className="mt-0.5 text-orange">✓</span>
            <span>{f}</span>
          </li>
        ))}
      </ul>

      <a
        href="#contacto"
        className={`mt-7 rounded-full px-6 py-3 text-center text-sm font-semibold transition ${
          featured
            ? 'bg-orange text-white hover:bg-orange-dark'
            : 'bg-surface-soft text-navy hover:bg-slate-200'
        }`}
      >
        {ctaLabel}
      </a>
    </div>
  )
}