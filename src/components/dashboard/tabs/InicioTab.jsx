import { useEffect, useState } from 'react'
import { listClientRoutine } from '../../../lib/routines'
import { listClientDiet } from '../../../lib/diets'
import { generateRoutinePdf, generateDietPdf } from '../../../lib/clientPdfs'
import { objetivoLabel } from '../../../lib/clients'
import EmptyState from '../EmptyState'

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function InicioTab({ client }) {
  const [routineEntries, setRoutineEntries] = useState([])
  const [dietEntries, setDietEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(null)

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    Promise.all([listClientRoutine(client.id), listClientDiet(client.id)]).then(
      ([{ entries: routine }, { entries: diet }]) => {
        setRoutineEntries(routine)
        setDietEntries(diet)
        setLoading(false)
      }
    )
  }, [client?.id])

  if (!client) {
    return (
      <EmptyState
        icon="🔍"
        title="No encontramos tu ficha de cliente"
        body="Tu cuenta existe pero no está vinculada a ningún cliente todavía. Escríbeme y lo reviso."
      />
    )
  }

  const hasPlanInfo = client.tipo_plan || client.plan_vigente_hasta || client.proxima_revision || client.objetivo_entrenamiento
  const hasAnything = hasPlanInfo || routineEntries.length > 0 || dietEntries.length > 0

  const handleDownload = async (type) => {
    setDownloading(type)
    try {
      if (type === 'rutina') await generateRoutinePdf(client, routineEntries)
      if (type === 'dieta') await generateDietPdf(client, dietEntries)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div>
      <p className="font-display text-lg font-bold text-navy">
        Hola {client.full_name?.split(' ')[0] || ''} 👋
      </p>

      {loading && <p className="mt-4 text-sm text-text-secondary">Cargando…</p>}

      {!loading && !hasAnything && (
        <div className="mt-6">
          <EmptyState
            icon="🗓️"
            title="Aún no tienes ningún entreno asignado"
            body="En cuanto diseñe tu plan lo verás aquí. Si tienes prisa, escríbeme."
          />
        </div>
      )}

      {!loading && hasPlanInfo && (
        <div className="mt-4 rounded-2xl border border-slate-100 bg-surface-soft p-4">
          {client.objetivo_entrenamiento && (
            <p className="text-sm text-navy">
              <span className="font-semibold">Objetivo:</span> {objetivoLabel(client.objetivo_entrenamiento)}
            </p>
          )}
          {client.tipo_plan && (
            <p className="mt-1 text-sm text-navy">
              <span className="font-semibold">Plan:</span> {client.tipo_plan}
            </p>
          )}
          {client.plan_vigente_hasta && (
            <p className="mt-1 text-sm text-navy">
              <span className="font-semibold">Vigente hasta:</span> {formatDate(client.plan_vigente_hasta)}
            </p>
          )}
          {client.proxima_revision && (
            <p className="mt-1 text-sm text-navy">
              <span className="font-semibold">Próxima revisión:</span> {formatDate(client.proxima_revision)}
            </p>
          )}
        </div>
      )}

      {!loading && (routineEntries.length > 0 || dietEntries.length > 0) && (
        <div className="mt-4 flex flex-wrap gap-2">
          {routineEntries.length > 0 && (
            <button
              type="button"
              onClick={() => handleDownload('rutina')}
              disabled={downloading === 'rutina'}
              className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
            >
              {downloading === 'rutina' ? 'Generando…' : '📄 Descargar mi rutina'}
            </button>
          )}
          {dietEntries.length > 0 && (
            <button
              type="button"
              onClick={() => handleDownload('dieta')}
              disabled={downloading === 'dieta'}
              className="rounded-full bg-orange px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
            >
              {downloading === 'dieta' ? 'Generando…' : '📄 Descargar mi dieta'}
            </button>
          )}
        </div>
      )}
    </div>
  )
}