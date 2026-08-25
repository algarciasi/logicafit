import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listClients } from '../../lib/clients'

function ClientCard({ c }) {
  return (
    <Link
      to={`/admin/clientes/${c.id}`}
      className="flex items-center justify-between rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-orange-light hover:shadow-md"
    >
      <div>
        <p className="font-display font-bold text-navy">{c.full_name || c.email}</p>
        <p className="text-xs text-text-secondary">
          {c.email} {c.objetivo_entrenamiento ? `· ${c.objetivo_entrenamiento}` : ''}
        </p>
      </div>
      <span className="text-orange">→</span>
    </Link>
  )
}

export default function AdminClients() {
  const [clients, setClients] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    listClients().then(({ clients, error }) => {
      setClients(clients)
      setError(error)
      setLoading(false)
    })
  }, [])

  const activos = clients.filter((c) => (c.status || 'activo') === 'activo')
  const noActivos = clients.filter((c) => (c.status || 'activo') !== 'activo')

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">Admin</p>
      <h1 className="mt-1 font-display text-2xl font-extrabold text-navy">Tus clientes</h1>

      {loading && <p className="mt-6 text-sm text-text-secondary">Cargando…</p>}

      {error && (
        <p className="mt-6 rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Error al cargar clientes: {error.message}
        </p>
      )}

      {!loading && !error && clients.length === 0 && (
        <p className="mt-6 text-sm text-text-secondary">
          Aún no tienes ningún cliente en la tabla `clients`.
        </p>
      )}

      {!loading && activos.length > 0 && (
        <div className="mt-6">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            Activos ({activos.length})
          </p>
          <ul className="mt-3 space-y-3">
            {activos.map((c) => (
              <li key={c.id}>
                <ClientCard c={c} />
              </li>
            ))}
          </ul>
        </div>
      )}

      {!loading && noActivos.length > 0 && (
        <div className="mt-10">
          <p className="text-xs font-semibold uppercase tracking-wide text-text-secondary">
            No activos ({noActivos.length})
          </p>
          <ul className="mt-3 space-y-3 opacity-70">
            {noActivos.map((c) => (
              <li key={c.id}>
                <ClientCard c={c} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}