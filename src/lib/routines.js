import { supabase } from './supabaseClient'

// dia_semana: 1 = Lunes ... 7 = Domingo (convención propia, consistente en toda la app)
export const DIAS_SEMANA = [
  { value: 1, label: 'Lunes' },
  { value: 2, label: 'Martes' },
  { value: 3, label: 'Miércoles' },
  { value: 4, label: 'Jueves' },
  { value: 5, label: 'Viernes' },
  { value: 6, label: 'Sábado' },
  { value: 7, label: 'Domingo' },
]

export function diaLabel(diaSemana) {
  return DIAS_SEMANA.find((d) => d.value === diaSemana)?.label || `Día ${diaSemana}`
}

export async function listClientRoutine(clientId) {
  const { data, error } = await supabase
    .from('rutinas')
    .select('id, dia_semana, ejercicio_id, orden, series_objetivo, reps_objetivo, notas_entrenador, ejercicios(nombre, grupo_muscular, video_url)')
    .eq('client_id', clientId)
    .order('dia_semana', { ascending: true })
    .order('orden', { ascending: true })
  return { entries: data || [], error }
}

export async function addRoutineEntry({ clientId, diaSemana, ejercicioId, orden, seriesObjetivo, repsObjetivo, notasEntrenador }) {
  const { data, error } = await supabase
    .from('rutinas')
    .insert({
      client_id: clientId,
      dia_semana: diaSemana,
      ejercicio_id: ejercicioId,
      orden,
      series_objetivo: seriesObjetivo,
      reps_objetivo: repsObjetivo,
      notas_entrenador: notasEntrenador || null,
    })
    .select('id, dia_semana, ejercicio_id, orden, series_objetivo, reps_objetivo, notas_entrenador, ejercicios(nombre, grupo_muscular, video_url)')
    .single()
  return { entry: data, error }
}

export async function deleteRoutineEntry(id) {
  const { error } = await supabase.from('rutinas').delete().eq('id', id)
  return { error }
}