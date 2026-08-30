import { useEffect, useState } from 'react'
import { listProgressHistory } from '../../../lib/notes'
import ProgressForm from '../ProgressForm'
import MeasurementsChart from '../MeasurementsChart'
import PhotoGallery from '../PhotoGallery'
import StravaConnect from '../StravaConnect'
import EmptyState from '../EmptyState'

export default function ProgresoTab({ client }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    setLoading(true)
    const { entries, error } = await listProgressHistory(client.id)
    setEntries(entries)
    setError(error)
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client?.id])

  if (!client) {
    return <EmptyState icon="🔍" title="No encontramos tu ficha de cliente" body="Escríbeme para revisarlo." />
  }

  return (
    <div className="space-y-4">
      <ProgressForm clientId={client.id} onSaved={load} />

      {error && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Error al cargar tu progreso: {error.message}
        </p>
      )}

      {loading && <p className="text-sm text-text-secondary">Cargando…</p>}

      {!loading && entries.length > 0 && (
        <>
          <MeasurementsChart entries={entries} />
          <PhotoGallery entries={entries} />
        </>
      )}

      {!loading && entries.length === 0 && !error && (
        <EmptyState
          icon="📈"
          title="Todavía no hay progreso registrado"
          body="Usa el botón de arriba para registrar tus primeras medidas."
        />
      )}

      <StravaConnect client={client} />
    </div>
  )
}