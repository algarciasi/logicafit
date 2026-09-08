import { useState } from "react"
import { useAuth } from "../context/AuthContext"
import { useClientProfile } from "../hooks/useClientProfile"
import InicioTab from "../components/dashboard/tabs/InicioTab"
import EntrenoTab from "../components/dashboard/tabs/EntrenoTab"
import ProgresoTab from "../components/dashboard/tabs/ProgresoTab"
import DietaTab from "../components/dashboard/tabs/DietaTab"

const TABS = [
  { 
    id: "inicio", 
    label: "Inicio", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /> 
  },
  { 
    id: "entreno", 
    label: "Entreno", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" /> 
  },
  { 
    id: "progreso", 
    label: "Progreso", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /> 
  },
  { 
    id: "dieta", 
    label: "Dieta", 
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" /> 
  },
]

export default function Dashboard() {
  const { user } = useAuth()
  const { client, loading: clientLoading, error: clientError } = useClientProfile()
  const [active, setActive] = useState("inicio")

  const content = {
    inicio: <InicioTab client={client} />,
    entreno: <EntrenoTab client={client} />,
    progreso: <ProgresoTab client={client} />,
    dieta: <DietaTab client={client} />,
  }[active]

  return (
    <div className="min-h-screen bg-slate-50 pt-28 pb-32">
      
      {/* Contenedor central simulando pantalla de móvil en desktop */}
      <div className="mx-auto max-w-md px-6">
        
        {clientError && (
          <div className="mb-6 rounded-2xl bg-red-50 p-4 text-sm text-red-600 border border-red-100">
            Error al cargar perfil: {clientError.message}
          </div>
        )}

        {clientLoading ? (
          <div className="flex flex-col items-center justify-center py-20 text-slate-400">
            <svg className="h-8 w-8 animate-spin text-orange mb-4" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-sm font-semibold">Cargando tu área...</p>
          </div>
        ) : (
          <div className="animate-fade-in-up">
            {content}
          </div>
        )}
      </div>

      {/* BARRA DE NAVEGACIÓN INFERIOR (Estilo App Nativa) */}
      <div className="fixed bottom-6 left-1/2 z-40 w-[calc(100%-3rem)] max-w-md -translate-x-1/2 rounded-[2rem] bg-navy p-2 shadow-2xl shadow-navy/40 border border-slate-700/50 flex justify-between items-center">
        {TABS.map((t) => {
          const isActive = active === t.id
          return (
            <button
              key={t.id}
              onClick={() => setActive(t.id)}
              className={`relative flex flex-col items-center justify-center w-1/4 py-3 rounded-3xl transition-all duration-300 ${
                isActive 
                  ? "text-white bg-orange shadow-md shadow-orange/20 scale-105" 
                  : "text-slate-400 hover:text-slate-200"
              }`}
            >
              <svg className="h-6 w-6 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {t.icon}
              </svg>
              <span className="text-[10px] font-extrabold tracking-wide">{t.label}</span>
            </button>
          )
        })}
      </div>
      
    </div>
  )
}