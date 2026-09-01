import { useParams, Link, Navigate } from 'react-router-dom'
import { articles } from '../content/articles'
import { ArticleFooter } from '../components/blog/ArticleBlocks'

export default function Article() {
  const { slug } = useParams()
  const article = articles.find(a => a.slug === slug)

  if (!article || article.date === 'Borrador') {
    return <Navigate to="/aprende" replace />
  }

  return (
    <article className="bg-white pb-24">
      {/* HEADER EDITORIAL */}
      <header className="mx-auto max-w-[700px] px-6 pt-16 sm:pt-24">
        <div className="text-center">
          <Link to="/aprende" className="text-xs font-bold uppercase tracking-widest text-orange hover:underline">
            {article.category}
          </Link>
          <h1 className="mt-6 font-display text-3xl font-extrabold text-navy sm:text-4xl md:text-5xl leading-[1.15]">
            {article.title}
          </h1>
          <p className="mt-6 text-sm font-medium text-slate-500">
            {article.date} <span className="mx-2">·</span> {article.readingTime} lectura
          </p>
        </div>
      </header>

      {/* IMAGEN PRINCIPAL */}
      <div className="mx-auto mt-12 max-w-5xl px-6">
        <div className="aspect-video w-full overflow-hidden rounded-sm bg-slate-100">
          <img src={article.image} alt={article.title} className="h-full w-full object-cover" />
        </div>
      </div>

      {/* CONTENIDO (Estilos aplicados a toda la etiqueta prose) */}
      <div className="mx-auto max-w-[700px] px-6 mt-12">
        <div className="prose prose-lg prose-slate max-w-none text-slate-700">
          {/* Aquí se inyecta todo el JSX que escribimos en articles.jsx */}
          {article.content}
        </div>
        
        {/* FOOTER DEL ARTÍCULO (Autor + CTA) */}
        <ArticleFooter />
      </div>
    </article>
  )
}