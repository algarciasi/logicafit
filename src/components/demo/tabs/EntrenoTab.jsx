import { useState } from 'react'
import { DIAS_SEMANA } from '../../../lib/routines'
import { demoRoutineEntries } from '../demoData'

function DemoExerciseItem({ entry }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-slate-100">
      <div className="flex items-center gap-3 p-2.5">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-slate-300 ring-1 ring-slate-200">
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
          </svg>
        </div>

        <p className="min-w-0 flex-1 truncate font-display text-[11px] font-extrabold text-navy">
          {entry.ejercicios.nombre}
        </p>

        <div className="shrink-0 rounded-lg bg-slate-50 px-2 py-1 ring-1 ring-slate-200/60">
          <span className="text-[9px] font-extrabold text-navy">
            {entry.series_objetivo} × {entry.reps_objetivo}
          </span>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-lg transition-all ${
            open ? 'bg-orange text-white shadow-md shadow-orange/20' : 'bg-slate-50 text-slate-400 ring-1 ring-slate-200/60'
          }`}
        >
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
          </svg>
        </button>
      </div>

      {open && (
        <div className="border-t border-slate-100 bg-slate-50/50 p-3">
          <div className="mb-2.5 flex items-center justify-between">
            <p className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400">
              Registrar serie
            </p>
            <p className="text-[9px] font-semibold text-slate-500">
              Objetivo:{' '}
              <span className="font-extrabold text-navy">
                {entry.series_objetivo} × {entry.reps_objetivo}
              </span>
            </p>
          </div>

          <div className="flex items-end gap-2">
            {[
              { label: '#', w: 'w-10', ph: '1' },
              { label: 'KG', w: 'flex-1', ph: '20' },
              { label: 'Reps', w: 'flex-1', ph: String(entry.reps_objetivo) },
            ].map((f) => (
              <div key={f.label} className={f.w}>
                <label className="mb-1 ml-1 block text-[8px] font-extrabold uppercase text-slate-400">
                  {f.label}
                </label>
                <div className="flex h-8 items-center rounded-lg border border-slate-200 bg-white px-2">
                  <span className="text-[10px] font-medium text-slate-300">{f.ph}</span>
                </div>
              </div>
            ))}
            <div className="flex h-8 w-10 shrink-0 items-center justify-center rounded-lg bg-navy text-white shadow-md">
              <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </div>

          {entry.notas_entrenador && (
            <p className="mt-2.5 text-[9px] italic text-slate-400">"{entry.notas_entrenador}"</p>
          )}
        </div>
      )}
    </div>
  )
}

export default function EntrenoTab() {
  const entriesByDay = DIAS_SEMANA.map((dia) => ({
    dia,
    items: demoRoutineEntries.filter((e) => e.dia_semana === dia.value),
  })).filter((d) => d.items.length > 0)

  return (
    <div className="flex flex-col gap-6">
      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-orange">Tu plan activo</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">Entrenamiento</h2>
        <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-500">
          Toca cualquier ejercicio para ver el vídeo técnico en YouTube. Usa el icono del
          cuaderno para registrar tus pesos.
        </p>
      </div>

      {entriesByDay.map(({ dia, items }) => (
        <div key={dia.value}>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="font-display text-lg font-extrabold capitalize text-navy">{dia.label}</h3>
            <div className="rounded-full bg-orange/10 px-2.5 py-1">
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-orange">
                {items.length} {items.length === 1 ? 'ejercicio' : 'ejercicios'}
              </span>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            {items.map((it) => (
              <DemoExerciseItem key={it.id} entry={it} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}