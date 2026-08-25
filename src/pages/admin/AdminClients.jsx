import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { listClients, updateClientStatus } from '../../lib/clients'

const STATUS_OPTIONS = [
  { value: 'activo', label: 'Activo' },
  { value: 'pausado', label: 'Pausado' },
  { value: 'de_baja', label: 'De baja' },
]

function ClientCard({ c, onStatusChange }) {
  const [updating, setUpdating] = useState(false)

  const handleChange = async (e) => {
    const newStatus = e.target.value
    setUpdating(true)
    await onStatusChange(c.id, newStatus)
    setUpdating(false)
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-white p-5 transition hover:border-orange-light hover:shadow-md">
      <Link to={`/admin/clientes/${c.id}`} className="min-w-0 flex-1">
        <p className="truncate font-display font-bold text-navy">{c.full_name || c.email}</p>
        <p className="truncate text-xs text-text-secondary">
          {c.email} {c.objetivo_entrenamiento ? `· ${c.objetivo_entrenamiento}` : ''}
        </p>
      </Link>

      <select
        value={c.status || 'activo'}
        onChange={handleChange}
        onClick={(e) => e.stopPropagation()}
        disabled={updating}
        className={`shrink-0 rounded-full border-0 px-3 py-1.5 text-xs font-semibold transition disabled:opacity-50 ${
          (c.status || 'activo') === 'activo'
            ? 'bg-orange/10 text-orange-dark'
            : 'bg-slate-100 text-text-secondary'
        }`}
      >
        {STATUS_OPTIONS.map((s) => (
          <option key={s.value} value={s.value}>
            {s.label}
          </option>
        ))}
      </select>
    </div>
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

  const handleStatusChange = async (clientId, newStatus) => {
    const { error } = await updateClientStatus(clientId, newStatus)
    if (error) {
      alert('Error al actualizar el estado: ' + error.message)
      return
    }
    setClients((prev) =>
      prev.map((c) => (c.id === clientId ? { ...c, status: newStatus } : c))
    )
  }

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
                <ClientCard c={c} onStatusChange={handleStatusChange} />
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
                <ClientCard c={c} onStatusChange={handleStatusChange} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  )
}