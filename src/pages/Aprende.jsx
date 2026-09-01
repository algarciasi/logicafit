import { useState } from 'react'
import { Link } from 'react-router-dom'
import { articles } from '../content/articles'

export default function Aprende() {
  // Estado para controlar qué categoría está activa
  const [activeCategory, setActiveCategory] = useState('Todos')

  const categories = ['Todos', 'Musculación', 'Ejercicios', 'Nutrición', 'Running', 'Experiencia']

  // Lógica de filtrado
  let featured = articles.find(a => a.featured)
  
  // Si estamos en una categoría concreta y el destacado no es de esa categoría, lo ocultamos
  if (activeCategory !== 'Todos' && featured && featured.category !== activeCategory) {
    featured = null 
  }

  // Filtramos la base de datos según el botón pulsado
  const filteredArticles = activeCategory === 'Todos' 
    ? articles 
    : articles.filter(a => a.category === activeCategory)

  // Separamos los publicados de los borradores
  const rest = filteredArticles.filter(a => !a.featured && a.date !== 'Borrador')
  const drafts = filteredArticles.filter(a => a.date === 'Borrador')

  return (
    <div className="bg-white">
      {/* HERO */}
      <section className="mx-auto max-w-7xl px-6 py-16 sm:py-24">
        <p className="text-xs font-semibold uppercase tracking-widest text-orange">Aprende</p>
        <h1 className="mt-4 font-display text-4xl font-extrabold text-navy sm:text-5xl lg:text-6xl">
          Entrenar bien no debería<br className="hidden sm:block"/> ser tan complicado.
        </h1>
        <p className="mt-6 max-w-2xl text-lg text-slate-600">
          Entrenamiento, musculación, nutrición deportiva y running explicados de la forma en la que me hubiera gustado encontrarlos cuando empecé.
        </p>

        {/* NAVEGACIÓN CATEGORÍAS (Ahora sí funcionan) */}
        <div className="mt-12 flex overflow-x-auto border-b border-slate-100 pb-px">
          {categories.map((cat) => (
            <button 
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`shrink-0 border-b-2 px-1 pb-3 mr-8 text-sm font-medium transition-colors ${
                activeCategory === cat 
                  ? 'border-navy text-navy' 
                  : 'border-transparent text-slate-500 hover:border-slate-300 hover:text-navy'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* DESTACADO */}
      {featured && (
        <section className="mx-auto max-w-7xl px-6 pb-20">
          <Link to={`/aprende/${featured.slug}`} className="group grid grid-cols-1 gap-8 lg:grid-cols-2 lg:items-center">
            <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 lg:aspect-auto lg:h-[400px]">
              <img src={featured.image} alt={featured.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
            </div>
            <div className="lg:pl-8">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                {featured.category} <span className="mx-2">·</span> {featured.readingTime}
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

      {/* GRID RESTO DE ARTÍCULOS */}
      <section className="mx-auto max-w-7xl px-6 pb-24 border-t border-slate-100 pt-16">
        
        {rest.length === 0 && drafts.length === 0 && (
          <p className="text-slate-500 italic">No hay artículos en esta categoría todavía.</p>
        )}

        <div className="grid grid-cols-1 gap-y-16 sm:grid-cols-2 sm:gap-x-8 lg:grid-cols-3 lg:gap-x-12">
          {rest.map(article => (
            <Link key={article.slug} to={`/aprende/${article.slug}`} className="group">
              <div className="aspect-[4/3] w-full overflow-hidden bg-slate-100 mb-5">
                <img src={article.image} alt={article.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" />
              </div>
              <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">
                {article.category} <span className="mx-2">·</span> {article.readingTime}
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
          {drafts.map(article => (
            <div key={article.slug} className="cursor-not-allowed opacity-50 grayscale">
               <div className="mb-5 flex aspect-[4/3] w-full items-center justify-center overflow-hidden bg-slate-200">
                  <span className="text-xs font-bold uppercase text-slate-400">Próximamente</span>
               </div>
               <p className="mb-2 text-xs font-bold uppercase tracking-widest text-slate-500">{article.category}</p>
               <h3 className="font-display text-xl font-bold text-navy">{article.title}</h3>
            </div>
          ))}
        </div>
      </section>
    </div>
  )
}