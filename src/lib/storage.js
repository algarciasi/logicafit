import { supabase } from './supabaseClient'

const BUCKET = 'progreso-fotos'

export async function uploadProgressPhoto(clientId, file, label) {
  if (!file) return { url: null, error: null }

  const ext = file.name.split('.').pop()
  const path = `${clientId}/${label}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, {
    upsert: false,
    cacheControl: '3600',
  })

  if (uploadError) return { url: null, error: uploadError }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(path)
  return { url: data.publicUrl, error: null }
}