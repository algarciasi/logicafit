import { Link } from 'react-router-dom'

// ==========================================
// 1. DATOS DE GOOGLE
// ==========================================
const googleStats = {
  average: "5,0", 
  totalReviews: 1, 
  profileUrl: "https://share.google/fS5hmzOGLKacNEOm6" 
}

const googleReviews = [
  {
    id: 1,
    name: 'Miguel Angel',
    rating: 5,
    text: '"Más que un entrenador, un gran motivador. Empecé desde cero, con mucha inseguridad, y Alberto me hizo sentir cómodo desde el minuto uno. Tiene muchísima paciencia, te explica el porqué de cada ejercicio y los resultados se notan rapidísimo. El mejor dinero invertido en salud. ¡Gracias!"', 
    date: 'Agosto 2026', 
    url: 'https://share.google/948pc6VOf5elULBtV' 
  }
]

// Array con las fotos
const fotosCambios = [
  'cambio1a.jpg', 'cambio1b.jpg', 
  'cambio2a.jpg', 'cambio2b.jpg', 
  'cambio3a.jpg', 'cambio3b.jpg', 
]

export default function CasosReales() {
  return (
    <div className="bg-surface overflow-hidden">
      
      {/* 1. HERO INVERTIDO: CARRUSEL ARRIBA, TEXTO ABAJO */}
      <section className="relative w-full pt-32 pb-24 bg-navy border-b-[12px] border-orange flex flex-col items-center">
        
        {/* A. EL CARRUSEL (Protagonista visual en la parte superior) */}
        <div className="relative w-full mb-16 animate-fade-in-up">
          
          {/* Degradados laterales para que las fotos aparezcan y desaparezcan suavemente */}
          <div className="absolute left-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-r from-navy to-transparent z-10 pointer-events-none" />
          <div className="absolute right-0 top-0 bottom-0 w-16 sm:w-40 bg-gradient-to-l from-navy to-transparent z-10 pointer-events-none" />

          <div className="overflow-hidden flex w-full">
            <div className="flex w-max animate-marquee items-center gap-4 sm:gap-6 px-4">
              {[...fotosCambios, ...fotosCambios].map((foto, idx) => (
                <div 
                  key={idx} 
                  className="shrink-0 w-[240px] sm:w-[320px] aspect-[4/5] rounded-[2rem] overflow-hidden bg-slate-800 shadow-[0_20px_40px_rgba(0,0,0,0.5)] border border-white/10 transition-transform duration-500 hover:-translate-y-2"
                >
                  <img 
                    src={`/brand/${foto}`} 
                    alt={`Caso real de cliente ${idx}`} 
                    className="w-full h-full object-cover transition-transform duration-700 hover:scale-105"
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* B. TEXTO DEL HERO (Centrado e imponente en la parte inferior) */}
        <div className="relative z-20 mx-auto max-w-4xl px-6 text-center animate-fade-in-up delay-200">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange mb-6">
            Resultados Reales
          </p>
          <h1 className="font-display text-5xl font-extrabold text-white sm:text-6xl lg:text-7xl tracking-tight leading-[1.05]">
            Menos ruido.<br />
            Más progreso.
          </h1>
          <p className="mx-auto mt-8 text-lg sm:text-xl text-slate-300 font-medium leading-relaxed max-w-2xl">
            No vendo transformaciones mágicas de 30 días porque no son reales. Esto es entrenamiento, constancia y un plan lógico adaptado a tu día a día.
          </p>
        </div>
      </section>

      {/* 2. RESEÑAS DE GOOGLE */}
      <section className="mx-auto mt-24 max-w-7xl px-6 lg:px-8">
        
        <div className="mb-16 flex flex-col items-center justify-center gap-4">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-navy text-center">
            Opiniones de clientes
          </p>
          <div className="flex items-center gap-4 bg-surface-soft px-6 py-4 rounded-full border border-slate-100 shadow-sm">
            <svg className="h-6 w-6 shrink-0" viewBox="0 0 24 24">
              <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
              <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
              <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
              <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
            </svg>
            <div className="flex items-center gap-2">
              <span className="font-display font-bold text-navy text-lg">{googleStats.average}</span>
              <div className="flex text-yellow-400">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="h-4 w-4 fill-current" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                ))}
              </div>
            </div>
          </div>
          <a href={googleStats.profileUrl} target="_blank" rel="noopener noreferrer" className="text-sm font-bold text-text-secondary hover:text-navy transition-colors border-b border-transparent hover:border-navy pb-0.5 mt-2">
            {googleStats.totalReviews === 1 ? 'Leer la reseña en Google →' : `Leer las ${googleStats.totalReviews} reseñas en Google →`}
          </a>
        </div>

        {/* Grid Editorial de Reseñas */}
        {googleReviews.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {googleReviews.map((review) => (
              <div key={review.id} className="flex flex-col justify-between bg-surface-soft p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
                <div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="h-12 w-12 shrink-0 rounded-full bg-white flex items-center justify-center shadow-sm text-navy font-display font-bold text-lg border border-slate-100">
                      {review.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-display font-bold text-navy">{review.name}</p>
                      <p className="text-xs font-medium text-text-secondary">{review.date}</p>
                    </div>
                  </div>
                  <p className="text-base leading-relaxed text-navy/80 font-medium italic">
                    {review.text}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* 3. CTA FINAL */}
      <section className="mx-auto mt-32 max-w-4xl px-6 pb-32 text-center">
        <div className="rounded-[3rem] bg-navy px-8 py-16 shadow-2xl shadow-navy/20 relative overflow-hidden">
          {/* Brillo sutil de fondo */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -mt-24 h-48 w-48 rounded-full bg-orange opacity-20 blur-[80px]"></div>
          
          <div className="relative z-10 flex flex-col items-center">
            <img src="/brand/alberto-gym.jpg" alt="Alberto" className="h-20 w-20 rounded-full object-cover shadow-lg mb-6 border-4 border-white/10" />
            <h2 className="font-display text-3xl font-extrabold text-white sm:text-4xl tracking-tight">
              ¿Listo para empezar tu cambio?
            </h2>
            <p className="mt-4 text-lg text-slate-300 max-w-lg font-medium">
              Escríbeme directamente por WhatsApp. Dime en qué punto estás, qué quieres conseguir y te seré sincero sobre si puedo ayudarte.
            </p>
            <a
              href="https://wa.me/34678951544?text=Hola!%20He%20visto%20las%20opiniones%20y%20me%20gustar%C3%ADa%20contarte%20mi%20caso"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-8 inline-flex items-center gap-3 rounded-full bg-[#25D366] px-8 py-4 text-base font-bold text-white shadow-lg shadow-[#25D366]/20 transition-all hover:scale-105 hover:bg-[#20b858]"
            >
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.347-.272.273-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.82 9.82 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/></svg>
              Hablar con Alberto
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}