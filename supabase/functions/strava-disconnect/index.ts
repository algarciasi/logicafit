import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { client_id } = await req.json()

    if (!client_id) {
      return new Response(JSON.stringify({ error: 'Falta client_id.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL')!,
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!
    )

    const { data: conn } = await supabaseAdmin
      .from('strava_connections')
      .select('access_token')
      .eq('client_id', client_id)
      .maybeSingle()

    // Revocar el acceso también en Strava (best-effort: si falla, seguimos igual)
    if (conn?.access_token) {
      try {
        await fetch('https://www.strava.com/oauth/deauthorize', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: `access_token=${conn.access_token}`,
        })
      } catch (_e) {
        // ignoramos errores de Strava aquí, el borrado local es lo importante
      }
    }

    await supabaseAdmin.from('strava_connections').delete().eq('client_id', client_id)

    await supabaseAdmin
      .from('clients')
      .update({ strava_connected: false, strava_athlete_id: null })
      .eq('id', client_id)

    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})