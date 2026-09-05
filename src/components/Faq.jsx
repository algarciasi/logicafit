import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: '¿Funciona de verdad un entrenador online?',
    a: 'Sí. Hablamos por WhatsApp para resolver dudas al momento, te reviso los ejercicios por vídeo y ajusto tu plan cada semana. Tienes acompañamiento real conmigo. No te voy a dar PDF y me voy a olvidar de ti.',
  },
  {
    q: 'Soy principiante total, ¿es para mí?',
    a: 'Especialmente es para ti. La biomecánica y la técnica es muy importante tanto para evitar lesiones como para mejorar fisicamente. Te enseñare a hacer los ejercicios sin riesgo y con criterio.',
  },
  {
    q: 'No tengo gimnasio, ¿puedo entrenar en casa?',
    a: 'Sí aunque no es lo óptimo. Adapto tu plan según las herramientas de las que dispongas. Lo importante es que el plan esté bien hecho y lo sigas.',
  },
  {
    q: '¿Voy a pasar hambre con la dieta?',
    a: 'No. Se elabora dietas con macronutrientes flexibles ajustados a tu vida real, no hay alimentos prohibidos (solo cantidades prohibidas). Si no puedes mantenerlo a largo plazo, no sirve de nada.',
  },
  {
    q: '¿Y si no me convence?',
    a: 'Tienes 14 días de garantía. Si no encajamos, te devuelvo cada euro, sin preguntas.',
  },
]

function FaqItem({ q, a, index }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-6">
      <button
        onClick={() => setOpen((v) => !v)}
        className="group flex w-full items-center justify-between text-left focus:outline-none"
        aria-expanded={open}
      >
        <span className="font-display text-lg font-bold text-navy transition-colors group-hover:text-orange">
          {index + 1}. {q}
        </span>
        <span
          className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-surface-soft transition-transform duration-300 ${
            open ? 'rotate-180 bg-orange/10 text-orange' : 'text-navy'
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </button>
      {/* Animación fluida de apertura */}
      <div 
        className={`grid transition-all duration-300 ease-in-out ${
          open ? 'grid-rows-[1fr] opacity-100 mt-4' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <p className="text-base leading-relaxed text-text-secondary pr-12">
            {a}
          </p>
        </div>
      </div>
    </div>
  )
}

export default function Faq() {
  return (
    <section className="mx-auto max-w-4xl px-6 py-20">
      <h2 className="font-display text-4xl font-extrabold tracking-tight text-navy sm:text-5xl lg:text-6xl max-w-2xl">
        Te resuelvo las posibles dudas que puedas tener.
      </h2>

      <div className="mt-12 border-t border-slate-200">
        {FAQ_ITEMS.map((item, index) => (
          <FaqItem key={item.q} q={item.q} a={item.a} index={index} />
        ))}
      </div>
    </section>
  )
}