import { supabase } from './supabaseClient'

export async function searchExercises(query) {
  const { data, error } = await supabase
    .from('ejercicios')
    .select('id, nombre, grupo_muscular, video_url')
    .ilike('nombre', `%${query}%`)
    .order('nombre')
    .limit(8)
  return { exercises: data || [], error }
}

export async function listMuscleGroups() {
  const { data, error } = await supabase
    .from('ejercicios')
    .select('grupo_muscular')
    .not('grupo_muscular', 'is', null)

  if (error) return { groups: [], error }

  const unique = [...new Set(data.map((d) => d.grupo_muscular))].sort((a, b) =>
    a.localeCompare(b, 'es')
  )
  return { groups: unique, error: null }
}

export async function listExercisesByGroup(grupoMuscular) {
  const { data, error } = await supabase
    .from('ejercicios')
    .select('id, nombre, grupo_muscular, video_url')
    .eq('grupo_muscular', grupoMuscular)
    .order('nombre')
  return { exercises: data || [], error }
}