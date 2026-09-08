import { useState } from 'react'
import { generateRoutinePdf, generateDietPdf } from '../../../lib/clientPdfs'
import { objetivoLabel } from '../../../lib/clients'
import { demoClient, demoRoutineEntries, demoDietEntries } from '../demoData'

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatShortDate(dateStr) {
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
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

  const stats = [
    { label: 'Edad', value: `${demoClient.edad} años` },
    { label: 'Altura', value: `${demoClient.altura} cm` },
    { label: 'Peso actual', value: `${demoClient.peso} kg` },
    { label: 'Miembro desde', value: formatShortDate(demoClient.created_at) },
  ]

  return (
    <div className="flex flex-col gap-5">

      <div className="flex items-center justify-between">
        <p className="text-xs font-bold uppercase tracking-widest text-orange">Mi panel</p>
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-navy text-white shadow-md">
          <span className="font-display text-sm font-bold uppercase">
            {demoClient.full_name.charAt(0)}
          </span>
        </div>
      </div>

      {/* Tarjeta navy */}
      <div className="relative overflow-hidden rounded-[1.75rem] border border-slate-700/50 bg-navy p-5 shadow-xl shadow-navy/20">
        <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-orange opacity-15 blur-[40px]" />

        <div className="relative z-10 flex flex-col gap-4">
          <div className="border-b border-slate-700 pb-4">
            <p className="font-display text-lg font-extrabold text-white">{demoClient.full_name}</p>
            <div className="mt-3 grid grid-cols-2 gap-x-3 gap-y-2.5">
              {stats.map((s) => (
                <div key={s.label}>
                  <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">{s.label}</p>
                  <p className="mt-0.5 text-[11px] font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-between border-b border-slate-700 pb-4">
            <div>
              <p className="mb-1 text-[9px] font-bold uppercase tracking-widest text-slate-400">Objetivo actual</p>
              <p className="font-display text-sm font-bold text-white">
                {objetivoLabel(demoClient.objetivo_entrenamiento)}
              </p>
            </div>
            <div className="rounded-lg border border-orange/20 bg-orange/20 px-2 py-1">
              <span className="text-[8px] font-extrabold uppercase tracking-wider text-orange">Activo</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Plan</p>
              <p className="mt-0.5 text-[11px] font-semibold text-white">{demoClient.tipo_plan}</p>
            </div>
            <div>
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Vigencia</p>
              <p className="mt-0.5 text-[11px] font-semibold text-white">
                Hasta {formatDate(demoClient.plan_vigente_hasta)}
              </p>
            </div>
            <div className="col-span-2 mt-1">
              <p className="text-[8px] font-bold uppercase tracking-widest text-slate-400">Próxima revisión</p>
              <div className="mt-1.5 inline-flex items-center gap-2 rounded-lg border border-slate-700 bg-slate-800/50 px-2.5 py-1.5">
                <span className="h-1.5 w-1.5 rounded-full bg-orange" />
                <span className="text-[11px] font-semibold text-white">
                  {formatDate(demoClient.proxima_revision)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Botones que generan PDFs de verdad */}
      <div className="grid grid-cols-2 gap-3">
        <button
          type="button"
          onClick={() => handleDownload('rutina')}
          disabled={downloading === 'rutina'}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-50 text-navy">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-center text-[9px] font-bold uppercase tracking-wider text-navy">
            {downloading === 'rutina' ? 'Generando…' : 'Descargar rutina'}
          </span>
        </button>

        <button
          type="button"
          onClick={() => handleDownload('dieta')}
          disabled={downloading === 'dieta'}
          className="flex flex-col items-center justify-center gap-2 rounded-2xl border border-orange-dark bg-orange p-4 shadow-lg shadow-orange/20 transition-all active:scale-95 disabled:opacity-50"
        >
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-white/20 text-white">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <span className="text-center text-[9px] font-bold uppercase tracking-wider text-white">
            {downloading === 'dieta' ? 'Generando…' : 'Descargar dieta'}
          </span>
        </button>
      </div>

      <p className="text-center text-[9px] text-slate-400">
        Los PDFs son de ejemplo, pero se generan de verdad — igual que en tu cuenta real.
      </p>
    </div>
  )
}