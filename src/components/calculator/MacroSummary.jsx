function MacroPill({ label, value, unit, color }) {
  return (
    <div className="flex-1 rounded-xl p-3 text-center" style={{ backgroundColor: color.bg }}>
      <p className="font-display text-lg font-extrabold" style={{ color: color.text }}>
        {Math.round(value)}
        <span className="text-xs font-semibold">{unit}</span>
      </p>
      <p className="text-[11px] font-medium text-text-secondary">{label}</p>
    </div>
  )
}

export default function MacroSummary({ target, consumed, compact = false }) {
  const items = [
    { label: 'Proteína', key: 'protein', color: { bg: '#fff7ed', text: '#ea580c' } },
    { label: 'Carbohidratos', key: 'carbs', color: { bg: '#fefce8', text: '#a16207' } },
    { label: 'Grasas', key: 'fat', color: { bg: '#eef2ff', text: '#4338ca' } },
  ]

  return (
    <div className={compact ? '' : 'rounded-2xl border border-slate-100 bg-white p-5'}>
      {!compact && (
        <div className="flex items-baseline justify-between">
          <p className="font-display text-2xl font-extrabold text-navy">
            {Math.round(target.calories)} kcal/día
          </p>
          {consumed !== undefined && (
            <p className="text-xs text-text-secondary">
              Añadido: <span className="font-semibold text-navy">{Math.round(consumed.calories)} kcal</span>
            </p>
          )}
        </div>
      )}
      <div className="mt-3 flex gap-2">
        {items.map((it) => (
          <MacroPill
            key={it.key}
            label={it.label}
            unit="g"
            value={target[it.key]}
            color={it.color}
          />
        ))}
      </div>
    </div>
  )
}