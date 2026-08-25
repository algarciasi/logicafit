import { useState } from 'react'
import { updateClientPlanInfo, updateClientStatus, OBJETIVOS } from '../../lib/clients'

const FIELD = 'w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange'
const LABEL = 'mb-1.5 block text-xs font-semibold text-navy-light'

export default function ClientPlanEditor({ client, onSaved }) {
  const [tipoPlan, setTipoPlan] = useState(client.tipo_plan || '')
  const [planVigenteHasta, setPlanVigenteHasta] = useState(client.plan_vigente_hasta || '')
  const [proximaRevision, setProximaRevision] = useState(client.proxima_revision || '')
  const [objetivo, setObjetivo] = useState(client.objetivo_entrenamiento || '')
  const [status, setStatus] = useState(client.status || 'activo')
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    const { error } = await updateClientPlanInfo(client.id, {
      tipoPlan,
      planVigenteHasta,
      proximaRevision,
      objetivoEntrenamiento: objetivo,
    })
    if (!error && status !== (client.status || 'activo')) {
      await updateClientStatus(client.id, status)
    }
    setSaving(false)
    if (error) {
      alert('Error al guardar: ' + error.message)
      return
    }
    onSaved()
  }

  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5">
      <div className="flex items-center justify-between">
        <p className="font-display text-sm font-bold text-navy">Datos del plan</p>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className={`rounded-full px-3 py-1 text-xs font-semibold ${
            status === 'activo' ? 'bg-orange/10 text-orange-dark' : 'bg-slate-100 text-text-secondary'
          }`}
        >
          <option value="activo">Activo</option>
          <option value="pausado">Pausado</option>
          <option value="de_baja">De baja</option>
        </select>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-4">
        <div>
          <label className={LABEL}>Objetivo</label>
          <select value={objetivo} onChange={(e) => setObjetivo(e.target.value)} className={FIELD}>
            <option value="">Sin definir</option>
            {OBJETIVOS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className={LABEL}>Tipo de plan</label>
          <input
            type="text"
            placeholder="ej. Método Lógica"
            value={tipoPlan}
            onChange={(e) => setTipoPlan(e.target.value)}
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL}>Vigente hasta</label>
          <input
            type="date"
            value={planVigenteHasta}
            onChange={(e) => setPlanVigenteHasta(e.target.value)}
            className={FIELD}
          />
        </div>
        <div>
          <label className={LABEL}>Próxima revisión</label>
          <input
            type="date"
            value={proximaRevision}
            onChange={(e) => setProximaRevision(e.target.value)}
            className={FIELD}
          />
        </div>
      </div>
      <button
        type="button"
        onClick={handleSave}
        disabled={saving}
        className="mt-4 rounded-full bg-orange px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
      >
        {saving ? 'Guardando…' : 'Guardar datos del plan'}
      </button>
    </div>
  )
}