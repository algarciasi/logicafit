import { Link } from 'react-router-dom'
import MeasurementsChart from '../../dashboard/MeasurementsChart'
import { demoProgressEntries, demoStravaActivities } from '../demoData'

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m} min`
}

function formatDistance(meters) {
  return meters > 0 ? `${(meters / 1000).toFixed(1)} km` : null
}

export default function ProgresoTab() {
  return (
    <div className="space-y-4">
      <Link
        to="/planes"
        className="block w-full rounded-2xl border border-dashed border-orange-light bg-orange/5 px-4 py-3 text-center text-sm font-semibold text-orange-dark transition hover:bg-orange/10"
      >
        + Registrar medidas de esta semana
      </Link>

      <MeasurementsChart entries={demoProgressEntries} />

      <div className="rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
            Actividad de Strava
          </p>
          <span className="rounded-full bg-[#FC4C02]/10 px-2 py-0.5 text-[10px] font-semibold text-[#FC4C02]">
            Conectado
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {demoStravaActivities.map((a) => (
            <li key={a.id} className="rounded-xl bg-surface-soft p-3">
              <div className="flex items-center justify-between">
                <p className="text-sm font-semibold text-navy">{a.nombre}</p>
                <span className="text-[10px] text-text-secondary">
                  {new Date(a.fecha).toLocaleDateString('es-ES')}
                </span>
              </div>
              <p className="mt-0.5 text-[11px] text-text-secondary">
                {a.tipo}
                {formatDistance(a.distancia_m) ? ` · ${formatDistance(a.distancia_m)}` : ''} ·{' '}
                {formatDuration(a.duracion_s)}
              </p>
            </li>
          ))}
        </ul>
        <p className="mt-3 text-center text-[11px] text-text-secondary">
          Se sincroniza solo, sin tener que apuntar nada a mano.
        </p>
      </div>

      <p className="text-center text-[11px] text-text-secondary">
        También puedes subir fotos (frente, perfiles, espalda) para ver tu evolución visual.
      </p>
    </div>
  )
}