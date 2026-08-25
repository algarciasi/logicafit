import { supabase } from './supabaseClient'

export async function listExerciseHistory(clientId, ejercicioId, limit = 5) {
  const { data, error } = await supabase
    .from('progreso_ejercicios')
    .select('id, peso_kg, reps, serie_numero, created_at')
    .eq('client_id', clientId)
    .eq('ejercicio_id', ejercicioId)
    .order('created_at', { ascending: false })
    .limit(limit)
  return { entries: data || [], error }
}

export async function addProgressEntry({ clientId, ejercicioId, pesoKg, reps, serieNumero, rutinaId }) {
  const { data, error } = await supabase
    .from('progreso_ejercicios')
    .insert({
      client_id: clientId,
      ejercicio_id: ejercicioId,
      peso_kg: pesoKg,
      reps,
      serie_numero: serieNumero,
      rutina_id: rutinaId ?? null,
    })
    .select()
    .single()
  return { entry: data, error }
}