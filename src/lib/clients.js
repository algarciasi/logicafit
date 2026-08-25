import { supabase } from './supabaseClient'

export const OBJETIVOS = [
  { value: 'perdida_peso', label: 'Pérdida de peso' },
  { value: 'recomposicion', label: 'Recomposición' },
  { value: 'ganancia_muscular', label: 'Ganancia de masa muscular' },
  { value: 'running', label: 'Running' },
]

export function objetivoLabel(value) {
  return OBJETIVOS.find((o) => o.value === value)?.label || value
}

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

export async function updateClientPlanInfo(id, { tipoPlan, planVigenteHasta, proximaRevision, objetivoEntrenamiento }) {
  const { data, error } = await supabase
    .from('clients')
    .update({
      tipo_plan: tipoPlan || null,
      plan_vigente_hasta: planVigenteHasta || null,
      proxima_revision: proximaRevision || null,
      objetivo_entrenamiento: objetivoEntrenamiento || null,
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