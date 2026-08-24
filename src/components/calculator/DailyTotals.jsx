import { scaleFood } from '../../lib/generatePdf'

export default function DailyTotals({ target, mealItems }) {
  const totals = Object.values(mealItems)
    .flat()
    .reduce(
      (acc, it) => {
        const s = scaleFood(it, it.grams)
        acc.kcal += s.kcal
        acc.protein += s.protein
        acc.carbs += s.carbs
        acc.fat += s.fat
        return acc
      },
      { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    )

  const fields = [
    { label: 'Kcal', value: totals.kcal, targetValue: target.calories, unit: '' },
    { label: 'Proteína', value: totals.protein, targetValue: target.protein, unit: 'g' },
    { label: 'Carbohidratos', value: totals.carbs, targetValue: target.carbs, unit: 'g' },
    { label: 'Grasas', value: totals.fat, targetValue: target.fat, unit: 'g' },
  ]

  return (
    <div className="rounded-2xl bg-navy p-5 sm:p-6">
      <p className="font-display text-sm font-bold text-white">
        Total del día (todos los alimentos añadidos)
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
        {fields.map((f) => {
          const exceeded = f.value > f.targetValue
          return (
            <div key={f.label}>
              <p
                className={`font-display text-xl font-extrabold ${
                  exceeded ? 'text-red-300' : 'text-white'
                }`}
              >
                {Math.round(f.value)}
                {f.unit}
              </p>
              <p className="text-[11px] text-slate-300">
                {f.label} <span className="text-slate-400">(obj. {Math.round(f.targetValue)}{f.unit})</span>
              </p>
              {exceeded && (
                <p className="mt-0.5 text-[10px] font-semibold uppercase tracking-wide text-red-300">
                  Superado
                </p>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}