import { MEALS } from '../../../lib/macros'
import { demoDietEntries } from '../demoData'

export default function DietaTab() {
  const totalKcal = demoDietEntries.reduce((sum, e) => {
    const factor = e.cantidad_g / 100
    return sum + e.foods.calorias * factor
  }, 0)

  return (
    <div>
      <p className="font-display text-sm font-bold text-navy">
        Total del día: {Math.round(totalKcal)} kcal
      </p>

      <div className="mt-4 space-y-4">
        {MEALS.map((meal) => {
          const items = demoDietEntries.filter((e) => e.momento_dia === meal.id)
          if (items.length === 0) return null
          return (
            <div key={meal.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-display text-sm font-bold text-navy">
                {meal.icon} {meal.label}
              </p>
              <ul className="mt-2 space-y-1.5">
                {items.map((it) => {
                  const factor = it.cantidad_g / 100
                  const kcal = Math.round(it.foods.calorias * factor)
                  return (
                    <li key={it.id} className="flex justify-between text-xs text-navy-light">
                      <span>
                        {it.foods.nombre} ({it.cantidad_g}g)
                      </span>
                      <span className="text-orange-dark">{kcal} kcal</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}