import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrowserFrame from '../components/demo/BrowserFrame'
import InicioTab from '../components/demo/tabs/InicioTab'
import EntrenoTab from '../components/demo/tabs/EntrenoTab'
import ProgresoTab from '../components/demo/tabs/ProgresoTab'
import DietaTab from '../components/demo/tabs/DietaTab'

const TABS = [
  { id: 'inicio', label: 'Inicio', icon: '🏠' },
  { id: 'entreno', label: 'Entreno', icon: '🏋️' },
  { id: 'progreso', label: 'Progreso', icon: '📈' },
  { id: 'dieta', label: 'Dieta', icon: '🍽️' },
]

export default function Demo() {
  const [active, setActive] = useState('inicio')

  const content = {
    inicio: <InicioTab />,
    entreno: <EntrenoTab />,
    progreso: <ProgresoTab />,
    dieta: <DietaTab />,
  }[active]

  return (
    <div className="bg-surface-soft pb-28 pt-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
          Demo interactiva
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Esto es lo que ve un cliente real
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Datos de ejemplo — así de claro se ve tu plan cada día, sin líos.
        </p>
      </div>

      <div className="mx-auto mt-10 max-w-md px-6">
        <BrowserFrame>
          <div className="mb-4 flex gap-1 rounded-full bg-surface-soft p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex-1 rounded-full px-1 py-2 text-[11px] font-semibold transition sm:text-xs ${
                  active === t.id
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-text-secondary hover:text-navy'
                }`}
              >
                <span className="block sm:inline">{t.icon}</span>
                <span className="hidden sm:inline"> {t.label}</span>
              </button>
            ))}
          </div>
          {content}
        </BrowserFrame>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-slate-200 bg-white/95 px-6 py-4 backdrop-blur">
        <div className="mx-auto flex max-w-md flex-col items-center gap-2 text-center sm:max-w-2xl sm:flex-row sm:justify-between sm:text-left">
          <p className="font-display text-sm font-bold text-navy">
            ¿Te gusta cómo se ve? Empieza hoy →
          </p>
          <Link
            to="/planes"
            className="w-full shrink-0 rounded-full bg-orange px-7 py-3 text-center text-sm font-semibold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark sm:w-auto"
          >
            Quiero mi plan
          </Link>
        </div>
      </div>
    </div>
  )
}