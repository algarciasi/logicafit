export default function BillingToggle({ billing, onChange }) {
  return (
    <div className="inline-flex rounded-full bg-surface-soft p-1">
      <button
        type="button"
        onClick={() => onChange('monthly')}
        className={`rounded-full px-5 py-2 text-sm font-semibold transition ${
          billing === 'monthly' ? 'bg-white text-navy shadow-sm' : 'text-text-secondary hover:text-navy'
        }`}
      >
        Mensual
      </button>
      <button
        type="button"
        onClick={() => onChange('quarterly')}
        className={`flex items-center gap-1.5 rounded-full px-5 py-2 text-sm font-semibold transition ${
          billing === 'quarterly' ? 'bg-white text-navy shadow-sm' : 'text-text-secondary hover:text-navy'
        }`}
      >
        Trimestral
        <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[10px] font-bold text-orange-dark">
          -17%
        </span>
      </button>
    </div>
  )
}