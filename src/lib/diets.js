import { supabase } from './supabaseClient'

export async function listClientDiet(clientId) {
  const { data, error } = await supabase
    .from('diets')
    // Añadimos 'unidad' al select
    .select('id, momento_dia, dia_semana, opcion, cantidad_g, unidad, notas, food_id, foods(nombre, calorias, proteinas, carbos, grasas, url_compra, supermercado)')
    .eq('client_id', clientId)
    .order('momento_dia', { ascending: true })
  return { entries: data || [], error }
}

// Recibimos 'unidad' en los parámetros
export async function addDietEntry({ clientId, foodId, momentoDia, diaSemana, opcion, cantidadG, unidad, notas }) {
  const { data, error } = await supabase
    .from('diets')
    .insert({
      client_id: clientId,
      food_id: foodId,
      momento_dia: momentoDia,
      dia_semana: diaSemana ?? null,
      opcion: opcion ?? 1,
      cantidad_g: cantidadG,
      unidad: unidad || 'g', // Lo guardamos en la base de datos
      notas: notas || null,
    })
    // Añadimos 'unidad' al select
    .select('id, momento_dia, dia_semana, opcion, cantidad_g, unidad, notas, food_id, foods(nombre, calorias, proteinas, carbos, grasas, url_compra, supermercado)')
    .single()
  return { entry: data, error }
}

export async function deleteDietEntry(id) {
  const { data, error } = await supabase.from('diets').delete().eq('id', id).select()

  if (error) return { error }
  if (!data || data.length === 0) {
    return {
      error: {
        message: 'No se ha borrado ninguna fila.',
      },
    }
  }
  return { error: null }
}