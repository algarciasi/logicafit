import { Link } from 'react-router-dom'
import FounderSpots from './FounderSpots'

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

        <Link
          to="/planes"
          className="mt-8 inline-flex items-center gap-2 rounded-full bg-orange px-8 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark"
        >
          Ver los 3 planes →
        </Link>
      </div>
    </section>
  )
}