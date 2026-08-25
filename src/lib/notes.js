import { supabase } from './supabaseClient'

// Medidas que se piden al cliente cada semana. `key` = columna real en `notes`.
// "brazo" se guarda en la columna `biceps` (no existe columna separada de antebrazo).
export const MEASUREMENT_FIELDS = [
  { key: 'peso', label: 'Peso', unit: 'kg' },
  { key: 'pecho', label: 'Pecho', unit: 'cm' },
  { key: 'hombros', label: 'Hombros', unit: 'cm' },
  { key: 'biceps', label: 'Brazo', unit: 'cm' },
  { key: 'cintura', label: 'Cintura', unit: 'cm' },
  { key: 'cadera', label: 'Cadera', unit: 'cm' },
  { key: 'cuadriceps', label: 'Cuádriceps', unit: 'cm' },
  { key: 'gemelo', label: 'Gemelo', unit: 'cm' },
]

export const PHOTO_SLOTS = [
  { key: 'foto_perfil', label: 'De frente' },
  { key: 'foto_izquierda', label: 'Perfil izquierdo' },
  { key: 'foto_derecha', label: 'Perfil derecho' },
  { key: 'foto_espalda', label: 'Espalda' },
]

const SELECT_COLUMNS =
  'id, created_at, peso, pecho, hombros, biceps, triceps, cintura, cadera, cuadriceps, gemelo, foto_perfil, foto_izquierda, foto_derecha, foto_espalda, imc'

export async function listProgressHistory(clientId) {
  const { data, error } = await supabase
    .from('notes')
    .select(SELECT_COLUMNS)
    .eq('client_id', clientId)
    .order('created_at', { ascending: true })
  return { entries: data || [], error }
}

// Se mantiene por compatibilidad con la gráfica de peso del admin.
export async function listWeightHistory(clientId) {
  const { data, error } = await supabase
    .from('notes')
    .select('id, peso, created_at')
    .eq('client_id', clientId)
    .not('peso', 'is', null)
    .order('created_at', { ascending: true })
  return { entries: data || [], error }
}

export async function addProgressEntry(clientId, measurements) {
  const { data, error } = await supabase
    .from('notes')
    .insert({
      client_id: clientId,
      content: 'Registro de progreso semanal',
      ...measurements,
    })
    .select(SELECT_COLUMNS)
    .single()
  return { entry: data, error }
}