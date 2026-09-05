import { useState } from 'react'
import MealSection from '../components/calculator/MealSection'
import DailyTotals from '../components/calculator/DailyTotals'
import { mealTarget, MEALS } from '../lib/macros'
import { generateMacroPdf } from '../lib/generatePdf'

const emptyMealItems = () =>
  MEALS.reduce((acc, meal) => {
    acc[meal.id] = []
    return acc
  }, {})

export default function Calculadora() {
  // 1. ESTADO DEL FORMULARIO (Campos numéricos vacíos por defecto)
  const [formData, setFormData] = useState({
    sex: 'masculino',
    age: '',
    weight: '',
    height: '',
    activity: '1.55', // Moderado por defecto
    goal: 'mantenimiento',
    experience: '1.8' // Intermedio por defecto
  })

  // Estado del objetivo calculado
  const [target, setTarget] = useState(null)

  // Estado del creador de dietas
  const [mealItems, setMealItems] = useState(emptyMealItems())
  const [generating, setGenerating] = useState(false)

  // Manejo de inputs
  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  // 2. MOTOR MATEMÁTICO AL PULSAR "CALCULAR"
  const calculateMacros = (e) => {
    e.preventDefault()

    // Convertimos los strings a números asegurando que acepten decimales con coma o punto
    const weight = parseFloat(formData.weight.toString().replace(',', '.')) || 0
    const height = parseFloat(formData.height.toString().replace(',', '.')) || 0
    const age = parseFloat(formData.age.toString().replace(',', '.')) || 0

    // Validación básica
    if (weight <= 0 || height <= 0 || age <= 0) {
      alert("Por favor, rellena tu edad, altura y peso correctamente para calcular.")
      return
    }

    // Fórmula Mifflin-St Jeor para Tasa Metabólica Basal (BMR)
    let bmr = (10 * weight) + (6.25 * height) - (5 * age)
    bmr += formData.sex === 'masculino' ? 5 : -161

    // Gasto Calórico Total (TDEE)
    const activityMultiplier = parseFloat(formData.activity)
    const tdee = bmr * activityMultiplier

    // Ajuste según el objetivo (Déficit / Superávit)
    let targetKcal = tdee
    let diff = 0

    if (formData.goal === 'definicion') {
      diff = -tdee * 0.2 // 20% de déficit
      targetKcal += diff
    } else if (formData.goal === 'volumen') {
      diff = tdee * 0.1 // 10% de superávit
      targetKcal += diff
    }

    // CÁLCULO DE MACROS BASADO EN EXPERIENCIA Y CIENCIA
    // Proteína: Multiplicador según el selector de "Experiencia"
    const proteinMultiplier = parseFloat(formData.experience)
    const pGrams = weight * proteinMultiplier

    // Grasas: Fijas en 0.8g por kg para salud hormonal
    const fGrams = weight * 0.8

    // Carbohidratos: Rellenan las calorías restantes
    const cGrams = Math.max(0, (targetKcal - (pGrams * 4) - (fGrams * 9)) / 4)

    setTarget({
      kcal: Math.round(targetKcal),
      bmr: Math.round(bmr),
      tdee: Math.round(tdee),
      diff: Math.round(diff),
      p: Math.round(pGrams),
      f: Math.round(fGrams),
      c: Math.round(cGrams),
      pPct: Math.round(((pGrams * 4) / targetKcal) * 100) || 0,
      fPct: Math.round(((fGrams * 9) / targetKcal) * 100) || 0,
      cPct: Math.round(((cGrams * 4) / targetKcal) * 100) || 0,
      weight: weight,
      activity: activityMultiplier
    })

    // Resetea los items de la dieta si se recalcula
    setMealItems(emptyMealItems())
  }

  // Lógica del Creador de Dietas (Paso 2)
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
    <div className="bg-surface-soft min-h-screen">

      {/* 0. HERO (Imagen inmersiva con degradados, mismo lenguaje que el resto de la web) */}
      <section className="relative w-full pt-16 pb-0 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28 flex flex-col sm:justify-center">

        {/* BLOQUE DE IMAGEN
            Móvil: bloque normal de altura fija justo debajo del membrete navy, se ve entera.
            Desktop (sm+): absolute inset-0 a pantalla completa. */}
        <div className="relative h-[38vh] min-h-[240px] w-full sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
          <img
            src="/brand/macros-calc.jpg"
            alt="Calculadora de macros Lógica Fit"
            className="h-full w-full object-cover object-[center_30%] opacity-100 sm:opacity-90 animate-fade-in"
          />

          {/* Degradado inferior móvil: funde la foto con el bloque navy de texto de debajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent sm:hidden" />

          {/* Degradados desktop */}
          <div className="hidden sm:block absolute inset-0 bg-navy/60" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent w-full md:w-3/4" />
          <div className="hidden sm:block absolute inset-x-0 bottom-0 h-32 lg:h-40 bg-gradient-to-t from-surface-soft to-transparent" />
        </div>

        {/* BLOQUE DE TEXTO
            Móvil: flujo normal debajo de la imagen, fondo navy sólido, sin superposición.
            Desktop (sm+): overlay clásico sobre la foto. */}
        <div className="relative z-10 w-full bg-navy px-6 py-10 sm:bg-transparent sm:py-0 lg:px-8">
          <div className="mx-auto max-w-7xl w-full">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange animate-fade-in-up">
                Calculadora gratuita
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up delay-100 leading-[1.05]">
                Calcula tus macros diarios
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-300 font-medium animate-fade-in-up delay-200 leading-relaxed max-w-lg">
                Rellena todos los campos para calcular tus calorías y macros al instante. Basado en la fórmula Mifflin-St Jeor.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 1. CALCULADORA */}
      <div className="px-6 lg:px-8 pt-12 sm:pt-16 pb-16">
        <div className="mx-auto max-w-[1000px] bg-white rounded-[2rem] shadow-2xl shadow-slate-200/50 overflow-hidden animate-fade-in-up">

          {/* Borde superior decorativo */}
          <div className="h-1.5 w-full bg-gradient-to-r from-orange to-navy" />

          {/* --- MITAD SUPERIOR BLANCA (FORMULARIO) --- */}
          <div className="p-8 sm:p-12 lg:p-14">

            <div className="flex items-center gap-2 mb-4">
              <span className="h-2 w-2 rounded-full bg-orange"></span>
              <span className="text-[11px] font-extrabold uppercase tracking-widest text-orange">
                Gratis - Basado en evidencia
              </span>
            </div>

            <h2 className="font-display text-2xl font-bold text-navy tracking-tight sm:text-3xl">
              Tus datos
            </h2>

            <p className="mt-3 text-sm text-text-secondary font-medium max-w-2xl leading-relaxed">
              Rellena todos los campos para calcular tus calorías y macros al instante.
            </p>

            <form onSubmit={calculateMacros}>
              {/* Grid de Formulario */}
              <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-x-8 gap-y-8">

                {/* Sexo */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Sexo</label>
                  <div className="relative">
                    <select
                      name="sex"
                      value={formData.sex}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange"
                    >
                      <option value="masculino">Masculino</option>
                      <option value="femenino">Femenino</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Se usa en la ecuación Mifflin-St Jeor.</p>
                </div>

                {/* Edad */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Edad (años)</label>
                  <input
                    type="number"
                    name="age"
                    placeholder="Ej: 30"
                    value={formData.age}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange placeholder:font-normal placeholder:text-slate-400"
                  />
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Los adultos de 65+ tienen un mínimo de 1,6 g/kg de proteínas (PROT-AGE).</p>
                </div>

                {/* Altura */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Altura</label>
                  <div className="relative">
                    <input
                      type="number"
                      name="height"
                      placeholder="Ej: 175"
                      value={formData.height}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange placeholder:font-normal placeholder:text-slate-400"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary text-sm font-bold">
                      cm
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Determina el BMR con Mifflin-St Jeor.</p>
                </div>

                {/* Peso Corporal */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Peso corporal</label>
                  <div className="relative">
                    <input
                      type="number"
                      step="any"
                      name="weight"
                      placeholder="Ej: 75"
                      value={formData.weight}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange placeholder:font-normal placeholder:text-slate-400"
                    />
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-text-secondary text-sm font-bold">
                      kg
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Usa una medición reciente.</p>
                </div>

                {/* Nivel de actividad */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Nivel de actividad</label>
                  <div className="relative">
                    <select
                      name="activity"
                      value={formData.activity}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange"
                    >
                      <option value="1.2">Sedentario (Oficina)</option>
                      <option value="1.375">Ligero (1-2 sesiones)</option>
                      <option value="1.55">Moderado (3-5 sesiones)</option>
                      <option value="1.725">Activo (6-7 sesiones)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Multiplicador sobre el BMR.</p>
                </div>

                {/* Objetivo */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Objetivo</label>
                  <div className="relative">
                    <select
                      name="goal"
                      value={formData.goal}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange"
                    >
                      <option value="definicion">Definición</option>
                      <option value="mantenimiento">Mantenimiento</option>
                      <option value="volumen">Volumen</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Definición aplica déficit. Volumen añade superávit.</p>
                </div>

                {/* Experiencia de entrenamiento (Afecta Proteínas) */}
                <div>
                  <label className="block text-sm font-bold text-navy mb-2">Experiencia de entrenamiento</label>
                  <div className="relative">
                    <select
                      name="experience"
                      value={formData.experience}
                      onChange={handleInputChange}
                      className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-3.5 text-sm font-bold text-navy outline-none transition-colors focus:border-orange focus:ring-1 focus:ring-orange"
                    >
                      <option value="1.6">Principiante (0-1 años)</option>
                      <option value="1.8">Intermedio (1-3 años)</option>
                      <option value="2.0">Avanzado (+3 años)</option>
                    </select>
                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-navy">
                      <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" /></svg>
                    </div>
                  </div>
                  <p className="mt-2 text-[11px] font-medium text-text-secondary leading-snug">Escala el objetivo de proteínas dentro del rango de la literatura.</p>
                </div>
              </div>

              {/* BOTÓN CALCULAR */}
              <div className="mt-10 border-t border-slate-100 pt-8 flex justify-end">
                <button
                  type="submit"
                  className="w-full sm:w-auto rounded-full bg-navy px-10 py-4 text-sm font-bold text-white shadow-lg shadow-navy/20 transition-all hover:bg-orange hover:shadow-orange/20 hover:-translate-y-1"
                >
                  Calcular mis macros
                </button>
              </div>
            </form>
          </div>

          {/* --- MITAD INFERIOR OSCURA (RESULTADOS) --- */}
          {target && (
            <div className="bg-[#1e293b] p-8 sm:p-12 lg:p-14 animate-fade-in">

              <p className="text-[11px] font-extrabold uppercase tracking-[0.2em] text-slate-300 mb-2">
                Tu objetivo calórico diario
              </p>

              <div className="flex items-baseline gap-2">
                <span className="font-display text-6xl lg:text-[5rem] font-extrabold text-white tracking-tight">
                  {target.kcal.toLocaleString('en-US')}
                </span>
                <span className="text-xl font-bold text-slate-400">kcal / día</span>
              </div>

              <div className="mt-6 inline-flex items-center gap-2 rounded-full bg-slate-800/80 border border-slate-700/50 px-4 py-2 text-sm font-bold text-white shadow-inner">
                <span className="h-2 w-2 rounded-full bg-orange"></span>
                Mantenimiento: {target.tdee.toLocaleString('en-US')} kcal - BMR: {target.bmr.toLocaleString('en-US')} kcal
              </div>

              {/* Tarjetas de Macros */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-4">
                <div className="rounded-xl bg-slate-700/40 p-5 border border-slate-600/30">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Proteínas</p>
                  <p className="font-display text-3xl font-extrabold text-white">{target.p} g</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">{(target.p / target.weight).toFixed(1)} g/kg - {target.pPct}%</p>
                </div>
                <div className="rounded-xl bg-slate-700/40 p-5 border border-slate-600/30">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Grasas</p>
                  <p className="font-display text-3xl font-extrabold text-white">{target.f} g</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">{(target.f / target.weight).toFixed(1)} g/kg - {target.fPct}%</p>
                </div>
                <div className="rounded-xl bg-slate-700/40 p-5 border border-slate-600/30">
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-2">Carbohidratos</p>
                  <p className="font-display text-3xl font-extrabold text-white">{target.c} g</p>
                  <p className="mt-1 text-[11px] font-bold text-slate-400">{(target.c / target.weight).toFixed(1)} g/kg - {target.cPct}%</p>
                </div>
              </div>

              {/* Resumen Adicional */}
              <div className="mt-10 grid grid-cols-1 sm:grid-cols-3 gap-8 border-t border-slate-700/60 pt-8">
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Por comida x 4</p>
                  <p className="text-base font-extrabold text-white">
                    P {Math.round(target.p / 4)}g, G {Math.round(target.f / 4)}g, C {Math.round(target.c / 4)}g
                  </p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Multiplicador de actividad</p>
                  <p className="text-base font-extrabold text-white">× {target.activity}</p>
                </div>
                <div>
                  <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">Objetivo VS Mantenimiento</p>
                  <p className="text-base font-extrabold text-white">
                    {target.diff > 0 ? '+' : ''}{target.diff} kcal
                  </p>
                </div>
              </div>

              {/* Info Box Referencias Científicas */}
              <div className="mt-10 rounded-r-xl border-l-4 border-orange bg-slate-800/60 p-5">
                <p className="text-xs text-slate-400 font-medium leading-relaxed">
                  Calorías de mantenimiento. Calorías de Mifflin-St Jeor (Mifflin et al. 1990). Intermedia: 1,8 g/kg, rango medio del plateau Morton 2018 (1,62 g/kg) y el rango activo adulto de la ISSN. Grasas en 0,8 g/kg para la salud hormonal (Helms et al. 2014); el mínimo de la ISSN es 0,6 g/kg (Aragon et al. 2017). Los carbohidratos completan las calorías restantes.
                </p>
              </div>

            </div>
          )}
        </div>

        {/* 2. CREADOR DE DIETAS (PASO 2) */}
        {target && (
          <div className="mx-auto mt-24 max-w-4xl animate-fade-in-up delay-200">

            <div className="text-center mb-12">
              <span className="inline-block rounded-full bg-navy px-4 py-1.5 text-[11px] font-bold uppercase tracking-widest text-white mb-4 shadow-md">
                Paso 2
              </span>
              <h2 className="font-display text-3xl font-extrabold text-navy sm:text-4xl tracking-tight">
                Diseña tu menú gratis
              </h2>
              <p className="mt-4 text-base text-text-secondary font-medium max-w-xl mx-auto">
                Busca alimentos en nuestra base de datos y añádelos a cada comida para cuadrar los macros que acabas de calcular.
              </p>
            </div>

            <div className="space-y-6">
              {MEALS.map((meal) => (
                <div key={meal.id} className="rounded-[2rem] bg-white p-6 sm:p-8 shadow-sm ring-1 ring-slate-100 transition-shadow hover:shadow-md">
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

            <div className="mt-8 rounded-[2rem] bg-navy p-6 sm:p-8 shadow-xl">
              <DailyTotals target={target} mealItems={mealItems} />
            </div>

            <div className="sticky bottom-6 mt-12 flex flex-col items-center z-40">
              <button
                type="button"
                onClick={handleDownload}
                disabled={totalItemsAdded === 0 || generating}
                className="group inline-flex items-center gap-3 rounded-full bg-orange px-10 py-5 text-base font-bold text-white shadow-2xl shadow-orange/30 transition-all hover:bg-orange-dark hover:scale-105 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-orange disabled:hover:scale-100"
              >
                {generating ? (
                  'Generando tu PDF...'
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
                <p className="mt-4 text-center text-xs font-bold text-navy bg-white/90 backdrop-blur px-5 py-2.5 rounded-full ring-1 ring-slate-200 shadow-sm">
                  Añade al menos un alimento para poder generar tu PDF.
                </p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}