import { useState, useMemo } from 'react'
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'

const formatShortDate = (dateString) => {
  if (!dateString) return ''
  const date = new Date(dateString)
  return date.toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })
}

const CustomTooltip = ({ active, payload, label, unit }) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-2xl bg-navy p-3 shadow-xl ring-1 ring-white/10 transition-all">
        <p className="mb-1 text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
          {formatShortDate(label)}
        </p>
        <p className="font-display text-xl font-extrabold text-white">
          {payload[0].value} <span className="text-sm font-bold text-slate-400">{unit}</span>
        </p>
      </div>
    )
  }
  return null
}

export default function MeasurementsChart({ 
  dataEntries = [], 
  metrics = [], 
  title, 
  subtitle, 
  icon, 
  color = "#EA580C", 
  unit = "kg" 
}) {
  const [selectedMetric, setSelectedMetric] = useState(metrics[0]?.id || '')
  // Nuevo estado para controlar el menú desplegable custom
  const [isDropdownOpen, setIsDropdownOpen] = useState(false)

  const chartData = useMemo(() => {
    if (!dataEntries || dataEntries.length === 0 || !selectedMetric || selectedMetric === 'sin_datos') return []

    return [...dataEntries]
      .map(e => ({
        date: e.fecha || e.date || e.created_at,
        value: parseFloat(e[selectedMetric]) || 0
      }))
      .filter(d => d.value > 0 && d.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [dataEntries, selectedMetric])

  // Menú custom: SOLO se muestra si hay más de 1 métrica (oculta el del Peso Corporal)
  const selectedMetricLabel = metrics.find(m => m.id === selectedMetric)?.label
  
  const metricSelector = metrics.length > 1 && (
    <div className="relative">
      <button
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        className="flex items-center gap-2 appearance-none rounded-full bg-slate-50 border border-slate-200 pl-4 pr-3 py-1.5 text-[11px] font-extrabold text-navy outline-none cursor-pointer transition-colors hover:bg-slate-100"
      >
        <span className="truncate max-w-[100px] sm:max-w-[140px]">{selectedMetricLabel}</span>
        <svg className={`h-3 w-3 text-navy transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* El div flotante que hace de menú limpio estilo web */}
      {isDropdownOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)}></div>
          <div className="absolute right-0 top-full z-50 mt-2 w-40 rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
            {metrics.map((m) => (
              <button
                key={m.id}
                type="button"
                onClick={() => {
                  setSelectedMetric(m.id)
                  setIsDropdownOpen(false)
                }}
                className={`block w-full rounded-lg px-3 py-2 text-left text-[11px] font-extrabold transition-colors ${
                  selectedMetric === m.id
                    ? 'bg-orange/10 text-orange'
                    : 'text-navy hover:bg-slate-50'
                }`}
              >
                {m.label}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )

  const header = (
    <div className="mb-6 flex items-start justify-between gap-4">
      <div className="min-w-0">
        <h3 className="font-display text-xl font-extrabold text-navy">{title}</h3>
        <p className="text-[11px] font-semibold uppercase tracking-widest text-slate-400 mt-1">{subtitle}</p>
      </div>
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl transition-transform group-hover:scale-105" style={{ backgroundColor: `${color}15`, color: color }}>
        {icon}
      </div>
    </div>
  )

  if (chartData.length === 0) {
    return (
      <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 mb-6 group">
        {header}
        <div className="flex flex-col items-end gap-4 w-full">
          {metricSelector}
          <p className="text-sm text-slate-400 w-full text-left mt-2">
            Todavía no hay registros de esta medida. Elige otra en el desplegable
            o añade un registro nuevo.
          </p>
        </div>
      </div>
    )
  }

  // Cálculos para DOBLE BADGE (Último vs Total)
  const currentVal = chartData[chartData.length - 1].value
  const firstVal = chartData[0].value
  const prevVal = chartData.length > 1 ? chartData[chartData.length - 2].value : firstVal

  const diffTotal = (currentVal - firstVal).toFixed(1)
  const diffLast = (currentVal - prevVal).toFixed(1)

  const values = chartData.map(d => d.value)
  const minVal = Math.floor(Math.min(...values) - (unit === 'kg' ? 2 : 5))
  const maxVal = Math.ceil(Math.max(...values) + (unit === 'kg' ? 2 : 5))

  return (
    <div className="overflow-hidden rounded-[2rem] bg-white p-6 shadow-sm ring-1 ring-slate-100 transition-all hover:shadow-md mb-6 group">
      
      {header}

      <div className="mb-8 flex items-start justify-between">
        <div>
          <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400 mb-1">
            Valor actual
          </p>
          <div className="flex items-baseline gap-1.5">
            <span className="font-display text-4xl font-extrabold text-navy tracking-tight">
              {currentVal}
            </span>
            <span className="text-lg font-bold" style={{ color }}>{unit}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-3">
          {metricSelector}

          {/* DOBLE BADGE */}
          {chartData.length > 1 && (
            <div className="flex gap-2">
              <div className="flex flex-col items-end">
                <span className="mb-0.5 text-[8px] font-extrabold uppercase tracking-widest text-slate-400">Última</span>
                <div className={`rounded-lg px-2 py-1 text-[10px] font-extrabold tracking-wider border ${
                  diffLast > 0 ? 'bg-red-50 text-red-600 border-red-100' : 
                  diffLast < 0 ? 'bg-green-50 text-green-600 border-green-100' : 
                  'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  {diffLast > 0 ? '+' : ''}{diffLast} {unit}
                </div>
              </div>

              <div className="flex flex-col items-end">
                <span className="mb-0.5 text-[8px] font-extrabold uppercase tracking-widest text-slate-400">Total</span>
                <div className={`rounded-lg px-2 py-1 text-[10px] font-extrabold tracking-wider border ${
                  diffTotal > 0 ? 'bg-red-50 text-red-600 border-red-100' : 
                  diffTotal < 0 ? 'bg-green-50 text-green-600 border-green-100' : 
                  'bg-slate-50 text-slate-500 border-slate-200'
                }`}>
                  {diffTotal > 0 ? '+' : ''}{diffTotal} {unit}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {chartData.length === 1 ? (
        <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-400">
          Con un solo registro no hay tendencia todavía. Añade otro y verás tu evolución aquí.
        </p>
      ) : (
        <div className="h-48 w-full mt-2 -ml-3 sm:ml-0 relative z-0">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -25, bottom: 0 }}>
              <defs>
                <linearGradient id={`colorGradient-${selectedMetric}`} x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor={color} stopOpacity={0.4} />
                  <stop offset="95%" stopColor={color} stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="date" tickFormatter={formatShortDate} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dy={15} minTickGap={20} />
              <YAxis domain={[minVal, maxVal]} axisLine={false} tickLine={false} tick={{ fill: '#94a3b8', fontSize: 10, fontWeight: 700 }} dx={-10} />
              <Tooltip content={<CustomTooltip unit={unit} />} cursor={{ stroke: '#cbd5e1', strokeWidth: 1.5, strokeDasharray: '4 4' }} />
              <Area type="monotone" dataKey="value" stroke={color} strokeWidth={4} fillOpacity={1} fill={`url(#colorGradient-${selectedMetric})`} activeDot={{ r: 7, fill: '#0f172a', stroke: '#ffffff', strokeWidth: 3 }} />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      )}
    </div>
  )
}