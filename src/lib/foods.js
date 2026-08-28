import { supabase } from './supabaseClient'

export async function listAllFoods() {
  const { data, error } = await supabase
    .from('foods')
    .select('id, nombre, calorias, proteinas, carbos, grasas')
    .order('nombre')
  return { foods: data || [], error }
}