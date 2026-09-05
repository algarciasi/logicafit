import { Link } from "react-router-dom";

const FEATURES = [
  "Entrenamientos",
  "Nutrición",
  "Progreso",
  "Cuaderno de series",
  "Seguimiento",
  "Sincronización Strava",
];

function PhoneFrame({ children }) {
  return (
    <div className="relative w-[220px] h-[460px] shrink-0 rounded-[3rem] bg-[#0f172a] p-[4px] shadow-2xl shadow-black/80 ring-1 ring-white/10">
      <div className="flex h-full flex-col overflow-hidden rounded-[2.7rem] bg-surface">
        <div className="flex h-10 shrink-0 items-center justify-between bg-surface px-5 border-b border-slate-100">
          <span className="text-[10px] font-bold text-navy">9:41</span>
          <div className="flex gap-1">
             <div className="w-1 h-1 rounded-full bg-navy"></div>
             <div className="w-1 h-1 rounded-full bg-navy"></div>
             <div className="w-1 h-1 rounded-full bg-navy"></div>
          </div>
        </div>
        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-surface pb-4">
          {children}
        </div>
      </div>
      {/* Botones laterales del iPhone */}
      <div className="absolute -right-[2px] top-28 h-12 w-[3px] rounded-r-md bg-slate-800" />
      <div className="absolute -left-[2px] top-24 h-8 w-[3px] rounded-l-md bg-slate-800" />
      <div className="absolute -left-[2px] top-36 h-12 w-[3px] rounded-l-md bg-slate-800" />
    </div>
  );
}

function NavbarMini() {
  return (
    <div className="flex items-center justify-between px-4 py-3">
      <div className="flex items-center gap-2">
        <img src="/brand/logo.png" alt="" className="h-6 w-6 rounded-full object-cover shadow-sm" />
        <span className="font-display text-[12px] font-extrabold text-navy tracking-tight">
          Lógica <span className="text-orange">Fit</span>
        </span>
      </div>
    </div>
  );
}

function TabBar({ active = 0 }) {
  return (
    <div className="mx-3 mb-4 flex gap-1 rounded-2xl bg-surface-soft p-1 border border-slate-100">
      {["Inicio", "Plan", "Datos", "Dieta"].map((t, i) => (
        <div
          key={i}
          className={`flex flex-1 items-center justify-center rounded-xl py-2 text-[9px] font-bold transition-colors ${
            active === i ? "bg-navy text-white shadow-sm" : "text-text-secondary"
          }`}
        >
          {t}
        </div>
      ))}
    </div>
  );
}

function ScreenInicio() {
  return (
    <>
      <NavbarMini />
      <TabBar active={0} />
      <div className="px-4 space-y-3">
        <p className="font-display text-[14px] font-extrabold text-navy">
          Hola Alberto 👋
        </p>
        <div className="rounded-2xl bg-surface-soft p-3.5 text-[9px] leading-relaxed text-navy border border-slate-100 shadow-sm">
          <p className="mb-1"><span className="text-text-secondary font-medium">Objetivo:</span> <strong>Fuerza e Hipertrofia</strong></p>
          <p className="mb-2"><span className="text-text-secondary font-medium">Fase:</span> <strong>Volumen controlado</strong></p>
          <div className="h-px w-full bg-slate-200 my-2"></div>
          <p className="text-orange font-bold">Revisión: Jueves, 14 Sep</p>
        </div>
        <div className="flex gap-2">
          <div className="flex-1 flex items-center justify-center rounded-xl bg-navy py-2.5 shadow-sm">
            <span className="text-[9px] font-bold text-white">🏋️ Rutina</span>
          </div>
          <div className="flex-1 flex items-center justify-center rounded-xl bg-orange py-2.5 shadow-sm">
            <span className="text-[9px] font-bold text-white">🥗 Dieta</span>
          </div>
        </div>
        <div className="space-y-2 pt-2">
          <div className="h-10 rounded-xl bg-slate-50 border border-slate-100" />
          <div className="h-10 rounded-xl bg-slate-50 border border-slate-100" />
        </div>
      </div>
    </>
  );
}

function ScreenEntreno() {
  const exercises = [
    { name: "PRESS BANCA", sets: "4 series · 8-10 reps" },
    { name: "PRESS INCLINADO", sets: "3 series · 10-12 reps" },
    { name: "APERTURAS", sets: "3 series · 12-15 reps" },
  ];
  return (
    <>
      <NavbarMini />
      <TabBar active={1} />
      <div className="px-4">
        <p className="font-display text-[12px] font-extrabold text-navy mb-2">Día 1: Empujes</p>
        <div className="space-y-2">
          {exercises.map((ex, i) => (
            <div key={i} className="flex items-center justify-between rounded-xl bg-surface-soft border border-slate-100 px-3 py-2.5 shadow-sm">
              <div>
                <p className="text-[10px] font-bold text-navy">{ex.name}</p>
                <p className="text-[8px] text-text-secondary mt-0.5">{ex.sets}</p>
              </div>
              <div className="h-6 w-6 rounded-full bg-white flex items-center justify-center shadow-sm border border-slate-100 text-orange font-bold text-[10px]">
                +
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

function ScreenProgreso() {
  const points = "16,52 36,44 56,40 76,38 96,35 116,32 136,28 156,30 176,26";
  return (
    <>
      <NavbarMini />
      <TabBar active={2} />
      <div className="px-4 space-y-3">
        <div className="rounded-xl border border-slate-200 p-3 shadow-sm relative overflow-hidden">
          <p className="text-[8px] font-bold uppercase tracking-widest text-text-secondary mb-1">Peso Corporal</p>
          <div className="flex items-baseline gap-2">
            <p className="font-display text-[20px] font-extrabold text-navy">88.8<span className="text-[12px] font-medium text-text-secondary">kg</span></p>
            <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[7px] font-bold text-emerald-700">-2.1 kg</span>
          </div>
          <svg viewBox="0 0 192 64" className="mt-3 h-12 w-full overflow-visible">
            <polyline fill="none" stroke="#f97316" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" points={points} />
            {points.split(" ").map((p, i) => {
              const [x, y] = p.split(",");
              return <circle key={i} cx={x} cy={y} r="3" fill="#ffffff" stroke="#f97316" strokeWidth="2" />;
            })}
          </svg>
        </div>

        <div className="rounded-xl border border-slate-200 p-3 shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-1.5">
              <img src="/brand/strava.png" alt="Strava" className="h-3.5 w-3.5" />
              <p className="text-[8px] font-bold uppercase tracking-widest text-navy">Strava</p>
            </div>
          </div>
          <div className="space-y-1.5">
            <div className="rounded-lg bg-surface-soft p-2 border border-slate-100">
              <p className="text-[9px] font-bold text-navy">Tirada Larga 🏃</p>
              <p className="text-[8px] text-text-secondary mt-0.5">14.8 km · 5:15 min/km</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AppShowcase() {
  return (
    <section className="overflow-hidden bg-navy py-32 border-t-[12px] border-orange">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-3xl px-6 text-center">
          <p className="text-sm font-bold uppercase tracking-[0.2em] text-orange mb-4">
            Tecnología Propia
          </p>
          <h2 className="font-display text-4xl font-extrabold text-white sm:text-5xl lg:text-6xl tracking-tight">
            Todo tu progreso.<br/>En tu bolsillo.
          </h2>
          <p className="mt-6 text-lg text-slate-300 font-medium">
            Olvida los Excels confusos y los PDFs. Tu plan de entrenamiento, tu dieta, tu registro de cargas y tus carreras de Strava, centralizados en mi app.
          </p>
          
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {FEATURES.map((feature, i) => (
              <span key={i} className="px-3 py-1 bg-white/10 rounded-full text-xs font-semibold text-slate-200 border border-white/5">
                {feature}
              </span>
            ))}
          </div>
        </div>

        <div className="mt-20 flex items-center justify-start gap-8 overflow-x-auto px-6 pb-12 snap-x snap-mandatory sm:justify-center hide-scrollbar">
          <div className="snap-center shrink-0 transition-transform duration-500 hover:-translate-y-4">
            <PhoneFrame><ScreenInicio /></PhoneFrame>
          </div>
          <div className="snap-center shrink-0 transition-transform duration-500 hover:-translate-y-4">
            <PhoneFrame><ScreenEntreno /></PhoneFrame>
          </div>
          <div className="snap-center shrink-0 transition-transform duration-500 hover:-translate-y-4">
            <PhoneFrame><ScreenProgreso /></PhoneFrame>
          </div>
          <div className="w-4 shrink-0 sm:hidden"></div>
        </div>

      </div>
    </section>
  );
}