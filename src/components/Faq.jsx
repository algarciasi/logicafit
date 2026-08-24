import { useState } from 'react'

const FAQ_ITEMS = [
  {
    q: '¿Funciona de verdad un entrenador online?',
    a: 'Sí. Hablamos por WhatsApp para resolver dudas al momento, te reviso los ejercicios por vídeo y ajusto tu plan cada semana. Tienes acompañamiento real, no solo un PDF que descargas una vez.',
  },
  {
    q: 'Soy principiante total, ¿es para mí?',
    a: 'Especialmente para ti. Adapto cada ejercicio a tu nivel real y te explico el porqué de cada cosa, sin dar por hecho que ya sabes entrenar.',
  },
  {
    q: 'No tengo gimnasio, ¿puedo entrenar en casa?',
    a: 'Sí. Diseño tu plan según lo que tengas: gimnasio completo, mancuernas en casa o solo tu peso corporal. Lo importante es que el plan esté bien hecho y lo sigas.',
  },
  {
    q: '¿Voy a tener que pasar hambre con la dieta?',
    a: 'No. Trabajo con macros flexibles ajustados a tu vida real, no con listas de alimentos prohibidos. Si no puedes mantenerlo a largo plazo, no sirve de nada.',
  },
  {
    q: '¿Y si no me convence?',
    a: 'Tienes 14 días de garantía. Si no encajamos, te devuelvo cada euro, sin preguntas ni trámites largos.',
  },
]

function FaqItem({ q, a }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-100 py-5">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
        aria-expanded={open}
      >
        <span className="font-display font-semibold text-navy">{q}</span>
        <span
          className={`ml-4 shrink-0 text-orange transition-transform ${open ? 'rotate-45' : ''}`}
        >
          +
        </span>
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-text-secondary">{a}</p>}
    </div>
  )
}

export default function Faq() {
  return (
    <section className="mx-auto max-w-3xl px-6 py-16">
      <p className="text-center text-xs font-semibold uppercase tracking-wide text-orange-dark">
        Preguntas frecuentes
      </p>
      <h2 className="mt-2 text-center font-display text-3xl font-extrabold text-navy">
        Antes de que dudes, resuelvo
      </h2>

      <div className="mt-8">
        {FAQ_ITEMS.map((item) => (
          <FaqItem key={item.q} {...item} />
        ))}
      </div>
    </section>
  )
}
