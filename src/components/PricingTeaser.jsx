import { Link } from 'react-router-dom'
import FounderSpots from './FounderSpots'
import PricingCard from './PricingCard'
import { PLANS, getPricing } from '../lib/plans'

export default function PricingTeaser() {
  return (
    <section id="planes" className="bg-navy py-20">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange">
          Planes
        </p>
        <h2 className="mt-2 font-display text-3xl font-extrabold text-white sm:text-4xl">
          Elige cómo empezar
        </h2>
        <p className="mt-4 text-sm text-slate-300">
          Un plan claro para cada situación. Sin permanencia, sin letra
          pequeña.
        </p>

        <div className="mt-8 rounded-2xl bg-white p-2">
          <FounderSpots taken={6} />
        </div>
      </div>

      <div className="mx-auto mt-10 grid max-w-6xl gap-6 px-6 md:grid-cols-3 md:items-stretch">
        {PLANS.map((plan) => {
          const { price, billingNote } = getPricing(plan.basePrice, 'monthly')
          return <PricingCard key={plan.name} {...plan} price={price} billingNote={billingNote} />
        })}
      </div>

      <div className="mt-8 text-center">
        <Link
          to="/planes"
          className="text-sm font-semibold text-orange hover:underline"
        >
          Ver facturación trimestral con descuento →
        </Link>
      </div>
    </section>
  )
}