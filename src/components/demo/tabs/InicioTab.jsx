import { useState } from 'react'
import { generateRoutinePdf, generateDietPdf } from '../../../lib/clientPdfs'
import { objetivoLabel } from '../../../lib/clients'
import { demoClient, demoRoutineEntries, demoDietEntries } from '../demoData'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

export default function InicioTab() {
  const [downloading, setDownloading] = useState(null)

  const handleDownload = async (type) => {
    setDownloading(type)
    try {
      if (type === 'rutina') await generateRoutinePdf(demoClient, demoRoutineEntries)
      if (type === 'dieta') await generateDietPdf(demoClient, demoDietEntries)
    } finally {
      setDownloading(null)
    }
  }

  return (
    <div>
      <p className="font-display text-lg font-bold text-navy">
        Hola {demoClient.full_name.split(' ')[0]} 👋
      </p>

      <div className="mt-4 rounded-2xl border border-slate-100 bg-surface-soft p-4">
        <p className="text-sm text-navy">
          <span className="font-semibold">Objetivo:</span> {objetivoLabel(demoClient.objetivo_entrenamiento)}
        </p>
        <p className="mt-1 text-sm text-navy">
          <span className="font-semibold">Plan:</span> {demoClient.tipo_plan}
        </p>
        <p className="mt-1 text-sm text-navy">
          <span className="font-semibold">Vigente hasta:</span> {formatDate(demoClient.plan_vigente_hasta)}
        </p>
        <p className="mt-1 text-sm text-navy">
          <span className="font-semibold">Próxima revisión:</span> {formatDate(demoClient.proxima_revision)}
        </p>
      </div>

      <div className="mt-4 flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => handleDownload('rutina')}
          disabled={downloading === 'rutina'}
          className="rounded-full bg-navy px-4 py-2 text-xs font-semibold text-white transition hover:bg-navy-light disabled:opacity-60"
        >
          {downloading === 'rutina' ? 'Generando…' : '📄 Descargar mi rutina'}
        </button>
        <button
          type="button"
          onClick={() => handleDownload('dieta')}
          disabled={downloading === 'dieta'}
          className="rounded-full bg-orange px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
        >
          {downloading === 'dieta' ? 'Generando…' : '📄 Descargar mi dieta'}
        </button>
      </div>

      <p className="mt-3 text-[11px] text-text-secondary">
        Estos PDFs son de ejemplo (datos de Alberto) — pero se generan de verdad, igual que en tu cuenta real.
      </p>
    </div>
  )
}