import { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isAdminEmail } from '../lib/adminConfig'

const NAV_LINKS = [
  { href: '/#metodo', label: 'Método', type: 'anchor' },
  { to: '/planes', label: 'Planes', type: 'link' },
  { href: '/#casos', label: 'Casos reales', type: 'anchor' },
  { to: '/blog', label: 'Blog', type: 'link' },
  { to: '/calculadora', label: 'Calculadora', type: 'link' },
]

export default function Navbar() {
  const { user } = useAuth()
  const isAdmin = isAdminEmail(user?.email)
  const [open, setOpen] = useState(false)

  const closeMenu = () => setOpen(false)

  return (
    <header className="sticky top-0 z-50 border-b border-slate-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          onClick={closeMenu}
          className="flex items-center gap-2 font-display text-lg font-extrabold tracking-tight text-navy"
        >
          <img src="/brand/logo.png" alt="Lógica Fit" className="h-8 w-8 rounded-full object-cover" />
          Lógica <span className="text-orange">Fit</span>
        </Link>

        <nav className="hidden items-center gap-8 text-sm font-medium text-text-secondary md:flex">
          {NAV_LINKS.map((item) =>
            item.type === 'anchor' ? (
              <a key={item.label} href={item.href} className="transition hover:text-navy">
                {item.label}
              </a>
            ) : (
              <Link key={item.label} to={item.to} className="transition hover:text-navy">
                {item.label}
              </Link>
            )
          )}
        </nav>

        <div className="flex items-center gap-3">
          {isAdmin && (
            <Link
              to="/admin/clientes"
              className="hidden text-sm font-semibold text-navy transition hover:text-orange-dark sm:block"
            >
              Admin
            </Link>
          )}
          <Link
            to={user ? '/dashboard' : '/login'}
            className="hidden text-sm font-semibold text-navy transition hover:text-orange-dark sm:block"
          >
            {user ? 'Mi área' : 'Acceder'}
          </Link>
          <Link
            to="/planes"
            className="rounded-full bg-orange px-5 py-2.5 text-sm font-semibold text-white shadow-sm shadow-orange/30 transition hover:bg-orange-dark"
          >
            Ver planes
          </Link>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-navy transition hover:bg-surface-soft md:hidden"
          >
            {open ? (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2">
                <path strokeLinecap="round" d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {open && (
        <nav className="border-t border-slate-100 bg-white px-6 py-4 md:hidden">
          <ul className="flex flex-col gap-1">
            {NAV_LINKS.map((item) => (
              <li key={item.label}>
                {item.type === 'anchor' ? (
                 <a 
                    href={item.href}
                    onClick={closeMenu}
                    className="block rounded-lg px-2 py-2.5 text-sm font-medium text-navy-light transition hover:bg-surface-soft"
                  >
                    {item.label}
                  </a>
                ) : (
                  <Link
                    to={item.to}
                    onClick={closeMenu}
                    className="block rounded-lg px-2 py-2.5 text-sm font-medium text-navy-light transition hover:bg-surface-soft"
                  >
                    {item.label}
                  </Link>
                )}
              </li>
            ))}

            <li className="mt-2 border-t border-slate-100 pt-2">
              <Link
                to={user ? '/dashboard' : '/login'}
                onClick={closeMenu}
                className="block rounded-lg px-2 py-2.5 text-sm font-semibold text-navy transition hover:bg-surface-soft"
              >
                {user ? 'Mi área' : 'Acceder'}
              </Link>
            </li>

            {isAdmin && (
              <li>
                <Link
                  to="/admin/clientes"
                  onClick={closeMenu}
                  className="block rounded-lg px-2 py-2.5 text-sm font-semibold text-navy transition hover:bg-surface-soft"
                >
                  Admin
                </Link>
              </li>
            )}
          </ul>
        </nav>
      )}
    </header>
  )
}