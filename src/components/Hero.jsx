import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl min-h-[90vh] grid-cols-1 md:grid-cols-2">

        <div className="flex flex-col justify-center px-8 py-20 md:px-14 lg:px-20">

          <p className="text-xs font-semibold uppercase tracking-widest text-orange">
            Entrenador personal online
          </p>

          <h1 className="mt-5 font-display text-5xl font-extrabold leading-[1.05] text-navy lg:text-6xl">
            Entrenamiento
            <br />
            hecho para ti.
          </h1>

          <p className="mt-6 max-w-md text-lg leading-relaxed text-text-secondary">
            Musculación y running adaptados a tu vida real, con seguimiento
            directo <strong className="font-semibold text-navy">conmigo</strong> y toda tu
            planificación en la app Lógica Fit.
          </p>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              to="/planes"
              className="rounded-full bg-orange px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark"
            >
              Ver planes
            </Link>
            <Link
              to="/demo"
              className="rounded-full px-8 py-4 text-sm font-semibold text-navy ring-1 ring-slate-200 transition hover:bg-surface-soft"
            >
              Ver la app
            </Link>
          </div>

          <div className="mt-12 flex flex-nowrap gap-3 overflow-x-auto pb-2 sm:overflow-visible sm:pb-0">
            
            <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-text-secondary">Titulado por</p>
              <p className="mt-0.5 text-sm font-bold text-navy">Apta Vital Sport</p>
            </div>
            
            <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-text-secondary">Garantía</p>
              <p className="mt-0.5 text-sm font-bold text-navy">14 días</p>
            </div>
            
            <a
              href="https://wa.me/34678951544"
              target="_blank"
              rel="noopener noreferrer"
              className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm transition hover:border-green-200 hover:shadow-md"
            >
              <p className="text-xs text-text-secondary">Soporte directo</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-navy">
                <span className="inline-block h-2 w-2 rounded-full bg-whatsapp" />
                WhatsApp
              </p>
            </a>
            
            <div className="flex flex-col justify-center rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm">
              <p className="text-xs text-text-secondary">Sincroniza con</p>
              <p className="mt-0.5 flex items-center gap-1.5 text-sm font-bold text-navy">
                <img src="/brand/strava.png" alt="Strava" className="h-4 w-4" />
                Strava
              </p>
            </div>
            
          </div>
        </div>

        <div className="relative hidden md:block">
          <img
            src="/brand/alberto-gym.jpg"
            alt="Alberto García, entrenador personal Lógica Fit"
            className="absolute inset-0 h-full w-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-white via-white/20 to-transparent" />
        </div>

      </div>

      <div className="relative h-72 w-full md:hidden">
        <img
          src="/brand/alberto-gym.jpg"
          alt="Alberto García, entrenador personal Lógica Fit"
          className="h-full w-full object-cover object-top"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-white via-transparent to-transparent" />
      </div>
    </section>
  )
}