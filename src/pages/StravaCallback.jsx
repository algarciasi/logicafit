import { useEffect, useState } from 'react'
import { useNavigate, useSearchParams, Link } from 'react-router-dom'
import { useClientProfile } from '../hooks/useClientProfile'
import { exchangeStravaCode } from '../lib/strava'

export default function StravaCallback() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const { client, loading: clientLoading } = useClientProfile()
  const [status, setStatus] = useState('procesando') // procesando | error | ok
  const [errorMsg, setErrorMsg] = useState(null)

  useEffect(() => {
    if (clientLoading) return

    const code = searchParams.get('code')
    const stravaError = searchParams.get('error')

    if (stravaError) {
      setStatus('error')
      setErrorMsg('Has cancelado la conexión con Strava.')
      return
    }

    if (!code) {
      setStatus('error')
      setErrorMsg('Falta el código de autorización de Strava.')
      return
    }

    if (!client) {
      setStatus('error')
      setErrorMsg('No encontramos tu ficha de cliente.')
      return
    }

    exchangeStravaCode(code, client.id).then(({ data, error }) => {
      if (error || data?.error) {
        setStatus('error')
        setErrorMsg(error?.message || JSON.stringify(data?.error))
        return
      }
      setStatus('ok')
      setTimeout(() => navigate('/dashboard'), 1500)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clientLoading, client])

  return (
    <div className="flex min-h-[70vh] items-center justify-center px-6">
      <div className="max-w-sm rounded-2xl border border-slate-100 bg-white p-8 text-center">
        {status === 'procesando' && (
          <>
            <p className="text-3xl">🔄</p>
            <p className="mt-3 text-sm text-text-secondary">Conectando con Strava…</p>
          </>
        )}
        {status === 'ok' && (
          <>
            <p className="text-3xl">✅</p>
            <p className="mt-3 font-display font-bold text-navy">¡Conectado!</p>
            <p className="mt-1 text-sm text-text-secondary">Te llevamos a tu panel…</p>
          </>
        )}
        {status === 'error' && (
          <>
            <p className="text-3xl">⚠️</p>
            <p className="mt-3 font-display font-bold text-navy">No se pudo conectar</p>
            <p className="mt-1 text-sm text-text-secondary">{errorMsg}</p>
            <Link
              to="/dashboard"
              className="mt-4 inline-block text-sm font-semibold text-orange-dark hover:underline"
            >
              Volver a tu panel
            </Link>
          </>
        )}
      </div>
    </div>
  )
}