import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* =====================================================
          IMAGEN

          MOBILE:
          Imagen independiente arriba.

          DESKTOP:
          La imagen pasa a ser fondo del hero.
      ====================================================== */}
      <div className="relative h-[48vh] min-h-[340px] w-full sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
        <img
          src="/brand/alberto-gym.jpg"
          alt="Alberto García, entrenador personal Lógica Fit"
          fetchPriority="high"
          className="
            h-full
            w-full
            object-cover
            object-[74%_0%]
            sm:object-[68%_18%]
          "
        />

        {/* Mobile: integración de la foto con el bloque navy */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy to-transparent sm:hidden" />

        {/* Desktop: overlay general muy ligero */}
        <div className="absolute inset-0 hidden bg-navy/15 sm:block" />

        {/* Desktop: oscurecimiento solo en la zona del texto */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy/95 via-navy/55 via-[42%] to-transparent to-[74%] sm:block" />
      </div>

      {/* =====================================================
          CONTENIDO
      ====================================================== */}
      <div className="relative z-10 bg-navy px-6 pb-14 pt-8 sm:flex sm:min-h-[760px] sm:items-center sm:bg-transparent sm:pb-20 sm:pt-32 lg:px-8">
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-[760px]">
            {/* Eyebrow */}
            <p className="text-xs font-bold uppercase tracking-[0.22em] text-orange sm:text-sm">
              Entrenamiento personal online
            </p>

            {/* Titular */}
            <h1 className="mt-5 font-display text-[3.25rem] font-extrabold leading-[0.95] tracking-[-0.045em] text-white sm:text-6xl lg:text-[5.3rem]">
              Entrena con lógica.
              <br />
              <span className="brand-gradient-text">Progresa de verdad.</span>
            </h1>

            {/* Descripción */}
            <p className="mt-7 max-w-2xl text-lg font-medium leading-relaxed text-slate-200 sm:text-xl">
              Entrenamiento y nutrición personalizados para personas que quieren
              mejorar de verdad sin vivir para el gimnasio.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Link
                to="/planes"
                className="brand-button inline-flex min-h-14 items-center justify-center rounded-full px-8 text-sm font-extrabold"
              >
                Quiero empezar
              </Link>

              <Link
                to="/conoceme"
                className="inline-flex min-h-14 items-center justify-center rounded-full border border-white/20 bg-white/5 px-8 text-sm font-bold text-white backdrop-blur-sm transition duration-300 hover:bg-white/10"
              >
                Conocer mi método
              </Link>
            </div>

            {/* Datos de confianza */}
            <div className="mt-10 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/15 pt-7">
              <div>
                <p className="text-2xl font-extrabold text-white">+20 años</p>

                <p className="mt-1 text-sm text-slate-300">
                  entrenando y aprendiendo
                </p>
              </div>

              <div className="hidden h-10 w-px bg-white/15 sm:block" />

              <div>
                <p className="text-2xl font-extrabold text-white">100 %</p>

                <p className="mt-1 text-sm text-slate-300">adaptado a ti</p>
              </div>

              <div className="hidden h-10 w-px bg-white/15 sm:block" />

              <div>
                <p className="text-2xl font-extrabold text-white">1 a 1</p>

                <p className="mt-1 text-sm text-slate-300">
                  seguimiento conmigo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
