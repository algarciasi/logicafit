import { supabase } from './supabaseClient'

// La tabla `notes` guarda registros de seguimiento (peso, medidas, fotos) por cliente.
// De momento solo usamos `peso`; el resto de columnas quedan a null.

export async function listWeightHistory(clientId) {
  const { data, error } = await supabase
    .from('notes')
    .select('id, peso, created_at')
    .eq('client_id', clientId)
    .not('peso', 'is', null)
    .order('created_at', { ascending: true })
  return { entries: data || [], error }
}

export async function addWeightEntry(clientId, peso) {
  const { data, error } = await supabase
    .from('notes')
    .insert({
      client_id: clientId,
      peso,
      content: `Registro de peso: ${peso} kg`,
    })
    .select()
    .single()
  return { entry: data, error }
}