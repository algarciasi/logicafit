import { supabase } from './supabaseClient'

export async function getClientByEmail(email) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('email', email)
    .maybeSingle()
  return { client: data, error }
}

export async function listClients() {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .order('full_name', { ascending: true })
  return { clients: data || [], error }
}

export async function getClientById(id) {
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .eq('id', id)
    .maybeSingle()
  return { client: data, error }
}