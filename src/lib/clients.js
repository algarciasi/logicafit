import { supabase } from './supabaseClient'

export async function getClientByEmail(email) {
  const normalized = (email || '').trim()
  const { data, error } = await supabase
    .from('clients')
    .select('*')
    .ilike('email', normalized)
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

export async function updateClientPlanInfo(id, { tipoPlan, planVigenteHasta, proximaRevision }) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      tipo_plan: tipoPlan || null,
      plan_vigente_hasta: planVigenteHasta || null,
      proxima_revision: proximaRevision || null,
    })
    .eq('id', id)
    .select()
    .single()
  return { client: data, error }
}

export async function updateClientStatus(id, status) {
  const { data, error } = await supabase
    .from('clients')
    .update({ status })
    .eq('id', id)
    .select()
    .single()
  return { client: data, error }
}