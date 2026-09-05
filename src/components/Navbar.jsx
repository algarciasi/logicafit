import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { isAdminEmail } from '../lib/adminConfig'

const isNativeApp = () => typeof window !== 'undefined' && window.Capacitor !== undefined

const NAV_LINKS_WEB = [
  { href: '/#metodo', label: 'Método', type: 'anchor' },
  { to: '/planes', label: 'Planes', type: 'link' },
  { to: '/casos-reales', label: 'Casos reales', type: 'link' },
  { to: '/calculadoras', label: 'Calculadoras', type: 'link' },
  { to: '/aprende', label: 'Aprende', type: 'link' },
  { to: '/conoceme', label: 'Sobre mí', type: 'link' },
]

// Páginas cuyo hero es oscuro a pantalla completa (foto inmersiva o bg-navy sólido):
// el navbar nace transparente en desktop y se vuelve sólido al hacer scroll.
// Calculadora y CalculadoraRunning quedan fuera porque su hero es sobre fondo claro,
// donde el texto blanco del navbar transparente sería ilegible.
const HERO_PAGES = ['/', '/calculadoras', '/aprende', '/conoceme', '/planes', '/casos-reales', '/calculadora', '/calculadora-running']

export default function Navbar() {
  const { user } = useAuth()
  const isAdmin = isAdminEmail(user?.email)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const isHeroPage = HERO_PAGES.includes(location.pathname)
  const native = isNativeApp()

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Móvil: SIEMPRE membrete navy sólido, altura fija h-16.
  // Desktop (sm+): transparente sobre el hero mientras no hay scroll,
  // solo en páginas con hero oscuro; sólido en el resto.
  const navBg = open
    ? 'opacity-0 pointer-events-none'
    : `bg-navy h-16 sm:h-auto ${
        scrolled || !isHeroPage
          ? 'sm:bg-surface/95 sm:backdrop-blur-md sm:shadow-sm sm:border-b sm:border-slate-100 sm:py-2'
          : 'sm:bg-transparent sm:py-5'
      }`
  const textColor = `text-white ${scrolled || !isHeroPage ? 'sm:text-navy' : 'sm:text-white'}`
  const linkColor = scrolled || !isHeroPage ? 'text-text-secondary hover:text-navy' : 'text-slate-200 hover:text-white'

  return (
    <>
      <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-200 ${navBg}`}>
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between px-6 lg:px-8">

          <Link to="/" onClick={closeMenu} className="flex items-center gap-2 group">
            <img src="/brand/logo.png" alt="Lógica Fit" className="h-9 w-9 rounded-full object-cover transition-transform duration-500 group-hover:rotate-12" />
            <span className={`font-display text-xl font-extrabold tracking-tight transition-colors ${textColor}`}>
              Lógica <span className="text-orange">Fit</span>
            </span>
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-[13px] font-bold uppercase tracking-wide">
            {NAV_LINKS_WEB.map((item) => (
              <div key={item.label} className="relative group">
                {item.type === 'anchor' ? (
                  <a href={item.href} className={`transition-colors py-2 ${linkColor}`}>
                    {item.label}
                  </a>
                ) : (
                  <Link to={item.to} className={`transition-colors py-2 ${linkColor}`}>
                    {item.label}
                  </Link>
                )}
                <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled || !isHeroPage ? 'bg-navy' : 'bg-white'}`}></span>
              </div>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-5">
            {isAdmin && (
              <Link to="/admin/clientes" className={`text-sm font-bold transition-colors ${textColor} hover:text-orange`}>
                Admin
              </Link>
            )}
            <Link to={user ? '/dashboard' : '/login'} className={`text-sm font-bold transition-colors ${textColor} hover:text-orange`}>
              {user ? 'Mi área' : 'Acceder'}
            </Link>
            {!native && (
              <Link to="/planes" className="rounded-full bg-orange px-6 py-2.5 text-sm font-bold text-white shadow-lg transition-all hover:bg-orange-dark hover:scale-105">
                Ver planes
              </Link>
            )}
          </div>

          {/* Botón Menú Móvil (abrir) — siempre blanco sobre el membrete navy */}
          <button
            onClick={() => setOpen(true)}
            aria-label="Abrir menú"
            className="relative z-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white/10 text-white transition-colors md:hidden"
          >
            <div className="relative w-5 h-4">
              <span className="absolute left-0 top-0 h-[2px] w-full bg-current"></span>
              <span className="absolute left-0 top-2 h-[2px] w-full bg-current"></span>
              <span className="absolute left-0 top-4 h-[2px] w-full bg-current"></span>
            </div>
          </button>
        </div>
      </header>

      {open && (
        <div className="fixed inset-0 z-[60] bg-navy md:hidden">
          <div className="flex h-16 items-center justify-between px-6">
            <Link to="/" onClick={closeMenu} className="flex items-center gap-2">
              <img src="/brand/logo.png" alt="Lógica Fit" className="h-9 w-9 rounded-full object-cover" />
              <span className="font-display text-xl font-extrabold tracking-tight text-white">
                Lógica <span className="text-orange">Fit</span>
              </span>
            </Link>
            <button
              onClick={closeMenu}
              aria-label="Cerrar menú"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10 text-white"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="flex h-[calc(100%-64px)] flex-col justify-between px-6 pb-8 overflow-y-auto">
            <nav className="flex flex-col">
              {NAV_LINKS_WEB.map((item, index) => {
                const num = String(index + 1).padStart(2, '0')
                const content = (
                  <>
                    <span className="text-orange font-mono text-sm font-bold tracking-widest">{num}</span>
                    <span className="font-display text-3xl font-extrabold text-white tracking-tight">
                      {item.label}
                    </span>
                  </>
                )
                const rowClass = 'flex items-center gap-4 py-4 border-b border-white/10 active:translate-x-1 transition-transform'

                return item.type === 'anchor' ? (
                  <a key={item.label} href={item.href} onClick={closeMenu} className={rowClass}>
                    {content}
                  </a>
                ) : (
                  <Link key={item.label} to={item.to} onClick={closeMenu} className={rowClass}>
                    {content}
                  </Link>
                )
              })}

              {isAdmin && (
                <Link to="/admin/clientes" onClick={closeMenu} className="flex items-center gap-4 py-4 border-b border-white/10">
                  <span className="text-orange font-mono text-sm font-bold tracking-widest">••</span>
                  <span className="font-display text-3xl font-extrabold text-white tracking-tight">Admin</span>
                </Link>
              )}

              <Link to={user ? '/dashboard' : '/login'} onClick={closeMenu} className="flex items-center gap-4 py-4">
                <span className="text-orange font-mono text-sm font-bold tracking-widest">••</span>
                <span className="font-display text-3xl font-extrabold text-white tracking-tight">
                  {user ? 'Mi área' : 'Acceder'}
                </span>
              </Link>
            </nav>

            {!native && (
              <Link
                to="/planes"
                onClick={closeMenu}
                className="mt-6 block rounded-full bg-orange px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg active:scale-[0.98]"
              >
                Ver planes
              </Link>
            )}
          </div>
        </div>
      )}
    </>
  )
}