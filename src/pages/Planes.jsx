import Faq from '../components/Faq'

export default function Planes() {
  return (
    <div className="bg-white">
      {/* CABECERA */}
      <section className="mx-auto max-w-3xl px-6 pb-12 pt-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange">
          Entrenamiento online
        </p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-navy">
          Elige cómo quieres avanzar
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Puedes hacerlo conmigo o seguir el método por tu cuenta.
        </p>
      </section>

      <section className="mx-auto max-w-2xl px-6">
        {/* TARJETA PRINCIPAL: Entrenamiento Personal */}
        <div className="relative rounded-3xl border border-orange/20 bg-white p-8 shadow-sm ring-1 ring-slate-100 sm:p-10">
          {/* Acento superior sutil */}
          <div className="absolute inset-x-0 -top-px mx-auto h-1 w-24 rounded-t-3xl bg-orange" />
          
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h2 className="font-display text-2xl font-bold text-navy">
                Entrenamiento personal online
              </h2>
              <p className="mt-2 text-slate-600">
                Un plan pensado para ti, que vamos ajustando juntos según avances.
              </p>
            </div>
            <div className="shrink-0 whitespace-nowrap text-left sm:text-right">
              <span className="text-4xl font-extrabold text-navy">50 €</span>
              <span className="text-slate-500">/mes</span>
            </div>
          </div>

          <ul className="mt-8 grid gap-4 text-sm text-slate-700 sm:grid-cols-2">
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Plan adaptado a ti y a tus horarios
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Seguimiento individual conmigo
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Ajustes según vayas progresando
            </li>
            <li className="flex items-center gap-3">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Revisión de tu técnica en vídeo
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Contacto directo para resolver dudas</span>
            </li>
            <li className="flex items-start gap-3">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              <span>Pautas de alimentación flexibles</span>
            </li>
            <li className="flex items-center gap-3 sm:col-span-2">
              <svg className="h-5 w-5 text-orange shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Acceso completo a Lógica Fit
            </li>
          </ul>

          <div className="mt-10 flex flex-col items-center">
            <a 
              href="https://wa.me/34678951544?text=Hola!%20Me%20gustaria%20conocer%20el%20m%C3%A9todo%20de%20Entrenamiento%20Personal"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block w-full rounded-full bg-orange px-8 py-4 text-center text-sm font-semibold text-white transition-colors hover:bg-orange/90 sm:w-auto"
            >
              Quiero empezar contigo
            </a>
            <p className="mt-4 text-xs text-slate-500">
              Trabajo con pocas personas a la vez para poder hacer un seguimiento de verdad.
            </p>
          </div>
        </div>

        {/* BLOQUE SECUNDARIO: A tu ritmo */}
        <div className="mt-6 flex flex-col justify-between gap-6 rounded-2xl bg-slate-50 p-6 sm:flex-row sm:items-center sm:p-8">
          <div>
            <h3 className="font-display text-lg font-bold text-navy">
              ¿Prefieres hacerlo por tu cuenta?
            </h3>
            <p className="mt-1 text-sm text-slate-600">
              <span className="font-semibold text-navy">A tu ritmo · 20 €/mes.</span> Todo lo que necesitas para entrenar por tu cuenta, sin seguimiento individual.
            </p>
          </div>
          <a 
            href="https://wa.me/34678951544?text=Hola!%20Me%20gustaria%20empezar%20mi%20cambio%20fisico%20a%20Mi%20Ritmo"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block shrink-0 rounded-full border border-slate-300 bg-white px-6 py-2.5 text-center text-sm font-semibold text-navy transition-colors hover:bg-slate-100"
          >
            Entrenar a mi ritmo
          </a>
        </div>

        {/* GARANTÍA */}
        <div className="mt-10 flex items-start justify-center gap-3 text-center sm:items-center sm:text-left">
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50 text-lg">
            🛡️
          </span>
          <div>
            <p className="text-sm font-semibold text-navy">
              14 días o te devuelvo el dinero
            </p>
            <p className="text-sm text-slate-500">
              Si el método no te convence durante los primeros 14 días, te devuelvo el dinero.
            </p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <div className="mt-16">
        <Faq />
      </div>

      {/* CONTACTO */}
      <section id="contacto" className="mx-auto max-w-3xl px-6 pb-20 pt-10 text-center">
        <div className="rounded-3xl bg-navy px-8 py-12">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            ¿Aún tienes dudas?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
            Cuéntame tu situación por WhatsApp y te digo sin compromiso qué
            plan te encaja mejor — o si ninguno te encaja, también.
          </p>
          <a
            href="https://wa.me/34678951544?text=Hola!%20Me%20gustar%C3%ADa%20contarte%20mi%20caso"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Hablar con Alberto
          </a>
        </div>
      </section>
    </div>
  )
}