import { useEffect, useState } from 'react'
import { listAllFoods } from '../../lib/foods'
import { DIAS_SEMANA } from '../../lib/routines'

// Cache simple en memoria: los alimentos son los mismos para las 5 comidas,
// así no repetimos la consulta a Supabase por cada bloque.
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
    setOpcion(1)
  }

  if (loading) {
    return <p className="mt-2 text-[11px] text-text-secondary">Cargando alimentos…</p>
  }

  const canAdd = selectedId && (todosLosDias || selectedDays.length > 0)

  return (
    <div className="mt-3 rounded-xl bg-surface-soft p-3">
      <div className="flex flex-wrap items-center gap-2">
        <select
          value={selectedId}
          onChange={(e) => setSelectedId(e.target.value)}
          className="min-w-[10rem] flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
        >
          <option value="">Selecciona un alimento…</option>
          {foods.map((f) => (
            <option key={f.id} value={f.id}>
              {f.nombre}
            </option>
          ))}
        </select>

        <input
          type="number"
          min="1"
          value={gramos}
          onChange={(e) => setGramos(e.target.value)}
          className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
        />
        <span className="text-[11px] text-text-secondary">g</span>

        <select
          value={opcion}
          onChange={(e) => setOpcion(e.target.value)}
          title="Opción alternativa (para dar varias alternativas de comida)"
          className="rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-navy"
        >
          {[1, 2, 3, 4, 5].map((n) => (
            <option key={n} value={n}>
              Opción {n}
            </option>
          ))}
        </select>
      </div>

      <div className="mt-2 flex flex-wrap items-center gap-3">
        <label className="flex items-center gap-1.5 text-[11px] font-medium text-navy-light">
          <input
            type="checkbox"
            checked={todosLosDias}
            onChange={(e) => setTodosLosDias(e.target.checked)}
          />
          Todos los días
        </label>

        {!todosLosDias && (
          <div className="flex flex-wrap gap-2">
            {DIAS_SEMANA.map((d) => (
              <label
                key={d.value}
                className="flex items-center gap-1 text-[11px] text-navy-light"
              >
                <input
                  type="checkbox"
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
        className="mt-2 rounded-full bg-orange px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-orange-dark disabled:opacity-50"
      >
        {saving ? 'Añadiendo…' : '+ Añadir'}
      </button>
    </div>
  )
}