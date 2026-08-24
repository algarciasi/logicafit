import { Link } from 'react-router-dom'
import BrowserFrame from './demo/BrowserFrame'
import InicioTab from './demo/tabs/InicioTab'

export default function DemoPreview() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Así es tu día a día
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Pruébalo tú mismo, sin registrarte
          </h2>
          <p className="mt-4 max-w-md text-text-secondary">
            Nada de PDFs ni Excel. Tu próximo entreno, tu peso, tus macros y
            tu plan de comidas, todo en un mismo sitio y claro de un vistazo.
          </p>
          <Link
            to="/demo"
            className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
          >
            Ver la demo interactiva →
          </Link>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-orange-light/30 blur-2xl" />
          <div className="pointer-events-none scale-95 opacity-95">
            <BrowserFrame compact>
              <InicioTab />
            </BrowserFrame>
          </div>
        </div>
      </div>
    </section>
  )
}