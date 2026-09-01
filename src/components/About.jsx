import { Link } from 'react-router-dom'

export default function Conoceme() {
  return (
    <div className="bg-white">
      {/* SECCIÓN 1: HERO (Texto Izquierda, Foto Derecha) - IMAGEN 1 */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24 lg:py-32">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center">
          <div className="max-w-xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-orange">
              Conóceme
            </p>
            <h1 className="mt-6 font-display text-4xl font-extrabold leading-tight text-navy sm:text-5xl">
              Más de 20 años entrenando. Y sigo aprendiendo.
            </h1>
            <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
              <p>
                Antes de dedicarme a ayudar a otras personas, pasé muchos años intentando mejorar yo mismo. He probado rutinas, métodos y formas de alimentarme. He cometido errores y he aprendido muchísimo durante el proceso.
              </p>
              <p>
                Con el tiempo, decidí convertir toda esa experiencia en formación y utilizarla para ayudar a otras personas a entrenar con criterio.
              </p>
            </div>
            <div className="mt-10">
              <Link
                to="/planes"
                className="inline-flex rounded-full bg-slate-100 px-8 py-3.5 text-sm font-semibold text-navy transition hover:bg-slate-200"
              >
                Ver cómo trabajo
              </Link>
            </div>
          </div>

          <figure className="relative">
            {/* FOTO 1: Foto actual entrenando/gimnasio */}
            <div className="aspect-[4/5] w-full overflow-hidden rounded-sm bg-slate-100">
              <img
                src="/brand/alberto-gym.jpg"
                alt="Alberto, entrenador personal"
                className="h-full w-full object-cover grayscale-[20%]"
              />
            </div>
          </figure>
        </div>
      </section>

      {/* SECCIÓN 2: MI HISTORIA (Solo texto editorial, SIN FOTO) */}
      <section className="mx-auto max-w-3xl px-6 py-16 sm:py-24">
        <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
          Esto empezó mucho antes de ser entrenador.
        </h2>
        <div className="mt-8 space-y-6 text-lg leading-relaxed text-slate-600">
          <p>
            Empecé a entrenar hace más de dos décadas, cuando mi única preocupación era intentar mejorar físicamente. 
          </p>
          <p>
            Como casi todos, durante estos años he pasado por diferentes etapas. He cambiado rutinas, probado sistemas, aprendido sobre entrenamiento y alimentación y también he cometido bastantes errores.
          </p>
          <p>
            Precisamente esos errores forman parte de lo que hoy sé. No nací siendo entrenador, nací siendo alguien a quien le gustaba entrenar.
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
              Y después de más de 20 años entrenando sigo pensando que merece la pena.
            </p>
            <p>
              Cuando eres tú quien lleva tu propia planificación es muy fácil perder perspectiva, cambiar cosas demasiado pronto o dejarte llevar por cómo te encuentras ese día. 
            </p>
            <p>
              Una mirada externa te obliga a rendir cuentas, permite analizar las cosas con más objetividad y hace más difícil que abandones cuando vienen semanas malas. Por eso creo tanto en el seguimiento: porque yo también lo utilizo.
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
              Revisando mis propios entrenamientos. Tener una mirada externa siempre aporta valor.
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
              La experiencia en el gimnasio es vital, pero entender el porqué de las cosas marca la diferencia.
            </figcaption>
          </figure>

          {/* TEXTO Y CURSOS */}
          <div className="order-1 lg:order-2 lg:pt-4">
            <h2 className="font-display text-3xl font-bold text-navy sm:text-4xl">
              Entrenar durante años no era suficiente.
            </h2>
            <div className="mt-6 space-y-6 text-base leading-relaxed text-slate-600">
              <p>
                Una cosa es aprender a entrenarte a ti mismo y otra muy diferente ayudar a otra persona. Por eso llegó un momento en el que decidí formarme de manera específica.
              </p>
              <p>
                Quería entender mejor el porqué de las cosas y disponer de herramientas para adaptar un entrenamiento a otra persona, no simplemente recomendar lo que me había funcionado a mí.
              </p>
            </div>

            <div className="mt-12 border-t border-slate-100 pt-10">
              <h3 className="font-display text-2xl font-bold text-navy">Formación</h3>
              <p className="mt-2 text-sm text-slate-500">
                La experiencia importa. Saber por qué haces las cosas, también.
              </p>
              
              <div className="mt-8">
                <p className="mb-6 text-xs font-semibold uppercase tracking-wide text-navy">
                  APTA Vital Sport
                </p>
                <ul className="space-y-6 border-l-2 border-slate-100 pl-6 text-base text-slate-700">
                  <li>
                    <span className="block font-medium text-navy">Curso de Entrenador Personal de Alto Rendimiento y Técnicas Avanzadas de Musculación</span>
                  </li>
                  <li>
                    <span className="block font-medium text-navy">Máster en Nutrición Deportiva de Alto Rendimiento y Dietética Avanzada</span>
                  </li>
                  <li>
                    <span className="block font-medium text-navy">Máster en Suplementación Deportiva</span>
                  </li>
                  <li>
                    <span className="block font-medium text-navy">Especialista en Running, Trail Running y Barefoot</span>
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
              Mi especialidad principal es el entrenamiento de fuerza, la composición corporal, la creación de hábitos y el acompañamiento.
            </p>
            <p>
              Tengo formación en nutrición deportiva, pero <strong className="font-semibold text-white">no soy Dietista-Nutricionista y no realizo nutrición clínica</strong>. 
            </p>
            <p>
              Tengo conocimientos y experiencia con running, pero si alguien busca una preparación avanzada o competitiva específica, cuento con compañeros especializados a los que puedo derivarte.
            </p>
            <p className="pt-4 text-xl font-medium text-white italic">
              "Para mí, hacer bien este trabajo también significa reconocer cuándo otro profesional puede ayudarte mejor."
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
              Tu rutina tiene que encajar en tu vida, no al revés.
            </p>
          </div>
          
          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              No cambio ejercicios para mantenerte entretenido. Cambio lo que necesita cambiar.
            </p>
          </div>
          
          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              Prefiero que entiendas por qué hacemos algo a que simplemente obedezcas una hoja.
            </p>
          </div>
          
          <div className="border-t-2 border-slate-900 pt-6">
            <p className="text-xl font-medium leading-relaxed text-navy">
              Y si algo no funciona, se ajusta. No se culpa al cliente.
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
          Quiero ayudarte a progresar, pero también quiero que durante el proceso aprendas. Que entiendas cómo entrenar. Que sepas por qué hacemos determinados cambios. Que puedas distinguir lo importante de todo el ruido que existe alrededor del fitness.
        </p>
        <p className="mx-auto mt-6 text-lg font-medium text-navy">
          Porque un buen proceso no debería darte únicamente resultados. También debería darte criterio.
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
  )
}