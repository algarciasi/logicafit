import { Link } from 'react-router-dom'

export default function Calculadoras() {
  return (
    <div className="bg-surface overflow-hidden min-h-screen">
      
      {/* 1. HERO (Imagen inmersiva con degradados) */}
      <section className="relative w-full pt-40 pb-56 lg:pt-48 lg:pb-64 flex flex-col justify-center">
        {/* Imagen de fondo */}
        <img
          src="/brand/macros-calc.jpg"
          alt="Calculadoras"
          className="absolute inset-0 h-full w-full object-cover object-[center_30%] opacity-90 animate-fade-in"
        />
        
        {/* Degradados para fundir la imagen con la web */}
        <div className="absolute inset-0 bg-navy/50" /> 
        <div className="absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/80 to-transparent" />

        {/* Textos */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8 w-full">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange animate-fade-in-up">
              Herramientas Gratuitas
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold text-white sm:text-6xl tracking-tight animate-fade-in-up delay-100 leading-[1.05]">
              Calculadoras
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-300 font-medium animate-fade-in-up delay-200 leading-relaxed max-w-lg">
              Ajusta tu nutrición milimétricamente y planifica tus entrenamientos de carrera para asegurar tus resultados.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TARJETAS DE CALCULADORAS (Flotando sobre la imagen) */}
      <section className="relative z-20 mx-auto max-w-5xl px-6 lg:px-8 -mt-32 lg:-mt-40 mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
          
          {/* Tarjeta 1: Macros */}
          <Link
            to="/calculadora"
            className="group flex flex-col justify-between rounded-[2rem] bg-white p-8 sm:p-10 shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 transition-all duration-300 hover:-translate-y-2 hover:shadow-orange/10 animate-fade-in-up delay-300"
          >
            <div>
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-orange mb-6 transition-colors group-hover:bg-orange group-hover:text-white">
                {/* Icono Nutrición/Macros */}
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-navy">
                Calculadora de macros
              </h2>
              <p className="mt-3 text-base text-text-secondary leading-relaxed font-medium">
                Calcula tus calorías diarias exactas y reparte tus macronutrientes (proteínas, grasas e hidratos) para poder armar tu propio menú.
              </p>
            </div>
            
            <div className="mt-10 flex items-center gap-2 text-sm font-bold text-orange transition-colors group-hover:text-orange-dark">
              Abrir calculadora
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

          {/* Tarjeta 2: Running */}
          <Link
            to="/calculadora-running"
            className="group flex flex-col justify-between rounded-[2rem] bg-navy p-8 sm:p-10 shadow-2xl shadow-navy/30 ring-1 ring-slate-800 transition-all duration-300 hover:-translate-y-2 hover:shadow-orange/20 animate-fade-in-up delay-400 relative overflow-hidden"
          >
            {/* Brillo sutil de fondo en la tarjeta oscura */}
            <div className="absolute top-0 right-0 -mr-10 -mt-10 h-32 w-32 rounded-full bg-orange opacity-20 blur-[50px] pointer-events-none"></div>

            <div className="relative z-10">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 text-white mb-6 transition-colors group-hover:bg-orange group-hover:text-white">
                {/* Icono Running/Cronómetro */}
                <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div className="flex items-center gap-3 mb-2">
                <h2 className="font-display text-2xl font-bold text-white">
                  Calculadora de ritmo
                </h2>
                <span className="inline-block rounded-full bg-[#FC4C02]/20 px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-wider text-[#FC4C02]">
                  Running
                </span>
              </div>
              <p className="mt-3 text-base text-slate-300 leading-relaxed font-medium">
                Predice tus tiempos de carrera, descubre tus ritmos ideales de entrenamiento y llévate una guía de 5K totalmente gratis.
              </p>
            </div>
            
            <div className="relative z-10 mt-10 flex items-center gap-2 text-sm font-bold text-orange transition-colors group-hover:text-white">
              Abrir calculadora
              <svg className="h-4 w-4 transition-transform group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </div>
          </Link>

        </div>
      </section>

    </div>
  )
}