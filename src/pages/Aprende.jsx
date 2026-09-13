import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { articles } from "../content/articles"
import PageHero from "../components/PageHero"

const CATEGORIES = [
  "Todos",
  "Musculación",
  "Ejercicios",
  "Nutrición",
  "Running",
  "Experiencia",
]

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

export default function Aprende() {
  const [activeCategory, setActiveCategory] = useState("Todos")

  const publishedArticles = useMemo(
    () => articles.filter((article) => article.date !== "Borrador"),
    [],
  )

  const filteredArticles = useMemo(() => {
    if (activeCategory === "Todos") return publishedArticles

    return publishedArticles.filter(
      (article) => article.category === activeCategory,
    )
  }, [activeCategory, publishedArticles])

  const featured =
    filteredArticles.find((article) => article.featured) || null

  const rest = filteredArticles.filter(
    (article) => article.slug !== featured?.slug,
  )

  return (
    <main className="overflow-hidden bg-white">
      <PageHero
        image="/brand/estudiando2.jpg"
        imageAlt="Alberto García estudiando y preparando contenido de Lógica Fit"
        eyebrow="Aprende"
        title="Entrenar bien no debería ser"
        accent="complicado."
        description="Entrenamiento, musculación, nutrición y running explicados sin complicarlos más de la cuenta."
        secondary="Lo que he aprendido entrenando, estudiando y equivocándome durante más de dos décadas."
        objectPosition="sm:object-[75%_25%]"
      />

      <section className="border-b border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 pt-16 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-orange">
                Biblioteca Lógica Fit
              </p>

              <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold leading-[1.07] tracking-[-0.035em] text-navy sm:text-4xl lg:text-5xl">
                Menos teoría de Internet.
                <br />
                <span className="text-navy/40">
                  Más cosas que puedes aplicar.
                </span>
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-7 text-text-secondary">
                Artículos pensados para entender mejor lo que haces cuando
                entrenas y por qué lo haces.
              </p>
            </div>
          </div>

          <div className="mt-14 flex overflow-x-auto border-b border-slate-200">
            {CATEGORIES.map((category) => {
              const active = activeCategory === category

              return (
                <button
                  key={category}
                  type="button"
                  aria-pressed={active}
                  onClick={() => setActiveCategory(category)}
                  className={`relative mr-8 shrink-0 pb-4 text-sm font-semibold transition-colors ${
                    active
                      ? "text-navy"
                      : "text-slate-400 hover:text-navy"
                  }`}
                >
                  {category}

                  {active && (
                    <span className="absolute inset-x-0 bottom-[-1px] h-0.5 bg-orange" />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      </section>

      {featured && (
        <section className="bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
            <Link
              to={`/aprende/${featured.slug}`}
              className="group grid gap-10 lg:grid-cols-12 lg:items-center"
            >
              <div className="overflow-hidden bg-slate-100 lg:col-span-7">
                <div className="aspect-[16/10] overflow-hidden">
                  <img
                    src={featured.image}
                    alt={featured.title}
                    className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
                  />
                </div>
              </div>

              <div className="lg:col-span-4 lg:col-start-9">
                <p className="text-sm font-semibold text-orange">
                  Lectura recomendada
                </p>

                <div className="mt-5 flex items-center gap-2 text-xs font-medium text-text-secondary">
                  <span>{featured.category}</span>
                  <span className="text-slate-300">/</span>
                  <span>{featured.readingTime}</span>
                </div>

                <h2 className="mt-4 font-display text-3xl font-extrabold leading-[1.08] tracking-[-0.03em] text-navy transition-colors group-hover:text-orange sm:text-4xl">
                  {featured.title}
                </h2>

                <p className="mt-5 text-base leading-7 text-text-secondary">
                  {featured.description}
                </p>

                <span className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors group-hover:text-orange">
                  Leer artículo
                  <ArrowIcon />
                </span>
              </div>
            </Link>
          </div>
        </section>
      )}

      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8 lg:py-28">
          <div className="mb-12 flex items-end justify-between gap-6">
            <div>
              <p className="text-sm font-semibold text-orange">
                {activeCategory === "Todos"
                  ? "Últimos artículos"
                  : activeCategory}
              </p>

              <h2 className="mt-2 font-display text-3xl font-extrabold tracking-[-0.03em] text-navy">
                Para seguir aprendiendo
              </h2>
            </div>

            {rest.length > 0 && (
              <p className="hidden text-sm text-text-secondary sm:block">
                {rest.length} {rest.length === 1 ? "artículo" : "artículos"}
              </p>
            )}
          </div>

          {!featured && rest.length === 0 && (
            <div className="border-y border-slate-200 py-16">
              <p className="max-w-xl text-lg text-text-secondary">
                Todavía no he publicado contenido en esta categoría.
              </p>

              <button
                type="button"
                onClick={() => setActiveCategory("Todos")}
                className="mt-5 inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors hover:text-orange"
              >
                Ver todos los artículos
                <ArrowIcon />
              </button>
            </div>
          )}

          {rest.length > 0 && (
            <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 lg:grid-cols-3 lg:gap-x-10">
              {rest.map((article) => (
                <Link
                  key={article.slug}
                  to={`/aprende/${article.slug}`}
                  className="group"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-slate-100">
                    <img
                      src={article.image}
                      alt={article.title}
                      loading="lazy"
                      className="h-full w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                    />
                  </div>

                  <div className="mt-5 flex items-center gap-2 text-xs font-medium text-text-secondary">
                    <span>{article.category}</span>
                    <span className="text-slate-300">/</span>
                    <span>{article.readingTime}</span>
                  </div>

                  <h3 className="mt-3 font-display text-xl font-bold leading-snug tracking-[-0.015em] text-navy transition-colors group-hover:text-orange sm:text-2xl">
                    {article.title}
                  </h3>

                  <p className="mt-3 line-clamp-3 text-sm leading-6 text-text-secondary">
                    {article.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-navy opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:text-orange group-hover:opacity-100">
                    Leer
                    <ArrowIcon />
                  </span>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[#F6F5F2]">
        <div className="mx-auto max-w-7xl px-6 py-20 sm:py-24 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-12 lg:items-end">
            <div className="lg:col-span-7">
              <p className="text-sm font-semibold text-orange">
                Del conocimiento a la práctica
              </p>

              <h2 className="mt-4 font-display text-4xl font-extrabold leading-[1.04] tracking-[-0.035em] text-navy sm:text-5xl">
                Leer ayuda.
                <br />
                Hacerlo bien marca
                <br />
                la diferencia.
              </h2>
            </div>

            <div className="lg:col-span-4 lg:col-start-9">
              <p className="text-base leading-7 text-text-secondary">
                Si quieres aplicar todo esto dentro de una planificación
                adaptada a ti, puedes ver cómo trabajo y elegir el nivel de
                seguimiento que necesitas.
              </p>

              <Link
                to="/planes"
                className="mt-7 inline-flex items-center gap-3 text-sm font-bold text-navy transition-colors hover:text-orange"
              >
                Ver planes
                <ArrowIcon />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
