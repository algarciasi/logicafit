import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

export default function Login() {
  const { signIn } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

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

    navigate('/dashboard')
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-surface-soft px-6 py-16">
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

        <p className="mt-5 text-center text-sm text-text-secondary">
          ¿Aún no tienes cuenta?{' '}
          <Link to="/registro" className="font-semibold text-orange-dark hover:underline">
            Regístrate
          </Link>
        </p>
        <p className="mt-2 text-center text-xs text-text-secondary">
          ¿Aún no eres cliente?{' '}
          <Link to="/planes" className="font-semibold text-navy hover:underline">
            Ver planes
          </Link>
        </p>
      </div>
    </div>
  )
}