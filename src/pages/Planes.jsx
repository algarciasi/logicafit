import { useState } from 'react'
import FounderSpots from '../components/FounderSpots'
import PricingCard from '../components/PricingCard'
import BillingToggle from '../components/BillingToggle'
import Faq from '../components/Faq'

const PLANS = [
  {
    icon: '🏃',
    name: 'Despegue',
    tagline: 'Empieza solo, con buenas bases',
    audience: 'Para quien quiere estructura y aún no necesita acompañamiento diario.',
    basePrice: 20,
    ctaLabel: 'Empezar a mi ritmo',
    features: [
      'Entra al gimnasio sabiendo exactamente qué hacer, sin perder tiempo',
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
    audience: 'Para quien quiere resultados serios con seguimiento real cada mes.',
    basePrice: 60,
    featured: true,
    badge: 'Más popular',
    ctaLabel: 'Quiero mi plan a medida',
    features: [
      'Aprende a entranar y comer sin renunciar a tu vida socialr',
      'Adaptado a fuerza, running, recomposición o combinación',
      'Entrevista inicial 1:1 para diseñar tu plan',
      'Ajustes mensuales de cargas y macros',
      'Soporte prioritario por WhatsApp',
      'Recetario Lógica Fit incluido',
    ],
  },
  {
    icon: '⭐',
    name: 'Lógica 360',
    tagline: 'A mi lado, cada semana',
    audience: 'Para quien quiere la máxima cercanía y ajustes constantes.',
    basePrice: 90,
    badge: 'Acceso reducido',
    ctaLabel: 'Solicitar plaza VIP',
    features: [
      'Todo lo del Método Lógica',
      'Videollamada semanal 1:1',
      'Análisis de salud y progreso continuo',
      'Ajustes ilimitados 24/7',
      'Entrena con total seguridad: reviso tu técnica para evitar lesiones y asegurar que progresas',
      'Plazas estrictamente limitadas',
    ],
  },
]

const QUARTERLY_DISCOUNT = 0.17

function getPricing(basePrice, billing) {
  if (billing === 'monthly') {
    return { price: basePrice, billingNote: null }
  }
  const monthlyEquivalent = Math.round(basePrice * (1 - QUARTERLY_DISCOUNT))
  const quarterlyTotal = Math.round(basePrice * 3 * (1 - QUARTERLY_DISCOUNT))
  return {
    price: monthlyEquivalent,
    billingNote: `Facturado trimestralmente · ${quarterlyTotal}€ cada 3 meses`,
  }
}

export default function Planes() {
  const [billing, setBilling] = useState('monthly')

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

        <div className="mt-6 flex justify-center">
          <BillingToggle billing={billing} onChange={setBilling} />
        </div>

        <div className="mt-8">
          <FounderSpots taken={6} />
        </div>
      </section>

      <section className="mx-auto grid max-w-6xl gap-6 px-6 pb-10 pt-6 md:grid-cols-3 md:items-stretch">
        {PLANS.map((plan) => {
          const { price, billingNote } = getPricing(plan.basePrice, billing)
          return <PricingCard key={plan.name} {...plan} price={price} billingNote={billingNote} />
        })}
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