import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InicioTab from "../components/demo/tabs/InicioTab";
import EntrenoTab from "../components/demo/tabs/EntrenoTab";
import ProgresoTab from "../components/demo/tabs/ProgresoTab";
import DietaTab from "../components/demo/tabs/DietaTab";

const TABS = [
  { id: "inicio", label: "Inicio", icon: "🏠" },
  { id: "entreno", label: "Entreno", icon: "🏋️" },
  { id: "progreso", label: "Progreso", icon: "📈" },
  { id: "dieta", label: "Dieta", icon: "🍽️" },
];

const TAB_IDS = TABS.map((t) => t.id);

// Marco de móvil adaptado a tamaño usable para la demo
function PhoneFrameDemo({ children }) {
  return (
    <div className="relative mx-auto h-[680px] w-full max-w-[320px] shrink-0 rounded-[3rem] bg-[#1a1a1a] p-[5px] shadow-2xl shadow-navy/20 ring-1 ring-slate-200">
      <div className="flex h-full flex-col overflow-hidden rounded-[2.7rem] bg-white">
        {/* Barra de estado */}
        <div className="flex h-8 shrink-0 items-center justify-between bg-navy px-6">
          <span className="text-[11px] font-semibold tracking-wide text-white">
            9:41
          </span>
          <span className="text-[11px] text-white/70">●●●</span>
        </div>

        {/* Cabecera de la app (Mini Navbar) */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-4 py-3">
          <div className="flex items-center gap-2">
            <img
              src="/brand/logo.png"
              alt=""
              className="h-6 w-6 rounded-full object-cover"
            />
            <span className="font-display text-sm font-extrabold text-navy">
              Lógica <span className="text-orange">Fit</span>
            </span>
          </div>
          <div className="flex flex-col gap-1">
            <div className="h-[2px] w-4 rounded bg-navy" />
            <div className="h-[2px] w-4 rounded bg-navy" />
            <div className="h-[2px] w-4 rounded bg-navy" />
          </div>
        </div>

        {/* Contenido scrolleable */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-white pb-6">
          {children}
        </div>
      </div>

      {/* Botones laterales simulados */}
      <div className="absolute -right-[2px] top-32 h-14 w-[3px] rounded-full bg-[#333]" />
      <div className="absolute -left-[2px] top-24 h-10 w-[3px] rounded-full bg-[#333]" />
      <div className="absolute -left-[2px] top-36 h-10 w-[3px] rounded-full bg-[#333]" />
    </div>
  );
}

export default function Demo() {
  const [searchParams] = useSearchParams();
  const requestedTab = searchParams.get("tab");
  const [active, setActive] = useState(
    TAB_IDS.includes(requestedTab) ? requestedTab : "inicio",
  );

  const content = {
    inicio: <InicioTab />,
    entreno: <EntrenoTab />,
    progreso: <ProgresoTab />,
    dieta: <DietaTab />,
  }[active];

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

      <div className="mx-auto mt-12 px-6">
        <PhoneFrameDemo>
          {/* Navegación interna estilo app */}
          <div className="mx-5 mt-4 mb-6 flex gap-1 rounded-full bg-surface-soft p-1">
            {TABS.map((t) => (
              <button
                key={t.id}
                onClick={() => setActive(t.id)}
                className={`flex flex-1 flex-col items-center justify-center rounded-full py-2 text-[10px] font-bold transition sm:text-xs ${
                  active === t.id
                    ? "bg-navy text-white shadow-sm"
                    : "text-text-secondary hover:text-navy"
                }`}
              >
                <span className="mb-0.5 text-sm">{t.icon}</span>
                <span>{t.label}</span>
              </button>
            ))}
          </div>

          {/* Contenedor añadido para dar margen lateral al contenido */}
          <div className="px-5 pb-4">{content}</div>
        </PhoneFrameDemo>
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
  );
}
