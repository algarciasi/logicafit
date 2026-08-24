const CREDENTIALS = [
  'Entrenador titulado',
  'Especialista en musculación',
  'Recomposición corporal',
  'Runner experimentado',
]

const SPECIALTIES = [
  {
    icon: '🏋️',
    title: 'Musculación',
    highlight: true,
    body: 'Recomposición corporal, hipertrofia, fuerza y definición. Rutinas con progresión real y planificación seria, adaptables según evolución.',
  },
  {
    icon: '🏃',
    title: 'Running',
    body: 'Desde tu primera 5K hasta los 42K. Como corredor amateur entreno por salud, no por podio: sé lo que es disfrutar del running sin obsesionarse con cronos.',
  },
  {
    icon: '🍽️',
    title: 'Nutrición flexible',
    body: 'Macros calculados para tu objetivo y tu vida. Comer bien sin renunciar a una cena con amigos el sábado.',
  },
]

export default function About() {
  return (
    <section id="sobre-mi" className="bg-white py-20">
      <div className="mx-auto max-w-4xl px-6">
        <p className="text-center text-xs font-semibold uppercase tracking-wide text-orange-dark">
          Quién soy
        </p>

        <div className="mt-8 flex flex-col items-center gap-6 text-center sm:flex-row sm:items-start sm:text-left">
          <div className="h-28 w-28 shrink-0 overflow-hidden rounded-full bg-navy ring-4 ring-orange/20">
            <img
              src="/brand/coach.jpg"
              alt="Alberto García, entrenador de Lógica Fit"
              className="h-full w-full object-cover"
              onError={(e) => {
                e.currentTarget.style.display = 'none'
                e.currentTarget.nextElementSibling.style.display = 'flex'
              }}
            />
            <div className="hidden h-full w-full items-center justify-center text-3xl text-white">
              🎓
            </div>
          </div>
          <div>
            <h2 className="font-display text-2xl font-extrabold text-navy sm:text-3xl">
              Entrenador titulado. Corro por salud, no por medallas.
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-text-secondary">
              Soy Alberto García, titulado oficial en Entrenamiento personal de
              alto rendimiento, con formación en nutrición deportiva,
              especializado en musculación y recomposición corporal. También
              titulado en entrenamiento running y trail running. A veces
              corro carreras — no para ganar medallas, sino para mantenerme
              sano — y así sé exactamente lo que es entrenar con cabeza y
              compatibilizarlo con una vida normal. Eso es lo que aplico en
              cada plan que diseño.
            </p>

            <div className="mt-5 flex flex-wrap justify-center gap-2 sm:justify-start">
              {CREDENTIALS.map((c) => (
                <span
                  key={c}
                  className="rounded-full bg-surface-soft px-3 py-1.5 text-xs font-semibold text-navy-light"
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-16">
          <h3 className="text-center font-display text-2xl font-extrabold text-navy">
            En qué te ayudo
          </h3>
          <p className="mt-2 text-center text-sm text-text-secondary">
            Tu plan se adapta a una de estas modalidades — o las combina si tu
            objetivo lo necesita.
          </p>

          <div className="mt-8 grid gap-6 sm:grid-cols-3">
            {SPECIALTIES.map(({ icon, title, body, highlight }) => (
              <div
                key={title}
                className={`rounded-2xl border p-6 ${
                  highlight ? 'border-orange bg-orange/5' : 'border-slate-100 bg-white'
                }`}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-lg shadow-sm">
                  {icon}
                </div>
                <h4 className="mt-4 font-display font-bold text-navy">{title}</h4>
                <p className="mt-2 text-sm text-text-secondary">{body}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}