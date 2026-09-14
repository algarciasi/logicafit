import Faq from "../components/Faq"
import PageHero from "../components/PageHero"

const WHATSAPP = "https://wa.me/34678951544"

const messages = {
  oneToOne: encodeURIComponent(
    "Hola Alberto. He visto el seguimiento 1:1 de Lógica Fit y me gustaría contarte mi caso."
  ),
  selfPaced: encodeURIComponent(
    'Hola Alberto. He visto el plan "A tu ritmo" de Lógica Fit y me gustaría saber si encaja conmigo.'
  ),
  doubt: encodeURIComponent(
    "Hola Alberto. He visto los planes de Lógica Fit y no tengo claro cuál encaja mejor conmigo."
  ),
}

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

function DotItem({ children, muted = false, light = false }) {
  return (
    <li
      className={`flex items-start gap-3 text-[15px] leading-7 ${
        light
          ? "text-slate-200"
          : muted
            ? "text-slate-400"
            : "text-slate-700"
      }`}
    >
      <span
        className={`mt-[11px] h-1.5 w-1.5 shrink-0 rounded-full ${
          muted ? "bg-slate-300" : "bg-orange"
        }`}
      />
      <span>{children}</span>
    </li>
  )
}

export default function Planes() {
  return (
    <main className="overflow-hidden bg-white">
      <PageHero
        image="/brand/alberto-2.jpg"
        imageAlt="Alberto García entrenando"
        eyebrow="MI PLAN"
        title="Una forma sencilla de tomarte en serio"
        accent="tu progreso."
        description="Puedes trabajar directamente conmigo o llevar tu planificación por tu cuenta. Tú decides cuánto acompañamiento necesitas."
        /* MOBILE: prioriza la cabeza y recorta más por abajo */
        mobileObjectPosition="object-[60%_0%]"
        mobileImageHeight="h-[52vh] min-h-[390px]"

        /* DESKTOP */
        objectPosition="sm:object-[68%_25%]"
      >
        <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
          <span>Sin permanencia</span>
          <span className="text-white/20">•</span>
          <span>App Lógica Fit incluida</span>
          <span className="text-white/20">•</span>
          <span>14 días de garantía</span>
        </div>
      </PageHero>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-16 sm:py-20 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-orange">
                Dos formas de trabajar
              </p>

              <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.07] tracking-[-0.035em] text-navy sm:text-4xl lg:text-5xl">
                Elige el nivel de seguimiento que necesitas.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-7 text-text-secondary">
                Si quieres que revise y adapte tu proceso, trabajamos 1:1. Si ya
                eres autónomo entrenando, puedes hacerlo a tu ritmo.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-navy text-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-orange">
                Seguimiento personal
              </p>

              <h2 className="mt-5 font-display text-4xl font-extrabold leading-none tracking-[-0.04em] sm:text-5xl">
                Entrenamiento
                <br />
                1:1
              </h2>

              <div className="mt-9 flex items-end gap-2">
                <span className="font-display text-5xl font-extrabold tracking-[-0.04em]">
                  35 €
                </span>
                <span className="pb-1.5 text-sm text-slate-400">/ mes</span>
              </div>

              <p className="mt-2 text-sm text-slate-400">Sin permanencia.</p>
            </div>

            <div className="lg:col-span-4">
              <p className="text-xl font-medium leading-8 text-white">
                Tú entrenas. Yo me encargo de que el plan siga teniendo sentido.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-300">
                Preparo tu planificación según tu objetivo, experiencia,
                disponibilidad y situación actual. Después revisamos cómo
                respondes y voy adaptando el proceso contigo.
              </p>

              <p className="mt-5 text-base leading-7 text-slate-300">
                No recibes una rutina para desaparecer un mes. Hay seguimiento,
                ajustes y contacto conmigo.
              </p>
            </div>

            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-slate-400">
                Trabajaremos con
              </p>

              <ul className="mt-5 space-y-2">
                <DotItem light>Entrenamiento personalizado</DotItem>
                <DotItem light>Pautas de alimentación flexibles</DotItem>
                <DotItem light>Seguimiento semanal</DotItem>
                <DotItem light>Ajustes según tu evolución</DotItem>
                <DotItem light>Contacto directo por WhatsApp</DotItem>
                <DotItem light>App Lógica Fit</DotItem>
                <DotItem light>Registro de cargas y progreso</DotItem>
                <DotItem light>Sincronización con Strava</DotItem>
              </ul>

              <a
                href={`${WHATSAPP}?text=${messages.oneToOne}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-colors hover:bg-orange-dark"
              >
                Quiero trabajar contigo
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-text-secondary">
                Sin seguimiento personal
              </p>

              <h2 className="mt-5 font-display text-4xl font-extrabold leading-none tracking-[-0.04em] text-navy sm:text-5xl">
                A tu
                <br />
                ritmo
              </h2>

              <div className="mt-9 flex items-end gap-2">
                <span className="font-display text-5xl font-extrabold tracking-[-0.04em] text-navy">
                  20 €
                </span>
                <span className="pb-1.5 text-sm text-text-secondary">/ mes</span>
              </div>

              <p className="mt-2 text-sm text-text-secondary">Sin permanencia.</p>
            </div>

            <div className="lg:col-span-4">
              <p className="text-xl font-medium leading-8 text-navy">
                Para quien ya sabe entrenar y no necesita que esté pendiente
                cada semana.
              </p>

              <p className="mt-5 text-base leading-7 text-text-secondary">
                Tienes una planificación organizada dentro de Lógica Fit y las
                herramientas necesarias para registrar tu trabajo y seguir tu
                evolución.
              </p>

              <p className="mt-5 text-base leading-7 text-text-secondary">
                Tú llevas el proceso. Yo te doy la estructura.
              </p>
            </div>

            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-text-secondary">Incluye</p>

              <ul className="mt-5 space-y-2">
                <DotItem>Planificación estructurada</DotItem>
                <DotItem>Acceso a Lógica Fit</DotItem>
                <DotItem>Rutinas organizadas por días</DotItem>
                <DotItem>Registro de entrenamientos</DotItem>
                <DotItem>Seguimiento de cargas</DotItem>
                <DotItem>Sincronización con Strava</DotItem>
              </ul>

              <div className="mt-7 border-t border-slate-200 pt-6">
                <p className="text-sm font-semibold text-text-secondary">
                  Ten en cuenta
                </p>

                <ul className="mt-3 space-y-1">
                  <DotItem muted>No hay revisiones semanales conmigo</DotItem>
                  <DotItem muted>No incluye ajustes continuos 1:1</DotItem>
                </ul>
              </div>

              <a
                href={`${WHATSAPP}?text=${messages.selfPaced}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-xl border border-navy px-6 text-sm font-bold text-navy transition-colors hover:bg-navy hover:text-white"
              >
                Elegir A tu ritmo
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[#F6F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-24">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <h2 className="font-display text-3xl font-extrabold tracking-tight text-navy sm:text-4xl">
                ¿Cuál elegiría yo?
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <p className="text-lg leading-8 text-text-secondary">
                Si llevas tiempo estancado, no sabes cómo organizar tu
                entrenamiento o necesitas que alguien revise lo que haces,
                elegiría el <strong className="font-semibold text-navy">1:1</strong>.
              </p>

              <p className="mt-5 text-lg leading-8 text-text-secondary">
                Si ya tienes experiencia, sabes gestionar tu entrenamiento y
                principalmente buscas una estructura clara,{" "}
                <strong className="font-semibold text-navy">A tu ritmo</strong>{" "}
                probablemente sea suficiente.
              </p>

              <p className="mt-7 text-base leading-7 text-text-secondary">
                Si no lo tienes claro, cuéntame tu situación y te diré cuál
                elegiría en tu caso.
              </p>

              <a
                href={`${WHATSAPP}?text=${messages.doubt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors hover:text-orange"
              >
                Cuéntame tu caso
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
          <div className="grid gap-4 sm:grid-cols-[180px_1fr] sm:items-start">
            <p className="text-sm font-bold text-navy">14 días de garantía</p>

            <p className="max-w-3xl text-sm leading-6 text-text-secondary">
              Si durante las dos primeras semanas ves que mi forma de trabajar
              no encaja contigo, me lo dices y te devuelvo el importe. Quiero
              que continúes porque el servicio te aporta valor, no porque estés
              atado.
            </p>
          </div>
        </div>
      </section>

      <Faq />

      <section className="bg-navy">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
          <div className="relative min-h-[420px] lg:col-span-5 lg:min-h-[560px]">
            <img
              src="/brand/alberto-gym.jpg"
              alt="Alberto García, entrenador personal Lógica Fit"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_25%]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent lg:bg-gradient-to-r lg:from-transparent lg:to-navy/30" />
          </div>

          <div className="flex items-center px-6 py-20 lg:col-span-7 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <h2 className="font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl">
                ¿No sabes cuál encaja contigo?
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Dime cuál es tu objetivo, cuánto tiempo puedes entrenar y en qué
                punto estás ahora. Te diré qué opción tiene sentido para ti.
              </p>

              <p className="mt-4 text-sm leading-6 text-slate-400">
                Y si considero que no necesitas seguimiento individual, también
                te lo diré.
              </p>

              <a
                href={`${WHATSAPP}?text=${messages.doubt}`}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-colors hover:bg-orange-dark"
              >
                Hablar con Alberto
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
