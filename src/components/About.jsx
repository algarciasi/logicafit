import { Link } from "react-router-dom";

export default function Conoceme() {
  return (
    <div className="bg-white">
      {/* SECCIÓN 1: HERO (Imagen inmersiva con degradados, mismo lenguaje que Calculadoras/Aprende) */}
      <section className="relative w-full pt-16 pb-0 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28 flex flex-col sm:justify-center">
        <div className="relative h-[42vh] min-h-[280px] w-full sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
          <img
            src="/brand/alberto-3.jpg"
            alt="Alberto García, entrenador personal Lógica Fit"
            className="h-full w-full object-cover object-[75%_30%] sm:object-[72%_20%] opacity-100 sm:opacity-95 animate-fade-in"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent sm:hidden" />

          {/* Overlay más ligero y estrecho: se ve mucho más de foto limpia, sin lavado */}
          <div className="hidden sm:block absolute inset-0 bg-navy/30" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/50 to-transparent w-full md:w-1/2" />
          <div className="hidden sm:block absolute inset-x-0 bottom-0 h-32 lg:h-40 bg-gradient-to-t from-white to-transparent" />
        </div>

        <div className="relative z-10 w-full bg-navy px-6 py-10 sm:bg-transparent sm:py-0 lg:px-8">
          <div className="mx-auto max-w-7xl w-full">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange animate-fade-in-up">
                Conóceme
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up delay-100 leading-[1.05]">
                Más de 20 años entrenando.
                <br className="hidden sm:block" /> Y sigo aprendiendo.
              </h1>
              <div className="mt-5 sm:mt-6 space-y-4 text-base sm:text-lg text-slate-300 font-medium animate-fade-in-up delay-200 leading-relaxed max-w-lg">
                <p>
                  Antes de pensar en ayudar a otras personas, estuve muchos años
                  intentando mejorar yo mismo. He probado miles de rutinas y
                  dietas. He cometido muchos errores y eso me ha hecho aprender
                  durante todo este tiempo.
                </p>
                <p>
                  Después de mucho tiempo y experiencia acumulada, decidí
                  invertir en formación y utilizarla para ayudar a otras
                  personas a entrenar con criterio.
                </p>
              </div>
              <div className="mt-8 sm:mt-10 animate-fade-in-up delay-300">
                <Link
                  to="/planes"
                  className="inline-flex rounded-full bg-white/10 px-8 py-3.5 text-sm font-semibold text-white ring-1 ring-white/20 transition hover:bg-white/20 sm:bg-slate-100 sm:text-navy sm:ring-0 sm:hover:bg-slate-200"
                >
                  Ver cómo trabajo
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: MI HISTORIA (Solo texto editorial, SIN FOTO) */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Esto empezó mucho antes de ser entrenador.
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
          <p>
            Empecé a entrenar hace más de veinte años, cuando mi única
            preocupación era tener un espacio para mi y no pensar en ciertos
            aspectos de la vida.
          </p>
          <p>
            Como casi todos, durante estos años he pasado por diferentes etapas.
            He cambiado rutinas, probado sistemas de entrenamiento, aprendido
            sobre entrenamiento y alimentación y también he cometido demasiados
            errores.
          </p>
          <p>
            Estos errores forman parte de lo que hoy sé. No nací siendo
            entrenador, ni tampoco me gustaba el deporte pero una vez entre en
            una sala no pude dejar de volver a ir.
          </p>
        </div>
      </section>

      {/* SECCIÓN 3: YO TAMBIÉN TENGO ENTRENADOR - IMAGEN 2 */}
      <section className="bg-slate-50 py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6">
          <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
            Sí. Yo también tengo entrenador.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
            <p>
              Y después de más de 20 años entrenando sigo pensando que merece la
              pena.
            </p>
            <p>
              Cuando eres tú quien lleva tu propia planificación es muy fácil
              perder perspectiva, cambiar cosas demasiado pronto o dejarte
              llevar por cómo te encuentras ese día.
            </p>
            <p>
              Tener un asesor que te acompañe te obliga a rendir cuentas en las
              revisiones, permite analizar las cosas con más objetividad y hace
              más difícil que abandones cuando vienen semanas malas. Por eso
              creo tanto en el seguimiento: porque yo también lo utilizo.
            </p>
          </div>

          <figure className="mt-12">
            {/* FOTO 2: Foto revisando planificación o tus propios entrenamientos */}
            <div className="aspect-[21/9] w-full overflow-hidden rounded-sm bg-slate-200">
              <img
                src="/ruta-a-foto-revisando-planificacion.jpg"
                alt="Revisando mis propios entrenamientos"
                className="h-full w-full object-cover"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm italic text-slate-500">
              Revisando mis propios entrenamientos. Tener una mirada externa
              siempre aporta valor.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* SECCIÓN 4 & 5: POR QUÉ FORMARME + FORMACIÓN OFICIAL (Con foto) */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-start">
          {/* FOTO 3: Estudiando/Formación */}
          <figure className="relative order-2 lg:order-1">
            <div className="aspect-[3/4] w-full max-w-md mx-auto overflow-hidden rounded-sm bg-slate-100 lg:max-w-none lg:mx-0">
              <img
                src="/brand/estudiando.jpg"
                alt="Alberto estudiando el manual de Entrenamiento Personal"
                className="h-full w-full object-cover object-top"
              />
            </div>
            <figcaption className="mt-3 text-center text-sm italic text-slate-500 lg:text-left">
              La experiencia en el gimnasio es vital, pero entender el porqué de
              las cosas es lo que marca la diferencia.
            </figcaption>
          </figure>

          {/* TEXTO Y CURSOS */}
          <div className="order-1 lg:order-2 lg:pt-4">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Entrenar durante años no era suficiente.
            </h2>
            <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-600">
              <p>
                Una cosa es aprender a entrenarte a ti mismo y otra muy
                diferente ayudar a otra persona. Por eso llegó un momento en el
                que decidí formarme de manera específica.
              </p>
              <p>
                Quería entender mejor el porqué de las cosas, la biomecánica de
                los ejercicios y disponer de herramientas para adaptar un
                entrenamiento a otra persona, no simplemente recomendar lo que
                me había funcionado a mí.
              </p>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-10">
              <h3 className="font-display text-2xl font-bold text-navy">
                Formación
              </h3>
              <p className="mt-2 text-sm text-slate-500">
                La experiencia importa. Saber por qué haces las cosas, también.
              </p>

              <div className="mt-8">
                <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-navy">
                  APTA Vital Sport
                </p>
                <ul className="space-y-6 border-l-2 border-slate-100 pl-6 text-base text-slate-700">
                  <li>
                    <span className="block font-medium text-navy">
                      Curso de Entrenador Personal de Alto Rendimiento y
                      Técnicas Avanzadas de Musculación
                    </span>
                  </li>
                  <li>
                    <span className="block font-medium text-navy">
                      Máster en Nutrición Deportiva de Alto Rendimiento y
                      Dietética Avanzada
                    </span>
                  </li>
                  <li>
                    <span className="block font-medium text-navy">
                      Máster en Suplementación Deportiva
                    </span>
                  </li>
                  <li>
                    <span className="block font-medium text-navy">
                      Especialista en Running, Trail Running y Barefoot
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 6: LÍMITES / TRANSPARENCIA */}
      <section className="bg-navy py-16 sm:py-24">
        <div className="mx-auto max-w-3xl px-6 text-white">
          <h2 className="font-display text-3xl font-bold sm:text-4xl">
            También es importante saber cuándo derivar.
          </h2>
          <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-300">
            <p>
              Mi especialidad principal es el entrenamiento de fuerza, la
              composición corporal, la creación de hábitos y el acompañamiento
              diario.
            </p>
            <p>
              Tengo formación en nutrición deportiva, pero{" "}
              <strong className="font-semibold text-white">
                no soy Dietista-Nutricionista y no realizo nutrición clínica
              </strong>
              .
            </p>
            <p>
              Tengo conocimientos y experiencia con running, pero si alguien
              busca una preparación avanzada o competitiva específica, cuento
              con compañeros especializados a los que puedo derivarte.
            </p>
            <p className="pt-4 text-xl font-medium text-white italic">
              "Para mí, hacer bien este trabajo también significa reconocer
              cuándo otro profesional puede ayudarte mejor."
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 7: FILOSOFÍA DE TRABAJO */}
      <section className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <h2 className="text-center font-display text-3xl font-bold text-navy sm:text-4xl">
          Mi forma de entender el entrenamiento
        </h2>

        <div className="mt-16 grid gap-12 sm:grid-cols-2">
          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              Tu rutina y tu dieta debe encajar en tu vida, no al revés.
            </p>
          </div>

          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              No cambio ejercicios para que no te aburras. Cambio lo que hay que
              cambiar.
            </p>
          </div>

          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              Prefiero que entiendas el por qué de las cosas a que te dediques a
              seguir el guión.
            </p>
          </div>

          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              Y si algo no funciona, se ajusta. Trabajamos tu y yo para mejorar.
            </p>
          </div>
        </div>
      </section>

      {/* SECCIÓN 8: CIERRE Y CTA */}
      <section className="mx-auto max-w-3xl px-6 pb-24 pt-10 text-center">
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          No quiero que dependas de mí para siempre.
        </h2>
        <p className="mx-auto mt-6 text-lg leading-relaxed text-slate-600">
          Quiero ayudarte a mejorar, pero también quiero que durante el proceso
          aprendas. Que entiendas cómo entrenar y como comer. Que sepas por qué
          hacemos determinados cambios. Que puedas distinguir lo importante de
          todo el ruido que existe alrededor de las redes sociales y el fitness.
        </p>
        <p className="mx-auto mt-6 text-lg font-medium text-navy">
          Porque un buen proceso no debería darte únicamente resultados. También
          debería darte criterio.
        </p>

        <div className="mt-12 flex justify-center">
          <a
            href="https://wa.me/34678951544?text=Hola!%20He%20le%C3%ADdo%20tu%20historia%20y%20me%20gustar%C3%ADa%20contarte%20mi%20caso"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-whatsapp px-8 py-4 text-sm font-semibold text-white shadow-lg shadow-whatsapp/25 transition hover:brightness-95 sm:w-auto"
          >
            Hablar con Alberto
          </a>
        </div>
      </section>
    </div>
  );
}
