import { useEffect, useState } from 'react'
import { listClientDiet } from '../../../lib/diets'
import { MEALS } from '../../../lib/macros'
import EmptyState from '../EmptyState'

export default function DietaTab({ client }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    listClientDiet(client.id).then(({ entries, error }) => {
      setEntries(entries)
      setError(error)
      setLoading(false)
    })
  }, [client?.id])

  if (!client) {
    return (
      <EmptyState
        icon="🔍"
        title="No encontramos tu ficha de cliente"
        body="Escríbeme para revisarlo."
      />
    )
  }

  if (loading) {
    return <p className="text-sm text-text-secondary">Cargando…</p>
  }

  if (error) {
    return (
      <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
        Error al cargar tu dieta: {error.message}
      </p>
    )
  }

  if (entries.length === 0) {
    return (
      <EmptyState
        icon="🍽️"
        title="Todavía no tienes un plan de nutrición"
        body="Tu menú, macros y lista de la compra aparecerán aquí en cuanto lo prepare."
      />
    )
  }

  const totalKcal = entries.reduce((sum, e) => {
    const factor = e.cantidad_g / 100
    return sum + (e.foods?.calorias || 0) * factor
  }, 0)

  return (
    <div>
      <p className="font-display text-sm font-bold text-navy">
        Total del día: {Math.round(totalKcal)} kcal
      </p>

      <div className="mt-4 space-y-4">
        {MEALS.map((meal) => {
          const items = entries.filter((e) => e.momento_dia === meal.id)
          if (items.length === 0) return null
          return (
            <div key={meal.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-display text-sm font-bold text-navy">
                {meal.icon} {meal.label}
              </p>
              <ul className="mt-2 space-y-1.5">
                {items.map((it) => {
                  const factor = it.cantidad_g / 100
                  const kcal = Math.round((it.foods?.calorias || 0) * factor)
                  return (
                    <li key={it.id} className="flex justify-between text-xs text-navy-light">
                      <span>
                        {it.foods?.nombre} ({it.cantidad_g}g)
                      </span>
                      <span className="text-orange-dark">{kcal} kcal</span>
                    </li>
                  )
                })}
              </ul>
            </div>
          )
        })}
      </div>
    </div>
  )
}