import { useEffect, useState } from 'react'
import { listMuscleGroups, listExercisesByGroup } from '../../lib/exercises'
import { DIAS_SEMANA, addRoutineEntry, deleteRoutineEntry } from '../../lib/routines'

export default function AdminRoutineEditor({ clientId, entries, onChange }) {
  const [groups, setGroups] = useState([])
  const [selectedGroup, setSelectedGroup] = useState('')
  const [exercisesInGroup, setExercisesInGroup] = useState([])
  const [selectedExerciseId, setSelectedExerciseId] = useState('')

  const [todosLosDias, setTodosLosDias] = useState(false)
  const [selectedDays, setSelectedDays] = useState([1]) 

  const [seriesObjetivo, setSeriesObjetivo] = useState(3)
  const [repsObjetivo, setRepsObjetivo] = useState(10)
  const [notas, setNotas] = useState('')
  
  // NUEVOS ESTADOS PARA STAGING Y DROPDOWNS CUSTOM
  const [stagedExercises, setStagedExercises] = useState([])
  const [saving, setSaving] = useState(false)
  const [groupOpen, setGroupOpen] = useState(false)
  const [exerciseOpen, setExerciseOpen] = useState(false)

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
      if (exercises.length > 0) {
        setSelectedExerciseId(exercises[0].id)
      } else {
        setSelectedExerciseId('')
      }
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

  // 🚀 NUEVO: Pre-añadir a la lista temporal
  const handleStageExercise = () => {
    if (!selectedExerciseId) return
    
    const exerciseData = exercisesInGroup.find(e => e.id === Number(selectedExerciseId))
    if (!exerciseData) return

    const daysToAdd = todosLosDias ? DIAS_SEMANA.map(d => d.value) : selectedDays
    const newItems = []

    for (const dia of daysToAdd) {
      newItems.push({
        exercise: exerciseData,
        dia,
        series: Number(seriesObjetivo),
        reps: Number(repsObjetivo),
        notas: notas
      })
    }

    setStagedExercises([...stagedExercises, ...newItems])
    
    // Limpiamos los campos opcionales para el siguiente
    setNotas('')
  }

  const handleRemoveStaged = (indexToRemove) => {
    setStagedExercises(stagedExercises.filter((_, idx) => idx !== indexToRemove))
  }

  // 🚀 NUEVO: Guardar todo de golpe en base de datos
  const handleSaveAll = async () => {
    if (stagedExercises.length === 0) return
    setSaving(true)

    for (const item of stagedExercises) {
      // Calculamos el orden teniendo en cuenta los ya guardados en la BD 
      // MÁS los que hemos guardado en este mismo bucle para ese día
      const alreadyInDB = entries.filter((e) => e.dia_semana === item.dia).length
      
      const { error } = await addRoutineEntry({
        clientId,
        diaSemana: item.dia,
        ejercicioId: item.exercise.id,
        // Mandamos el orden como 999 temporalmente si no quieres complicar el cálculo manual, 
        // tu base de datos normalmente lo auto-ordena si tienes un trigger, o si no:
        orden: alreadyInDB + 999, 
        seriesObjetivo: item.series,
        repsObjetivo: item.reps,
        notasEntrenador: item.notas,
      })

      if (error) {
        alert('Error al guardar el ejercicio ' + item.exercise.nombre + ': ' + error.message)
      }
    }

    setStagedExercises([])
    setSaving(false)
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

  const canStage = selectedExerciseId && (todosLosDias || selectedDays.length > 0)
  const selectedExerciseData = exercisesInGroup.find(e => e.id === Number(selectedExerciseId))

  return (
    <div>
      {/* 🚀 LISTA TEMPORAL (Solo se muestra si hay items preparados) */}
      {stagedExercises.length > 0 && (
        <div className="mb-5 rounded-xl bg-white p-4 ring-1 ring-slate-200/60 shadow-sm animate-fade-in-up">
          <div className="mb-3 flex items-center justify-between border-b border-slate-100 pb-2">
            <p className="text-[11px] font-extrabold uppercase tracking-widest text-slate-400">
              Ejercicios listos para guardar ({stagedExercises.length})
            </p>
          </div>
          <ul className="mb-4 space-y-2">
            {stagedExercises.map((it, idx) => {
              const diaNombre = DIAS_SEMANA.find(d => d.value === it.dia)?.label.slice(0,3) || '?'
              return (
                <li key={idx} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs border border-slate-100">
                  <span className="text-navy font-bold truncate pr-2 flex items-center gap-2">
                    <span className="bg-navy text-white px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">{diaNombre}</span>
                    {it.exercise.nombre}
                    <span className="text-orange font-extrabold ml-1">{it.series}×{it.reps}</span>
                  </span>
                  <button
                    type="button"
                    onClick={() => handleRemoveStaged(idx)}
                    className="text-slate-400 hover:text-red-500 font-bold px-2 py-1 transition-colors"
                  >
                    ✕
                  </button>
                </li>
              )
            })}
          </ul>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="w-full flex items-center justify-center gap-2 rounded-xl bg-navy py-3 text-xs font-bold text-white shadow-md transition-all hover:bg-orange active:scale-95 disabled:opacity-50"
          >
            {saving ? (
              "Guardando ejercicios..."
            ) : (
              <>
                <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                </svg>
                Confirmar y guardar todos
              </>
            )}
          </button>
        </div>
      )}

      {/* FORMULARIO PREMIUM */}
      <div className="rounded-2xl border border-slate-100 bg-slate-50 p-4 sm:p-5 relative z-10">
        
        <div className="grid gap-4 sm:grid-cols-2">
          
          {/* CUSTOM DROPDOWN: Grupo Muscular */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Grupo muscular</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setGroupOpen(!groupOpen)}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 hover:border-slate-300 transition-colors"
              >
                <span className="truncate">{selectedGroup || "Selecciona..."}</span>
                <svg className={`h-4 w-4 text-slate-400 transition-transform ${groupOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {groupOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setGroupOpen(false)}></div>
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                    {groups.map((g) => (
                      <button
                        key={g}
                        type="button"
                        onClick={() => { setSelectedGroup(g); setGroupOpen(false); }}
                        className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${selectedGroup === g ? 'bg-orange/10 text-orange' : 'text-navy hover:bg-slate-50'}`}
                      >
                        {g}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* CUSTOM DROPDOWN: Ejercicio */}
          <div>
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Ejercicio</label>
            <div className="relative">
              <button
                type="button"
                onClick={() => setExerciseOpen(!exerciseOpen)}
                disabled={exercisesInGroup.length === 0}
                className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 hover:border-slate-300 transition-colors disabled:opacity-50 disabled:bg-slate-50"
              >
                <span className="truncate">{selectedExerciseData?.nombre || "Selecciona ejercicio..."}</span>
                <svg className={`h-4 w-4 text-slate-400 transition-transform ${exerciseOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {exerciseOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setExerciseOpen(false)}></div>
                  <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                    {exercisesInGroup.map((ex) => (
                      <button
                        key={ex.id}
                        type="button"
                        onClick={() => { setSelectedExerciseId(ex.id); setExerciseOpen(false); }}
                        className={`block w-full rounded-lg px-3 py-2.5 text-left text-xs font-extrabold transition-colors ${selectedExerciseId === ex.id ? 'bg-orange/10 text-orange' : 'text-navy hover:bg-slate-50'}`}
                      >
                        {ex.nombre}
                      </button>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Series y Repeticiones */}
        <div className="mt-4 grid gap-4 sm:grid-cols-2 relative z-0">
          <div className="flex gap-3">
            <div className="flex-1 relative">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Series</label>
              <input
                type="number"
                min="1"
                value={seriesObjetivo}
                onChange={(e) => setSeriesObjetivo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange text-center"
              />
            </div>
            <div className="flex-1 relative">
              <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Reps</label>
              <input
                type="number"
                min="1"
                value={repsObjetivo}
                onChange={(e) => setRepsObjetivo(e.target.value)}
                className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange text-center"
              />
            </div>
          </div>

          <div className="flex-1">
            <label className="mb-1.5 block text-[10px] font-extrabold uppercase tracking-widest text-slate-400">Nota (opcional)</label>
            <input
              type="text"
              placeholder="ej. 'controla la bajada'"
              value={notas}
              onChange={(e) => setNotas(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange placeholder:font-medium placeholder:text-slate-300"
            />
          </div>
        </div>

        {/* CONTROLES DE DÍAS Y BOTÓN PRE-AÑADIR */}
        <div className="mt-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/60 pt-5 relative z-0">
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
                    className={`flex cursor-pointer items-center justify-center rounded-lg px-2.5 py-1.5 text-[10px] font-bold uppercase tracking-wider transition-colors ${
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
            onClick={handleStageExercise}
            disabled={!canStage}
            className="shrink-0 rounded-xl bg-orange/10 border border-orange/20 px-6 py-2.5 text-xs font-extrabold text-orange transition-all hover:bg-orange/20 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
          >
            + Pre-añadir ejercicio
          </button>
        </div>
      </div>

      {/* LISTADO DE RUTINA POR DÍAS (YA GUARDADOS) */}
      <div className="mt-6 space-y-4 relative z-0">
        {entriesByDay.map(({ dia, items }) => {
          if (items.length === 0) return null; 
          
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
                        <span className="inline-block rounded-md bg-white px-2 py-0.5 border border-slate-200 text-orange shadow-sm">
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
                      className="flex h-8 w-8 items-center justify-center rounded-full bg-white text-slate-300 shadow-sm border border-slate-100 transition-colors hover:bg-red-50 hover:text-red-500 hover:border-red-100"
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