import { useState } from 'react'
import { addRoutineHistory, deleteRoutineHistory } from '../../lib/history'
import { formatRoutineText } from '../../lib/historyFormat'
import { generateHistorySnapshotPdf } from '../../lib/generateHistoryPdf'

export default function RoutineHistoryPanel({ clientId, routineEntries, history, onChange }) {
  const [saving, setSaving] = useState(false)
  const [open, setOpen] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)

  const handleDownload = async (h) => {
    setDownloadingId(h.id)
    try {
      await generateHistorySnapshotPdf({
        subtitle: 'Histórico de rutina',
        nombre: h.nombre_rutina,
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
    if (routineEntries.length === 0) {
      alert('No hay rutina asignada actualmente para guardar.')
      return
    }
    const nombre = window.prompt('Nombre para este histórico (ej. "Mesociclo 1 - Fuerza"):')
    if (!nombre) return
    setSaving(true)
    const contenido = formatRoutineText(routineEntries)
    const { error } = await addRoutineHistory(clientId, nombre, contenido)
    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    onChange()
  }

  const handleDelete = async (id) => {
    const { error } = await deleteRoutineHistory(id)
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
        className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
      >
        {saving ? 'Guardando…' : '📦 Guardar rutina actual en el histórico'}
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
                  <p className="text-sm font-semibold text-navy">{h.nombre_rutina}</p>
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
                      className="rounded-full bg-navy px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
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