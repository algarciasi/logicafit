import { useState } from "react";
import { Link } from "react-router-dom";
import { articles } from "../content/articles";

export default function Aprende() {
  // Estado para controlar qué categoría está activa
  const [activeCategory, setActiveCategory] = useState("Todos");

  const categories = [
    "Todos",
    "Musculación",
    "Ejercicios",
    "Nutrición",
    "Running",
    "Experiencia",
  ];

  // Lógica de filtrado
  let featured = articles.find((a) => a.featured);

  // Si estamos en una categoría concreta y el destacado no es de esa categoría, lo ocultamos
  if (
    activeCategory !== "Todos" &&
    featured &&
    featured.category !== activeCategory
  ) {
    featured = null;
  }

  // Filtramos la base de datos según el botón pulsado
  const filteredArticles =
    activeCategory === "Todos"
      ? articles
      : articles.filter((a) => a.category === activeCategory);

  // Separamos los publicados de los borradores
  const rest = filteredArticles.filter(
    (a) => !a.featured && a.date !== "Borrador",
  );
  const drafts = filteredArticles.filter((a) => a.date === "Borrador");

  return (
    <div className="bg-surface overflow-hidden min-h-screen">
      {/* 1. HERO (Imagen inmersiva con degradados, mismo lenguaje que Calculadoras) */}
      <section className="relative w-full pt-16 pb-0 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28 flex flex-col sm:justify-center">
        <div className="relative h-[42vh] min-h-[280px] w-full sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
          <img
            src="/brand/estudiando.jpg"
            alt="Alberto García estudiando, contenido de Lógica Fit"
            className="h-full w-full object-cover object-[80%_35%] sm:object-[78%_22%] opacity-100 sm:opacity-95 animate-fade-in"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent sm:hidden" />

          {/* Overlay más ligero y estrecho: se ve mucho más de foto limpia, sin lavado */}
          <div className="hidden sm:block absolute inset-0 bg-navy/35" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/55 to-transparent w-full md:w-1/2" />
          <div className="hidden sm:block absolute inset-x-0 bottom-0 h-32 lg:h-40 bg-gradient-to-t from-surface to-transparent" />
        </div>

        <div className="relative z-10 w-full bg-navy px-6 py-10 sm:bg-transparent sm:py-0 lg:px-8">
          <div className="mx-auto max-w-7xl w-full">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange animate-fade-in-up">
                Aprende
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-white sm:text-6xl tracking-tight animate-fade-in-up delay-100 leading-[1.05]">
                Entrenar bien no debería
                <br className="hidden sm:block" /> ser tan complicado.
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg sm:text-xl text-slate-300 font-medium animate-fade-in-up delay-200 leading-relaxed max-w-lg">
                Entrenamiento, musculación, nutrición deportiva y running
                explicados conforme me hubiera gustado cuando empecé.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 2. NAVEGACIÓN CATEGORÍAS */}
      <section className="relative z-20 mx-auto max-w-7xl px-6 lg:px-8 pt-10 sm:pt-12">
        <div className="flex overflow-x-auto border-b border-slate-200 pb-px">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 border-b-2 px-1 pb-3 mr-8 text-sm font-medium transition-colors ${
                activeCategory === cat
                  ? "border-navy text-navy"
                  : "border-transparent text-slate-500 hover:border-slate-300 hover:text-navy"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* 3. DESTACADO */}
      {featured && (
        <section className="mx-auto max-w-7xl px-6 lg:px-8 pt-16 pb-20">
          <Link
            to={`/aprende/${featured.slug}`}
            className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center"
          >
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 lg:aspect-auto lg:h-[400px] rounded-[2rem]">
              <img
                src={featured.image}
                alt={featured.title}
                className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
              />
            </div>
            <div className="lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {featured.category} <span className="mx-2">·</span>{" "}
                {featured.readingTime}
              </p>
              <h2 className="mt-4 font-display text-3xl font-bold text-navy group-hover:text-orange sm:text-4xl">
                {featured.title}
              </h2>
              <p className="mt-4 text-lg text-slate-600 line-clamp-3">
                {featured.description}
              </p>
              <span className="mt-6 inline-block font-semibold text-navy group-hover:text-orange">
                Leer artículo →
              </span>
            </div>
          </Link>
        </section>
      )}

      {/* 4. GRID RESTO DE ARTÍCULOS */}
      <section className="mx-auto max-w-7xl px-6 lg:px-8 pb-24 border-t border-slate-200 pt-16">
        {rest.length === 0 && drafts.length === 0 && (
          <p className="text-slate-500 italic">
            No hay artículos en esta categoría todavía.
          </p>
        )}

        <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
          {rest.map((article) => (
            <Link
              key={article.slug}
              to={`/aprende/${article.slug}`}
              className="group"
            >
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 mb-5 rounded-2xl">
                <img
                  src={article.image}
                  alt={article.title}
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                {article.category} <span className="mx-2">·</span>{" "}
                {article.readingTime}
              </p>
              <h3 className="font-display text-xl font-bold text-navy group-hover:text-orange">
                {article.title}
              </h3>
              <p className="mt-2 text-sm text-slate-600 line-clamp-2">
                {article.description}
              </p>
            </Link>
          ))}

          {/* Borradores */}
          {drafts.map((article) => (
            <div
              key={article.slug}
              className="cursor-not-allowed opacity-50 grayscale"
            >
              <div className="mb-5 flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-200 rounded-2xl">
                <span className="text-xs font-bold uppercase text-slate-400">
                  Próximamente
                </span>
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                {article.category}
              </p>
              <h3 className="font-display text-xl font-bold text-navy">
                {article.title}
              </h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
