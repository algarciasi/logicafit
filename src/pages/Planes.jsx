import FounderSpots from '../components/FounderSpots'
import PricingCard from '../components/PricingCard'
import Faq from '../components/Faq'

const PLANS = [
  {
    icon: '🏃',
    name: 'Despegue',
    tagline: 'Empieza solo, con buenas bases',
    price: 20,
    features: [
      'Rutinas estructuradas por objetivo y nivel',
      'Pautas de alimentación adaptables a tu día a día',
      'Videoteca completa de ejercicios con técnica',
      'Calculadora de macros premium',
      'Acceso inmediato, sin entrevista',
    ],
  },
  {
    icon: '🎯',
    name: 'Método Lógica',
    tagline: 'Mi sistema completo, hecho para ti',
    price: 35,
    featured: true,
    badge: 'Más popular',
    features: [
      'Rutina y nutrición 100% personalizadas a tu vida y objetivo',
      'Adaptado a fuerza, running, recomposición o combinación',
      'Entrevista inicial 1:1 para diseñar tu plan',
      'Ajustes mensuales de cargas y macros',
      'Soporte prioritario por WhatsApp',
      'Recetario Lógica Fit incluido',
    ],
  },
  {
    icon: '⭐',
    name: 'Inner Circle',
    tagline: 'A mi lado, cada semana',
    price: 60,
    badge: 'Acceso reducido',
    features: [
      'Todo lo del Método Lógica',
      'Videollamada semanal 1:1',
      'Análisis de salud y progreso continuo',
      'Ajustes ilimitados 24/7',
      'Corrección técnica por vídeo',
      'Plazas estrictamente limitadas',
    ],
  },
]

export default function Planes() {
  return (
    <div className="bg-white">
      <section className="mx-auto max-w-3xl px-6 pb-10 pt-16 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">Planes</p>
        <h1 className="mt-2 font-display text-4xl font-extrabold text-navy">
          Elige cómo empezar
        </h1>
        <p className="mt-3 text-text-secondary">
          Sin permanencia. Cancela cuando quieras. Si no encajamos, no encajamos.
        </p>

        <div className="mt-8">
          <FounderSpots taken={6} />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-6 md:grid-cols-3 md:items-stretch">
        {PLANS.map((plan) => (
          <PricingCard key={plan.name} {...plan} />
        ))}
      </section>

      <section className="mx-auto max-w-3xl px-6 py-10">
        <div className="flex flex-col items-center gap-3 rounded-2xl border border-slate-100 bg-surface-soft px-8 py-8 text-center">
          <span className="flex h-10 w-10 items-center justify-center rounded-full bg-white text-orange">
            🛡️
          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Garantía de satisfacción
          </p>
          <h3 className="font-display text-xl font-bold text-navy">
            14 días o te devuelvo el dinero
          </h3>
          <p className="max-w-md text-sm text-text-secondary">
            Pruébalo dos semanas. Si no estás convencido, me lo dices y te
            devuelvo cada euro. Sin preguntas, sin trampas, sin formularios
            largos.
          </p>
        </div>
      </section>

      <Faq />

      <section id="contacto" className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <div className="rounded-2xl bg-navy px-8 py-12">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            ¿Aún tienes dudas?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
            Cuéntame tu situación por WhatsApp y te digo sin compromiso qué
            plan te encaja mejor — o si ninguno te encaja, también.
          </p>
          <a
            href="https://wa.me/"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-whatsapp px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-whatsapp/25 transition hover:brightness-95"
          >
            Hablar por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}