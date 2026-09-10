import { useEffect, useState } from 'react'
import { listMuscleGroups, listExercisesByGroup } from '../../lib/exercises'
import { DIAS_SEMANA, addRoutineEntry, deleteRoutineEntry } from '../../lib/routines'

export default function AdminRoutineEditor({ clientId, entries, onChange }) {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [exercisesInGroup, setExercisesInGroup] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')

  // Nuevos estados para la selección múltiple de días (Por defecto: no todos los días, solo Lunes)
  const [todosLosDias, setTodosLosDias] = useState(false)
  const [selectedDays, setSelectedDays] = useState([1]) 

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

  const toggleDay = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    )
  }

  const handleAdd = async () => {
    if (!selectedExerciseId) return
    setSaving(true)

    // Determinamos en qué días se va a insertar el ejercicio
    const daysToAdd = todosLosDias ? DIAS_SEMANA.map(d => d.value) : selectedDays

    // Hacemos un bucle para añadir el ejercicio a cada día seleccionado
    for (const dia of daysToAdd) {
      // Calculamos el orden específico para ESE día concreto
      const nextOrden = entries.filter((e) => e.dia_semana === dia).length + 1

      const { error } = await addRoutineEntry({
        clientId,
        diaSemana: dia,
        ejercicioId: Number(selectedExerciseId),
        orden: nextOrden,
        seriesObjetivo: Number(seriesObjetivo),
        repsObjetivo: Number(repsObjetivo),
        notasEntrenador: notas,
      })

      if (error) {
        alert('Error al guardar en el día ' + dia + ': ' + error.message)
        setSaving(false)
        return
      }
    }

    setSaving(false)
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

  const canAdd = selectedExerciseId && (todosLosDias || selectedDays.length > 0)

  return (
    <div>
      {/* FORMULARIO PREMIUM */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5">
        
        <div className="grid gap-4 sm:grid-cols-2">
          {/* Grupo Muscular */}
          <div>
            <label className="mb-1.5 block text-xs font-extrabold text-navy">Grupo muscular</label>
            <div className="relative">
              <select
                value={selectedGroup}
                onChange={(e) => setSelectedGroup(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange cursor-pointer transition-colors hover:border-slate-300"
              >
                {groups.map((g) => (
                  <option key={g} value={g}>{g}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>

          {/* Ejercicio */}
          <div>
            <label className="mb-1.5 block text-xs font-extrabold text-navy">Ejercicio</label>
            <div className="relative">
              <select
                value={selectedExerciseId}
                onChange={(e) => setSelectedExerciseId(e.target.value)}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange cursor-pointer transition-colors hover:border-slate-300"
              >
                {exercisesInGroup.map((ex) => (
                  <option key={ex.id} value={ex.id}>{ex.nombre}</option>
                ))}
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>

        {/* Series y Repeticiones */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <label className="mb-1.5 block text-xs font-extrabold text-navy">Series</label>
              <input
                type="number"
                min="1"
                value={seriesObjetivo}
                onChange={(e) => setSeriesObjetivo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>
            <div className="flex-1 relative">
              <label className="mb-1.5 block text-xs font-extrabold text-navy">Reps</label>
              <input
                type="number"
                min="1"
                value={repsObjetivo}
                onChange={(e) => setRepsObjetivo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-1.5 block text-xs font-extrabold text-navy">Nota para el cliente (opcional)</label>
            <input
              type="text"
              placeholder="ej. 'controla la bajada'"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange placeholder:font-normal placeholder:text-slate-400"
            />
          </div>
        </div>

        {/* CONTROLES DE DÍAS Y BOTÓN AÑADIR */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/60 pt-5">
          <div className="flex flex-wrap items-center gap-3">
            <label className="flex items-center gap-2 text-xs font-bold text-navy cursor-pointer">
              <input
                type="checkbox"
                checked={todosLosDias}
                onChange={(e) => {
                  setTodosLosDias(e.target.checked)
                  if (e.target.checked) setSelectedDays([])
                }}
                className="h-4 w-4 rounded border-slate-300 text-orange focus:ring-orange"
              />
              Todos los días
            </label>

            {!todosLosDias && (
              <div className="flex flex-wrap gap-2 border-l border-slate-200 pl-3">
                {DIAS_SEMANA.map((d) => (
                  <label
                    key={d.value}
                    className={`flex cursor-pointer items-center justify-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                      selectedDays.includes(d.value)
                        ? 'bg-navy text-white'
                        : 'bg-white text-slate-400 border border-slate-200 hover:border-navy hover:text-navy'
                    }`}
                  >
                    <input
                      type="checkbox"
                      className="hidden"
                      checked={selectedDays.includes(d.value)}
                      onChange={() => toggleDay(d.value)}
                    />
                    {d.label.slice(0, 3)}
                  </label>
                ))}
              </div>
            )}
          </div>

          <button
            type="button"
            onClick={handleAdd}
            disabled={saving || !canAdd}
            className="shrink-0 rounded-xl bg-orange px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange/20 transition-all hover:bg-orange-dark hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
          >
            {saving ? 'Añadiendo…' : '+ Añadir a rutina'}
          </button>
        </div>
      </div>

      {/* LISTADO DE RUTINA POR DÍAS */}
      <div className="mt-6 space-y-4">
        {entriesByDay.map(({ dia, items }) => {
          if (items.length === 0) return null; // Ocultamos los días vacíos para mantenerlo limpio (opcional)
          
          return (
            <div key={dia.value} className="rounded-[1.5rem] border border-slate-100 bg-white p-5 shadow-sm">
              <p className="font-display text-lg font-bold text-navy mb-3">{dia.label}</p>
              
              <ul className="space-y-2">
                {items.map((it) => (
                  <li
                    key={it.id}
                    className="group flex items-center justify-between rounded-xl bg-slate-50 border border-slate-100 px-4 py-3 transition-colors hover:bg-slate-100 hover:border-slate-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-3">
                      <span className="text-sm font-bold text-navy">
                        {it.ejercicios?.nombre}
                      </span>
                      <span className="flex items-center gap-2 text-xs font-bold text-slate-400">
                        <span className="inline-block rounded-md bg-white px-2 py-0.5 border border-slate-200 text-orange">
                          {it.series_objetivo} × {it.reps_objetivo ?? '?'}
                        </span>
                        {it.notas_entrenador && (
                          <span className="hidden sm:inline italic text-slate-400 font-medium">
                            "{it.notas_entrenador}"
                          </span>
                        )}
                      </span>
                    </div>
                    
                    <button
                      type="button"
                      onClick={() => handleDelete(it.id)}
                      title="Eliminar ejercicio"
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-300 transition-colors hover:bg-red-50 hover:text-red-500"
                    >
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                      </svg>
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}