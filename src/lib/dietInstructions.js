import { supabase } from './supabaseClient'

const SELECT =
  'id, client_id, momento_dia, dia_semana, opcion, indicaciones, created_at, updated_at'

export async function listClientDietInstructions(clientId) {
  const { data, error } = await supabase
    .from('dieta_indicaciones')
    .select(SELECT)
    .eq('client_id', clientId)
    .order('created_at', { ascending: true })

  return {
    instructions: data || [],
    error,
  }
}

export async function addDietInstruction({
  clientId,
  momentoDia = null,
  diaSemana = null,
  opcion = null,
  indicaciones,
}) {
  const { data, error } = await supabase
    .from('dieta_indicaciones')
    .insert({
      client_id: clientId,
      momento_dia: momentoDia || null,
      dia_semana: diaSemana ?? null,
      opcion: opcion ?? null,
      indicaciones: indicaciones.trim(),
      updated_at: new Date().toISOString(),
    })
    .select(SELECT)
    .single()

  return {
    instruction: data,
    error,
  }
}

export async function updateDietInstruction(
  id,
  {
    momentoDia = null,
    diaSemana = null,
    opcion = null,
    indicaciones,
  },
) {
  const { data, error } = await supabase
    .from('dieta_indicaciones')
    .update({
      momento_dia: momentoDia || null,
      dia_semana: diaSemana ?? null,
      opcion: opcion ?? null,
      indicaciones: indicaciones.trim(),
      updated_at: new Date().toISOString(),
    })
    .eq('id', id)
    .select(SELECT)
    .single()

  return {
    instruction: data,
    error,
  }
}

export async function deleteDietInstruction(id) {
  const { error } = await supabase
    .from('dieta_indicaciones')
    .delete()
    .eq('id', id)

  return { error }
}
