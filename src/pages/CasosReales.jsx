import { Link } from 'react-router-dom'

// ==========================================
// 1. DATOS DE GOOGLE (Modifica esto)
// ==========================================

// TODO: Actualiza estos datos con los de tu ficha real. 
// Si prefieres no mostrar el número total o la media, ponlos a null.
const googleStats = {
  average: 5, // ej: "4,9" (con comillas)
  totalReviews: 1, // ej: 14
  profileUrl: "https://share.google/fS5hmzOGLKacNEOm6" // Sustituye por tu enlace genérico de Google
}

// TODO: Rellena este array copiando y pegando LITERALMENTE lo que dicen tus clientes.
// Si solo tienes 1 o 2 por ahora, borra el resto. El diseño se adaptará solo.
const googleReviews = [
  {
    id: 1,
    name: 'Miguel Angel', // <-- CAMBIAR POR NOMBRE REAL
    rating: 5,
    text: '"Más que un entrenador, un gran motivador. Empecé desde cero, con mucha inseguridad, y Alberto me hizo sentir cómodo desde el minuto uno. Tiene muchísima paciencia, te explica el porqué de cada ejercicio y los resultados se notan rapidísimo. El mejor dinero invertido en salud. ¡Gracias!"', // <-- CAMBIAR POR TEXTO REAL
    date: 'Agosto 2026', // <-- CAMBIAR POR FECHA REAL (ej: "hace 2 meses")
    url: 'https://share.google/948pc6VOf5elULBtV' // Este es el enlace que me pasaste
  },
  // Descomenta y rellena estos bloques conforme tengas más reseñas
  /*
  {
    id: 2,
    name: 'Nombre real 2',
    rating: 5,
    text: '"Texto real de la reseña 2..."',
    date: 'hace X meses',
    url: 'URL_OPCIONAL_DE_LA_RESEÑA'
  },
  {
    id: 3,
    name: 'Nombre real 3',
    rating: 5,
    text: '"Texto real de la reseña 3..."',
    date: 'hace X meses',
    url: 'URL_OPCIONAL_DE_LA_RESEÑA'
  }
  */
]

export default function CasosReales() {
  return (
    <div className="bg-white py-16 sm:py-24">
      
      {/* ENCABEZADO */}
      <section className="mx-auto max-w-3xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange">
          Resultados y opiniones
        </p>
        <h1 className="mt-4 font-display text-3xl font-extrabold text-navy sm:text-5xl">
          Menos ruido. Más progreso.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-slate-600">
          No creo en transformaciones mágicas ni en soluciones rápidas. Entrenamiento, constancia y un plan que se adapte a tu vida.
        </p>
      </section>

      {/* BLOQUE DE RESEÑAS */}
      <section className="mx-auto mt-20 max-w-5xl px-6">
        
        {/* Resumen Google */}
        <div className="mb-16 flex flex-col items-center justify-center space-y-3">
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50">
            <svg className="h-6 w-6" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
          </div>
          
          {googleStats.average && googleStats.totalReviews ? (
            <div className="text-center">
               <div className="mb-1 flex justify-center text-yellow-400">
                 {[...Array(5)].map((_, i) => (
                    <svg key={i} className="h-5 w-5 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                  ))}
               </div>
               <p className="text-sm font-medium text-navy">{googleStats.average} sobre 5</p>
               <p className="text-xs text-slate-500">Basado en {googleStats.totalReviews} reseñas</p>
            </div>
          ) : (
            <p className="text-sm font-medium text-navy">Opiniones de clientes en Google</p>
          )}

          <a 
            href={googleStats.profileUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            className="mt-2 inline-flex items-center text-sm font-semibold text-orange transition hover:text-orange/80"
          >
            Ver reseñas en Google <span aria-hidden="true" className="ml-1">→</span>
          </a>
        </div>

        {/* Grid Orgánico de Reseñas (Sin aspecto de tarjeta pesada) */}
        {googleReviews.length > 0 && (
          <div className="grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
            {googleReviews.map((review) => (
              <div key={review.id} className="flex flex-col border-t border-slate-100 pt-8 sm:border-t-0 sm:border-l sm:pl-8 sm:pt-0 first:border-0 first:pt-0 first:pl-0 sm:first:border-l-0">
                <div className="flex items-center gap-3">
                  {/* Avatar inicial natural */}
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-sm font-bold text-navy">
                    {review.name.charAt(0)}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-navy">{review.name}</p>
                    <div className="flex text-yellow-400">
                      {[...Array(review.rating)].map((_, i) => (
                        <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                      ))}
                    </div>
                  </div>
                </div>
                
                <p className="mt-5 flex-1 text-sm leading-relaxed text-slate-700">
                  {review.text}
                </p>
                
                <div className="mt-6 flex items-center justify-between text-xs text-slate-500">
                  <span>Google · {review.date}</span>
                  {review.url && (
                    <a 
                      href={review.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="font-medium text-slate-400 transition hover:text-slate-600"
                    >
                      Ver en Google →
                    </a>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 
        ==================================================
        CASO REAL DESTACADO (OCULTO HASTA QUE TENGAS DATOS)
        ==================================================
        No he inventado ningún caso. 
        Cuando tengas los datos, fotos y progreso REAL de un cliente, 
        descomenta este bloque y rellénalo.
      */}
      {/*
      <section className="mx-auto mt-24 max-w-4xl px-6">
        <div className="my-16 border-t border-slate-100"></div>
        
        <p className="mb-8 text-xs font-semibold uppercase tracking-widest text-orange text-center md:text-left">
          Un caso real
        </p>

        <div className="flex flex-col gap-10 md:flex-row md:items-start">
          <div className="md:w-1/3">
             <div className="aspect-square w-full overflow-hidden rounded-2xl bg-slate-100">
               // Imagen opcional aquí: 
               // <img src="/foto-cliente.jpg" alt="Nombre del cliente" className="h-full w-full object-cover" />
             </div>
          </div>
          <div className="md:w-2/3">
             <h3 className="font-display text-2xl font-bold text-navy">Nombre del Cliente Real</h3>
             <blockquote className="mt-4 text-lg italic text-slate-600">
               "Frase literal del cliente sobre su mayor frustración inicial o gran logro."
             </blockquote>
             
             <div className="mt-8 space-y-6 text-sm text-slate-700">
               <div>
                 <h4 className="font-bold text-navy">Punto de partida</h4>
                 <p className="mt-1">Descripción real de cómo llegó a ti (ej: estancado, con molestias...).</p>
               </div>
               <div>
                 <h4 className="font-bold text-navy">Qué cambiamos</h4>
                 <p className="mt-1">Lo que ajustaste en su plan o mentalidad.</p>
               </div>
               <div>
                 <h4 className="font-bold text-navy">El resultado</h4>
                 <ul className="mt-1 list-inside list-disc space-y-1">
                   <li>Hito real 1</li>
                   <li>Hito real 2</li>
                 </ul>
               </div>
             </div>
          </div>
        </div>
      </section>
      */}

      {/* CTA FINAL HUMANO */}
      <section className="mx-auto mt-24 max-w-3xl px-6 pb-12 text-center">
        <div className="rounded-3xl bg-navy px-8 py-16 sm:px-12">
          <h2 className="font-display text-2xl font-extrabold text-white sm:text-3xl">
            Cuéntame tu caso y vemos si encaja
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-slate-300">
            Escríbeme por WhatsApp, cuéntame qué quieres conseguir y te digo cómo lo plantearía.
          </p>
          <a
            href="https://wa.me/34678951544?text=Hola!%20He%20visto%20las%20opiniones%20y%20me%20gustar%C3%ADa%20contarte%20mi%20caso"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white transition hover:brightness-95"
          >
            Hablar con Alberto
          </a>
        </div>
      </section>
    </div>
  )
}