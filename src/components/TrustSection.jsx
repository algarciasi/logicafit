const POINTS = [
  {
    icon: '🎓',
    title: 'Formación real por APTA VITAL SPORT',
    body: 'Titulado oficial en entrenamiento de alto rendimiento, Máster en nutrición deportiva. No creo planes genéricos.',
    qr: true,
  },
  {
    icon: '🛡️',
    title: 'El riesgo lo asumo yo',
    body: 'Garantía de 14 días. Si no encajamos, te devuelvo cada euro sin preguntas. No tienes nada que perder por probar.',
  },
  {
    icon: '🌱',
    title: 'Eres de los primeros, no un número más',
    body: 'Estoy empezando el servicio online y dedico tiempo real a cada plaza. Cuando cierre los primeros casos, serán los tuyos los que aparezcan aquí.',
  },
]

export default function TrustSection() {
  return (
    <section id="casos" className="bg-surface-soft py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
          Antes de que decidas
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Aún no tengo casos online que enseñarte
        </h2>
        <p className="mt-4 text-text-secondary">
          Prefiero decírtelo claro a inventarte historias. Esto es lo que sí
          puedo ofrecerte mientras se escriben los primeros casos reales.
        </p>
      </div>

      <div className="mx-auto mt-12 grid max-w-5xl gap-6 px-6 sm:grid-cols-3">
        {POINTS.map(({ icon, title, body, qr }) => (
          <div key={title} className="rounded-2xl border border-slate-100 bg-white p-6 text-center">
            <div className="mx-auto flex h-11 w-11 items-center justify-center rounded-xl bg-orange/10 text-xl">
              {icon}
            </div>
            <h3 className="mt-4 font-display font-bold text-navy">{title}</h3>
            <p className="mt-2 text-sm text-text-secondary">{body}</p>

            {qr && (
              <div className="mx-auto mt-4 flex w-fit flex-col items-center gap-1.5 rounded-xl border border-slate-100 bg-surface-soft px-4 py-3">
                <img
                  src="/brand/qr-titulo.png"
                  alt="Código QR para verificar la titulación oficial"
                  className="h-16 w-16"
                />
                <p className="text-[10px] font-medium text-text-secondary">
                  Escanea para verificar mi título
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  )
}