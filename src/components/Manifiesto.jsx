export default function Manifesto() {
  return (
    <section className="bg-surface-soft py-32">
      <div className="mx-auto max-w-4xl px-6 text-center">
        
        <h2 className="font-display text-4xl font-extrabold leading-[1.1] text-navy tracking-tight sm:text-5xl lg:text-6xl">
          No hay plantillas.<br />
          No hay PDFs genéricos.<br />
          <span className="text-orange">Hay lógica.</span>
        </h2>
        
        <div className="mx-auto mt-10 max-w-2xl space-y-6">
          <p className="text-lg sm:text-xl leading-relaxed text-text-secondary font-medium">
            Lógica Fit es entrenamiento y nutrición personalizada <strong className="text-navy">de verdad</strong>.
          </p>
          <p className="text-lg sm:text-xl leading-relaxed text-text-secondary">
            Todo tu plan organizado en mi propia app, con tus datos reales y conmigo acompañándote cada semana para garantizar que avanzas.
          </p>
        </div>

        <div className="mt-12 flex justify-center">
          <div className="h-1 w-16 bg-orange rounded-full"></div>
        </div>

      </div>
    </section>
  )
}