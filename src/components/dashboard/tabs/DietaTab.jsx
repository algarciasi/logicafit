import { useEffect, useState } from 'react'
import { listClientDiet } from '../../../lib/diets'
import { MEALS } from '../../../lib/macros'
import EmptyState from '../EmptyState'

// Mapeo de días
const DAYS_MAP = { 1: 'Lun', 2: 'Mar', 3: 'Mié', 4: 'Jue', 5: 'Vie', 6: 'Sáb', 7: 'Dom' }
const FULL_DAYS_MAP = { 1: 'Lunes', 2: 'Martes', 3: 'Miércoles', 4: 'Jueves', 5: 'Viernes', 6: 'Sábado', 7: 'Domingo' }

// Detectar el día actual (1: Lunes, 7: Domingo)
const getTodayAppDay = () => {
  const d = new Date().getDay()
  return d === 0 ? 7 : d
}

// Extrae el macro del objeto food
const getMacroVal = (food, keys) => {
  for (let k of keys) {
    if (food[k] !== undefined && food[k] !== null) return Number(food[k])
  }
  return 0
}

// Lógica de cálculo: Calcula la media de kcal basándose SOLO en lo que toca HOY
const calcTodayMealAverage = (todayItems, macroKeys) => {
  if (todayItems.length === 0) return 0
  
  const optionsMap = {}
  let baseTotal = 0

  todayItems.forEach(e => {
    // Si no tiene opción, es la Opción 1 por defecto
    const opt = Number(e.opcion || 1)
    if (!optionsMap[opt]) optionsMap[opt] = 0
    
    if (e.foods) {
      const val = (getMacroVal(e.foods, macroKeys) * (Number(e.cantidad_g) || 0)) / 100
      optionsMap[opt] += val

      // Si es "Todos los días" (sin día) y está en la Opción 1, lo consideramos BASE para todas las opciones
      if (!e.dia_semana && opt === 1) {
        baseTotal += val
      }
    }
  })

  const optionsKeys = Object.keys(optionsMap)
  if (optionsKeys.length === 0) return 0

  let totalSum = 0
  optionsKeys.forEach(optKey => {
    let optVal = optionsMap[optKey]
    // Si es Opción 2, 3, etc... le sumamos la leche/pan que es "Todos los días" de la base
    if (Number(optKey) !== 1) {
      optVal += baseTotal
    }
    totalSum += optVal
  })

  // Retorna la media entre las opciones que hay HOY
  return totalSum / optionsKeys.length
}


export default function DietaTab({ client }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  
  const [openMeals, setOpenMeals] = useState(() => {
    const initialState = {}
    MEALS.forEach(m => initialState[m.id] = true)
    return initialState
  })

  // Día de hoy
  const today = getTodayAppDay()
  const todayName = FULL_DAYS_MAP[today]

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    listClientDiet(client.id).then(({ entries, error }) => {
      setEntries(entries || [])
      setError(error)
      setLoading(false)
    })
  }, [client?.id])

  const toggleMeal = (mealId) => {
    setOpenMeals(prev => ({ ...prev, [mealId]: !prev[mealId] }))
  }

  if (!client) {
    return <EmptyState icon="🔍" title="Ficha no encontrada" body="Escríbeme para revisarlo." />
  }

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-6 p-2">
        <div className="h-48 w-full rounded-[2rem] bg-white border border-slate-100 shadow-sm"></div>
        <div className="h-24 w-full rounded-[1.5rem] bg-white border border-slate-100 shadow-sm"></div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-2xl border border-red-100 bg-red-50 p-4 shadow-sm">
        <p className="text-sm font-bold text-red-600">Error al cargar tu dieta</p>
        <p className="mt-1 text-xs text-red-500">{error.message}</p>
      </div>
    )
  }

  // --- FILTRO PRINCIPAL: Solo nos quedamos con lo de HOY y lo de "Todos los días" ---
  const entriesForToday = entries.filter(e => !e.dia_semana || Number(e.dia_semana) === today)

  if (entriesForToday.length === 0) {
    return (
      <div className="pb-24">
        <EmptyState
          icon="🍽️"
          title="Día libre"
          body={`No tienes alimentos asignados para hoy (${todayName}).`}
        />
      </div>
    )
  }

  // --- CÁLCULOS GLOBALES PARA HOY ---
  let totalKcal = 0, totalP = 0, totalC = 0, totalF = 0

  const entriesByMeal = MEALS.map((meal) => {
    // Usamos entriesForToday en vez de entries
    const items = entriesForToday.filter((e) => e.momento_dia === meal.id)
    
    const mealKcal = Math.round(calcTodayMealAverage(items, ['calorias', 'kcal']))
    const mealP = calcTodayMealAverage(items, ['proteinas', 'p'])
    const mealC = calcTodayMealAverage(items, ['carbos', 'carbohidratos', 'c'])
    const mealF = calcTodayMealAverage(items, ['grasas', 'f'])
    
    totalKcal += mealKcal
    totalP += mealP
    totalC += mealC
    totalF += mealF

    return { meal, items, mealKcal }
  }).filter(m => m.items.length > 0)

  totalP = Math.round(totalP)
  totalC = Math.round(totalC)
  totalF = Math.round(totalF)

  const totalMacros = totalP + totalC + totalF || 1 
  const pctP = Math.round((totalP / totalMacros) * 100)
  const pctC = Math.round((totalC / totalMacros) * 100)
  const pctF = Math.round((totalF / totalMacros) * 100)

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fade-in">
      
      <div>
        <p className="text-sm font-bold tracking-widest text-orange uppercase">
          Tu plan activo
        </p>
        <div className="flex items-center justify-between">
          <h2 className="font-display text-3xl font-extrabold text-navy mt-1">
            Nutrición
          </h2>
          <div className="rounded-xl bg-orange/10 px-3 py-1.5 border border-orange/20 mt-1">
            <span className="text-[10px] font-extrabold text-orange uppercase tracking-wider">Hoy ({todayName})</span>
          </div>
        </div>
      </div>

      <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 mb-2">
        <div className="flex flex-col sm:flex-row items-center gap-8">
          
          <div className="relative flex h-36 w-36 shrink-0 items-center justify-center">
            <svg className="absolute inset-0 h-full w-full -rotate-90 transform" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" fill="none" stroke="#f1f5f9" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="42" 
                fill="none" stroke="#EA580C" strokeWidth="8" strokeLinecap="round"
                strokeDasharray={`${2 * Math.PI * 42}`}
                strokeDashoffset={0} 
                className="drop-shadow-md transition-all duration-1000 ease-out"
              />
            </svg>
            <div className="flex flex-col items-center justify-center text-center">
              <span className="font-display text-3xl font-extrabold text-navy leading-none">{totalKcal}</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 mt-1">Kcal de hoy</span>
            </div>
          </div>

          <div className="flex w-full flex-1 flex-col gap-4">
            <div>
              <div className="mb-1.5 flex justify-between text-xs font-bold">
                <span className="text-navy">Proteínas</span>
                <span className="text-slate-500">{totalP}g <span className="text-slate-300 font-medium">({pctP}%)</span></span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-navy transition-all duration-1000 ease-out" style={{ width: `${pctP}%` }}></div>
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between text-xs font-bold">
                <span className="text-navy">Carbohidratos</span>
                <span className="text-slate-500">{totalC}g <span className="text-slate-300 font-medium">({pctC}%)</span></span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-[#3B82F6] transition-all duration-1000 ease-out" style={{ width: `${pctC}%` }}></div>
              </div>
            </div>

            <div>
              <div className="mb-1.5 flex justify-between text-xs font-bold">
                <span className="text-navy">Grasas</span>
                <span className="text-slate-500">{totalF}g <span className="text-slate-300 font-medium">({pctF}%)</span></span>
              </div>
              <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100">
                <div className="h-full rounded-full bg-orange transition-all duration-1000 ease-out" style={{ width: `${pctF}%` }}></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5">
        {entriesByMeal.map(({ meal, items, mealKcal }) => {
          const isOpen = openMeals[meal.id]

          return (
            <div key={meal.id} className="overflow-hidden rounded-[1.5rem] bg-white shadow-sm ring-1 ring-slate-100 transition-all">
              
              <button 
                onClick={() => toggleMeal(meal.id)}
                className="flex w-full items-center justify-between p-5 transition-colors hover:bg-slate-50 active:bg-slate-100"
              >
                <div className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-2xl bg-navy/5 text-xl">
                    {meal.icon}
                  </span>
                  <div className="text-left">
                    <h3 className="font-display text-lg font-bold text-navy capitalize leading-tight">
                      {meal.label}
                    </h3>
                    <p className="text-[11px] font-semibold text-slate-400 mt-0.5 tracking-wide">
                      {mealKcal} kcal · {items.length} {items.length === 1 ? 'alimento' : 'alimentos'}
                    </p>
                  </div>
                </div>
                
                <div className={`flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}>
                  <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>

              {isOpen && (
                <div className="border-t border-slate-50 px-5 pb-5 pt-3 animate-fade-in">
                  <ul className="flex flex-col gap-4">
                    {items.map((it) => {
                      const foodKcal = Math.round(((Number(it.foods?.calorias || it.foods?.kcal) || 0) * (Number(it.cantidad_g) || 0)) / 100)
                      const isOption = it.opcion && it.opcion > 1
                      const dayLabel = it.dia_semana ? DAYS_MAP[it.dia_semana] : 'Todos los días'
                      
                      return (
                        <li key={it.id} className="flex items-center justify-between gap-4">
                          <div className="min-w-0 flex-1">
                            <p className="truncate text-sm font-bold text-navy">
                              {it.foods?.nombre}
                            </p>
                            <p className="truncate text-[11px] font-bold text-slate-400 mt-0.5">
                              {it.cantidad_g}g · {dayLabel} 
                              {isOption && (
                                <span className="text-orange">
                                  {' '}· Opción {it.opcion}
                                </span>
                              )}
                            </p>
                          </div>
                          
                          <div className="shrink-0 text-right">
                            <span className="text-xs font-extrabold text-navy">{foodKcal} kcal</span>
                          </div>
                        </li>
                      )
                    })}
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