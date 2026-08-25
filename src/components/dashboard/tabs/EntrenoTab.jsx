import { useEffect, useState } from 'react'
import { listClientRoutine, DIAS_SEMANA } from '../../../lib/routines'
import ExerciseLogItem from '../ExerciseLogItem'
import EmptyState from '../EmptyState'

export default function EntrenoTab({ client }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    listClientRoutine(client.id).then(({ entries }) => {
      setEntries(entries)
      setLoading(false)
    })
  }, [client?.id])

  if (!client) {
    return <EmptyState icon="🔍" title="No encontramos tu ficha de cliente" body="Escríbeme para revisarlo." />
  }

  if (loading) {
    return <p className="text-sm text-text-secondary">Cargando…</p>
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="🏋️"
        title="Todavía no hay una rutina cargada"
        body="Aquí aparecerán tus ejercicios, series y repeticiones en cuanto te asigne tu plan."
      />
    )
  }

  const entriesByDay = DIAS_SEMANA.map((dia) => ({
    dia,
    items: entries
      .filter((e) => e.dia_semana === dia.value)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0)),
  })).filter((d) => d.items.length > 0)

  return (
    <div className="space-y-4">
      <p className="text-xs text-text-secondary">
        Toca un ejercicio para ver tu historial y apuntar la serie de hoy.
      </p>
      {entriesByDay.map(({ dia, items }) => (
        <div key={dia.value}>
          <p className="font-display text-sm font-bold text-navy">{dia.label}</p>
          <div className="mt-2 space-y-2">
            {items.map((it) => (
              <ExerciseLogItem key={it.id} clientId={client.id} routineEntry={it} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}