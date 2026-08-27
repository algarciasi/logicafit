import WhatsappPreview from './WhatsappPreview'

export default function AccompanimentSection() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div className="order-2 md:order-1">
          <WhatsappPreview />
        </div>

        <div className="order-1 md:order-2">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Acompañamiento real
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Así es el día a día con mis clientes
          </h2>
          <p className="mt-4 max-w-md text-text-secondary">
            No te mando un plan cerrado y desaparezco. Cuando la vida se
            complica, el plan se adapta contigo y no al revés. Si necesitas 
            cambiar algún alimento por viajes, trabajo, ocio, etc... 
            lo adaptamos sin problema.
            Así es hablar conmigo un día cualquiera.
          </p>
        </div>
      </div>
    </section>
  )
}