const OPTIONS = [
  { value: 'musculacion', label: 'Musculación' },
  { value: 'running', label: 'Running' },
  { value: 'hibrido', label: 'Híbrido' },
]

export default function TrainingTypeToggle({ type, onChange }) {
  return (
    <div className="inline-flex rounded-full bg-surface-soft p-1">
      {OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          onClick={() => onChange(opt.value)}
          className={`rounded-full px-4 py-1.5 text-xs font-semibold transition ${
            type === opt.value ? 'bg-white text-navy shadow-sm' : 'text-text-secondary hover:text-navy'
          }`}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}