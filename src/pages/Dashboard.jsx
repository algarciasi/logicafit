import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import InicioTab from '../components/dashboard/tabs/InicioTab'
import EntrenoTab from '../components/dashboard/tabs/EntrenoTab'
import ProgresoTab from '../components/dashboard/tabs/ProgresoTab'
import DietaTab from '../components/dashboard/tabs/DietaTab'

const TABS = [
  { id: 'inicio', label: 'Inicio', icon: '🏠' },
  { id: 'entreno', label: 'Entreno', icon: '🏋️' },
  { id: 'progreso', label: 'Progreso', icon: '📈' },
  { id: 'dieta', label: 'Dieta', icon: '🍽️' },
]

export default function Dashboard() {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [active, setActive] = useState('inicio')

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  const content = {
    inicio: <InicioTab userEmail={user?.email} />,
    entreno: <EntrenoTab />,
    progreso: <ProgresoTab />,
    dieta: <DietaTab />,
  }[active]

  return (
    <div className="min-h-[80vh] bg-surface-soft">
      <div className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
          <p className="font-display text-sm font-bold text-navy">
            Tu área · Lógica Fit
          </p>
          <button
            type="button"
            onClick={handleSignOut}
            className="text-xs font-semibold text-text-secondary transition hover:text-navy"
          >
            Cerrar sesión
          </button>
        </div>
      </div>

      <div className="mx-auto max-w-md px-6 py-10">
        <div className="mb-4 flex gap-1 rounded-full bg-white p-1 shadow-sm">
          {TABS.map((t) => (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`flex-1 rounded-full px-1 py-2 text-[11px] font-semibold transition sm:text-xs ${
                active === t.id
                  ? 'bg-navy text-white'
                  : 'text-text-secondary hover:text-navy'
              }`}
            >
              <span className="block sm:inline">{t.icon}</span>
              <span className="hidden sm:inline"> {t.label}</span>
            </button>
          ))}
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-6">{content}</div>
      </div>
    </div>
  )
}