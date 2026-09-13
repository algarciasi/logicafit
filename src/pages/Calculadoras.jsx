import { Link } from "react-router-dom"
import PageHero from "../components/PageHero"

function ArrowIcon() {
  return (
    <svg
      viewBox="0 0 20 20"
      fill="none"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        d="M3 10h13M11 5l5 5-5 5"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

export default function Calculadoras() {
  return (
    <main className="overflow-hidden bg-white">
      <PageHero
        image="/brand/macros-calc.jpg"
        imageAlt="Alimentos utilizados para planificación nutricional"
        eyebrow="Herramientas gratuitas"
        title="Los números ayudan."
        accent="Entenderlos ayuda más."
        description="Calcula tus necesidades nutricionales o tus ritmos de carrera con herramientas sencillas para tomar mejores decisiones."
        objectPosition="sm:object-[72%_42%]"
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-orange">
                Calculadoras Lógica Fit
              </p>

              <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.07] tracking-[-0.035em] text-navy sm:text-4xl lg:text-5xl">
                Dos herramientas.
                <br />
                Dos problemas concretos.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-7 text-text-secondary">
                No necesitas veinte métricas. Necesitas calcular lo importante
                y entender qué hacer después con el resultado.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-2">
              <span className="font-display text-sm font-bold text-orange">01</span>
              <p className="mt-3 text-sm text-text-secondary">Nutrición</p>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-5xl">
                Calculadora
                <br />
                de macros
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
                Estima las calorías que necesitas cada día y obtén una
                distribución de proteínas, grasas e hidratos adaptada a tu
                objetivo.
              </p>

              <Link
                to="/calculadora"
                className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors hover:text-orange"
              >
                Calcular mis macros
                <ArrowIcon />
              </Link>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-sm font-semibold text-text-secondary">
                Qué puedes calcular
              </p>

              <div className="mt-5 divide-y divide-slate-200 border-y border-slate-200">
                <div className="py-4">
                  <p className="font-medium text-navy">Calorías diarias estimadas</p>
                </div>
                <div className="py-4">
                  <p className="font-medium text-navy">Proteínas</p>
                </div>
                <div className="py-4">
                  <p className="font-medium text-navy">Grasas</p>
                </div>
                <div className="py-4">
                  <p className="font-medium text-navy">Hidratos de carbono</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-2">
              <span className="font-display text-sm font-bold text-orange">02</span>
              <p className="mt-3 text-sm text-text-secondary">Running</p>
            </div>

            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-5xl">
                Calculadora
                <br />
                de ritmo
              </h2>

              <p className="mt-6 max-w-xl text-lg leading-8 text-text-secondary">
                Utiliza una marca reciente para estimar tus tiempos de carrera
                y tener una referencia clara de los ritmos que puedes manejar
                entrenando.
              </p>

              <Link
                to="/calculadora-running"
                className="mt-8 inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors hover:text-orange"
              >
                Calcular mis ritmos
                <ArrowIcon />
              </Link>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-sm font-semibold text-text-secondary">
                Qué puedes obtener
              </p>

              <div className="mt-5 divide-y divide-slate-300 border-y border-slate-300">
                <div className="py-4">
                  <p className="font-medium text-navy">Ritmo medio</p>
                </div>
                <div className="py-4">
                  <p className="font-medium text-navy">Predicción de tiempos</p>
                </div>
                <div className="py-4">
                  <p className="font-medium text-navy">
                    Ritmos orientativos de entrenamiento
                  </p>
                </div>
                <div className="py-4">
                  <p className="font-medium text-navy">
                    Referencias para tu próximo objetivo
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="border-y border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-14 lg:px-8">
          <div className="grid gap-5 sm:grid-cols-[200px_1fr]">
            <p className="text-sm font-bold text-navy">
              Una referencia, no una sentencia
            </p>

            <p className="max-w-3xl text-sm leading-6 text-text-secondary">
              Los resultados de estas calculadoras son estimaciones y sirven
              como punto de partida. Tu respuesta real al entrenamiento, tu
              alimentación y tu evolución son los datos que terminan marcando
              los ajustes.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-orange">
                ¿Quieres ir un paso más allá?
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl">
                Calcular es fácil.
                <br />
                Aplicarlo bien es otra cosa.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-7 text-slate-300">
                Si quieres que esos números formen parte de una planificación
                adaptada a ti, puedo ayudarte a convertirlos en un plan.
              </p>

              <Link
                to="/planes"
                className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-orange"
              >
                Ver cómo trabajo
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
