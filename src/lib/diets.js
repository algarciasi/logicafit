import { supabase } from './supabaseClient'

// `diets` relaciona un cliente con un alimento (`foods`) para un momento del día,
// con una cantidad en gramos. `momento_dia` usa los mismos ids que lib/macros.js
// (desayuno, almuerzo, comida, merienda, cena) para mantener todo consistente.

export async function listClientDiet(clientId) {
  const { data, error } = await supabase
    .from('diets')
    .select('id, momento_dia, dia_semana, opcion, cantidad_g, notas, food_id, foods(nombre, calorias, proteinas, carbos, grasas)')
    .eq('client_id', clientId)
    .order('momento_dia', { ascending: true })
  return { entries: data || [], error }
}

export async function addDietEntry({ clientId, foodId, momentoDia, diaSemana, opcion, cantidadG, notas }) {
  const { data, error } = await supabase
    .from('diets')
    .insert({
      client_id: clientId,
      food_id: foodId,
      momento_dia: momentoDia,
      dia_semana: diaSemana ?? null,
      opcion: opcion ?? 1,
      cantidad_g: cantidadG,
      notas: notas || null,
    })
    .select('id, momento_dia, dia_semana, opcion, cantidad_g, notas, food_id, foods(nombre, calorias, proteinas, carbos, grasas)')
    .single()
  return { entry: data, error }
}

export async function deleteDietEntry(id) {
  const { data, error } = await supabase.from('diets').delete().eq('id', id).select()

  if (error) return { error }
  if (!data || data.length === 0) {
    return {
      error: {
        message:
          'No se ha borrado ninguna fila (0 filas afectadas). Revisa los permisos/RLS de la tabla diets en Supabase.',
      },
    }
  }
  return { error: null }
}