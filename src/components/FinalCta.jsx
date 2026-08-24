export default function FinalCta() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-4xl gap-6 px-6 sm:grid-cols-2">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-surface-soft px-8 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-whatsapp text-2xl text-white">
            💬
          </span>
          <h3 className="font-display text-lg font-bold text-navy">
            ¿Aún tienes dudas?
          </h3>
          <p className="text-sm text-text-secondary">
            Cuéntame tu situación por WhatsApp y te digo sin compromiso qué
            plan te encaja mejor.
          </p>
          <a
            href="https://wa.me/"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Hablar por WhatsApp
          </a>
        </div>

        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-surface-soft px-8 py-10 text-center">
          <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-2xl text-white">
            🏆
          </span>
          <h3 className="font-display text-lg font-bold text-navy">
            Empieza gratis ahora mismo
          </h3>
          <p className="text-sm text-text-secondary">
            Calcula tus calorías y macros exactos con mi calculadora premium.
            Sin registro, sin email, sin trampas.
          </p>
          <a
            href="/calculadora"
            className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-dark"
          >
            Ir a la calculadora gratuita →
          </a>
        </div>
      </div>
    </section>
  )
}