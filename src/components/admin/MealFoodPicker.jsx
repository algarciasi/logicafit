import { useEffect, useState } from 'react'
import { listAllFoods } from '../../lib/foods'

// Cache simple en memoria: los alimentos son los mismos para las 5 comidas,
// así no repetimos la consulta a Supabase por cada bloque.
let cachedFoods = null

export default function MealFoodPicker({ mealId, onAdd }) {
  const [foods, setFoods] = useState(cachedFoods || [])
  const [loading, setLoading] = useState(!cachedFoods)
  const [selectedId, setSelectedId] = useState('')
  const [gramos, setGramos] = useState(100)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    if (cachedFoods) {
      setSelectedId(cachedFoods[0]?.id ?? '')
      return
    }
    listAllFoods().then(({ foods }) => {
      cachedFoods = foods
      setFoods(foods)
      setSelectedId(foods[0]?.id ?? '')
      setLoading(false)
    })
  }, [])

  const handleAdd = async () => {
    if (!selectedId) return
    const food = foods.find((f) => f.id === Number(selectedId))
    if (!food) return
    setSaving(true)
    await onAdd(mealId, food, Number(gramos))
    setSaving(false)
  }

  if (loading) {
    return <p className="mt-2 text-[11px] text-text-secondary">Cargando alimentos…</p>
  }

  return (
    <div className="mt-2 flex flex-wrap items-center gap-2">
      <select
        value={selectedId}
        onChange={(e) => setSelectedId(e.target.value)}
        className="min-w-[10rem] flex-1 rounded-lg border border-slate-200 px-2 py-1.5 text-xs text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
      >
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
      <button
        type="button"
        onClick={handleAdd}
        disabled={saving}
        className="rounded-full bg-orange px-3 py-1.5 text-[11px] font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
      >
        {saving ? '…' : '+ Añadir'}
      </button>
    </div>
  )
}