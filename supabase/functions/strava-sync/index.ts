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

    const { data: conn, error: connError } = await supabaseAdmin
      .from('strava_connections')
      .select('*')
      .eq('client_id', client_id)
      .maybeSingle()

    if (connError || !conn) {
      return new Response(JSON.stringify({ error: 'Este cliente no está conectado a Strava.' }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    let accessToken = conn.access_token

    // Refrescar el token si ha caducado
    if (new Date(conn.expires_at) <= new Date()) {
      const refreshRes = await fetch('https://www.strava.com/oauth/token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: Deno.env.get('STRAVA_CLIENT_ID'),
          client_secret: Deno.env.get('STRAVA_CLIENT_SECRET'),
          grant_type: 'refresh_token',
          refresh_token: conn.refresh_token,
        }),
      })

      const refreshData = await refreshRes.json()

      if (!refreshRes.ok) {
        return new Response(JSON.stringify({ error: refreshData }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      accessToken = refreshData.access_token

      await supabaseAdmin
        .from('strava_connections')
        .update({
          access_token: refreshData.access_token,
          refresh_token: refreshData.refresh_token,
          expires_at: new Date(refreshData.expires_at * 1000).toISOString(),
          updated_at: new Date().toISOString(),
        })
        .eq('client_id', client_id)
    }

    // Traer las últimas actividades de Strava
    const actsRes = await fetch('https://www.strava.com/api/v3/athlete/activities?per_page=30', {
      headers: { Authorization: `Bearer ${accessToken}` },
    })

    const activities = await actsRes.json()

    if (!actsRes.ok) {
      return new Response(JSON.stringify({ error: activities }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const rows = activities.map((a: any) => ({
      id: a.id,
      client_id,
      nombre: a.name,
      tipo: a.type,
      distancia_m: a.distance,
      duracion_s: a.moving_time,
      desnivel_m: a.total_elevation_gain,
      fecha: a.start_date,
    }))

    if (rows.length > 0) {
      const { error: upsertError } = await supabaseAdmin.from('strava_activities').upsert(rows)
      if (upsertError) {
        return new Response(JSON.stringify({ error: upsertError.message }), {
          status: 500,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    }

    return new Response(JSON.stringify({ success: true, count: rows.length }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})