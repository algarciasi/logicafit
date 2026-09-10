import { supabase } from './supabaseClient'

export async function listAllFoods() {
  const { data, error } = await supabase
    .from('foods')
    .select('id, nombre, calorias, proteinas, carbos, grasas, url_compra, supermercado') // <-- AÑADE supermercado AQUÍ
    .order('nombre', { ascending: true })
  
  return { foods: data || [], error }
}