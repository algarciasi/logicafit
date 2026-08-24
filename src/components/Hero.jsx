import { Link } from 'react-router-dom'

const PLAN_DAYS = [
  { day: 'Lun', label: 'Fuerza · 40 min', done: true },
  { day: 'Mar', label: 'Vida real', muted: true },
  { day: 'Mié', label: 'Running · 5K', done: true },
  { day: 'Jue', label: 'Vida real', muted: true },
  { day: 'Vie', label: 'Fuerza · 35 min', done: true },
  { day: 'Sáb', label: 'Libre / cena', muted: true },
  { day: 'Dom', label: 'Movilidad · 15 min' },
]

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

        {/* Elemento de firma: tu semana real, no una rutina genérica */}
        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-orange-light/40 blur-2xl" />
          <div className="rounded-2xl border border-slate-100 bg-white p-6 shadow-xl shadow-slate-200/60">
            <div className="flex items-center justify-between">
              <p className="font-display text-sm font-bold text-navy">Tu semana, tal cual es</p>
              <span className="rounded-full bg-surface-soft px-2.5 py-1 text-[11px] font-semibold text-text-secondary">
                Semana 6
              </span>
            </div>

            <ul className="mt-5 space-y-2">
              {PLAN_DAYS.map(({ day, label, done, muted }) => (
                <li
                  key={day}
                  className={`flex items-center justify-between rounded-xl px-4 py-3 text-sm ${
                    muted ? 'bg-transparent' : 'bg-surface-soft'
                  }`}
                >
                  <span className="w-10 shrink-0 font-display font-bold text-navy">{day}</span>
                  <span className={`flex-1 px-3 ${muted ? 'text-text-secondary/70' : 'text-navy-light'}`}>
                    {label}
                  </span>
                  {done && (
                    <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange text-[10px] font-bold text-white">
                      ✓
                    </span>
                  )}
                </li>
              ))}
            </ul>

            <p className="mt-5 border-t border-slate-100 pt-4 text-xs text-text-secondary">
              3 sesiones planificadas, no 5 a medias. Ajustado a tu horario real de esta semana.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
