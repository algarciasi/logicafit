import { supabase } from './supabaseClient'

const STRAVA_CLIENT_ID = import.meta.env.VITE_STRAVA_CLIENT_ID

export function getStravaAuthorizeUrl() {
  const redirectUri = `${window.location.origin}/strava/callback`
  const params = new URLSearchParams({
    client_id: STRAVA_CLIENT_ID,
    response_type: 'code',
    redirect_uri: redirectUri,
    approval_prompt: 'auto',
    scope: 'activity:read_all',
  })
  return `https://www.strava.com/oauth/authorize?${params.toString()}`
}

export async function exchangeStravaCode(code, clientId) {
  const { data, error } = await supabase.functions.invoke('strava-exchange', {
    body: { code, client_id: clientId },
  })
  return { data, error }
}

export async function syncStravaActivities(clientId) {
  const { data, error } = await supabase.functions.invoke('strava-sync', {
    body: { client_id: clientId },
  })
  return { data, error }
}