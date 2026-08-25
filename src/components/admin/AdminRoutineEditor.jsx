import { useEffect, useState } from 'react'
import { listMuscleGroups, listExercisesByGroup } from '../../lib/exercises'
import { DIAS_SEMANA, addRoutineEntry, deleteRoutineEntry } from '../../lib/routines'

const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

export default function AdminRoutineEditor({ clientId, entries, onChange }) {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [exercisesInGroup, setExercisesInGroup] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')

  const [diaSemana, setDiaSemana] = useState(1)
  const [seriesObjetivo, setSeriesObjetivo] = useState(3)
  const [repsObjetivo, setRepsObjetivo] = useState(10)
  const [notas, setNotas] = useState('')
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    listMuscleGroups().then(({ groups }) => {
      setGroups(groups)
      if (groups.length > 0) setSelectedGroup(groups[0])
    })
  }, [])

  useEffect(() => {
    if (!selectedGroup) return
    listExercisesByGroup(selectedGroup).then(({ exercises }) => {
      setExercisesInGroup(exercises)
      setSelectedExerciseId(exercises[0]?.id ?? '')
    })
  }, [selectedGroup])

  const entriesByDay = DIAS_SEMANA.map((dia) => ({
    dia,
    items: entries
      .filter((e) => e.dia_semana === dia.value)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0)),
  }))

  const handleAdd = async () => {
    if (!selectedExerciseId) return
    setSaving(true)

    const nextOrden = entries.filter((e) => e.dia_semana === diaSemana).length + 1

    const { error } = await addRoutineEntry({
      clientId,
      diaSemana,
      ejercicioId: Number(selectedExerciseId),
      orden: nextOrden,
      seriesObjetivo: Number(seriesObjetivo),
      repsObjetivo: Number(repsObjetivo),
      notasEntrenador: notas,
    })

    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    setNotas('')
    onChange()
  }

  const handleDelete = async (id) => {
    const { error } = await deleteRoutineEntry(id)
    if (error) {
      alert('Error al borrar: ' + error.message)
      return
    }
    onChange()
  }

  return (
    <div>
      <div className="rounded-2xl border border-slate-100 bg-white p-5">
        <div className="grid gap-3 sm:grid-cols-2">
          <div>
            <label className={LABEL}>Grupo muscular</label>
            <select
              value={selectedGroup}
              onChange={(e) => setSelectedGroup(e.target.value)}
              className={FIELD}
            >
              {groups.map((g) => (
                <option key={g} value={g}>
                  {g}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL}>Ejercicio</label>
            <select
              value={selectedExerciseId}
              onChange={(e) => setSelectedExerciseId(e.target.value)}
              className={FIELD}
            >
              {exercisesInGroup.map((ex) => (
                <option key={ex.id} value={ex.id}>
                  {ex.nombre}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className={LABEL}>Día de la semana</label>
            <select
              value={diaSemana}
              onChange={(e) => setDiaSemana(Number(e.target.value))}
              className={FIELD}
            >
              {DIAS_SEMANA.map((d) => (
                <option key={d.value} value={d.value}>
                  {d.label}
                </option>
              ))}
            </select>
          </div>

          <div className="flex gap-3">
            <div className="flex-1">
              <label className={LABEL}>Series</label>
              <input
                type="number"
                min="1"
                value={seriesObjetivo}
                onChange={(e) => setSeriesObjetivo(e.target.value)}
                className={FIELD}
              />
            </div>
            <div className="flex-1">
              <label className={LABEL}>Repeticiones</label>
              <input
                type="number"
                min="1"
                value={repsObjetivo}
                onChange={(e) => setRepsObjetivo(e.target.value)}
                className={FIELD}
              />
            </div>
          </div>
        </div>

        <div className="mt-3">
          <label className={LABEL}>Nota para el cliente (opcional)</label>
          <input
            type="text"
            placeholder="ej. 'controla la bajada'"
            value={notas}
            onChange={(e) => setNotas(e.target.value)}
            className={FIELD}
          />
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={saving || !selectedExerciseId}
          className="mt-4 rounded-full bg-orange px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
        >
          {saving ? 'Guardando…' : 'Añadir a la rutina'}
        </button>
      </div>

      <div className="mt-6 space-y-4">
        {entriesByDay.map(({ dia, items }) => (
          <div key={dia.value} className="rounded-2xl border border-slate-100 p-4">
            <p className="font-display text-sm font-bold text-navy">{dia.label}</p>
            {items.length === 0 ? (
              <p className="mt-2 text-xs text-text-secondary">Sin ejercicios asignados.</p>
            ) : (
              <ul className="mt-2 space-y-1.5">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="flex items-center justify-between rounded-lg bg-surface-soft px-3 py-1.5 text-xs"
                  >
                    <span className="text-navy-light">
                      {it.ejercicios?.nombre} — {it.series_objetivo}×{it.reps_objetivo ?? '?'}
                      {it.notas_entrenador ? ` · "${it.notas_entrenador}"` : ''}
                    </span>
                    <button
                      type="button"
                      onClick={() => handleDelete(it.id)}
                      className="text-text-secondary hover:text-red-500"
                    >
                      ✕
                    </button>
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}