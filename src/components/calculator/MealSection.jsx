import { useState } from 'react'
import FoodSearch from './FoodSearch'

function scale(food, grams) {
  const factor = grams / 100
  return {
    kcal: food.calorias * factor,
    protein: food.proteinas * factor,
    carbs: food.carbos * factor,
    fat: food.grasas * factor,
  }
}

export default function MealSection({ meal, target }) {
  const [items, setItems] = useState([])

  const addFood = (food) => {
    setItems((prev) => [...prev, { ...food, grams: 100, key: `${food.id}-${Date.now()}` }])
  }

  const updateGrams = (key, grams) => {
    const g = Math.max(0, Number(grams) || 0)
    setItems((prev) => prev.map((it) => (it.key === key ? { ...it, grams: g } : it)))
  }

  const removeItem = (key) => setItems((prev) => prev.filter((it) => it.key !== key))

  const totals = items.reduce(
    (acc, it) => {
      const s = scale(it, it.grams)
      acc.kcal += s.kcal
      acc.protein += s.protein
      acc.carbs += s.carbs
      acc.fat += s.fat
      return acc
    },
    { kcal: 0, protein: 0, carbs: 0, fat: 0 }
  )

  const pctOfTarget = target.calories > 0 ? Math.min(100, Math.round((totals.kcal / target.calories) * 100)) : 0

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="flex items-center gap-2 font-display font-bold text-navy">
          <span className="text-lg">{meal.icon}</span> {meal.label}
        </p>
        <span className="text-[11px] font-semibold text-text-secondary">
          objetivo ~{target.calories} kcal
        </span>
      </div>

      <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-surface-soft">
        <div
          className={`h-full rounded-full transition-all ${
            pctOfTarget > 100 ? 'bg-red-400' : 'bg-orange'
          }`}
          style={{ width: `${pctOfTarget}%` }}
        />
      </div>

      <div className="mt-4">
        <FoodSearch onAdd={addFood} />
      </div>

      {items.length > 0 && (
        <ul className="mt-3 space-y-2">
          {items.map((it) => (
            <li
              key={it.key}
              className="flex items-center gap-2 rounded-xl bg-surface-soft px-3 py-2 text-sm"
            >
              <span className="flex-1 truncate text-navy-light">{it.nombre}</span>
              <input
                type="number"
                min="0"
                value={it.grams}
                onChange={(e) => updateGrams(it.key, e.target.value)}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1 text-right text-xs"
              />
              <span className="text-[11px] text-text-secondary">g</span>
              <span className="w-14 shrink-0 text-right text-[11px] font-semibold text-orange-dark">
                {Math.round(scale(it, it.grams).kcal)} kcal
              </span>
              <button
                type="button"
                onClick={() => removeItem(it.key)}
                className="ml-1 text-text-secondary transition hover:text-red-500"
                aria-label="Quitar alimento"
              >
                ✕
              </button>
            </li>
          ))}
        </ul>
      )}

      {items.length > 0 && (
        <div className="mt-3 flex justify-between border-t border-slate-100 pt-3 text-[11px] text-text-secondary">
          <span>Total: {Math.round(totals.kcal)} kcal</span>
          <span>
            P {Math.round(totals.protein)}g · C {Math.round(totals.carbs)}g · G {Math.round(totals.fat)}g
          </span>
        </div>
      )}
    </div>
  )
}