import { useState } from 'react'
import PersonalDataForm from '../components/calculator/PersonalDataForm'
import MacroSummary from '../components/calculator/MacroSummary'
import MealSection from '../components/calculator/MealSection'
import { calcMacros, mealTarget, MEALS } from '../lib/macros'

const DEFAULT_DATA = {
  sex: 'mujer',
  age: 30,
  weight: 65,
  height: 165,
  activity: 'ligero',
  goal: 'mantener',
}

export default function Calculadora() {
  const [formData, setFormData] = useState(DEFAULT_DATA)
  const [target, setTarget] = useState(null)

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
              <MealSection key={meal.id} meal={meal} target={mealTarget(target, meal.pct)} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}