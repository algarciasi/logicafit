import { supabase } from './supabaseClient'

export async function listActiveRecipes() {
  const { data, error } = await supabase
    .from('recetas')
    .select(`
      id,
      titulo,
      detalle,
      kcal,
      proteinas,
      carbos,
      grasas,
      categoria,
      tiempo_min,
      porciones,
      ingredientes,
      preparacion,
      imagen_url,
      orden
    `)
    .eq('activa', true)
    .order('orden', { ascending: true })
    .order('titulo', { ascending: true })

  return {
    recipes: data || [],
    error,
  }
}