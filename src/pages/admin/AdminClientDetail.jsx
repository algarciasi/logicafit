import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { getClientById } from '../../lib/clients'
import { listClientDiet, addDietEntry, deleteDietEntry } from '../../lib/diets'
import { listWeightHistory } from '../../lib/notes'
import { listClientRoutine } from '../../lib/routines'
import { listRoutineHistory, listDietHistory } from '../../lib/history'
import WeightChart from '../../components/dashboard/WeightChart'
import FoodSearch from '../../components/calculator/FoodSearch'
import AdminRoutineEditor from '../../components/admin/AdminRoutineEditor'
import ClientPlanEditor from '../../components/admin/ClientPlanEditor'
import RoutineHistoryPanel from '../../components/admin/RoutineHistoryPanel'
import DietHistoryPanel from '../../components/admin/DietHistoryPanel'
import { MEALS } from '../../lib/macros'

const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'

export default function AdminClientDetail() {
  const { id } = useParams()
  const [client, setClient] = useState(null)
  const [dietEntries, setDietEntries] = useState([])
  const [weightHistory, setWeightHistory] = useState([])
  const [routineEntries, setRoutineEntries] = useState([])
  const [routineHistory, setRoutineHistory] = useState([])
  const [dietHistory, setDietHistory] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const [selectedFood, setSelectedFood] = useState(null)
  const [momentoDia, setMomentoDia] = useState(MEALS[0].id)
  const [cantidadG, setCantidadG] = useState(100)
  const [saving, setSaving] = useState(false)

  const loadAll = async () => {
    setLoading(true)
    const [
      { client, error: clientError },
      { entries },
      { entries: weights },
      { entries: routine },
      { entries: routineHist },
      { entries: dietHist },
    ] = await Promise.all([
      getClientById(id),
      listClientDiet(id),
      listWeightHistory(id),
      listClientRoutine(id),
      listRoutineHistory(id),
      listDietHistory(id),
    ])
    setClient(client)
    setError(clientError)
    setDietEntries(entries)
    setWeightHistory(weights)
    setRoutineEntries(routine)
    setRoutineHistory(routineHist)
    setDietHistory(dietHist)
    setLoading(false)
  }

  useEffect(() => {
    loadAll()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id])

  const handleAddDiet = async () => {
    if (!selectedFood) return
    setSaving(true)
    const { error } = await addDietEntry({
      clientId: id,
      foodId: selectedFood.id,
      momentoDia,
      cantidadG: Number(cantidadG),
    })
    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    setSelectedFood(null)
    setCantidadG(100)
    loadAll()
  }

  const handleDelete = async (entryId) => {
    const { error } = await deleteDietEntry(entryId)
    if (error) {
      alert('Error al borrar: ' + error.message)
      return
    }
    loadAll()
  }

  if (loading) {
    return <p className="mx-auto max-w-3xl px-6 py-12 text-sm text-text-secondary">Cargando…</p>
  }

  if (error || !client) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-12">
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          No se pudo cargar este cliente{error ? `: ${error.message}` : ''}.
        </p>
      </div>
    )
  }

  const entriesByMeal = MEALS.map((meal) => ({
    meal,
    items: dietEntries.filter((e) => e.momento_dia === meal.id),
  }))

  return (
    <div className="mx-auto max-w-3xl px-6 py-12">
      <Link to="/admin/clientes" className="text-xs font-semibold text-text-secondary hover:text-navy">
        ← Volver a clientes
      </Link>

      <h1 className="mt-2 font-display text-2xl font-extrabold text-navy">
        {client.full_name || client.email}
      </h1>
      <p className="text-sm text-text-secondary">
        {client.email} {client.telefono ? `· ${client.telefono}` : ''}
      </p>
      {client.objetivo_entrenamiento && (
        <p className="mt-1 text-sm text-text-secondary">
          Objetivo: {client.objetivo_entrenamiento}
        </p>
      )}

      <div className="mt-8">
        <WeightChart points={weightHistory} />
      </div>

      <div className="mt-8">
        <ClientPlanEditor client={client} onSaved={loadAll} />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-bold text-navy">Asignar dieta</h2>
        <div className="mt-4 rounded-2xl border border-slate-100 bg-white p-5">
          <FoodSearch onAdd={setSelectedFood} />

          {selectedFood && (
            <div className="mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-surface-soft p-3">
              <span className="text-sm font-semibold text-navy">{selectedFood.nombre}</span>

              <select
                value={momentoDia}
                onChange={(e) => setMomentoDia(e.target.value)}
                className={`${FIELD} w-auto`}
              >
                {MEALS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.label}
                  </option>
                ))}
              </select>

              <input
                type="number"
                min="1"
                value={cantidadG}
                onChange={(e) => setCantidadG(e.target.value)}
                className={`${FIELD} w-24`}
              />
              <span className="text-xs text-text-secondary">g</span>

              <button
                type="button"
                onClick={handleAddDiet}
                disabled={saving}
                className="ml-auto rounded-full bg-orange px-4 py-2 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
              >
                {saving ? 'Guardando…' : 'Añadir'}
              </button>
            </div>
          )}
        </div>

        <div className="mt-6 space-y-4">
          {entriesByMeal.map(({ meal, items }) => (
            <div key={meal.id} className="rounded-2xl border border-slate-100 p-4">
              <p className="font-display text-sm font-bold text-navy">
                {meal.icon} {meal.label}
              </p>
              {items.length === 0 ? (
                <p className="mt-2 text-xs text-text-secondary">Sin alimentos asignados.</p>
              ) : (
                <ul className="mt-2 space-y-1.5">
                  {items.map((it) => (
                    <li
                      key={it.id}
                      className="flex items-center justify-between rounded-lg bg-surface-soft px-3 py-1.5 text-xs"
                    >
                      <span className="text-navy-light">
                        {it.foods?.nombre} — {it.cantidad_g}g
                      </span>
                      <button
                        type="button"
                        onClick={() => handleDelete(it.id)}
                        className="text-text-secondary hover:text-red-500"
                      >
                        ✕
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </div>

        <DietHistoryPanel
          clientId={id}
          dietEntries={dietEntries}
          history={dietHistory}
          onChange={loadAll}
        />
      </div>

      <div className="mt-10">
        <h2 className="font-display text-lg font-bold text-navy">Asignar rutina</h2>
        <div className="mt-4">
          <AdminRoutineEditor clientId={id} entries={routineEntries} onChange={loadAll} />
        </div>

        <RoutineHistoryPanel
          clientId={id}
          routineEntries={routineEntries}
          history={routineHistory}
          onChange={loadAll}
        />
      </div>
    </div>
  )
}