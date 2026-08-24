import FounderSpots from '../components/FounderSpots'
import PricingCard from '../components/PricingCard'
import Faq from '../components/Faq'

const PLANS = [
  {
    icon: '馃弮',
    name: 'Despegue',
    tagline: 'Empieza solo, con buenas bases',
    price: 20,
    features: [
      'Rutinas estructuradas por objetivo y nivel',
      'Pautas de alimentaci贸n adaptables a tu d铆a a d铆a',
      'Videoteca completa de ejercicios con t茅cnica',
      'Calculadora de macros premium',
      'Acceso inmediato, sin entrevista',
    ],
  },
  {
    icon: '馃幆',
    name: 'M茅todo L贸gica',
    tagline: 'Mi sistema completo, hecho para ti',
    price: 35,
    featured: true,
    badge: 'M谩s popular',
    features: [
      'Rutina y nutrici贸n 100% personalizadas a tu vida y objetivo',
      'Adaptado a fuerza, running, recomposici贸n o combinaci贸n',
      'Entrevista inicial 1:1 para dise帽ar tu plan',
      'Ajustes mensuales de cargas y macros',
      'Soporte prioritario por WhatsApp',
      'Recetario L贸gica Fit incluido',
    ],
  },
  {
    icon: '猸?,
    name: 'Inner Circle',
    tagline: 'A mi lado, cada semana',
    price: 60,
    badge: 'Acceso reducido',
    features: [
      'Todo lo del M茅todo L贸gica',
      'Videollamada semanal 1:1',
      'An谩lisis de salud y progreso continuo',
      'Ajustes ilimitados 24/7',
      'Correcci贸n t茅cnica por v铆deo',
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
          Elige c贸mo empezar
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
            馃洝锔?          </span>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Garant铆a de satisfacci贸n
          </p>
          <h3 className="font-display text-xl font-bold text-navy">
            14 d铆as o te devuelvo el dinero
          </h3>
          <p className="max-w-md text-sm text-text-secondary">
            Pru茅balo dos semanas. Si no est谩s convencido, me lo dices y te
            devuelvo cada euro. Sin preguntas, sin trampas, sin formularios
            largos.
          </p>
        </div>
      </section>

      <Faq />

      <section id="contacto" className="mx-auto max-w-3xl px-6 pb-20 text-center">
        <div className="rounded-2xl bg-navy px-8 py-12">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            驴A煤n tienes dudas?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm text-slate-300">
            Cu茅ntame tu situaci贸n por WhatsApp y te digo sin compromiso qu茅
            plan te encaja mejor 鈥?o si ninguno te encaja, tambi茅n.
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
