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
    <div className="bg-surface-soft min-h-screen py-16 px-6 lg:px-8">
      
      {/* 1. TARJETA PRINCIPAL DE LA CALCULADORA */}
      <div className="mx-auto max-w-4xl bg-surface rounded-[2rem] shadow-2xl shadow-slate-200/50 ring-1 ring-slate-100 overflow-hidden animate-fade-in-up">
        
        {/* Borde superior de gradiente (Detalle UI Premium) */}
        <div className="h-2 w-full bg-gradient-to-r from-orange via-orange-dark to-navy" />
        
        {/* ZONA BLANCA: FORMULARIO */}
        <div className="p-8 sm:p-12 lg:p-16">
          <div className="flex items-center gap-2 mb-6">
            <span className="h-2 w-2 rounded-full bg-orange animate-pulse"></span>
            <span className="text-[10px] font-bold uppercase tracking-widest text-text-secondary">
              Gratis · Basado en evidencia
            </span>
          </div>
          
          <h1 className="font-display text-3xl font-extrabold text-navy sm:text-4xl lg:text-5xl tracking-tight">
            Calcula tus macros diarios
          </h1>
          
          <p className="mt-4 text-base text-text-secondary leading-relaxed max-w-2xl font-medium">
            Introduce tus datos para conocer tus requerimientos calóricos exactos. Una vez calculados, podrás crear tu propia dieta alimento por alimento totalmente gratis.
          </p>

          <div className="mt-12 border-t border-slate-100 pt-10">
            <PersonalDataForm data={formData} onChange={setFormData} onSubmit={handleSubmit} />
            
            {/* Botón calcular visible si PersonalDataForm no incluye uno propio o antes de calcular */}
            {!target && (
              <div className="mt-10 flex justify-end">
                <button
                  type="button"
                  onClick={handleSubmit}
                  className="w-full sm:w-auto rounded-full bg-navy px-10 py-4 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-all hover:bg-orange hover:shadow-orange/20 hover:-translate-y-1"
                >
                  Calcular mis macros
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ZONA OSCURA: RESULTADOS MACROS */}
        {target && (
          <div className="bg-navy p-8 sm:p-12 lg:p-16 relative overflow-hidden animate-fade-in">
            {/* Brillos decorativos de fondo para que no sea plano */}
            <div className="absolute top-0 right-0 -mr-20 -mt-20 h-64 w-64 rounded-full bg-orange opacity-10 blur-[80px] pointer-events-none"></div>
            <div className="absolute bottom-0 left-0 -ml-20 -mb-20 h-64 w-64 rounded-full bg-white opacity-[0.03] blur-[80px] pointer-events-none"></div>
            
            <div className="relative z-10 text-white">
              {/* 
                Nota: Si tu componente <MacroSummary /> tenía textos grises o negros, 
                asegúrate de ir a ese archivo y cambiar los colores a text-white o text-slate-300 
                para que contrasten bien en este nuevo fondo azul oscuro.
              */}
              <MacroSummary target={target} />
            </div>
          </div>
        )}
      </div>

      {/* 2. CREADOR DE DIETAS (PASO 2) */}
      {target && (
        <div className="mx-auto mt-24 max-w-4xl animate-fade-in-up delay-200">
          
          <div className="text-center mb-12">
            <span className="inline-block rounded-full bg-orange/10 px-4 py-1.5 text-[10px] font-bold uppercase tracking-widest text-orange mb-4 border border-orange/20">
              Paso 2
            </span>
            <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl tracking-tight">
              Ahora arma tu menú
            </h2>
            <p className="mt-4 text-base text-text-secondary font-medium max-w-xl mx-auto">
              Busca alimentos en nuestra base de datos y añádelos a cada comida para cuadrar tus macros del día.
            </p>
          </div>

          {/* Bloques de comidas con diseño de tarjeta individual */}
          <div className="space-y-6">
            {MEALS.map((meal) => (
              <div key={meal.id} className="rounded-[2rem] bg-surface p-6 sm:p-8 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
                <MealSection
                  meal={meal}
                  target={mealTarget(target, meal.pct)}
                  items={mealItems[meal.id]}
                  onAdd={addFood}
                  onUpdateGrams={updateGrams}
                  onRemove={removeItem}
                />
              </div>
            ))}
          </div>

          {/* Resumen total diario oscuro para contrastar */}
          <div className="mt-8 rounded-[2rem] bg-navy p-6 sm:p-8 shadow-xl">
            <DailyTotals target={target} mealItems={mealItems} />
          </div>

          {/* CTA Fijo Inferior */}
          <div className="sticky bottom-6 mt-12 flex flex-col items-center z-40">
            <button
              type="button"
              onClick={handleDownload}
              disabled={totalItemsAdded === 0 || generating}
              className="group inline-flex items-center gap-3 rounded-full bg-orange px-10 py-5 text-base font-bold text-white shadow-2xl shadow-orange/30 transition-all hover:bg-orange-dark hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-orange disabled:hover:scale-100"
            >
              {generating ? (
                'Generando PDF...'
              ) : (
                <>
                  <svg className="h-5 w-5 transition-transform group-hover:-translate-y-1" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
                  </svg>
                  Descargar mi dieta gratis
                </>
              )}
            </button>
            
            {totalItemsAdded === 0 && (
              <p className="mt-4 text-center text-xs font-bold text-text-secondary bg-surface-soft/90 backdrop-blur px-5 py-2.5 rounded-full ring-1 ring-slate-200 shadow-sm">
                Añade al menos un alimento para poder generar tu PDF.
              </p>
            )}
          </div>

        </div>
      )}
    </div>
  )
}