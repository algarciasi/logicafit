import { useState } from 'react'
import { DIAS_SEMANA } from '../../../lib/routines'
import { demoRoutineEntries } from '../demoData'

function DemoExerciseItem({ entry }) {
  const [open, setOpen] = useState(false)

  return (
    <div className="rounded-xl bg-surface-soft p-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-sm font-semibold text-navy">{entry.ejercicios.nombre}</p>
          <p className="text-[11px] text-text-secondary">
            {entry.series_objetivo}×{entry.reps_objetivo} objetivo
            {entry.notas_entrenador ? ` · "${entry.notas_entrenador}"` : ''}
          </p>
        </div>
        <span className="text-orange">{open ? '−' : '+'}</span>
      </button>

      {open && (
        <div className="mt-3 border-t border-slate-200 pt-3">
          <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
            Así verías tu historial real
          </p>
          <p className="mt-1 text-xs text-navy-light">
            En tu cuenta, aquí aparecen tus últimas series (peso × reps, con fecha) y un
            formulario para apuntar la serie de hoy.
          </p>
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
    <div className="space-y-4">
      <p className="text-xs text-text-secondary">Toca un ejercicio para ver cómo funciona.</p>
      {entriesByDay.map(({ dia, items }) => (
        <div key={dia.value}>
          <p className="font-display text-sm font-bold text-navy">{dia.label}</p>
          <div className="mt-2 space-y-2">
            {items.map((it) => (
              <DemoExerciseItem key={it.id} entry={it} />
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}