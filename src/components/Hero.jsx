import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-white">
      <div className="mx-auto grid max-w-7xl min-h-[90vh] grid-cols-1 md:grid-cols-2">

        <div className="flex flex-col justify-center px-6 py-16 sm:px-8 sm:py-20 md:px-14 lg:px-20">

          <p className="text-xs font-semibold uppercase tracking-widest text-orange">
            Entrenador personal online
          </p>

          <h1 className="mt-5 font-display text-4xl font-extrabold leading-[1.1] text-navy break-words sm:text-5xl lg:text-6xl">
            Entrenamiento
            <br />
            hecho para ti.
          </h1>

          <p className="mt-6 max-w-md text-base leading-relaxed text-text-secondary sm:text-lg">
            Musculación y running adaptados a tu vida real, con seguimiento
            directo <strong className="font-semibold text-navy">conmigo</strong> y toda tu
            planificación en la app Lógica Fit.
          </p>

          {/* === ZONA DE BOTONES MODIFICADA === */}
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
            <Link
              to="/planes"
              className="w-full rounded-full bg-orange px-8 py-4 text-center text-sm font-semibold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark sm:w-auto"
            >
              Ver planes
            </Link>
            
            <Link
              to="/demo"
              className="w-full rounded-full px-8 py-4 text-center text-sm font-semibold text-navy ring-1 ring-slate-200 transition hover:bg-surface-soft sm:w-auto"
            >
              Ver la app
            </Link>

            <a
              href="https://play.google.com/store/apps/details?id=com.logicafit.app.ficticia"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 flex justify-center transition hover:opacity-80 sm:mt-0 sm:block"
            >
              <img
                src="/brand/google-play.png"
                alt="Disponible en Google Play"
                className="h-[52px] w-auto"
              />
            </a>
          </div>
          {/* ================================== */}

          <div className="mt-12 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap xl:flex-nowrap">
            
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