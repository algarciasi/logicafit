import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

export default function Signup() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [checkEmail, setCheckEmail] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)

    const { data, error: signUpError } = await signUp(email, password)

    setLoading(false)

    if (signUpError) {
      setError(signUpError.message)
      return
    }

    if (data.session) {
      navigate('/dashboard')
    } else {
      setCheckEmail(true)
    }
  }

  if (checkEmail) {
    return (
      <div className="flex min-h-[80vh] items-center justify-center bg-surface-soft px-6 py-16">
        <div className="max-w-sm rounded-2xl border border-slate-100 bg-white p-8 text-center">
          <span className="text-3xl">📩</span>
          <h1 className="mt-4 font-display text-lg font-bold text-navy">Revisa tu email</h1>
          <p className="mt-2 text-sm text-text-secondary">
            Te hemos enviado un enlace de confirmación a <strong>{email}</strong>. Confírmalo
            para poder acceder a tu plan.
          </p>
        </div>
      </div>
    )
  }

  return (
    <div className="flex min-h-[80vh] items-center justify-center bg-surface-soft px-6 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center">
          <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
            Área de clientes
          </p>
          <h1 className="mt-2 font-display text-2xl font-extrabold text-navy">
            Crea tu cuenta
          </h1>
          <p className="mt-1 text-sm text-text-secondary">
            Usa el email con el que contrataste tu plan.
          </p>
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
              minLength={6}
              autoComplete="new-password"
              className={FIELD}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <p className="mt-1 text-[11px] text-text-secondary">Mínimo 6 caracteres.</p>
          </div>

          {error && (
            <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error}</p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="mt-6 w-full rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {loading ? 'Creando cuenta…' : 'Crear cuenta'}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-text-secondary">
          ¿Ya tienes cuenta?{' '}
          <Link to="/login" className="font-semibold text-orange-dark hover:underline">
            Inicia sesión
          </Link>
        </p>
      </div>
    </div>
  )
}