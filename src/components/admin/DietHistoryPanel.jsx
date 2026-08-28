import { useState } from 'react'
import { addDietHistory, deleteDietHistory } from '../../lib/history'
import { formatDietText } from '../../lib/historyFormat'
import { generateHistorySnapshotPdf } from '../../lib/generateHistoryPdf'

export default function DietHistoryPanel({ clientId, dietEntries, history, onChange }) {
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)

  const handleDownload = async (h) => {
    setDownloadingId(h.id)
    try {
      await generateHistorySnapshotPdf({
        subtitle: 'Histórico de dieta',
        nombre: h.nombre_dieta,
        fecha: new Date(h.created_at).toLocaleDateString('es-ES', {
          day: 'numeric',
          month: 'long',
          year: 'numeric',
        }),
        contenido: h.contenido,
      })
    } finally {
      setDownloadingId(null)
    }
  }

  const handleSaveSnapshot = async () => {
    if (dietEntries.length === 0) {
      alert('No hay dieta asignada actualmente para guardar.')
      return
    }
    const nombre = window.prompt('Nombre para este histórico (ej. "Dieta agosto - déficit"):')
    if (!nombre) return
    setSaving(true)
    const contenido = formatDietText(dietEntries)
    const { error } = await addDietHistory(clientId, nombre, contenido)
    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    onChange()
  }

  const handleDelete = async (id) => {
    const { error } = await deleteDietHistory(id)
    if (error) {
      alert('Error al borrar: ' + error.message)
      return
    }
    onChange()
  }

  return (
    <div className="mt-4">
      <button
        type="button"
        onClick={handleSaveSnapshot}
        disabled={saving}
        className="rounded-full bg-orange px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
      >
        {saving ? 'Guardando…' : '📦 Guardar dieta actual en el histórico'}
      </button>

      {history.length > 0 && (
        <div className="mt-3 space-y-2">
          {history.map((h) => (
            <div key={h.id} className="rounded-xl border border-slate-100 p-3">
              <button
                type="button"
                onClick={() => setOpen(open === h.id ? null : h.id)}
                className="flex w-full items-center justify-between text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-navy">{h.nombre_dieta}</p>
                  <p className="text-[11px] text-text-secondary">
                    {new Date(h.created_at).toLocaleDateString('es-ES')}
                  </p>
                </div>
                <span className="text-orange">{open === h.id ? '−' : '+'}</span>
              </button>
              {open === h.id && (
                <>
                  <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-surface-soft p-3 text-xs text-navy-light">
                    {h.contenido}
                  </pre>
                  <div className="mt-2 flex items-center gap-3">
                    <button
                      type="button"
                      onClick={() => handleDownload(h)}
                      disabled={downloadingId === h.id}
                      className="rounded-full bg-orange px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
                    >
                      {downloadingId === h.id ? 'Generando…' : '📄 Descargar PDF'}
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(h.id)}
                      className="text-[11px] text-red-500 hover:underline"
                    >
                      Borrar este histórico
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}