import { useState } from 'react'
import PersonalDataForm from '../components/calculator/PersonalDataForm'
import MacroSummary from '../components/calculator/MacroSummary'
import MealSection from '../components/calculator/MealSection'
import DailyTotals from '../components/calculator/DailyTotals'
import { calcMacros, mealTarget, MEALS } from '../lib/macros'
import { generateMacroPdf } from '../lib/generatePdf'

const DEFAULT_DATA = {
  sex: 'mujer',
  age: 30,
  weight: 65,
  height: 165,
  activity: 'ligero',
  goal: 'mantener',
}

const emptyMealItems = () =>
  MEALS.reduce((acc, meal) => {
    acc[meal.id] = []
    return acc
  }, {})

export default function Calculadora() {
  const [formData, setFormData] = useState(DEFAULT_DATA)
  const [target, setTarget] = useState(null)
  const [mealItems, setMealItems] = useState(emptyMealItems)
  const [generating, setGenerating] = useState(false)

  const handleSubmit = () => {
    const result = calcMacros({
      sex: formData.sex,
      age: Number(formData.age),
      weight: Number(formData.weight),
      height: Number(formData.height),
      activity: formData.activity,
      goal: formData.goal,
    })
    setTarget(result)
    setMealItems(emptyMealItems())
  }

  const addFood = (mealId, food) => {
    setMealItems((prev) => ({
      ...prev,
      [mealId]: [...prev[mealId], { ...food, grams: 100, key: `${food.id}-${Date.now()}` }],
    }))
  }

  const updateGrams = (mealId, key, grams) => {
    const g = Math.max(0, Number(grams) || 0)
    setMealItems((prev) => ({
      ...prev,
      [mealId]: prev[mealId].map((it) => (it.key === key ? { ...it, grams: g } : it)),
    }))
  }

  const removeItem = (mealId, key) => {
    setMealItems((prev) => ({
      ...prev,
      [mealId]: prev[mealId].filter((it) => it.key !== key),
    }))
  }

  const totalItemsAdded = Object.values(mealItems).reduce((sum, arr) => sum + arr.length, 0)

  const handleDownload = async () => {
    setGenerating(true)
    try {
      await generateMacroPdf({ formData, target, mealItems })
    } finally {
      setGenerating(false)
    }
  }

  return (
    <div className="bg-surface-soft py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
          Calculadora gratuita
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Calcula tus macros exactos
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Sin registro, sin email. Y si quieres, arma tu menú del día con
          alimentos reales, comida por comida.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-2xl px-6">
        <PersonalDataForm data={formData} onChange={setFormData} onSubmit={handleSubmit} />
      </div>

      {target && (
        <div className="mx-auto mt-10 max-w-3xl px-6">
          <MacroSummary target={target} />

          <p className="mt-8 text-center font-display text-xl font-bold text-navy">
            Ahora arma tu menú
          </p>
          <p className="mt-1 text-center text-sm text-text-secondary">
            Busca alimentos de nuestra base de datos y añádelos a cada comida.
          </p>

          <div className="mt-6 space-y-4">
            {MEALS.map((meal) => (
              <MealSection
                key={meal.id}
                meal={meal}
                target={mealTarget(target, meal.pct)}
                items={mealItems[meal.id]}
                onAdd={addFood}
                onUpdateGrams={updateGrams}
                onRemove={removeItem}
              />
            ))}
          </div>

          <div className="mt-6">
            <DailyTotals target={target} mealItems={mealItems} />
          </div>

          <div className="sticky bottom-4 mt-8 flex justify-center">
            <button
              type="button"
              onClick={handleDownload}
              disabled={totalItemsAdded === 0 || generating}
              className="inline-flex items-center gap-2 rounded-full bg-navy px-8 py-4 text-sm font-semibold text-white shadow-xl shadow-navy/20 transition hover:bg-navy-light disabled:cursor-not-allowed disabled:opacity-40"
            >
              {generating ? 'Generando…' : '📄 Descargar mi plan en PDF'}
            </button>
          </div>
          {totalItemsAdded === 0 && (
            <p className="mt-2 text-center text-xs text-text-secondary">
              Añade al menos un alimento a alguna comida para poder descargarlo.
            </p>
          )}
        </div>
      )}
    </div>
  )
}