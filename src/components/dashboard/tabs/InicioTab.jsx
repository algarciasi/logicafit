import { useEffect, useState } from 'react'
import { listClientRoutine } from '../../../lib/routines'
import { listClientDiet } from '../../../lib/diets'
import { generateRoutinePdf, generateDietPdf } from '../../../lib/clientPdfs'
import { objetivoLabel } from '../../../lib/clients'
import EmptyState from '../EmptyState'

function formatDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('es-ES', { day: 'numeric', month: 'long', year: 'numeric' })
}

function formatShortDate(dateStr) {
  if (!dateStr) return null
  return new Date(dateStr).toLocaleDateString('es-ES', { day: '2-digit', month: 'short', year: 'numeric' })
}

export default function InicioTab({ client }) {
  const [routineEntries, setRoutineEntries] = useState([])
  const [dietEntries, setDietEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [downloading, setDownloading] = useState(null)

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    Promise.all([listClientRoutine(client.id), listClientDiet(client.id)]).then(
      ([{ entries: routine }, { entries: diet }]) => {
        setRoutineEntries(routine)
        setDietEntries(diet)
        setLoading(false)
      }
    )
  }, [client?.id])

  if (!client) {
    return (
      <EmptyState
        icon="🔍"
        title="Ficha no encontrada"
        body="Tu cuenta existe pero no está vinculada a ningún cliente todavía. Escríbeme y lo reviso."
      />
    )
  }

  const hasPlanInfo =
    client.tipo_plan ||
    client.plan_vigente_hasta ||
    client.proxima_revision ||
    client.objetivo_entrenamiento ||
    client.peso ||
    client.altura ||
    client.edad
  const hasAnything = hasPlanInfo || routineEntries.length > 0 || dietEntries.length > 0

  const handleDownload = async (type) => {
    setDownloading(type)
    try {
      if (type === 'rutina') await generateRoutinePdf(client, routineEntries)
      if (type === 'dieta') await generateDietPdf(client, dietEntries)
    } finally {
      setDownloading(null)
    }
  }

  // Datos personales que sí tengamos rellenos
  const personalStats = [
    client.edad && { label: 'Edad', value: `${client.edad} años` },
    client.altura && { label: 'Altura', value: `${client.altura} cm` },
    client.peso && { label: 'Peso actual', value: `${client.peso} kg` },
    client.created_at && { label: 'Miembro desde', value: formatShortDate(client.created_at) },
  ].filter(Boolean)

  return (
    <div className="flex flex-col gap-6">

      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-bold tracking-widest text-orange uppercase">
            Mi panel
          </p>
        </div>

        {/* Avatar inicial */}
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-navy text-white shadow-md">
          <span className="font-display text-xl font-bold uppercase">
            {client.full_name?.charAt(0) || 'A'}
          </span>
        </div>
      </div>

      {loading && <p className="text-sm font-medium text-slate-400">Cargando tus datos…</p>}

      {!loading && !hasAnything && (
        <EmptyState
          icon="🗓️"
          title="Sin entreno asignado"
          body="En cuanto diseñe tu plan lo verás aquí. Si tienes prisa, escríbeme."
        />
      )}

      {/* TARJETA PRINCIPAL */}
      {!loading && hasPlanInfo && (
        <div className="relative overflow-hidden rounded-[2rem] bg-navy p-6 shadow-xl shadow-navy/20 border border-slate-700/50">
          {/* Brillo sutil de fondo para textura */}
          <div className="absolute -top-10 -right-10 h-32 w-32 rounded-full bg-orange opacity-15 blur-[50px]"></div>

          <div className="relative z-10 flex flex-col gap-5">

            {/* Nombre + datos personales */}
            <div className="border-b border-slate-700 pb-5">
              <p className="font-display text-2xl font-extrabold text-white">
                {client.full_name || 'Atleta'}
              </p>

              {personalStats.length > 0 && (
                <div className="mt-4 grid grid-cols-2 gap-x-4 gap-y-3">
                  {personalStats.map((stat) => (
                    <div key={stat.label}>
                      <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                        {stat.label}
                      </p>
                      <p className="mt-1 text-sm font-semibold text-white">{stat.value}</p>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Objetivo */}
            <div className="flex items-center justify-between border-b border-slate-700 pb-5">
              <div>
                <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">Objetivo actual</p>
                <p className="font-display text-xl font-bold text-white">
                  {client.objetivo_entrenamiento ? objetivoLabel(client.objetivo_entrenamiento) : 'No definido'}
                </p>
              </div>
              <div className="rounded-xl bg-orange/20 px-3 py-1.5 border border-orange/20">
                <span className="text-[10px] font-extrabold text-orange uppercase tracking-wider">Activo</span>
              </div>
            </div>

            {/* Plan */}
            <div className="grid grid-cols-2 gap-4">
              {client.tipo_plan && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Plan</p>
                  <p className="mt-1 text-sm font-semibold text-white">{client.tipo_plan}</p>
                </div>
              )}
              {client.plan_vigente_hasta && (
                <div>
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Vigencia</p>
                  <p className="mt-1 text-sm font-semibold text-white">Hasta {formatDate(client.plan_vigente_hasta)}</p>
                </div>
              )}
              {client.proxima_revision && (
                <div className="col-span-2 mt-2">
                  <p className="text-[10px] font-bold uppercase tracking-widest text-slate-400">Próxima revisión</p>
                  <div className="mt-2 inline-flex items-center gap-2 rounded-xl bg-slate-800/50 px-3 py-2 border border-slate-700">
                    <span className="h-2 w-2 rounded-full bg-orange"></span>
                    <span className="text-sm font-semibold text-white">{formatDate(client.proxima_revision)}</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* BOTONES DE DESCARGA */}
      {!loading && (routineEntries.length > 0 || dietEntries.length > 0) && (
        <div className="grid grid-cols-2 gap-4 mt-2">

          {routineEntries.length > 0 && (
            <button
              type="button"
              onClick={() => handleDownload('rutina')}
              disabled={downloading === 'rutina'}
              className="group flex flex-col items-center justify-center gap-3 rounded-3xl bg-white border border-slate-100 p-5 shadow-sm transition-all hover:border-navy/30 hover:shadow-md active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-50 text-navy group-hover:bg-navy/5 transition-colors">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-navy uppercase tracking-wider text-center">
                {downloading === 'rutina' ? 'Generando...' : 'Descargar Rutina'}
              </span>
            </button>
          )}

          {dietEntries.length > 0 && (
            <button
              type="button"
              onClick={() => handleDownload('dieta')}
              disabled={downloading === 'dieta'}
              className="group flex flex-col items-center justify-center gap-3 rounded-3xl bg-orange border border-orange-dark p-5 shadow-lg shadow-orange/20 transition-all hover:bg-orange-dark active:scale-95 disabled:opacity-50 disabled:active:scale-100"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white/20 text-white">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="text-[11px] font-bold text-white uppercase tracking-wider text-center">
                {downloading === 'dieta' ? 'Generando...' : 'Descargar Dieta'}
              </span>
            </button>
          )}

        </div>
      )}

    </div>
  )
}