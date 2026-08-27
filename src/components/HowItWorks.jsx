const ITEMS = [
  {
    icon: '💬',
    title: 'Soporte real por WhatsApp',
    body: 'Resuelve tus dudas al momento. Te contesto yo, detrás de Lógica Fit no hay nadie más.',
  },
  {
    icon: '🏋️',
    title: 'Entrenamiento personalizado',
    body: 'Plan adaptado a tu nivel, tu equipamiento y tu objetivo real.',
  },
  {
    icon: '🥗',
    title: 'Nutrición flexible',
    body: 'Macros ajustados a tus gustos y horarios, no una lista de prohibiciones.',
  },
  {
    icon: '📈',
    title: 'Seguimiento constante',
    body: 'Reviso tu progreso y ajusto el plan cada semana, no cada 3 meses.',
  },
]

export default function HowItWorks() {
  return (
    <section id="metodo" className="bg-surface-soft py-20">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Así trabajo
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Un plan que se adapta a ti, no al revés
          </h2>
          <p className="mt-4 text-text-secondary">
            Te acompaño de verdad, semana a semana.
            No hay nadie mas detrás de Lógica Fit
          </p>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {ITEMS.map(({ icon, title, body }) => (
            <div
              key={title}
              className="rounded-2xl border border-slate-100 bg-white p-6 transition hover:border-orange-light hover:shadow-md"
            >
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-xl">
                {icon}
              </div>
              <h3 className="mt-4 font-display font-bold text-navy">{title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}