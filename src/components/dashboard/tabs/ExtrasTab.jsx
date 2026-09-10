import { useEffect, useState } from 'react'
import { listClientDiet } from '../../../lib/diets'
import EmptyState from '../EmptyState'

// Configuración con las rutas a los logos en PNG (debes guardarlos en tu carpeta public/brand/)
const SUPERMARKET_STYLES = {
  'Mercadona': { bg: 'bg-[#00824B]', text: 'text-[#00824B]', badge: 'bg-[#00824B]/5', logo: '/brand/mercadona.png' },
  'Lidl': { bg: 'bg-[#0050AA]', text: 'text-[#0050AA]', badge: 'bg-[#0050AA]/5', logo: '/brand/lidl.png' },
  'Consum': { bg: 'bg-[#EA7A28]', text: 'text-[#EA7A28]', badge: 'bg-[#EA7A28]/5', logo: '/brand/consum.png' },
  'Carrefour': { bg: 'bg-[#00387B]', text: 'text-[#00387B]', badge: 'bg-[#00387B]/5', logo: '/brand/carrefour.png' },
  'Suplementación': { bg: 'bg-navy', text: 'text-navy', badge: 'bg-slate-50', logo: '/brand/suplementacion.png' },
  'General': { bg: 'bg-slate-500', text: 'text-slate-500', badge: 'bg-slate-50', icon: '📝' } // Fallback por si acaso
}

export default function ExtrasTab({ client }) {
  const [entries, setEntries] = useState([])
  const [loading, setLoading] = useState(true)
  const [checkedItems, setCheckedItems] = useState({})

  useEffect(() => {
    if (!client?.id) {
      setLoading(false)
      return
    }
    listClientDiet(client.id).then(({ entries }) => {
      setEntries(entries || [])
      setLoading(false)
    })
  }, [client?.id])

  const toggleCheck = (foodName) => {
    setCheckedItems(prev => ({ ...prev, [foodName]: !prev[foodName] }))
  }

  if (!client) {
    return (
      <EmptyState
        icon="🔍"
        title="Ficha no encontrada"
        body="Tu cuenta existe pero no está vinculada a ningún cliente todavía. Escríbeme y lo reviso."
      />
    )
  }

  if (loading) {
    return (
      <div className="flex animate-pulse flex-col gap-6 p-2">
        <div className="h-20 w-full rounded-[2rem] bg-white border border-slate-100 shadow-sm"></div>
        <div className="h-64 w-full rounded-[2rem] bg-white border border-slate-100 shadow-sm"></div>
      </div>
    )
  }

  if (entries.length === 0) {
    return (
      <div className="pb-24">
        <EmptyState
          icon="🛒"
          title="Sin lista de la compra"
          body="No hay ninguna dieta asignada todavía. En cuanto tenga tu plan, tu lista aparecerá aquí mágicamente."
        />
      </div>
    )
  }

  const shoppingMap = {}
  const mealGroups = {}
  
  entries.forEach(e => {
    if (!mealGroups[e.momento_dia]) mealGroups[e.momento_dia] = []
    mealGroups[e.momento_dia].push(e)
  })

  Object.values(mealGroups).forEach(items => {
    const specificItems = items.filter(e => e.opcion || e.dia_semana)
    const optionsCount = new Set(specificItems.map(e => Number(e.opcion || 1))).size || 1

    items.forEach(e => {
      if (!e.foods) return
      
      const isBase = !e.opcion && !e.dia_semana
      const divisor = isBase ? 1 : optionsCount
      const days = e.dia_semana ? 1 : 7
      
      const gramsPerWeek = (Number(e.cantidad_g || 0) * days) / divisor
      
      const superM = e.foods.supermercado || 'General' 
      const key = `${superM}-${e.foods.nombre}`

      if (!shoppingMap[key]) {
        shoppingMap[key] = {
          name: e.foods.nombre,
          super: superM,
          grams: 0,
          url: e.foods.url_compra
        }
      }
      shoppingMap[key].grams += gramsPerWeek
    })
  })

  const groupedBySupermarket = Object.values(shoppingMap).reduce((acc, item) => {
    if (!acc[item.super]) acc[item.super] = []
    acc[item.super].push(item)
    return acc
  }, {})

  Object.keys(groupedBySupermarket).forEach(key => {
    groupedBySupermarket[key].sort((a, b) => a.name.localeCompare(b.name))
  })

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fade-in">

      <div>
        <p className="text-sm font-bold tracking-widest text-orange uppercase">
          Material adicional
        </p>
        <h2 className="font-display text-3xl font-extrabold text-navy mt-1">
          Lista de la compra
        </h2>
        <p className="mt-2 text-sm font-medium text-slate-500 leading-relaxed">
          Resumen semanal calculado automáticamente en base a tu dieta asignada.
        </p>
      </div>

      <div className="flex flex-col gap-6">
        {Object.entries(groupedBySupermarket).map(([superName, items]) => {
          const style = SUPERMARKET_STYLES[superName] || SUPERMARKET_STYLES['General']
          
          return (
            <div key={superName} className="overflow-hidden rounded-[2rem] bg-white shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md">
              
              <div className="flex items-center justify-between border-b border-slate-50 p-6">
                <div className="flex items-center gap-3.5">
                  <div className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl p-2.5 ${style.badge}`}>
                    {style.logo ? (
                      <img src={style.logo} alt={`Logo ${superName}`} className="h-full w-full object-contain" />
                    ) : (
                      <span className="text-2xl">{style.icon}</span>
                    )}
                  </div>
                  <div>
                    <h3 className={`font-display text-xl font-extrabold ${style.text}`}>
                      {superName}
                    </h3>
                    <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-1">
                      {items.length} {items.length === 1 ? 'producto' : 'productos'}
                    </p>
                  </div>
                </div>
              </div>

              <div className="p-4 sm:p-6">
                <ul className="flex flex-col gap-2">
                  {items.map((item) => {
                    const isChecked = checkedItems[item.name]
                    
                    return (
                      <li key={item.name} className="group relative flex items-center justify-between rounded-2xl p-3 transition-colors hover:bg-slate-50">
                        
                        <div 
                          className="flex flex-1 items-center gap-4 cursor-pointer"
                          onClick={() => toggleCheck(item.name)}
                        >
                          <div className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-full border-2 transition-colors ${isChecked ? `${style.bg} border-transparent` : 'border-slate-300 bg-transparent'}`}>
                            {isChecked && (
                              <svg className="h-3.5 w-3.5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </div>
                          
                          <div>
                            <p className={`text-sm font-bold transition-all ${isChecked ? 'text-slate-400 line-through' : 'text-navy'}`}>
                              {item.name}
                            </p>
                            <p className="text-[11px] font-bold text-slate-400 mt-0.5">
                              {Math.round(item.grams)}g semanales
                            </p>
                          </div>
                        </div>

                        {item.url && (
                          <a 
                            href={item.url} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            className={`ml-4 flex h-8 w-8 shrink-0 items-center justify-center rounded-full transition-colors ${isChecked ? 'bg-slate-100 text-slate-300' : `${style.badge} ${style.text} hover:opacity-80`}`}
                            title={`Comprar en ${superName}`}
                          >
                            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" />
                            </svg>
                          </a>
                        )}
                      </li>
                    )
                  })}
                </ul>
              </div>
            </div>
          )
        })}
      </div>

    </div>
  )
}