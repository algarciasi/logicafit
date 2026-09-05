import { Link } from 'react-router-dom'

export default function Hero() {
  return (
    <section className="relative w-full bg-navy overflow-hidden pt-16 pb-10 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28">

      {/* BLOQUE DE IMAGEN
          Móvil: bloque normal de altura fija justo debajo del membrete navy, se ve entera.
          Desktop (sm+): absolute inset-0 rellenando la altura que marca el contenido
          (título + tarjetas + padding), no el viewport — igual que el resto de páginas. */}
      <div className="relative h-[48vh] min-h-[320px] w-full sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
        <img
          src="/brand/alberto-gym.jpg"
          alt="Alberto García, entrenador personal Lógica Fit"
          className="h-full w-full object-cover object-[75%_30%] sm:object-[68%_18%] opacity-100 sm:opacity-90 animate-fade-in"
        />

        {/* Degradado inferior móvil: funde la foto con el bloque navy de texto de debajo */}
        <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent sm:hidden" />

        {/* Degradados desktop: overlay ligero + degradado lateral, mismo lenguaje que Calculadoras/Aprende/Planes */}
        <div className="hidden sm:block absolute inset-0 bg-navy/50" />
        <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/55 to-transparent w-full md:w-3/5" />
      </div>

      {/* BLOQUE DE CONTENIDO
          Móvil: flujo normal debajo de la imagen, fondo navy sólido, sin superposición.
          Desktop (sm+): overlay clásico sobre la foto, altura determinada por el propio contenido. */}
      <div className="relative z-10 w-full bg-navy px-5 pt-8 pb-10 sm:bg-transparent sm:px-6 sm:pt-0 sm:pb-0 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">

          {/* TITULAR GIGANTE */}
          <h1 className="font-display text-4xl xs:text-5xl font-extrabold leading-[1.05] text-white tracking-tight sm:text-6xl lg:text-[5.5rem] animate-fade-in-up">
            Entrenador<br />
            Personal<br />
          </h1>

          {/* CONTENEDOR DE TARJETAS INFERIORES */}
          <div className="mt-8 sm:mt-12 grid grid-cols-1 md:grid-cols-12 gap-4 sm:gap-6 items-end">

            {/* Tarjeta Blanca (Llamada a la acción) */}
            <div className="md:col-span-6 lg:col-span-5 bg-surface rounded-[1.5rem] sm:rounded-[2rem] p-6 sm:p-10 shadow-2xl animate-fade-in-up delay-200">
              <p className="text-[11px] sm:text-xs font-bold uppercase tracking-[0.2em] text-text-secondary mb-5 sm:mb-6">
                Aquí empieza tu cambio
              </p>

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
                <Link
                  to="/planes"
                  className="w-full rounded-full bg-orange px-6 py-3.5 sm:py-4 text-center text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-dark hover:scale-105"
                >
                  Ver planes
                </Link>
                <Link
                  to="/demo"
                  className="w-full rounded-full px-6 py-3.5 sm:py-4 text-center text-sm font-bold text-navy ring-1 ring-slate-200 transition-all hover:bg-surface-soft hover:ring-slate-300"
                >
                  Ver mi app
                </Link>
              </div>

              <div className="mt-6 sm:mt-8 pt-5 sm:pt-6 border-t border-slate-100 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                    <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
                  </span>
                  <div>
                    <p className="text-[10px] text-text-secondary">Soporte 1:1</p>
                    <p className="text-xs font-bold text-navy">WhatsApp</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-50">
                    <img src="/brand/strava.png" alt="Strava" className="h-4 w-4 grayscale" />
                  </span>
                  <div>
                    <p className="text-[10px] text-text-secondary">Conexión</p>
                    <p className="text-xs font-bold text-navy">Strava</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Tarjeta de Acento (Estilo cristal/turquesa) */}
            <div className="md:col-span-6 md:col-start-7 lg:col-span-4 lg:col-start-9 bg-[#0e7490]/90 backdrop-blur-md rounded-2xl sm:rounded-3xl p-5 sm:p-8 shadow-2xl border border-cyan-400/20 animate-fade-in-up delay-400">
              <p className="text-sm text-cyan-50 font-medium leading-relaxed">
                Con un Entrenador Personal Online tendrás todos los beneficios de un entrenador presencial, pero con la flexibilidad de poder hacerlo todo a distancia gracias a la App Lógica Fit.
              </p>
            </div>

          </div>
        </div>
      </div>
    </section>
  )
}