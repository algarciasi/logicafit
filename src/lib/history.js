import { supabase } from './supabaseClient'

export async function listRoutineHistory(clientId) {
  const { data, error } = await supabase
    .from('historial_rutinas')
    .select('id, nombre_rutina, contenido, created_at')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  return { entries: data || [], error }
}

export async function addRoutineHistory(clientId, nombreRutina, contenido) {
  const { data, error } = await supabase
    .from('historial_rutinas')
    .insert({ client_id: clientId, nombre_rutina: nombreRutina, contenido })
    .select()
    .single()
  return { entry: data, error }
}

export async function deleteRoutineHistory(id) {
  const { error } = await supabase.from('historial_rutinas').delete().eq('id', id)
  return { error }
}

export async function listDietHistory(clientId) {
  const { data, error } = await supabase
    .from('historial_calculadora')
    .select('id, nombre_dieta, contenido, created_at')
    .eq('client_id', clientId)
    .order('created_at', { ascending: false })
  return { entries: data || [], error }
}

export async function addDietHistory(clientId, nombreDieta, contenido) {
  const { data, error } = await supabase
    .from('historial_calculadora')
    .insert({ client_id: clientId, nombre_dieta: nombreDieta, contenido })
    .select()
    .single()
  return { entry: data, error }
}

export async function deleteDietHistory(id) {
  const { error } = await supabase.from('historial_calculadora').delete().eq('id', id)
  return { error }
}