import { useState } from 'react'
import { MEASUREMENT_FIELDS, PHOTO_SLOTS, addProgressEntry } from '../../lib/notes'
import { uploadProgressPhoto } from '../../lib/storage'

const FIELD = 'w-full rounded-xl border border-slate-200 px-3 py-2 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1 block text-[11px] font-semibold text-navy-light'

export default function ProgressForm({ clientId, onSaved }) {
  const [values, setValues] = useState({})
  const [photos, setPhotos] = useState({})
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState(null)
  const [open, setOpen] = useState(false)

  const setField = (key) => (e) => setValues((v) => ({ ...v, [key]: e.target.value }))
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
        className="w-full rounded-2xl border border-dashed border-orange-light bg-orange/5 px-4 py-3 text-sm font-semibold text-orange-dark transition hover:bg-orange/10"
      >
        + Registrar medidas de esta semana
      </button>
    )
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-100 p-4">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-navy">Registro de esta semana</p>
        <button type="button" onClick={() => setOpen(false)} className="text-xs text-text-secondary">
          Cancelar
        </button>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {MEASUREMENT_FIELDS.map(({ key, label, unit }) => (
          <div key={key}>
            <label className={LABEL}>
              {label} ({unit})
            </label>
            <input
              type="number"
              step="0.1"
              min="0"
              value={values[key] || ''}
              onChange={setField(key)}
              className={FIELD}
            />
          </div>
        ))}
      </div>

      <p className="mt-4 text-[11px] font-semibold text-navy-light">Fotos (opcional)</p>
      <div className="mt-2 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PHOTO_SLOTS.map(({ key, label }) => (
          <div key={key}>
            <label className={LABEL}>{label}</label>
            <input type="file" accept="image/*" onChange={setPhoto(key)} className="w-full text-[10px]" />
          </div>
        ))}
      </div>

      {error && (
        <p className="mt-3 rounded-lg bg-red-50 px-3 py-2 text-xs text-red-600">{error.message}</p>
      )}

      <button
        type="submit"
        disabled={saving}
        className="mt-4 rounded-full bg-orange px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
      >
        {saving ? 'Guardando…' : 'Guardar registro'}
      </button>
    </form>
  )
}