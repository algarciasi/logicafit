import { DIAS_SEMANA } from './routines'
import { MEALS } from './macros'

export function formatRoutineText(routineEntries) {
  const lines = []
  DIAS_SEMANA.forEach((dia) => {
    const items = routineEntries
      .filter((e) => e.dia_semana === dia.value)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
    if (items.length === 0) return
    lines.push(`${dia.label}:`)
    items.forEach((it) => {
      const notas = it.notas_entrenador ? ` (${it.notas_entrenador})` : ''
      lines.push(`  - ${it.ejercicios?.nombre} — ${it.series_objetivo}×${it.reps_objetivo ?? '?'}${notas}`)
    })
  })
  return lines.join('\n')
}

export function formatDietText(dietEntries) {
  const lines = []
  let totalKcal = 0
  MEALS.forEach((meal) => {
    const items = dietEntries.filter((e) => e.momento_dia === meal.id)
    if (items.length === 0) return
    lines.push(`${meal.label}:`)
    items.forEach((it) => {
      const factor = it.cantidad_g / 100
      const kcal = Math.round((it.foods?.calorias || 0) * factor)
      totalKcal += kcal
      lines.push(`  - ${it.foods?.nombre} (${it.cantidad_g}g) — ${kcal} kcal`)
    })
  })
  lines.push('')
  lines.push(`Total: ${totalKcal} kcal`)
  return lines.join('\n')
}