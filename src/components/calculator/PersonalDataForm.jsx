const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

export default function PersonalDataForm({ data, onChange, onSubmit }) {
  const set = (field) => (e) => onChange({ ...data, [field]: e.target.value })

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault()
        onSubmit()
      }}
      className="rounded-2xl border border-slate-100 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div>
          <label className={LABEL}>Sexo</label>
          <select className={FIELD} value={data.sex} onChange={set('sex')}>
            <option value="mujer">Mujer</option>
            <option value="hombre">Hombre</option>
          </select>
        </div>

        <div>
          <label className={LABEL}>Edad</label>
          <input
            type="number"
            min="14"
            max="90"
            required
            className={FIELD}
            value={data.age}
            onChange={set('age')}
          />
        </div>

        <div>
          <label className={LABEL}>Peso (kg)</label>
          <input
            type="number"
            min="30"
            max="250"
            step="0.1"
            required
            className={FIELD}
            value={data.weight}
            onChange={set('weight')}
          />
        </div>

        <div>
          <label className={LABEL}>Altura (cm)</label>
          <input
            type="number"
            min="120"
            max="230"
            required
            className={FIELD}
            value={data.height}
            onChange={set('height')}
          />
        </div>

        <div>
          <label className={LABEL}>Nivel de actividad</label>
          <select className={FIELD} value={data.activity} onChange={set('activity')}>
            <option value="sedentario">Sedentario (trabajo de oficina, sin ejercicio)</option>
            <option value="ligero">Ligero (1-3 días/semana)</option>
            <option value="moderado">Moderado (3-5 días/semana)</option>
            <option value="intenso">Intenso (6-7 días/semana)</option>
            <option value="muy_intenso">Muy intenso (2x al día, físico)</option>
          </select>
        </div>

        <div>
          <label className={LABEL}>Objetivo</label>
          <select className={FIELD} value={data.goal} onChange={set('goal')}>
            <option value="perder">Perder grasa</option>
            <option value="mantener">Mantener</option>
            <option value="ganar">Ganar músculo</option>
          </select>
        </div>
      </div>

      <button
        type="submit"
        className="mt-6 w-full rounded-full bg-orange px-6 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-dark sm:w-auto"
      >
        Calcular mis macros →
      </button>
    </form>
  )
}