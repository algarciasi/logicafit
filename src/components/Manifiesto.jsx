export default function Manifesto() {
  return (
    <section className="bg-[#F7F7F5] py-24 sm:py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-20">
          {/* Columna izquierda */}
          <div className="lg:col-span-5">
            <p className="mb-5 text-xs font-bold uppercase tracking-[0.24em] text-orange sm:text-sm">
              El método Lógica Fit
            </p>

            <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-5xl lg:text-6xl">
              No necesitas
              <br />
              entrenar más.
              <br />
              <span className="text-orange">Necesitas hacerlo mejor.</span>
            </h2>
          </div>

          {/* Columna derecha */}
          <div className="flex flex-col justify-center lg:col-span-6 lg:col-start-7">
            <p className="text-xl font-medium leading-relaxed text-navy sm:text-2xl">
              Lógica Fit no consiste en darte una rutina y esperar que funcione.
            </p>

            <p className="mt-6 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
              Primero entiendo tu objetivo, tu experiencia, tu disponibilidad y
              cómo es realmente tu día a día. A partir de ahí construyo un plan
              de entrenamiento y nutrición que puedas seguir, medir y mejorar.
            </p>

            <p className="mt-5 max-w-2xl text-base leading-8 text-text-secondary sm:text-lg">
              Y cuando algo cambia, el plan también cambia. Porque una
              programación solo tiene sentido si sigue funcionando para ti.
            </p>

            {/* Principios */}
            <div className="mt-10 grid gap-7 border-t border-navy/10 pt-9 sm:grid-cols-3">
              <div>
                <span className="font-display text-sm font-extrabold text-orange">
                  01
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">
                  Personalizado
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  El plan parte de tu situación, no de una plantilla.
                </p>
              </div>

              <div>
                <span className="font-display text-sm font-extrabold text-orange">
                  02
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">
                  Medible
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  Registramos lo que haces para saber qué funciona.
                </p>
              </div>

              <div>
                <span className="font-display text-sm font-extrabold text-orange">
                  03
                </span>
                <h3 className="mt-3 font-display text-lg font-bold text-navy">
                  Ajustable
                </h3>
                <p className="mt-2 text-sm leading-6 text-text-secondary">
                  El entrenamiento evoluciona contigo.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}