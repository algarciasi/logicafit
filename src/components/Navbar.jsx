import { Link } from 'react-router-dom'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link to="/" className="font-display text-lg font-extrabold tracking-tight text-navy">
          Lógica <span className="text-orange">Fit</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          <a href="/#metodo" className="transition hover:text-navy">Método</a>
          <Link to="/planes" className="transition hover:text-navy">Planes</Link>
          <a href="/#casos" className="transition hover:text-navy">Casos reales</a>
          <a href="/#calculadora" className="transition hover:text-navy">Calculadora</a>
        </nav>

        <Link
          to="/planes"
          className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange/30 transition hover:bg-orange-dark"
        >
          Ver planes
        </Link>
      </div>
    </header>
  )
}
