import { supabase } from './supabaseClient'

export async function listStravaActivities(clientId, limit = 15) {
  const { data, error } = await supabase
    .from('strava_activities')
    .select('id, nombre, tipo, distancia_m, duracion_s, desnivel_m, fecha')
    .eq('client_id', clientId)
    .order('fecha', { ascending: false })
    .limit(limit)
  return { activities: data || [], error }
}