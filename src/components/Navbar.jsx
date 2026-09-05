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

export default function Navbar() {
  const { user } = useAuth()
  const isAdmin = isAdminEmail(user?.email)
  const [open, setOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const location = useLocation()
  const isHome = location.pathname === '/'
  const native = isNativeApp()

  const closeMenu = () => setOpen(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Bloquea el scroll del body cuando el menú móvil está abierto
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [open])

  // Lógica de colores según scroll y página
  const navBg = scrolled || !isHome || open ? 'bg-surface/95 backdrop-blur-md shadow-sm border-b border-slate-100 py-2' : 'bg-transparent py-5'
  const textColor = scrolled || !isHome || open ? 'text-navy' : 'text-white'
  const linkColor = scrolled || !isHome ? 'text-text-secondary hover:text-navy' : 'text-slate-200 hover:text-white'

  return (
    <header className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 ${navBg}`}>
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 lg:px-8">

        <Link to="/" onClick={closeMenu} className="relative z-50 flex items-center gap-2 group">
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
              {/* Línea animada */}
              <span className={`absolute -bottom-1 left-0 w-0 h-[2px] transition-all duration-300 group-hover:w-full ${scrolled || !isHome ? 'bg-navy' : 'bg-white'}`}></span>
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

        {/* Botón Menú Móvil */}
        <button
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
          className={`relative z-50 flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors md:hidden ${scrolled || !isHome || open ? 'text-navy bg-surface-soft' : 'text-white bg-white/20'}`}
        >
          <div className="relative w-5 h-4">
            <span className={`absolute left-0 h-[2px] w-full bg-current transition-all duration-300 ${open ? 'top-2 rotate-45' : 'top-0'}`}></span>
            <span className={`absolute left-0 top-2 h-[2px] w-full bg-current transition-all duration-300 ${open ? 'opacity-0' : 'opacity-100'}`}></span>
            <span className={`absolute left-0 h-[2px] w-full bg-current transition-all duration-300 ${open ? 'top-2 -rotate-45' : 'top-4'}`}></span>
          </div>
        </button>
      </div>

      {/* Menú Móvil: overlay a pantalla completa, estilo editorial navy */}
      <div
        className={`fixed inset-0 z-40 bg-navy transition-opacity duration-300 md:hidden ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex h-full flex-col justify-between pt-24 pb-8 px-6">

          {/* Lista de navegación editorial */}
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
              const rowClass = `flex items-center gap-4 py-4 border-b border-white/10 transition-transform duration-200 active:translate-x-1`

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

          {/* CTA fijo abajo */}
          {!native && (
            <Link
              to="/planes"
              onClick={closeMenu}
              className="mt-6 block rounded-full bg-orange px-6 py-4 text-center text-sm font-bold uppercase tracking-wide text-white shadow-lg transition-all hover:bg-orange-dark active:scale-[0.98]"
            >
              Ver planes
            </Link>
          )}
        </div>
      </div>
    </header>
  )
}