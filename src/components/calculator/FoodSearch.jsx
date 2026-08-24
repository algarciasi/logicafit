import { useEffect, useRef, useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function FoodSearch({ onAdd }) {
  const [query, setQuery] = useState('')
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false)
  const [errored, setErrored] = useState(false)
  const [open, setOpen] = useState(false)
  const boxRef = useRef(null)

  useEffect(() => {
    function handleClickOutside(e) {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([])
      return
    }
    setLoading(true)
    setErrored(false)
    const timeout = setTimeout(async () => {
      const { data, error } = await supabase
        .from('foods')
        .select('id, nombre, calorias, proteinas, carbos, grasas')
        .ilike('nombre', `%${query.trim()}%`)
        .order('nombre')
        .limit(8)

      if (error) {
        setErrored(true)
        setResults([])
      } else {
        setResults(data || [])
      }
      setLoading(false)
    }, 300)

    return () => clearTimeout(timeout)
  }, [query])

  const handleAdd = (food) => {
    onAdd(food)
    setQuery('')
    setResults([])
    setOpen(false)
  }

  return (
    <div ref={boxRef} className="relative">
      <input
        type="text"
        value={query}
        onChange={(e) => {
          setQuery(e.target.value)
          setOpen(true)
        }}
        onFocus={() => setOpen(true)}
        placeholder="Buscar alimento… (ej: pollo, avena, arroz)"
        className="w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange"
      />

      {open && query.trim().length >= 2 && (
        <div className="absolute z-20 mt-1.5 w-full overflow-hidden rounded-xl border border-slate-200 bg-white shadow-lg">
          {loading && (
            <p className="px-4 py-3 text-xs text-text-secondary">Buscando…</p>
          )}

          {!loading && errored && (
            <p className="px-4 py-3 text-xs text-red-500">
              No se pudo conectar con la base de datos de alimentos.
            </p>
          )}

          {!loading && !errored && results.length === 0 && (
            <p className="px-4 py-3 text-xs text-text-secondary">
              Sin resultados para "{query}".
            </p>
          )}

          {!loading &&
            results.map((food) => (
              <button
                key={food.id}
                type="button"
                onClick={() => handleAdd(food)}
                className="flex w-full items-center justify-between gap-3 px-4 py-2.5 text-left text-sm transition hover:bg-surface-soft"
              >
                <span className="text-navy">{food.nombre}</span>
                <span className="whitespace-nowrap text-[11px] text-text-secondary">
                  {food.calorias} kcal /100g
                </span>
              </button>
            ))}
        </div>
      )}
    </div>
  )
}