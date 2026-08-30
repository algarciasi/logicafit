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

// Supabase solo da un mensaje genérico ("non-2xx status code") en `error.message`.
// El motivo real que devuelve nuestra función va en el cuerpo de la respuesta,
// accesible vía `error.context` (un objeto Response).
async function extractErrorMessage(error) {
  if (!error) return null
  try {
    if (error.context && typeof error.context.json === 'function') {
      const body = await error.context.json()
      if (body?.error) {
        return typeof body.error === 'string' ? body.error : JSON.stringify(body.error)
      }
    }
  } catch {
    // si no se puede parsear, seguimos con el mensaje genérico
  }
  return error.message
}

export async function exchangeStravaCode(code, clientId) {
  const { data, error } = await supabase.functions.invoke('strava-exchange', {
    body: { code, client_id: clientId },
  })
  if (error) {
    const message = await extractErrorMessage(error)
    return { data, error: { message } }
  }
  return { data, error: null }
}

export async function syncStravaActivities(clientId) {
  const { data, error } = await supabase.functions.invoke('strava-sync', {
    body: { client_id: clientId },
  })
  if (error) {
    const message = await extractErrorMessage(error)
    return { data, error: { message } }
  }
  return { data, error: null }
}