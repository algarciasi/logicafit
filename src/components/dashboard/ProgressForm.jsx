import { useState } from 'react'
import { MEASUREMENT_FIELDS, PHOTO_SLOTS, addProgressEntry } from '../../lib/notes'
import { uploadProgressPhoto } from '../../lib/storage'

// 1. DICCIONARIO DE LÍMITES ESTRICTOS (basado en las keys que tengas en MEASUREMENT_FIELDS)
const LIMITS = {
  peso: 200,
  pecho: 150,
  hombros: 90,
  brazo: 70,
  cintura: 200,
  cadera: 200,
  cuadriceps: 100,
  gemelo: 70
}

export default function ProgressForm({ clientId, onSaved }) {
  const [values, setValues] = useState({})
  const [photos, setPhotos] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  // 2. FUNCIÓN INTERCEPTORA: Valida antes de guardar en el estado
  const setField = (key) => (e) => {
    const val = e.target.value
    
    // Si borran el número para corregirlo, se permite
    if (val === '') {
      setValues((v) => ({ ...v, [key]: '' }))
      return
    }
    
    const numVal = Number(val)
    const maxLimit = LIMITS[key] || 999 // Fallback por si en el futuro añades otro campo
    
    // Si meten un valor negativo o superan tu límite, ignoramos la tecla
    if (numVal < 0 || numVal > maxLimit) return

    setValues((v) => ({ ...v, [key]: val }))
  }

  const setPhoto = (key) => (e) => setPhotos((p) => ({ ...p, [key]: e.target.files?.[0] || null }))

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSaving(true)
    setError(null)

    const measurements = {}
    MEASUREMENT_FIELDS.forEach(({ key }) => {
      if (values[key]) measurements[key] = Number(values[key])
    })

    for (const { key } of PHOTO_SLOTS) {
      const file = photos[key]
      if (file) {
        const { url, error: uploadError } = await uploadProgressPhoto(clientId, file, key)
        if (uploadError) {
          setError(uploadError)
          setSaving(false)
          return
        }
        measurements[key] = url
      }
    }

    if (Object.keys(measurements).length === 0) {
      setError({ message: 'Rellena al menos una medida o sube una foto.' })
      setSaving(false)
      return
    }

    const { error: insertError } = await addProgressEntry(clientId, measurements)
    setSaving(false)
    if (insertError) {
      setError(insertError)
      return
    }
    setValues({})
    setPhotos({})
    setOpen(false)
    onSaved()
  }

  if (!open) {
    return (
      <button
        type="button"
        onClick={() => setOpen(true)}
        className="w-full rounded-2xl border-2 border-dashed border-orange/30 px-4 py-4 text-sm font-bold text-orange transition-all hover:bg-orange/5 hover:border-orange active:scale-[0.98]"
      >
        + Registrar medidas de esta semana
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 animate-fade-in">
      
      <div className="mb-6 flex items-center justify-between">
        <h3 className="font-display text-xl font-extrabold text-navy">Registro de esta semana</h3>
        <button type="button" onClick={() => setOpen(false)} className="text-sm font-semibold text-slate-400 transition-colors hover:text-navy">
          Cancelar
        </button>
      </div>

      {/* GRID DE MEDIDAS CON VALIDACIÓN */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {MEASUREMENT_FIELDS.map(({ key, label, unit }) => {
          const max = LIMITS[key] || ''
          return (
            <div key={key}>
              <label className="mb-1.5 block text-[11px] font-extrabold text-navy">
                {label} ({unit})
              </label>
              <input
                type="number"
                step="0.1"
                min="0"
                max={max} // Límite HTML nativo
                value={values[key] || ''}
                onChange={setField(key)} // Interceptor React
                placeholder={max ? `Máx: ${max}` : ''}
                className="w-full appearance-none rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:bg-white focus:ring-1 focus:ring-orange"
              />
            </div>
          )
        })}
      </div>

      {/* ZONA DE FOTOS ESTILIZADA */}
      <div className="mt-6">
        <p className="mb-3 text-[11px] font-extrabold text-navy">Fotos (opcional)</p>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
          {PHOTO_SLOTS.map(({ key, label }) => (
            <div key={key}>
              <p className="mb-1 text-[10px] font-bold text-slate-500">{label}</p>
              {/* Contenedor que simula un input para subir archivos de forma limpia */}
              <div className="relative flex h-20 cursor-pointer items-center justify-center rounded-xl border border-dashed border-slate-300 bg-slate-50 transition-colors hover:bg-slate-100 focus-within:border-orange focus-within:ring-1 focus-within:ring-orange overflow-hidden">
                <span className="truncate px-2 text-[10px] font-medium text-slate-400">
                  {photos[key] ? photos[key].name : 'Seleccionar archivo'}
                </span>
                <input 
                  type="file" 
                  accept="image/*" 
                  onChange={setPhoto(key)} 
                  className="absolute inset-0 h-full w-full cursor-pointer opacity-0" 
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {error && (
        <p className="mt-4 rounded-xl border border-red-100 bg-red-50 px-4 py-3 text-xs font-bold text-red-600">
          {error.message}
        </p>
      )}

      {/* BOTÓN DE GUARDADO */}
      <div className="mt-6 flex justify-start">
        <button
          type="submit"
          disabled={saving}
          className="rounded-full bg-orange px-8 py-3 text-sm font-bold text-white shadow-md shadow-orange/20 transition-all hover:bg-orange-dark hover:scale-105 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? 'Guardando…' : 'Guardar registro'}
        </button>
      </div>
      
    </form>
  )
}