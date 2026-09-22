import { Link } from 'react-router-dom'

const FEATURES = [
  {
    number: '01',
    title: 'Tu entrenamiento',
    description:
      'Rutinas organizadas por días, ejercicios, series, repeticiones y vídeos de referencia.',
  },
  {
    number: '02',
    title: 'Tu progreso',
    description:
      'Peso, medidas, cargas y evolución para tomar decisiones con datos reales.',
  },
  {
    number: '03',
    title: 'Tu nutrición',
    description:
      'Pautas y planificación nutricional siempre disponibles desde el móvil.',
  },
  {
    number: '04',
    title: 'Todo conectado',
    description:
      'Registro de entrenamientos y sincronización con Strava para centralizar tu actividad.',
  },
]

function PhoneMockup({ src, alt, className = '' }) {
  return (
    <div className={`relative ${className}`}>
      <div className="relative overflow-hidden rounded-[2.5rem] border border-white/10 bg-[#111827] p-[5px] shadow-[0_30px_90px_rgba(0,0,0,0.45)]">
        <div className="overflow-hidden rounded-[2.2rem] bg-white">
          <div className="relative flex h-8 items-center justify-between bg-[#F8FAFC] px-5">
            <span className="text-[9px] font-bold text-navy">9:41</span>

            <div className="absolute left-1/2 top-1.5 h-4 w-16 -translate-x-1/2 rounded-full bg-black" />

            <div className="flex items-center gap-1">
              <div className="h-2 w-3 rounded-sm bg-navy/70" />
              <div className="h-2 w-4 rounded-[2px] border border-navy/50 p-[1px]">
                <div className="h-full w-3/4 rounded-[1px] bg-navy" />
              </div>
            </div>
          </div>

          <img
            src={src}
            alt={alt}
            loading="lazy"
            className="block h-auto w-full"
          />

          <div className="flex h-5 items-center justify-center bg-[#F8FAFC]">
            <div className="h-1 w-20 rounded-full bg-navy/20" />
          </div>
        </div>
      </div>
    </div>
  )
}

export default function AppShowcase() {
  return (
    <section className="overflow-hidden bg-navy py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        {/* Intro */}
        <div className="grid gap-12 lg:grid-cols-12 lg:items-end">
          <div className="lg:col-span-7">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-orange sm:text-sm">
              Seguimiento desde cualquier lugar
            </p>

            <h2 className="font-display text-4xl font-extrabold leading-[1.02] tracking-[-0.04em] text-white sm:text-5xl lg:text-6xl">
              Yo preparo el plan.
              <br />
              Tú sabes qué hacer
              <br />
              <span className="text-slate-400">cada día.</span>
            </h2>
          </div>

          <div className="lg:col-span-4 lg:col-start-9">
            <p className="text-lg leading-8 text-slate-300">
              Tu entrenamiento, nutrición y progreso están organizados en Lógica
              Fit para que no dependas de PDFs, notas o Excels.
            </p>
          </div>
        </div>

        {/* App visual */}
        <div className="mt-20 grid gap-14 lg:grid-cols-12 lg:items-center">
          <div className="relative min-h-[560px] lg:col-span-7">
            {/* Glow de fondo */}
            <div className="absolute left-1/2 top-1/2 h-[430px] w-[430px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-orange/10 blur-3xl" />

            {/* Móvil izquierdo */}
            <PhoneMockup
              src="/brand/app-dieta.png"
              alt="Rutina de entrenamiento en la app Lógica Fit"
              className="absolute left-[5%] top-20 z-10 w-[190px] -rotate-[6deg] opacity-80 sm:w-[230px]"
            />

            {/* Móvil central */}
            <PhoneMockup
              src="/brand/app-inicio.png"
              alt="Pantalla principal de la app Lógica Fit"
              className="absolute left-1/2 top-0 z-30 w-[230px] -translate-x-1/2 sm:w-[285px]"
            />

            {/* Móvil derecho */}
            <PhoneMockup
              src="/brand/app-progreso.png"
              alt="Pantalla de progreso en la app Lógica Fit"
              className="absolute right-[5%] top-20 z-20 w-[190px] rotate-[6deg] opacity-80 sm:w-[230px]"
            />
          </div>

          {/* Features */}
          <div className="lg:col-span-5">
            <div className="divide-y divide-white/10 border-y border-white/10">
              {FEATURES.map((feature) => (
                <div
                  key={feature.number}
                  className="grid grid-cols-[42px_1fr] gap-4 py-6"
                >
                  <span className="pt-1 text-xs font-bold text-orange">
                    {feature.number}
                  </span>

                  <div>
                    <h3 className="font-display text-lg font-bold text-white">
                      {feature.title}
                    </h3>

                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {feature.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-9">
              <Link
                to="/demo"
                className="inline-flex items-center gap-2 text-sm font-bold text-white transition hover:text-orange"
              >
                Ver cómo funciona la app
                <span aria-hidden="true">→</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Mensaje final */}
        <div className="mt-24 border-t border-white/10 pt-10">
          <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-2xl text-base leading-7 text-slate-400">
              La app no sustituye el seguimiento personal. Es la herramienta que
              usamos para que todo esté claro, organizado y medible.
            </p>

            <Link
              to="/planes"
              className="inline-flex min-h-12 shrink-0 items-center justify-center rounded-full bg-white px-7 text-sm font-bold text-navy transition hover:bg-slate-100"
            >
              Ver planes
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}