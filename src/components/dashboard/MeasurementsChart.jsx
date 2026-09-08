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

  const chartData = useMemo(() => {
    if (!dataEntries || dataEntries.length === 0 || !selectedMetric || selectedMetric === 'sin_datos') return []

    return [...dataEntries]
      // `notes` guarda la fecha en created_at; dejamos fecha/date por si otra
      // fuente de datos usa esos nombres.
      .map(e => ({
        date: e.fecha || e.date || e.created_at,
        value: parseFloat(e[selectedMetric]) || 0
      }))
      .filter(d => d.value > 0 && d.date)
      .sort((a, b) => new Date(a.date) - new Date(b.date))
  }, [dataEntries, selectedMetric])

  // El selector se pinta igual haya datos o no, para poder cambiar de métrica
  // aunque la actual esté vacía.
  const metricSelector = metrics.length > 0 && (
    <div className="relative">
      <select
        value={selectedMetric}
        onChange={(e) => setSelectedMetric(e.target.value)}
        className="appearance-none rounded-full bg-slate-50 border border-slate-200 pl-4 pr-8 py-1.5 text-[11px] font-extrabold text-navy outline-none focus:ring-1 cursor-pointer transition-colors hover:bg-slate-100 max-w-[140px] sm:max-w-[180px] truncate"
      >
        {metrics.map(m => (
          <option key={m.id} value={m.id}>{m.label}</option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center text-navy">
        <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
        </svg>
      </div>
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
        <div className="flex flex-col items-start gap-4">
          {metricSelector}
          <p className="text-sm text-slate-400">
            Todavía no hay registros de esta medida. Elige otra en el desplegable
            o añade un registro nuevo.
          </p>
        </div>
      </div>
    )
  }

  const currentVal = chartData[chartData.length - 1].value
  const firstVal = chartData[0].value
  const diff = (currentVal - firstVal).toFixed(1)
  const isPositive = diff > 0

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

          {chartData.length > 1 && (
            <div className={`rounded-full px-3 py-1 text-[11px] font-extrabold tracking-wider border ${isPositive ? 'bg-red-50 text-red-600 border-red-100' : 'bg-green-50 text-green-600 border-green-100'}`}>
              {diff > 0 ? '+' : ''}{diff} {unit}
            </div>
          )}
        </div>
      </div>

      {chartData.length === 1 ? (
        <p className="rounded-2xl bg-slate-50 px-4 py-6 text-center text-sm font-medium text-slate-400">
          Con un solo registro no hay tendencia todavía. Añade otro y verás tu evolución aquí.
        </p>
      ) : (
        <div className="h-48 w-full mt-2 -ml-3 sm:ml-0">
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