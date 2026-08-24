import { useState } from 'react'
import { Link } from 'react-router-dom'
import BrowserFrame from '../components/demo/BrowserFrame'
import InicioTab from '../components/demo/tabs/InicioTab'
import ProgresoTab from '../components/demo/tabs/ProgresoTab'
import DietaTab from '../components/demo/tabs/DietaTab'

const TABS = [
  { id: 'inicio', label: 'Inicio', icon: '🏠' },
  { id: 'progreso', label: 'Progreso', icon: '📈' },
  { id: 'dieta', label: 'Dieta', icon: '🍽️' },
]

export default function Demo() {
  const [active, setActive] = useState('inicio')

  const content = {
    inicio: <InicioTab />,
    progreso: <ProgresoTab />,
    dieta: <DietaTab />,
  }[active]

  return (
    <div className="bg-surface-soft py-16">
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
          <div className="mb-4 flex gap-2 rounded-full bg-surface-soft p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex-1 rounded-full py-2 text-xs font-semibold transition ${
                  active === t.id
                    ? 'bg-white text-navy shadow-sm'
                    : 'text-text-secondary hover:text-navy'
                }`}
              >
                {t.icon} {t.label}
              </button>
            ))}
          </div>
          {content}
        </BrowserFrame>
      </div>

      <div className="mx-auto mt-10 max-w-md px-6 text-center">
        <p className="text-sm text-text-secondary">
          Esto es exactamente lo que tendrías tú, con tu plan real.
        </p>
        <Link
          to="/planes"
          className="mt-4 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white shadow-lg shadow-orange/25 transition hover:bg-orange-dark"
        >
          Quiero mi plan →
        </Link>
      </div>
    </div>
  )
}