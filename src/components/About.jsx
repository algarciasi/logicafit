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

const WHATSAPP =
  "https://wa.me/34678951544?text=" +
  encodeURIComponent(
    "Hola Alberto. He leído tu historia en Lógica Fit y me gustaría contarte mi caso."
  )

const FORMACION = [
  "Curso de Entrenador Personal de Alto Rendimiento y Técnicas Avanzadas de Musculación",
  "Máster en Nutrición Deportiva de Alto Rendimiento y Dietética Avanzada",
  "Máster en Suplementación Deportiva",
  "Especialista en Running, Trail Running y Barefoot",
]

const PRINCIPIOS = [
  {
    number: "01",
    title: "Tu vida manda.",
    text: "La rutina y la alimentación tienen que encajar en tu vida. No al revés.",
  },
  {
    number: "02",
    title: "Cambiar por cambiar no sirve.",
    text: "No modifico ejercicios para entretenerte. Cambio lo que necesita ser cambiado.",
  },
  {
    number: "03",
    title: "Quiero que entiendas el proceso.",
    text: "Prefiero explicarte por qué hacemos algo antes que pedirte que sigas instrucciones a ciegas.",
  },
  {
    number: "04",
    title: "Lo que no funciona, se ajusta.",
    text: "El plan no es intocable. Analizamos, medimos y corregimos cuando hace falta.",
  },
]

export default function Conoceme() {
  return (
    <main className="overflow-hidden bg-white">
      <PageHero
        image="/brand/alberto-4.jpg"
        imageAlt="Alberto García, entrenador personal de Lógica Fit"
        eyebrow="Sobre mí"
        title="Más de 20 años entrenando."
        accent="Y sigo aprendiendo."
        description="Antes de dedicarme a ayudar a otras personas pasé muchos años intentando mejorar yo mismo, equivocándome, probando y aprendiendo."
        secondary="Lógica Fit nace de esa experiencia, pero también de entender que experiencia y conocimiento no son exactamente lo mismo."

        /* MOBILE:
           Subimos el encuadre para que la cabeza quede visible
           y damos algo más de altura a la imagen.
        */
        mobileObjectPosition="object-[50%_8%]"
        mobileImageHeight="h-[48vh] min-h-[360px]"

        /* DESKTOP */
        objectPosition="sm:object-[72%_18%]"
      >
        <Link
          to="/planes"
          className="inline-flex items-center gap-3 text-sm font-bold text-white transition-colors hover:text-orange"
        >
          Ver cómo trabajo
          <ArrowIcon />
        </Link>
      </PageHero>

      {/* HISTORIA */}
      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-14 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-orange">
                Antes de Lógica Fit
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-navy sm:text-5xl">
                Esto empezó mucho antes de ser entrenador.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-6 text-lg leading-8 text-text-secondary">
                <p>
                  Empecé a entrenar hace más de veinte años. Al principio no
                  buscaba convertirme en entrenador ni dedicarme profesionalmente
                  a esto. Simplemente encontré en el gimnasio un lugar al que
                  quería volver.
                </p>

                <p>
                  Durante todos estos años he pasado por muchas etapas. He
                  cambiado rutinas, probado sistemas de entrenamiento, aprendido
                  sobre alimentación y también me he equivocado muchas veces.
                </p>

                <p>
                  Esos errores forman parte de lo que hoy sé. No nací sabiendo
                  entrenar y ni siquiera fui siempre una persona especialmente
                  deportista. Lo fui construyendo con los años.
                </p>
              </div>

              <p className="mt-10 border-l-2 border-orange pl-6 font-display text-2xl font-bold leading-snug text-navy">
                La experiencia te enseña mucho. Pero también llega un momento en
                que necesitas entender por qué funcionan las cosas.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* YO TAMBIÉN TENGO ENTRENADOR */}
      <section className="bg-[#F6F5F2]">
        <div className="mx-auto grid max-w-7xl lg:grid-cols-12">
          <div className="relative min-h-[440px] lg:col-span-6 lg:min-h-[680px]">
            <img
              src="/brand/alberto-gym.jpg"
              alt="Alberto entrenando"
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover object-[center_30%]"
            />
          </div>

          <div className="flex items-center px-6 py-20 sm:px-12 lg:col-span-6 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-orange">
                Seguimiento
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-navy sm:text-5xl">
                Sí.
                <br />
                Yo también tengo entrenador.
              </h2>

              <p className="mt-7 text-lg leading-8 text-text-secondary">
                Después de más de veinte años entrenando sigo pensando que
                merece la pena contar con alguien que vea el proceso desde fuera.
              </p>

              <p className="mt-5 text-base leading-7 text-text-secondary">
                Cuando eres tú quien lleva tu propia planificación resulta muy
                fácil perder perspectiva, cambiar cosas demasiado pronto o
                dejarte llevar por cómo te encuentras ese día.
              </p>

              <p className="mt-5 text-base leading-7 text-text-secondary">
                Tener un entrenador permite analizar las cosas con más
                objetividad, rendir cuentas y mantener el rumbo cuando llegan
                semanas peores.
              </p>

              <p className="mt-7 font-display text-xl font-bold leading-relaxed text-navy">
                Creo en el seguimiento porque yo también lo utilizo.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* FORMACIÓN */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-12 lg:items-start">
            <div className="lg:col-span-6">
              <p className="text-sm font-semibold text-orange">
                Formación
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-navy sm:text-5xl">
                Entrenar durante años
                <br />
                no era suficiente.
              </h2>

              <div className="mt-7 max-w-xl space-y-5 text-base leading-7 text-text-secondary">
                <p>
                  Una cosa es aprender a entrenarte a ti mismo y otra muy
                  diferente ayudar a otra persona.
                </p>

                <p>
                  Llegó un momento en el que quise comprender mejor la
                  biomecánica, la programación, la nutrición deportiva y las
                  herramientas necesarias para adaptar un entrenamiento a
                  personas distintas.
                </p>

                <p>
                  No quería limitarme a recomendar aquello que me había
                  funcionado a mí.
                </p>
              </div>

              <div className="mt-12 border-t border-slate-200">
                {FORMACION.map((item, index) => (
                  <div
                    key={item}
                    className="grid grid-cols-[36px_1fr] gap-4 border-b border-slate-200 py-5"
                  >
                    <span className="pt-1 text-xs font-bold text-orange">
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    <p className="font-medium leading-6 text-navy">
                      {item}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            <figure className="lg:col-span-5 lg:col-start-8">
              <div className="aspect-[4/5] overflow-hidden bg-slate-100">
                <img
                  src="/brand/estudiando.jpg"
                  alt="Alberto estudiando entrenamiento y nutrición deportiva"
                  loading="lazy"
                  decoding="async"
                  className="h-full w-full object-cover object-top"
                />
              </div>

              <figcaption className="mt-4 max-w-md text-sm leading-6 text-text-secondary">
                La experiencia en el gimnasio importa. Entender el porqué de las
                cosas, también.
              </figcaption>
            </figure>
          </div>
        </div>
      </section>

      {/* RESPONSABILIDAD PROFESIONAL */}
      <section className="bg-navy">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <p className="text-sm font-semibold text-orange">
                Responsabilidad profesional
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-white sm:text-5xl">
                Saber ayudar también es saber cuándo derivar.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <div className="space-y-6 text-lg leading-8 text-slate-300">
                <p>
                  Mi especialidad principal es el entrenamiento de fuerza, la
                  composición corporal, la creación de hábitos y el
                  acompañamiento durante el proceso.
                </p>

                <p>
                  Tengo formación en nutrición deportiva, pero{" "}
                  <strong className="font-semibold text-white">
                    no soy Dietista-Nutricionista y no realizo nutrición clínica.
                  </strong>
                </p>

                <p>
                  También tengo conocimientos y experiencia con running, pero
                  cuando alguien busca una preparación avanzada o competitiva
                  muy específica, prefiero derivarlo a profesionales
                  especializados.
                </p>
              </div>

              <blockquote className="mt-10 border-l-2 border-orange pl-6 font-display text-2xl font-bold leading-snug text-white">
                Hacer bien este trabajo también significa reconocer cuándo otro
                profesional puede ayudarte mejor.
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      {/* PRINCIPIOS */}
      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-28 lg:px-8 lg:py-32">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <p className="text-sm font-semibold text-orange">
                Cómo trabajo
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-navy">
                Mi forma de entender el entrenamiento.
              </h2>
            </div>

            <div className="lg:col-span-7 lg:col-start-6">
              <div className="grid gap-x-10 gap-y-12 sm:grid-cols-2">
                {PRINCIPIOS.map((principio) => (
                  <div
                    key={principio.number}
                    className="border-t border-navy/20 pt-5"
                  >
                    <span className="text-xs font-bold text-orange">
                      {principio.number}
                    </span>

                    <h3 className="mt-3 font-display text-xl font-bold text-navy">
                      {principio.title}
                    </h3>

                    <p className="mt-3 text-sm leading-6 text-text-secondary">
                      {principio.text}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APRENDER PARA NO DEPENDER */}
      <section className="border-t border-slate-200 bg-[#F6F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-5">
              <h2 className="font-display text-4xl font-extrabold leading-[1.05] tracking-[-0.035em] text-navy sm:text-5xl">
                No quiero que dependas
                <br />
                de mí para siempre.
              </h2>
            </div>

            <div className="lg:col-span-6 lg:col-start-7">
              <p className="text-lg leading-8 text-text-secondary">
                Quiero ayudarte a mejorar, pero también quiero que durante el
                proceso aprendas. Que entiendas cómo entrenar y cómo comer. Que
                sepas por qué hacemos determinados cambios.
              </p>

              <p className="mt-5 text-lg leading-8 text-text-secondary">
                Quiero que puedas distinguir lo importante de todo el ruido que
                existe alrededor del fitness.
              </p>

              <p className="mt-7 font-display text-xl font-bold leading-relaxed text-navy">
                Porque un buen proceso no debería darte únicamente resultados.
                También debería darte criterio.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA FINAL */}
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

          <div className="flex items-center px-6 py-20 sm:px-10 lg:col-span-7 lg:px-16 lg:py-24">
            <div className="max-w-xl">
              <p className="text-sm font-semibold text-orange">
                Si quieres empezar
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-white sm:text-5xl">
                Cuéntame dónde estás.
                <br />
                Veremos cómo avanzar.
              </h2>

              <p className="mt-6 text-lg leading-8 text-slate-300">
                Dime qué quieres conseguir, cuánto tiempo puedes entrenar y qué
                has probado hasta ahora. Te diré sinceramente si puedo ayudarte.
              </p>

              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-9 inline-flex min-h-12 items-center gap-3 rounded-xl bg-orange px-6 text-sm font-bold text-white transition-colors hover:bg-orange-dark"
              >
                Contarme mi caso
                <ArrowIcon />
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
