import { useState } from 'react'
import { generateHistorySnapshotPdf } from '../../lib/generateHistoryPdf'

export default function HistoryPanel({ title, entries, nameKey }) {
  const [open, setOpen] = useState(null)
  const [downloadingId, setDownloadingId] = useState(null)

  if (entries.length === 0) return null

  const handleDownload = async (h) => {
    setDownloadingId(h.id)
    try {
      await generateHistorySnapshotPdf({
        subtitle: title,
        nombre: h[nameKey],
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

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        {title}
      </p>
      <div className="mt-2 space-y-2">
        {entries.map((h) => (
          <div key={h.id} className="rounded-xl bg-surface-soft p-3">
            <button
              type="button"
              onClick={() => setOpen(open === h.id ? null : h.id)}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-sm font-semibold text-navy">{h[nameKey]}</p>
                <p className="text-[11px] text-text-secondary">
                  {new Date(h.created_at).toLocaleDateString('es-ES')}
                </p>
              </div>
              <span className="text-orange">{open === h.id ? '−' : '+'}</span>
            </button>
            {open === h.id && (
              <>
                <pre className="mt-2 whitespace-pre-wrap rounded-lg bg-white p-3 text-xs text-navy-light">
                  {h.contenido}
                </pre>
                <button
                  type="button"
                  onClick={() => handleDownload(h)}
                  disabled={downloadingId === h.id}
                  className="mt-2 rounded-full bg-navy px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
                >
                  {downloadingId === h.id ? 'Generando…' : '📄 Descargar PDF'}
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}