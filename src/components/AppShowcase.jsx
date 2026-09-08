import { Link } from 'react-router-dom'

const FEATURES = [
  'Entrenamientos',
  'Nutrición',
  'Progreso',
  'Cuaderno de series',
  'Seguimiento',
  'Sincronización Strava',
]

const SCREENS = [
  { src: '/brand/app-inicio.png',   alt: 'Panel de inicio con tu plan activo' },
  { src: '/brand/app-entreno.png',  alt: 'Tu rutina por días con vídeos técnicos' },
  { src: '/brand/app-progreso.png', alt: 'Evolución de peso y medidas corporales' },
  { src: '/brand/app-dieta.png',    alt: 'Tu nutrición del día con macros' },
]

function PhoneMockup({ src, alt }) {
  return (
    <div className="group relative shrink-0 w-[250px] sm:w-[290px] transition-transform duration-500 hover:-translate-y-3">

      {/* Cuerpo del teléfono */}
      <div className="relative rounded-[2.75rem] bg-gradient-to-b from-[#2a3444] via-[#0f172a] to-[#1a2334] p-[6px] shadow-[0_25px_60px_rgba(0,0,0,0.65)] ring-1 ring-white/10">

        {/* Bisel interior */}
        <div className="relative overflow-hidden rounded-[2.4rem] bg-black p-[2px]">
          <div className="relative overflow-hidden rounded-[2.3rem] bg-white">

            {/* Barra de estado */}
            <div className="relative flex h-9 items-center justify-between bg-[#F8FAFC] px-6">
              <span className="text-[10px] font-bold text-navy">9:41</span>

              {/* Isla / notch */}
              <div className="absolute left-1/2 top-1.5 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />

              <div className="flex items-center gap-1">
                <svg className="h-2.5 w-2.5 text-navy" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 9h2v5H1zM5 6h2v8H5zM9 3h2v11H9zM13 1h2v13h-2z" />
                </svg>
                <div className="flex h-2.5 w-5 items-center rounded-[3px] border border-navy/60 p-[1.5px]">
                  <div className="h-full w-3/4 rounded-[1px] bg-navy" />
                </div>
              </div>
            </div>

            {/* Captura real */}
            <img src={src} alt={alt} className="block w-full" loading="lazy" />

            {/* Barra de gestos */}
            <div className="flex h-5 items-center justify-center bg-[#F8FAFC]">
              <div className="h-1 w-24 rounded-full bg-navy/25" />
            </div>
          </div>
        </div>

        {/* Botones laterales */}
        <div className="absolute -left-[3px] top-[110px] h-7 w-[3px] rounded-l-full bg-[#334155]" />
        <div className="absolute -left-[3px] top-[152px] h-12 w-[3px] rounded-l-full bg-[#334155]" />
        <div className="absolute -left-[3px] top-[210px] h-12 w-[3px] rounded-l-full bg-[#334155]" />
        <div className="absolute -right-[3px] top-[165px] h-20 w-[3px] rounded-r-full bg-[#334155]" />
      </div>
    </div>
  )
}

export default function AppShowcase() {
  return (
    <section className="overflow-hidden bg-navy py-32 border-t-[12px] border-orange">
      <div className="mx-auto max-w-7xl">

        {/* Cabecera */}
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange mb-4">
            Tecnología propia
          </p>
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
            Todo tu progreso.<br />En tu bolsillo.
          </h2>
          <p className="mt-6 text-lg text-slate-300 font-medium">
            Olvida los Excels confusos y los PDFs. Tu plan de entrenamiento, tu dieta,
            tu registro de cargas y tus carreras de Strava, centralizados en mi app.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {FEATURES.map((feature) => (
              <span
                key={feature}
                className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-slate-200 border border-white/5"
              >
                {feature}
              </span>
            ))}
          </div>
        </div>

        {/* Carrusel infinito de capturas reales */}
        <div className="relative w-full mt-20">
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden flex w-full">
            <div className="flex w-max animate-marquee items-center gap-8 sm:gap-10 px-6 py-4">
              {[...SCREENS, ...SCREENS].map((screen, idx) => (
                <PhoneMockup key={idx} src={screen.src} alt={screen.alt} />
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center px-6">
          <Link
            to="/demo?tab=progreso"
            className="text-sm font-semibold text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
          >
            Ver la demo interactiva →
          </Link>
        </div>

      </div>
    </section>
  )
}