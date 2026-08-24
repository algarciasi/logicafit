import { Link } from 'react-router-dom'
import LinkCard from '../components/blog/LinkCard'

// EDITA este array con tus propios enlaces favoritos — estos son solo ejemplos de partida.
const CATEGORIES = [
  {
    title: 'Técnica de ejercicios',
    description: 'Vídeos y guías para aprender la forma correcta de cada movimiento.',
    links: [
      {
        title: 'Biblioteca de ejercicios en español',
        source: 'Ejercicios.com',
        blurb: 'Vídeos organizados por grupo muscular: pierna, espalda, pecho, hombro y más.',
        url: 'https://www.ejercicios.com/biblioteca-de-ejercicios/',
      },
      {
        title: 'Bibliotraining',
        source: 'Bibliotraining',
        blurb: 'Vídeos educativos sobre técnica, series, repeticiones y prevención de lesiones.',
        url: 'https://bibliotraining.com/',
      },
    ],
  },
  {
    title: 'Rutinas recomendadas',
    description: 'Programas estructurados para distintos niveles y objetivos.',
    links: [
      {
        title: 'Nike Training Club',
        source: 'Nike',
        blurb: 'Más de 300 entrenamientos guiados en vídeo, gratis, para todos los niveles.',
        url: 'https://www.nike.com/ntc-app',
      },
    ],
  },
  {
    title: 'Running',
    description: 'Recursos para empezar o mejorar tu técnica de carrera.',
    links: [],
  },
]

export default function Blog() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">Blog</p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Recursos que de verdad recomiendo
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Nada de contenido genérico. Solo enlaces a rutinas, técnica y
          recursos que uso o recomiendo a mis clientes.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-2xl gap-3 px-6 sm:grid-cols-2">
        <Link
          to="/calculadora"
          className="rounded-2xl border border-orange-light bg-orange/5 p-4 text-center transition hover:bg-orange/10"
        >
          <p className="font-display text-sm font-bold text-navy">🧮 Calculadora de macros</p>
          <p className="mt-1 text-xs text-text-secondary">Calcula tus kcal y arma tu menú</p>
        </Link>
        <Link
          to="/calculadora-running"
          className="rounded-2xl border border-orange-light bg-orange/5 p-4 text-center transition hover:bg-orange/10"
        >
          <p className="font-display text-sm font-bold text-navy">🏃 Calculadora de ritmo</p>
          <p className="mt-1 text-xs text-text-secondary">Predice tus tiempos + guía de 5K gratis</p>
        </Link>
      </div>

      <div className="mx-auto mt-12 max-w-4xl space-y-12 px-6">
        {CATEGORIES.map((cat) => (
          <div key={cat.title}>
            <h2 className="font-display text-xl font-bold text-navy">{cat.title}</h2>
            <p className="mt-1 text-sm text-text-secondary">{cat.description}</p>

            {cat.links.length > 0 ? (
              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                {cat.links.map((link) => (
                  <LinkCard key={link.url} {...link} />
                ))}
              </div>
            ) : (
              <p className="mt-5 rounded-2xl border border-dashed border-slate-200 px-5 py-6 text-center text-sm text-text-secondary">
                Próximamente.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}