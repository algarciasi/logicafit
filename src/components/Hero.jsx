import { Link } from 'react-router-dom'
import WeeklyPlanCard from './WeeklyPlanCard'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-6xl gap-16 px-6 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full bg-surface-soft px-4 py-1.5 text-xs font-semibold uppercase tracking-wide text-navy-light ring-1 ring-slate-200">
            Entrenador titulado · Método basado en ciencia
          </span>

          <h1 className="mt-6 font-display text-4xl font-extrabold leading-[1.1] text-navy sm:text-5xl">
            Tu plan, tu cuerpo,{' '}
            <span className="text-orange">tu vida real.</span>
          </h1>

          <p className="mt-5 max-w-md text-base text-text-secondary">
            Sin dietas imposibles. Sin rutinas de 2 horas. Sin postureo.
            Entrenamiento y nutrición personalizados para gente con trabajo,
            familia y poco tiempo. Te acompaño contigo, no te suelto un PDF.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-4">
            <Link
              to="/planes"
              className="rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark"
            >
              Ver planes
            </Link>
            <a
              href="#metodo"
              className="rounded-full px-7 py-3.5 text-sm font-semibold text-navy ring-1 ring-slate-200 transition hover:bg-surface-soft"
            >
              Conoce el método
            </a>
          </div>

          <dl className="mt-10 flex flex-wrap gap-x-8 gap-y-2 text-xs font-medium text-text-secondary">
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Sin permanencia
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> Soporte real por WhatsApp
            </div>
            <div className="flex items-center gap-1.5">
              <span className="h-1.5 w-1.5 rounded-full bg-orange" /> 100% adaptable
            </div>
          </dl>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-orange-light/40 blur-2xl" />
          <WeeklyPlanCard />
        </div>
      </div>
    </section>
  )
}