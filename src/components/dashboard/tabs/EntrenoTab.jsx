import { useEffect, useState } from 'react'
import { listClientRoutine, DIAS_SEMANA } from '../../../lib/routines'
import { listRoutineHistory } from '../../../lib/history'
import ExerciseLogItem from '../ExerciseLogItem'
import HistoryPanel from '../HistoryPanel'
import EmptyState from '../EmptyState'

export default function EntrenoTab({ client }) {
  const [entries, setEntries] = useState([])
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    Promise.all([listClientRoutine(client.id), listRoutineHistory(client.id)]).then(
      ([{ entries, error }, { entries: hist }]) => {
        setEntries(entries)
        setError(error)
        setHistory(hist)
        setLoading(false)
      }
    )
  }, [client?.id])

  if (!client) {
    return <EmptyState icon="🔍" title="Ficha no encontrada" body="Escríbeme para revisarlo." />
  }

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-4">
        <div className="h-6 w-1/3 rounded bg-slate-200"></div>
        <div className="h-20 rounded-[1.25rem] bg-slate-100"></div>
        <div className="h-20 rounded-[1.25rem] bg-slate-100"></div>
      </div>
    )
  }

  if (error) {
    return (
      <p className="rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-sm text-red-600">
        Error al cargar tu rutina: {error.message}
      </p>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="space-y-6 pb-24">
        <EmptyState
          icon="🏋️"
          title="Sin rutina activa"
          body="Aquí aparecerán tus ejercicios en cuanto te asigne tu plan."
        />
        {history.length > 0 && (
          <HistoryPanel title="Rutinas anteriores" entries={history} nameKey="nombre_rutina" />
        )}
      </div>
    )
  }

  const entriesByDay = DIAS_SEMANA.map((dia) => ({
    dia,
    items: entries
      .filter((e) => e.dia_semana === dia.value)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0)),
  })).filter((d) => d.items.length > 0)

  return (
    <div className="flex flex-col gap-8 pb-24 animate-fade-in">
      
      {/* Cabecera general de la pestaña */}
      <div>
        <p className="text-sm font-bold uppercase tracking-widest text-orange">
          Tu plan activo
        </p>
        <h2 className="mt-1 font-display text-3xl font-extrabold text-navy">
          Entrenamiento
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
          Toca cualquier ejercicio para ver el vídeo técnico en YouTube. Usa el icono del cuaderno para registrar tus pesos.
        </p>
      </div>

      {/* Lista agrupada por días */}
      <div className="flex flex-col gap-8">
        {entriesByDay.map(({ dia, items }) => (
          <div key={dia.value}>
            
            {/* Título del Día */}
            <div className="mb-4 flex items-center justify-between">
              <h3 className="font-display text-2xl font-extrabold text-navy capitalize">
                {dia.label}
              </h3>
              <div className="rounded-full bg-orange/10 px-3 py-1">
                <span className="text-[10px] font-extrabold uppercase tracking-widest text-orange">
                  {items.length} {items.length === 1 ? 'ejercicio' : 'ejercicios'}
                </span>
              </div>
            </div>

            {/* Renderizado de las tarjetas individuales (ExerciseLogItem) */}
            <div>
              {items.map((it) => (
                <ExerciseLogItem key={it.id} clientId={client.id} routineEntry={it} />
              ))}
            </div>

          </div>
        ))}
      </div>

      {history.length > 0 && (
        <div className="mt-4 border-t border-slate-100 pt-8">
          <HistoryPanel title="Rutinas anteriores" entries={history} nameKey="nombre_rutina" />
        </div>
      )}

    </div>
  )
}