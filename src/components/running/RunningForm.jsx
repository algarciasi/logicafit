const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

const PRESET_DISTANCES = [
  { label: '5K', value: 5 },
  { label: '10K', value: 10 },
  { label: '15K', value: 15 },
  { label: 'Media maratón (21.1K)', value: 21.0975 },
  { label: 'Maratón (42.2K)', value: 42.195 },
  { label: 'Otra distancia', value: 'custom' },
]

export default function RunningForm({ data, onChange, onSubmit }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8"
    >
      <p className="text-sm text-text-secondary">
        Dinos un resultado que ya has corrido (o crees que puedes correr) y
        calculamos tu ritmo y una predicción para otras distancias.
      </p>

      <div className="mt-5">
        <label className={LABEL}>Distancia</label>
        <select
          className={FIELD}
          value={data.distancePreset}
          onChange={set('distancePreset')}
        >
          {PRESET_DISTANCES.map((d) => (
            <option key={d.label} value={d.value}>
              {d.label}
            </option>
          ))}
        </select>
      </div>

      {data.distancePreset === 'custom' && (
        <div className="mt-4">
          <label className={LABEL}>Distancia personalizada (km)</label>
          <input
            type="number"
            min="0.5"
            step="0.1"
            required
            className={FIELD}
            value={data.customKm}
            onChange={set('customKm')}
          />
        </div>
      )}

      <div className="mt-4">
        <label className={LABEL}>Tiempo</label>
        <div className="grid grid-cols-3 gap-2">
          <div>
            <input
              type="number"
              min="0"
              placeholder="hh"
              className={FIELD}
              value={data.hours}
              onChange={set('hours')}
            />
            <p className="mt-1 text-center text-[10px] text-text-secondary">horas</p>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="mm"
              className={FIELD}
              value={data.minutes}
              onChange={set('minutes')}
            />
            <p className="mt-1 text-center text-[10px] text-text-secondary">min</p>
          </div>
          <div>
            <input
              type="number"
              min="0"
              max="59"
              placeholder="ss"
              className={FIELD}
              value={data.seconds}
              onChange={set('seconds')}
            />
            <p className="mt-1 text-center text-[10px] text-text-secondary">seg</p>
          </div>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-dark sm:w-auto"
      >
        Calcular mi ritmo →
      </button>
    </form>
  )
}