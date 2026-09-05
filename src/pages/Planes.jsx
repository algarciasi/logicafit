import Faq from '../components/Faq'

export default function Planes() {
  return (
    <div className="bg-surface overflow-hidden">
      
      {/* 1. HERO DE PLANES (Imagen a toda pantalla fundiéndose con el fondo) */}
      <section className="relative w-full pt-40 pb-56 lg:pt-48 lg:pb-72">
        {/* Imagen de fondo */}
        <img
          src="/brand/alberto-2.jpg"
          alt="Alberto entrenando"
          className="absolute inset-0 h-full w-full object-cover object-[center_25%] animate-fade-in"
        />
        
        {/* Degradados: Oscurecen la foto para leer el texto y funden el bajo con el color de la web */}
        <div className="absolute inset-0 bg-navy/30" /> 
        <div className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/50 to-transparent w-full md:w-3/4" />
        <div className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-surface via-surface/80 to-transparent" />

        {/* Texto del Hero */}
        <div className="relative z-10 mx-auto max-w-7xl px-6 lg:px-8">
          <div className="max-w-2xl">
            <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange animate-fade-in-up">
              Entrenamiento Online
            </p>
            <h1 className="mt-4 font-display text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl tracking-tight animate-fade-in-up delay-100 leading-[1.05]">
              Elige cómo quieres avanzar.
            </h1>
            <p className="mt-6 text-lg sm:text-xl text-slate-200 font-medium animate-fade-in-up delay-200">
              Sin permanencia. Empieza hoy mismo y cancela cuando quieras.
            </p>
          </div>
        </div>
      </section>

      {/* 2. TARJETAS DE PRECIOS (Flotando sobre la imagen gracias a -mt-32) */}
      <section className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 -mt-32 lg:-mt-48 mb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* TARJETA PREMIUM (1 a 1) - Ocupa más espacio (7 columnas) */}
          <div className="lg:col-span-7 relative rounded-[2.5rem] bg-navy p-8 sm:p-12 shadow-2xl shadow-navy/30 animate-fade-in-up delay-300 overflow-hidden border border-slate-700/50">
            {/* Brillo decorativo */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-orange opacity-15 blur-[80px]"></div>
            
            <div className="relative flex flex-col sm:flex-row sm:items-start justify-between gap-6 border-b border-slate-700 pb-10">
              <div>
                <span className="inline-block rounded-full bg-orange/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-orange mb-4">
                  Plazas limitadas
                </span>
                <h2 className="font-display text-3xl font-bold text-white">
                  Entrenamiento 1:1
                </h2>
                <p className="mt-3 text-slate-300 leading-relaxed font-medium max-w-sm">
                  Plan individualizado, seguimiento semanal por WhatsApp y ajustes constantes para garantizar resultados.
                </p>
              </div>
              <div className="shrink-0 sm:text-right">
                <div className="flex items-baseline gap-1 sm:justify-end">
                  <span className="text-5xl font-extrabold text-white">50€</span>
                  <span className="text-lg font-medium text-slate-400">/mes</span>
                </div>
              </div>
            </div>

            <div className="relative mt-10 grid gap-x-6 gap-y-5 text-sm text-slate-300 sm:grid-cols-2">
              {[
                "Plan adaptado 100% a tus horarios",
                "Seguimiento directo semanal conmigo",
                "Ajustes ilimitados según necesidades",
                "Recetario fit propio",
                "Resolución de dudas por WhatsApp",
                "Pautas de alimentación flexibles",
                "Acceso completo a la App Lógica Fit",
                "Sincronización con Strava"
              ].map((feature, idx) => (
                <div key={idx} className="flex items-start gap-3">
                  <div className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-orange/20 mt-0.5">
                    <svg className="h-3 w-3 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="3">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <span className="font-medium">{feature}</span>
                </div>
              ))}
            </div>

            <div className="relative mt-12">
              <a 
                href="https://wa.me/34678951544?text=Hola!%20He%20visto%20la%20web%20y%20quiero%20solicitar%20una%20plaza%20para%20el%20Entrenamiento%201:1"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block w-full rounded-full bg-orange px-8 py-5 text-center text-base font-bold text-white transition-all hover:bg-orange-dark hover:scale-[1.02] shadow-[0_0_20px_rgba(234,88,12,0.3)]"
              >
                Solicitar mi plaza
              </a>
            </div>
          </div>

          {/* TARJETA BÁSICA (A tu ritmo) - Estilo cristal/blanco (5 columnas) */}
          <div className="lg:col-span-5 flex flex-col h-full rounded-[2.5rem] bg-white/80 backdrop-blur-xl p-8 sm:p-10 shadow-xl shadow-slate-200/50 border border-white animate-fade-in-up delay-400">
            <div>
              <h3 className="font-display text-2xl font-bold text-navy">
                A tu ritmo
              </h3>
              <p className="mt-3 text-base text-text-secondary leading-relaxed font-medium">
                Todo lo que necesitas para entrenar por tu cuenta, con la planificación estructurada en la app Lógica Fit, pero sin seguimiento individual por WhatsApp.
              </p>
              <div className="mt-6 flex items-baseline gap-1">
                <span className="text-4xl font-extrabold text-navy">20€</span>
                <span className="text-base font-medium text-text-secondary">/mes</span>
              </div>
            </div>
            
            <div className="mt-8 pt-8 border-t border-slate-100 flex-1">
              <div className="space-y-4 text-sm text-slate-600">
                <div className="flex items-start gap-3 opacity-60">
                  <span className="text-lg">❌</span>
                  <span>Sin revisiones semanales</span>
                </div>
                <div className="flex items-start gap-3 opacity-60">
                  <span className="text-lg">❌</span>
                  <span>Sin contacto diario por WhatsApp</span>
                </div>
              </div>
            </div>

            <a 
              href="https://wa.me/34678951544?text=Hola!%20Me%20gustaria%20empezar%20a%20entrenar%20a%20Mi%20Ritmo"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-10 inline-block w-full rounded-full bg-surface-soft ring-1 ring-slate-200 px-8 py-5 text-center text-sm font-bold text-navy transition-all hover:bg-slate-50 hover:ring-slate-300"
            >
              Entrenar a mi ritmo
            </a>
          </div>

        </div>

        {/* GARANTÍA */}
        <div className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-5 text-center sm:text-left animate-fade-in-up delay-500">
          <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-white border border-slate-100 shadow-sm">
            <svg className="w-8 h-8 text-navy" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <div>
            <p className="text-lg font-bold text-navy">
              Garantía de 14 días
            </p>
            <p className="mt-1 text-sm font-medium text-text-secondary max-w-sm">
              Si mi metodología no encaja contigo durante las dos primeras semanas, te devuelvo el 100% de tu dinero. Sin preguntas.
            </p>
          </div>
        </div>
      </section>

      {/* 3. FAQ (Importado de nuestro nuevo componente) */}
      <Faq />

      {/* 4. CONTACTO / CTA FINAL */}
      <section id="contacto" className="mx-auto max-w-4xl px-6 pb-32 pt-10 text-center">
        <div className="rounded-[3rem] bg-surface-soft border border-slate-100 px-8 py-16 shadow-sm">
          <img src="/brand/coach.jpg" alt="Alberto" className="mx-auto h-24 w-24 rounded-full object-cover shadow-md mb-6 border-4 border-white" />
          <h2 className="font-display text-3xl font-extrabold text-navy tracking-tight sm:text-4xl">
            ¿Aún tienes dudas?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-lg text-text-secondary font-medium">
            Escríbeme por WhatsApp y cuéntame tu caso. Te diré con total sinceridad si puedo ayudarte a lograr tu objetivo o no.
          </p>
          <a
            href="https://wa.me/34678951544?text=Hola!%20He%20visto%20los%20planes%20pero%20tengo%20alguna%20duda"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-green-500/20 transition-all hover:scale-105 hover:bg-[#20b858]"
          >
            <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
            Resolver dudas por WhatsApp
          </a>
        </div>
      </section>
    </div>
  )
}