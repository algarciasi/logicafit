import { useEffect, useState } from 'react'
import { getStravaAuthorizeUrl, syncStravaActivities, disconnectStrava } from '../../lib/strava'
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
  const [disconnecting, setDisconnecting] = useState(false)
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

  const handleDisconnect = async () => {
    if (!window.confirm('¿Seguro que quieres desconectar Strava? Dejarán de sincronizarse tus entrenamientos.')) {
      return
    }
    setDisconnecting(true)
    const { data, error } = await disconnectStrava(client.id)
    setDisconnecting(false)
    if (error || data?.error) {
      alert('Error al desconectar: ' + (error?.message || JSON.stringify(data?.error)))
      return
    }
    // Recargamos para que el panel refleje el nuevo estado (ya no conectado)
    window.location.reload()
  }

  if (!client?.strava_connected) {
    return (
      <div className="rounded-2xl border border-dashed border-orange-light bg-orange/5 p-4 text-center">
        <img src="/brand/strava.png" alt="Strava" className="mx-auto h-8 w-8" />
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
      <div className="flex items-center justify-between gap-2">
        <p className="flex items-center gap-1.5 text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
          <img src="/brand/strava.png" alt="Strava" className="h-4 w-4" />
          Actividad de Strava
        </p>
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={handleSync}
            disabled={syncing}
            className="rounded-full bg-[#FC4C02] px-3 py-1.5 text-[11px] font-semibold text-white transition hover:brightness-95 disabled:opacity-60"
          >
            {syncing ? 'Sincronizando…' : '🔄 Sincronizar'}
          </button>
          <button
            type="button"
            onClick={handleDisconnect}
            disabled={disconnecting}
            className="text-[11px] font-medium text-text-secondary underline-offset-2 transition hover:text-red-500 hover:underline disabled:opacity-60"
          >
            {disconnecting ? '…' : 'Desconectar'}
          </button>
        </div>
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
                  {a.calorias ? (
                    <span className="text-orange-dark"> · {Math.round(a.calorias)} kcal</span>
                  ) : (
                    ''
                  )}
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