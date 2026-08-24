export default function PricingCard({
  icon,
  name,
  tagline,
  price,
  features,
  featured = false,
  badge,
}) {
  return (
    <div
      className={`relative flex h-full flex-col rounded-2xl border p-7 ${
        featured
          ? 'border-orange bg-white shadow-xl shadow-orange/10'
          : 'border-slate-200 bg-white'
      }`}
    >
      {badge && (
        <span className="absolute -top-3 left-1/2 -translate-x-1/2 whitespace-nowrap rounded-full bg-orange px-4 py-1 text-xs font-bold text-white shadow-sm">
          {badge}
        </span>
      )}

      <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-surface-soft text-lg">
        {icon}
      </div>

      <h3 className="mt-4 font-display text-lg font-bold text-navy">{name}</h3>
      <p className="mt-1 text-sm text-orange-dark">{tagline}</p>

      <p className="mt-5">
        <span className="font-display text-3xl font-extrabold text-navy">{price}</span>
        <span className="text-sm text-text-secondary">€/mes</span>
      </p>

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
        Empezar
      </a>
    </div>
  )
}
