import { useEffect, useState } from 'react'
import { getStravaAuthorizeUrl, syncStravaActivities } from '../../lib/strava'
import { listStravaActivities } from '../../lib/stravaActivities'

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m} min`
}

function formatDistance(meters) {
  return `${(meters / 1000).toFixed(1)} km`
}

export default function StravaConnect({ client }) {
  const [activities, setActivities] = useState([])
  const [loading, setLoading] = useState(true)
  const [syncing, setSyncing] = useState(false)
  const [error, setError] = useState(null)

  const load = async () => {
    setLoading(true)
    const { activities, error } = await listStravaActivities(client.id)
    setActivities(activities)
    setError(error)
    setLoading(false)
  }

  useEffect(() => {
    if (client?.strava_connected) {
      load()
    } else {
      setLoading(false)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client?.id, client?.strava_connected])

  const handleSync = async () => {
    setSyncing(true)
    const { data, error } = await syncStravaActivities(client.id)
    setSyncing(false)
    if (error || data?.error) {
      alert('Error al sincronizar: ' + (error?.message || JSON.stringify(data?.error)))
      return
    }
    load()
  }

  if (!client?.strava_connected) {
    return (
      <div className="rounded-2xl border border-dashed border-orange-light bg-orange/5 p-4 text-center">
        <p className="text-2xl">🏃</p>
        <p className="mt-2 font-display text-sm font-bold text-navy">Conecta tu Strava</p>
        <p className="mt-1 text-xs text-text-secondary">
          Sincroniza tus entrenamientos automáticamente para llevar un seguimiento completo.
        </p>
        <a
          href={getStravaAuthorizeUrl()}
          className="mt-3 inline-block rounded-full bg-[#FC4C02] px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-95"
        >
          Conectar con Strava
        </a>
      </div>
    )
  }

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <div className="flex items-center justify-between">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          Actividad de Strava
        </p>
        <button
          type="button"
          onClick={handleSync}
          disabled={syncing}
          className="rounded-full bg-[#FC4C02] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
        >
          {syncing ? 'Sincronizando…' : '🔄 Sincronizar ahora'}
        </button>
      </div>

      {loading && <p className="mt-3 text-xs text-text-secondary">Cargando…</p>}

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error.message}</p>
      )}

      {!loading && activities.length === 0 && !error && (
        <p className="mt-3 text-xs text-text-secondary">
          Aún no hay actividades sincronizadas. Pulsa "Sincronizar ahora".
        </p>
      )}

      {!loading && activities.length > 0 && (
        <ul className="mt-3 space-y-2">
          {activities.map((a) => (
            <li key={a.id}>
              <a
                href={`https://www.strava.com/activities/${a.id}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block rounded-xl bg-surface-soft p-3 transition hover:bg-slate-200"
              >
                <div className="flex items-center justify-between">
                  <p className="text-sm font-semibold text-navy">{a.nombre}</p>
                  <span className="text-[10px] text-text-secondary">
                    {new Date(a.fecha).toLocaleDateString('es-ES')}
                  </span>
                </div>
                <p className="mt-0.5 text-[11px] text-text-secondary">
                  {a.tipo} · {formatDistance(a.distancia_m)} · {formatDuration(a.duracion_s)}
                  <span className="ml-1 text-orange-dark">↗</span>
                </p>
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}