import { Link } from 'react-router-dom'
import BrowserFrame from './demo/BrowserFrame'
import { demoStravaActivities } from './demo/demoData'

function formatDuration(seconds) {
  const h = Math.floor(seconds / 3600)
  const m = Math.round((seconds % 3600) / 60)
  return h > 0 ? `${h}h ${m}min` : `${m} min`
}

function formatDistance(meters) {
  return meters > 0 ? `${(meters / 1000).toFixed(1)} km` : null
}

export default function StravaShowcase() {
  return (
    <section className="bg-white py-20">
      <div className="mx-auto grid max-w-6xl items-center gap-12 px-6 md:grid-cols-2">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wide text-[#FC4C02]">
            Conecta tu reloj o tu móvil
          </p>
          <h2 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
            Se sincroniza con Strava. De verdad.
          </h2>
          <p className="mt-4 max-w-md text-text-secondary">
            Corres, montas en bici o entrenas fuerza y lo registras en Strava —
            aparece solo en tu panel, con distancia, tiempo y calorías. Nada de
            apuntarlo a mano ni mandarme capturas por WhatsApp.
          </p>

          <span className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#FC4C02]/10 px-4 py-2 text-sm font-semibold text-[#FC4C02]">
            <img src="/brand/strava.png" alt="Strava" className="h-5 w-5" />
            Integración oficial con Strava
          </span>

          <div>
            <Link
              to="/demo?tab=progreso"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-navy px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-navy-light"
            >
              Ver la demo interactiva →
            </Link>
          </div>
        </div>

        <div className="relative">
          <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-[#FC4C02]/10 blur-2xl" />
          <BrowserFrame compact>
            <div className="flex items-center justify-between">
              <p className="flex items-center gap-2 font-display text-sm font-bold text-navy">
                <img src="/brand/strava.png" alt="Strava" className="h-5 w-5" />
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
          </BrowserFrame>
        </div>
      </div>
    </section>
  )
}