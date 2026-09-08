import { useEffect, useState } from 'react'
import { listAllFoods } from '../../lib/foods'
import { DIAS_SEMANA } from '../../lib/routines'

// Cache simple en memoria
let cachedFoods = null

export default function MealFoodPicker({ mealId, onAdd }) {
  const [foods, setFoods] = useState(cachedFoods || [])
  const [loading, setLoading] = useState(!cachedFoods)
  const [selectedId, setSelectedId] = useState('')
  const [gramos, setGramos] = useState(100)
  const [opcion, setOpcion] = useState(1)
  const [todosLosDias, setTodosLosDias] = useState(true)
  const [selectedDays, setSelectedDays] = useState([])
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (cachedFoods) return
    listAllFoods().then(({ foods }) => {
      cachedFoods = foods
      setFoods(foods)
      setLoading(false)
    })
  }, [])

  const toggleDay = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value]
    )
  }

  const handleAdd = async () => {
    if (!selectedId) return
    const food = foods.find((f) => f.id === Number(selectedId))
    if (!food) return

    setSaving(true)

    if (todosLosDias) {
      await onAdd(mealId, food, Number(gramos), null, Number(opcion))
    } else {
      for (const dia of selectedDays) {
        // eslint-disable-next-line no-await-in-loop
        await onAdd(mealId, food, Number(gramos), dia, Number(opcion))
      }
    }

    setSaving(false)
    setSelectedId('')
    setGramos(100)
    // No reseteamos "opcion" para que sea más fácil añadir varios alimentos a la misma opción
  }

  if (loading) {
    return <p className="mt-4 text-xs font-medium text-slate-400">Cargando base de datos de alimentos…</p>
  }

  const canAdd = selectedId && (todosLosDias || selectedDays.length > 0)

  return (
    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
      <div className="flex flex-col sm:flex-row gap-3">
        
        {/* Buscador de Alimento */}
        <div className="flex-1 relative">
          <select
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
          >
            <option value="">Buscar alimento...</option>
            {foods.map((f) => (
              <option key={f.id} value={f.id}>{f.nombre}</option>
            ))}
          </select>
        </div>

        {/* Gramos y Opción */}
        <div className="flex gap-3">
          <div className="relative w-24 shrink-0">
            <input
              type="number"
              min="1"
              value={gramos}
              onChange={(e) => setGramos(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            />
            <span className="absolute right-3 top-2.5 text-sm font-bold text-slate-400 pointer-events-none">g</span>
          </div>

          <div className="relative w-32 shrink-0">
            <select
              value={opcion}
              onChange={(e) => setOpcion(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-orange outline-none focus:border-orange focus:ring-1 focus:ring-orange"
            >
              {[1, 2, 3, 4, 5].map((n) => (
                <option key={n} value={n}>Opción {n}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Días de la semana */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/60 pt-4">
        
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-navy cursor-pointer">
            <input
              type="checkbox"
              checked={todosLosDias}
              onChange={(e) => {
                setTodosLosDias(e.target.checked)
                if (e.target.checked) setSelectedDays([])
              }}
              className="h-4 w-4 rounded border-slate-300 text-orange focus:ring-orange"
            />
            Todos los días
          </label>

          {!todosLosDias && (
            <div className="flex flex-wrap gap-2 border-l border-slate-200 pl-3">
              {DIAS_SEMANA.map((d) => (
                <label
                  key={d.value}
                  className={`flex cursor-pointer items-center justify-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedDays.includes(d.value)
                      ? 'bg-navy text-white'
                      : 'bg-white text-slate-400 border border-slate-200 hover:border-navy hover:text-navy'
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedDays.includes(d.value)}
                    onChange={() => toggleDay(d.value)}
                  />
                  {d.label.slice(0, 3)}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleAdd}
          disabled={saving || !canAdd}
          className="shrink-0 rounded-xl bg-orange px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange/20 transition-all hover:bg-orange-dark hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? 'Añadiendo…' : '+ Añadir a dieta'}
        </button>
      </div>
    </div>
  )
}