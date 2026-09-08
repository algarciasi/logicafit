import { useState } from 'react'
import { MEALS } from '../../../lib/macros'
import { demoDietEntries } from '../demoData'

const scale = (food, key, grams) => ((Number(food?.[key]) || 0) * (Number(grams) || 0)) / 100

export default function DietaTab() {
  const [openMeals, setOpenMeals] = useState(() => {
    const s = {}
    MEALS.forEach((m) => (s[m.id] = true))
    return s
  })

  const toggleMeal = (id) => setOpenMeals((p) => ({ ...p, [id]: !p[id] }))

  let totalKcal = 0, totalP = 0, totalC = 0, totalF = 0

  const entriesByMeal = MEALS.map((meal) => {
    const items = demoDietEntries.filter((e) => e.momento_dia === meal.id)
    const mealKcal = items.reduce((s, it) => s + scale(it.foods, 'calorias', it.cantidad_g), 0)

    totalKcal += mealKcal
    totalP += items.reduce((s, it) => s + scale(it.foods, 'proteinas', it.cantidad_g), 0)
    totalC += items.reduce((s, it) => s + scale(it.foods, 'carbos', it.cantidad_g), 0)
    totalF += items.reduce((s, it) => s + scale(it.foods, 'grasas', it.cantidad_g), 0)

    return { meal, items, mealKcal: Math.round(mealKcal) }
  }).filter((m) => m.items.length > 0)

  totalKcal = Math.round(totalKcal)
  totalP = Math.round(totalP)
  totalC = Math.round(totalC)
  totalF = Math.round(totalF)

  const totalMacros = totalP + totalC + totalF || 1
  const macros = [
    { label: 'Proteínas', g: totalP, pct: Math.round((totalP / totalMacros) * 100), color: 'bg-navy' },
    { label: 'Carbohidratos', g: totalC, pct: Math.round((totalC / totalMacros) * 100), color: 'bg-[#3B82F6]' },
    { label: 'Grasas', g: totalF, pct: Math.round((totalF / totalMacros) * 100), color: 'bg-orange' },
  ]

  const todayName = new Date().toLocaleDateString('es-ES', { weekday: 'long' })

  return (
    <div className="flex flex-col gap-5">

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-orange">Tu plan activo</p>
        <div className="flex items-center justify-between">
          <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">Nutrición</h2>
          <div className="mt-1 rounded-xl border border-orange/20 bg-orange/10 px-2.5 py-1">
            <span className="text-[8px] font-extrabold uppercase tracking-wider text-orange">
              Hoy ({todayName})
            </span>
          </div>
        </div>
      </div>

      {/* Anillo + macros */}
      <div className="rounded-[1.5rem] bg-white p-5 shadow-sm ring-1 ring-slate-100">
        <div className="flex items-center gap-5">
          <div className="relative flex h-24 w-24 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="9" />
              <circle
                cx="50" cy="50" r="42"
                fill="none" stroke="#EA580C" strokeWidth="9" strokeLinecap="round"
                strokeDasharray={2 * Math.PI * 42}
                strokeDashoffset={0}
              />
            </svg>
            <div className="flex flex-col items-center text-center">
              <span className="font-display text-xl font-extrabold leading-none text-navy">{totalKcal}</span>
              <span className="mt-0.5 text-[7px] font-bold uppercase tracking-widest text-slate-400">
                Kcal de hoy
              </span>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-2.5">
            {macros.map((m) => (
              <div key={m.label}>
                <div className="mb-1 flex justify-between text-[9px] font-bold">
                  <span className="text-navy">{m.label}</span>
                  <span className="text-slate-500">
                    {m.g}g <span className="font-medium text-slate-300">({m.pct}%)</span>
                  </span>
                </div>
                <div className="h-1.5 w-full overflow-hidden rounded-full bg-slate-100">
                  <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Comidas */}
      <div className="flex flex-col gap-3">
        {entriesByMeal.map(({ meal, items, mealKcal }) => {
          const isOpen = openMeals[meal.id]
          return (
            <div key={meal.id} className="overflow-hidden rounded-[1.25rem] bg-white shadow-sm ring-1 ring-slate-100">
              <button
                onClick={() => toggleMeal(meal.id)}
                className="flex w-full items-center justify-between p-4 transition-colors hover:bg-slate-50"
              >
                <div className="flex items-center gap-2.5">
                  <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-navy/5 text-base">
                    {meal.icon}
                  </span>
                  <div className="text-left">
                    <h3 className="font-display text-sm font-bold capitalize text-navy">{meal.label}</h3>
                    <p className="mt-0.5 text-[9px] font-semibold tracking-wide text-slate-400">
                      {mealKcal} kcal · {items.length} {items.length === 1 ? 'alimento' : 'alimentos'}
                    </p>
                  </div>
                </div>
                <div className={`flex h-6 w-6 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-50 px-4 pb-4 pt-2.5">
                  <ul className="flex flex-col gap-3">
                    {items.map((it) => (
                      <li key={it.id} className="flex items-center justify-between gap-3">
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-[11px] font-bold text-navy">{it.foods.nombre}</p>
                          <p className="mt-0.5 truncate text-[9px] font-bold text-slate-400">
                            {it.cantidad_g}g · Todos los días
                            {it.opcion ? <span className="text-orange"> · Opción {it.opcion}</span> : ''}
                          </p>
                        </div>
                        <span className="shrink-0 text-[10px] font-extrabold text-navy">
                          {Math.round(scale(it.foods, 'calorias', it.cantidad_g))} kcal
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )
        })}
      </div>
    </div>
  )
}