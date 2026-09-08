import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import InicioTab from "../components/demo/tabs/InicioTab";
import EntrenoTab from "../components/demo/tabs/EntrenoTab";
import ProgresoTab from "../components/demo/tabs/ProgresoTab";
import DietaTab from "../components/demo/tabs/DietaTab";
import ExtrasTab from "../components/demo/tabs/ExtrasTab";

const TABS = [
  {
    id: "inicio",
    label: "Inicio",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />,
  },
  {
    id: "entreno",
    label: "Entreno",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />,
  },
  {
    id: "progreso",
    label: "Progreso",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />,
  },
  {
    id: "dieta",
    label: "Dieta",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />,
  },
  {
    id: "extras",
    label: "Extras",
    icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />,
  },
];

const TAB_IDS = TABS.map((t) => t.id);

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
    extras: <ExtrasTab />,
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

      {/* MOCKUP DE MÓVIL */}
      <div className="mx-auto mt-12 px-6">
        <div className="relative mx-auto h-[700px] w-full max-w-[340px] rounded-[3rem] bg-gradient-to-b from-[#2a3444] via-[#0f172a] to-[#1a2334] p-[6px] shadow-2xl shadow-navy/30 ring-1 ring-slate-300/40">
          <div className="relative flex h-full flex-col overflow-hidden rounded-[2.6rem] bg-slate-50">

            {/* Barra de estado + isla */}
            <div className="relative flex h-9 shrink-0 items-center justify-between bg-slate-50 px-6">
              <span className="text-[11px] font-bold text-navy">9:41</span>
              <div className="absolute left-1/2 top-1.5 h-5 w-20 -translate-x-1/2 rounded-full bg-black" />
              <div className="flex items-center gap-1">
                <svg className="h-2.5 w-2.5 text-navy" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M1 9h2v5H1zM5 6h2v8H5zM9 3h2v11H9zM13 1h2v13h-2z" />
                </svg>
                <div className="flex h-2.5 w-5 items-center rounded-[3px] border border-navy/60 p-[1.5px]">
                  <div className="h-full w-3/4 rounded-[1px] bg-navy" />
                </div>
              </div>
            </div>

            {/* Mini navbar de la app */}
            <div className="flex shrink-0 items-center justify-between border-b border-slate-200/60 bg-white px-4 py-2.5">
              <div className="flex items-center gap-2">
                <img src="/brand/logo.png" alt="" className="h-6 w-6 rounded-full object-cover" />
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
            <div className="flex-1 overflow-y-auto overflow-x-hidden px-5 pb-28 pt-5">
              {content}
            </div>

            {/* BARRA INFERIOR (idéntica a la app real) */}
            <div className="absolute bottom-4 left-1/2 z-40 flex w-[calc(100%-2rem)] -translate-x-1/2 items-center justify-between rounded-[1.75rem] border border-slate-700/50 bg-navy p-1.5 shadow-2xl shadow-navy/40">
              {TABS.map((t) => {
                const isActive = active === t.id;
                return (
                  <button
                    key={t.id}
                    onClick={() => setActive(t.id)}
                    className={`flex w-1/5 flex-col items-center justify-center rounded-3xl py-2 transition-all duration-300 ${
                      isActive
                        ? "scale-105 bg-orange text-white shadow-md shadow-orange/20"
                        : "text-slate-400 hover:text-slate-200"
                    }`}
                  >
                    <svg className="mb-0.5 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      {t.icon}
                    </svg>
                    <span className="text-[8px] font-extrabold tracking-wide">{t.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
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