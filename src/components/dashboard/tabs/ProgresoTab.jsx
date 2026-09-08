import { useEffect, useState } from 'react'
import { listProgressHistory } from '../../../lib/notes'
import { listRoutineHistory } from '../../../lib/history'
import ProgressForm from '../ProgressForm'
import MeasurementsChart from '../MeasurementsChart'
import PhotoGallery from '../PhotoGallery'
import StravaConnect from '../StravaConnect'
import EmptyState from '../EmptyState'

const IconWeight = <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
const IconTape = <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
const IconDumbbell = <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>

export default function ProgresoTab({ client }) {
  const [progressEntries, setProgressEntries] = useState([])
  const [routineEntries, setRoutineEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const load = async () => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    setLoading(true)
    const [progressRes, routineRes] = await Promise.all([
      listProgressHistory(client.id),
      listRoutineHistory(client.id)
    ])
    
    setProgressEntries(progressRes.entries || [])
    
    const parsedRoutines = []
    if (routineRes.entries) {
      const byDate = {}
      routineRes.entries.forEach(r => {
        if (!r.fecha || !r.nombre_ejercicio || !r.peso) return
        const dateStr = r.fecha.split('T')[0]
        if (!byDate[dateStr]) byDate[dateStr] = { fecha: dateStr }
        byDate[dateStr][r.nombre_ejercicio] = Math.max(byDate[dateStr][r.nombre_ejercicio] || 0, parseFloat(r.peso))
      })
      parsedRoutines.push(...Object.values(byDate))
    }
    setRoutineEntries(parsedRoutines)

    setError(progressRes.error || routineRes.error)
    setLoading(false)
  }

  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [client?.id])

  if (!client) {
    return <EmptyState icon="🔍" title="Ficha no encontrada" body="Escríbeme para revisarlo." />
  }

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-6 p-2">
        <div className="h-16 w-full rounded-2xl bg-orange/10 border border-orange/20"></div>
        <div className="h-64 w-full rounded-[2rem] bg-white border border-slate-100 shadow-sm"></div>
        <div className="h-64 w-full rounded-[2rem] bg-white border border-slate-100 shadow-sm"></div>
      </div>
    )
  }

  const exerciseOptions = Array.from(new Set(
    routineEntries.flatMap(entry => Object.keys(entry).filter(k => k !== 'fecha'))
  )).map(ex => ({ id: ex, label: ex }))

  const fallbackExerciseOptions = exerciseOptions.length > 0 
    ? exerciseOptions 
    : [{ id: 'sin_datos', label: 'Sin ejercicios registrados' }]

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fade-in">
      
      <div>
        <p className="text-sm font-bold tracking-widest text-orange uppercase">
          Tu evolución
        </p>
        <h2 className="font-display text-3xl font-extrabold text-navy mt-1">
          Progreso
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
          Registra tus medidas, analiza tu gráfica de peso, revisa tu cambio físico y vincula tus carreras.
        </p>
      </div>

      {error && (
        <div className="rounded-2xl border border-red-100 bg-red-50 p-4 shadow-sm">
          <p className="text-sm font-bold text-red-600">Error al cargar datos</p>
          <p className="mt-1 text-xs text-red-500">{error.message}</p>
        </div>
      )}

      <div className="relative z-10 transition-transform active:scale-95">
        <ProgressForm clientId={client.id} onSaved={load} />
      </div>

      {progressEntries.length === 0 && routineEntries.length === 0 ? (
        <div className="mt-2">
          <EmptyState
            icon="📈"
            title="Aún no hay datos"
            body="Usa el botón superior para registrar medidas, o anota pesos en tus entrenos para generar gráficas."
          />
        </div>
      ) : (
        <div className="flex flex-col">
          
          <MeasurementsChart 
            title="Peso corporal"
            subtitle="Tendencia histórica"
            dataEntries={progressEntries}
            metrics={[{ id: 'peso', label: 'Peso' }]}
            unit="kg"
            color="#EA580C"
            icon={IconWeight}
          />

          <MeasurementsChart 
            title="Medidas corporales"
            subtitle="Evolución de contornos"
            dataEntries={progressEntries}
            metrics={[
              { id: 'pecho', label: 'Pecho' },
              { id: 'brazo', label: 'Brazo' },
              { id: 'cintura', label: 'Cintura' },
              { id: 'pierna', label: 'Pierna' },
              { id: 'gemelo', label: 'Gemelo' },
            ]}
            unit="cm"
            color="#3B82F6"
            icon={IconTape}
          />

          <MeasurementsChart 
            title="Rendimiento"
            subtitle="Evolución de pesos"
            dataEntries={routineEntries}
            metrics={fallbackExerciseOptions}
            unit="kg"
            color="#10B981"
            icon={IconDumbbell}
          />

          <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 mb-6">
            <div className="mb-6 flex items-center justify-between">
              <div>
                <h3 className="font-display text-xl font-extrabold text-navy">Cambio físico</h3>
                <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Comparativa visual</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-navy/5 text-navy">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <PhotoGallery entries={progressEntries} />
          </div>

        </div>
      )}

      <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
         <div className="mb-6 flex items-center gap-4">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#FC4C02]/10 text-[#FC4C02]">
              <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24"><path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169"/></svg>
            </div>
            <div>
              <h3 className="font-display text-xl font-extrabold text-navy">Actividad Strava</h3>
              <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-1">Sincronización GPS</p>
            </div>
         </div>
         <div className="rounded-xl bg-slate-50 p-4 border border-slate-100">
           <StravaConnect client={client} />
         </div>
      </div>

    </div>
  )
}