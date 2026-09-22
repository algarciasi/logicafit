import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { hideNativeSplash } from '../lib/nativeSplash'

// Constantes originales para la vista de escritorio
const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

// Detecta si corre dentro de Capacitor (app nativa Android/iOS)
const isNativeApp = () =>
  typeof window !== 'undefined' && window.Capacitor !== undefined

const ADMIN_EMAIL = 'tulogicafit@gmail.com' 

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const native = isNativeApp()

  const [showSplash, setShowSplash] = useState(true)

  useEffect(() => {
    // Mientras el splash nativo está activo, Android no dibuja el WebView, así
    // que requestAnimationFrame no se ejecuta. Por eso se llama directamente:
    // el primer frame que se dibuje al quitarlo ya contendrá este splash.
    hideNativeSplash()

    // 1400 ms = 1200 ms de splash visible + ~200 ms del fundido del nativo
    const timer = setTimeout(() => {
      setShowSplash(false)
    }, 1400)

    return () => clearTimeout(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { error: signInError } = await signIn(email, password)

    setLoading(false)

    if (signInError) {
      setError(
        signInError.message === 'Invalid login credentials'
          ? 'Email o contraseña incorrectos.'
          : signInError.message
      )
      return
    }

    if (email.toLowerCase().trim() === ADMIN_EMAIL.toLowerCase()) {
      navigate('/admin/clientes')
    } else {
      navigate('/dashboard')
    }
  }

  return (
    <>
      {/* =========================================================
          VERSIÓN ESCRITORIO (INTACTA)
      ========================================================== */}
      <div className="hidden md:flex min-h-[80vh] items-center justify-center bg-surface-soft px-6 py-16">
        <div className="w-full max-w-sm">
          <div className="text-center">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
              Área de clientes
            </p>
            <h1 className="mt-2 font-display text-2xl font-extrabold text-navy">
              Accede a tu plan
            </h1>
          </div>

          <form onSubmit={handleSubmit} className="mt-8 rounded-2xl border border-slate-100 bg-white p-6">
            <div>
              <label className={LABEL}>Email</label>
              <input
                type="email"
                required
                autoComplete="email"
                className={FIELD}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="mt-4">
              <label className={LABEL}>Contraseña</label>
              <input
                type="password"
                required
                autoComplete="current-password"
                className={FIELD}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-6 w-full rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? 'Entrando…' : 'Entrar'}
            </button>
          </form>

          {!native && (
            <p className="mt-5 text-center text-sm text-text-secondary">
              ¿Aún no eres cliente?{' '}
              <Link to="/planes" className="font-semibold text-navy hover:underline">
                Ver planes
              </Link>
            </p>
          )}
        </div>
      </div>

      {/* =========================================================
          VERSIÓN MÓVIL (ANIMADA)
      ========================================================== */}
      {/* El fondo del contenedor es fijo: el splash es opaco (bg-navy) y tapa todo,
          así que ya no hace falta cambiar el fondo del padre con una transición. */}
      <div className="flex md:hidden relative min-h-[100dvh] flex-col items-center justify-center overflow-hidden bg-slate-50">
        
        {/* SPLASH SCREEN (opaco, no depende del fondo del padre) */}
        <div
          className={`md:hidden fixed inset-0 z-[100] flex flex-col items-center justify-center bg-navy transition-opacity duration-1000 ease-in-out ${
            showSplash
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
        >
          <div className={`relative flex flex-col items-center transition-transform duration-1000 ease-out ${
            showSplash ? 'scale-100' : 'scale-110'
          }`}>
            <div className="absolute inset-0 -m-10 animate-pulse rounded-full bg-orange/20 blur-3xl"></div>
            
            <h1 className="relative font-display text-5xl font-extrabold tracking-tight text-white drop-shadow-xl">
              Lógica<span className="text-orange">Fit</span>
            </h1>
          </div>
        </div>

        {/* CONTENIDO DEL LOGIN */}
        <div
          className={`w-full max-w-sm px-6 py-8 transition-all duration-1000 ease-out ${
            showSplash ? 'translate-y-10 opacity-0' : 'translate-y-0 opacity-100'
          }`}
          style={{ transitionDelay: showSplash ? '0ms' : '200ms' }}
        >
          <div className="text-center">
            <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-orange">
              Área de clientes
            </p>
            <h2 className="mt-2 font-display text-3xl font-extrabold tracking-tight text-navy">
              Accede a tu plan
            </h2>
          </div>

          <form
            onSubmit={handleSubmit}
            className="mt-8 overflow-hidden rounded-[2rem] bg-white p-6 shadow-[0_8px_30px_rgb(0,0,0,0.04)] ring-1 ring-slate-100/80 sm:p-8"
          >
            <div className="relative">
              <input
                id="email-mobile"
                type="email"
                required
                autoComplete="email"
                placeholder="Email"
                className="peer w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 pb-2 pt-6 text-base font-medium text-navy placeholder-transparent transition-all focus:border-orange focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange/10"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label
                htmlFor="email-mobile"
                className="pointer-events-none absolute left-4 top-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-extrabold peer-focus:uppercase peer-focus:text-orange"
              >
                Email
              </label>
            </div>

            <div className="relative mt-5">
              <input
                id="password-mobile"
                type="password"
                required
                autoComplete="current-password"
                placeholder="Contraseña"
                className="peer w-full rounded-2xl border border-slate-200 bg-slate-50/50 px-4 pb-2 pt-6 text-base font-medium text-navy placeholder-transparent transition-all focus:border-orange focus:bg-white focus:outline-none focus:ring-4 focus:ring-orange/10"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label
                htmlFor="password-mobile"
                className="pointer-events-none absolute left-4 top-2 text-[10px] font-extrabold uppercase tracking-wider text-slate-400 transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-sm peer-placeholder-shown:font-medium peer-placeholder-shown:normal-case peer-placeholder-shown:text-slate-400 peer-focus:top-2 peer-focus:text-[10px] peer-focus:font-extrabold peer-focus:uppercase peer-focus:text-orange"
              >
                Contraseña
              </label>
            </div>

            {error && (
              <div className="mt-5 rounded-xl border border-red-100 bg-red-50 p-3">
                <p className="text-center text-xs font-semibold text-red-600">
                  {error}
                </p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="mt-8 flex w-full items-center justify-center rounded-2xl bg-orange px-6 py-4 text-sm font-extrabold uppercase tracking-wider text-white shadow-[0_8px_20px_rgba(234,88,12,0.25)] transition-all hover:-translate-y-0.5 hover:bg-orange-dark hover:shadow-[0_12px_25px_rgba(234,88,12,0.3)] active:translate-y-0 active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
            >
              {loading ? (
                <svg
                  className="h-5 w-5 animate-spin text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
              ) : (
                'Entrar al plan'
              )}
            </button>
          </form>

          {!native && (
            <div className="mt-8 text-center">
              <p className="text-sm font-medium text-slate-500">
                ¿Aún no eres cliente?{' '}
                <Link
                  to="/planes"
                  className="font-extrabold text-navy transition-colors hover:text-orange"
                >
                  Ver planes
                </Link>
              </p>
            </div>
          )}
        </div>
      </div>
    </>
  )
}
