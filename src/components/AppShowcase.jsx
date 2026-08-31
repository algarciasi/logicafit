import { Link } from "react-router-dom";

const FEATURES = [
  "Entrenamientos",
  "Nutrición",
  "Progreso",
  "Cuaderno de series",
  "Seguimiento",
  "Strava",
];

function PhoneFrame({ children }) {
  return (
    // Se añade h-[440px] al contenedor principal
    <div className="relative w-[210px] h-[440px] shrink-0 rounded-[2.8rem] bg-[#1a1a1a] p-[3px] shadow-2xl shadow-black/60 ring-1 ring-white/10">
      {/* Se añade h-full, flex y flex-col para gestionar el contenido interno */}
      <div className="flex h-full flex-col overflow-hidden rounded-[2.5rem] bg-white">
        <div className="flex h-8 shrink-0 items-center justify-between bg-navy px-4">
          <span className="text-[9px] font-semibold text-white">9:41</span>
          <span className="text-[9px] text-white/70">●●●</span>
        </div>

        {/* Se envuelven los children en un div que ocupa el resto del espacio y permite scroll si el contenido se pasa */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden">
          {children}
        </div>
      </div>

      <div className="absolute -right-[2px] top-24 h-10 w-[3px] rounded-full bg-[#333]" />
      <div className="absolute -left-[2px] top-20 h-6 w-[3px] rounded-full bg-[#333]" />
      <div className="absolute -left-[2px] top-28 h-6 w-[3px] rounded-full bg-[#333]" />
    </div>
  );
}

function NavbarMini() {
  return (
    <div className="flex items-center justify-between border-b border-slate-100 px-3 py-2">
      <div className="flex items-center gap-1.5">
        <img
          src="/brand/logo.png"
          alt=""
          className="h-5 w-5 rounded-full object-cover"
        />
        <span className="font-display text-[11px] font-extrabold text-navy">
          Lógica <span className="text-orange">Fit</span>
        </span>
      </div>
      <div className="flex items-center gap-1.5">
        <span className="rounded-full bg-orange px-2 py-0.5 text-[8px] font-semibold text-white">
          Ver planes
        </span>
        <div className="flex flex-col gap-0.5">
          <div className="h-[1.5px] w-3 rounded bg-navy" />
          <div className="h-[1.5px] w-3 rounded bg-navy" />
          <div className="h-[1.5px] w-3 rounded bg-navy" />
        </div>
      </div>
    </div>
  );
}

function TabBar({ active = 0 }) {
  return (
    <div className="mx-2 my-2 flex gap-0.5 rounded-full bg-surface-soft p-0.5">
      {["🏠", "🏋️", "📈", "🍽️"].map((t, i) => (
        <div
          key={i}
          className={`flex flex-1 items-center justify-center rounded-full py-1.5 text-[10px] ${
            active === i ? "bg-navy text-white" : "text-text-secondary"
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
      <div className="px-3 pb-4">
        <p className="font-display text-[12px] font-bold text-navy">
          Hola Pepe 👋
        </p>
        <div className="mt-1.5 rounded-xl bg-surface-soft p-2.5 text-[8px] leading-relaxed text-navy-light">
          <p>
            <strong>Objetivo:</strong> Pérdida de peso
          </p>
          <p>
            <strong>Plan:</strong> Método Lógica
          </p>
          <p className="text-orange">
            <strong>Vigente hasta:</strong> 28 sep 2026
          </p>
          <p className="text-orange">
            <strong>Próxima revisión:</strong> 14 sep 2026
          </p>
        </div>
        <div className="mt-2 flex flex-col gap-1.5">
          <div className="flex items-center justify-center rounded-full bg-navy py-1.5">
            <span className="text-[8px] font-semibold text-white">
              📄 Descargar mi rutina
            </span>
          </div>
          <div className="flex items-center justify-center rounded-full bg-orange py-1.5">
            <span className="text-[8px] font-semibold text-white">
              📄 Descargar mi dieta
            </span>
          </div>
        </div>
        <div className="mt-3 space-y-1.5">
          <div className="h-8 rounded-xl bg-surface-soft opacity-50" />
          <div className="h-8 rounded-xl bg-surface-soft opacity-30" />
          <div className="h-8 rounded-xl bg-surface-soft opacity-10" />
        </div>
      </div>
    </>
  );
}

function ScreenEntreno() {
  const exercises = [
    "PRESS BANCA",
    "PRESS INCLINADO MANCUERNAS",
    "APERTURAS CON MANCUERNAS",
  ];
  return (
    <>
      <NavbarMini />
      <TabBar active={1} />
      <div className="px-3 pb-4">
        <p className="text-[8px] text-text-secondary">
          Toca un ejercicio para ver tu historial.
        </p>
        <p className="mt-1.5 font-display text-[11px] font-bold text-navy">
          Lunes
        </p>
        <div className="mt-1 space-y-1.5">
          {exercises.map((ex) => (
            <div
              key={ex}
              className="flex items-center justify-between rounded-xl bg-surface-soft px-2.5 py-2"
            >
              <div>
                <p className="text-[9px] font-bold text-navy">{ex}</p>
                <p className="text-[7px] text-text-secondary">3×10 objetivo</p>
              </div>
              <span className="text-[14px] font-light leading-none text-orange">
                +
              </span>
            </div>
          ))}
        </div>
        <p className="mt-2 font-display text-[11px] font-bold text-navy">
          Martes
        </p>
        <div className="mt-1 space-y-1.5">
          <div className="flex items-center justify-between rounded-xl bg-surface-soft px-2.5 py-2">
            <div>
              <p className="text-[9px] font-bold text-navy">PRESS BANCA</p>
              <p className="text-[7px] text-text-secondary">3×10 objetivo</p>
            </div>
            <span className="text-[14px] font-light leading-none text-orange">
              +
            </span>
          </div>
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
      <div className="px-3 pb-4">
        <div className="rounded-xl border border-dashed border-orange/40 bg-orange/5 py-2 text-center">
          <p className="text-[8px] font-semibold text-orange-dark">
            + Registrar medidas
          </p>
        </div>
        <div className="mt-2 rounded-xl border border-slate-100 p-2">
          <div className="flex items-center justify-between">
            <p className="text-[7px] font-semibold uppercase tracking-wide text-text-secondary">
              Evolución
            </p>
            <span className="text-[7px] text-text-secondary">Peso ▾</span>
          </div>
          <p className="mt-0.5 font-display text-[16px] font-bold text-navy">
            88.8 <span className="text-[10px] font-normal">kg</span>
          </p>
          <span className="inline-block rounded-full bg-orange/10 px-1.5 py-0.5 text-[7px] font-semibold text-orange-dark">
            +2.8 kg
          </span>
          <svg viewBox="0 0 192 64" className="mt-1 h-10 w-full">
            <polyline
              fill="none"
              stroke="#f97316"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              points={points}
            />
            {points.split(" ").map((p, i) => {
              const [x, y] = p.split(",");
              return <circle key={i} cx={x} cy={y} r="2.5" fill="#f97316" />;
            })}
          </svg>
        </div>
        <div className="mt-2 rounded-xl border border-slate-100 p-2">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <img src="/brand/strava.png" alt="Strava" className="h-3 w-3" />
              <p className="text-[7px] font-semibold uppercase tracking-wide text-text-secondary">
                Actividad Strava
              </p>
            </div>
            <span className="rounded-full bg-[#FC4C02] px-1.5 py-0.5 text-[6px] font-semibold text-white">
              🔄 Sincronizar
            </span>
          </div>
          <div className="mt-1.5 space-y-1">
            <div className="rounded-lg bg-surface-soft p-1.5">
              <p className="text-[8px] font-semibold text-navy">
                Afternoon Run
              </p>
              <p className="text-[7px] text-text-secondary">
                Run · 14.8 km · 1h 34min ↗
              </p>
            </div>
            <div className="rounded-lg bg-surface-soft p-1.5">
              <p className="text-[8px] font-semibold text-navy">
                Entrenamiento fuerza
              </p>
              <p className="text-[7px] text-text-secondary">
                WeightTraining · 55 min ↗
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default function AppShowcase() {
  return (
    <section className="overflow-hidden bg-navy py-24">
      <div className="mx-auto max-w-6xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <p className="font-display text-3xl font-extrabold text-white sm:text-4xl">
            La app Lógica Fit
          </p>
          <p className="mt-4 text-base text-slate-300">
            Tu plan, tu dieta, tu progreso y tus entrenamientos en un solo sitio
            — siempre actualizado.
          </p>
          <p className="mt-4 text-sm font-medium tracking-wide text-orange">
            {FEATURES.join(" · ")}
          </p>
        </div>

        <div className="mt-16 flex items-center justify-center gap-6">
          <div>
            <PhoneFrame>
              <ScreenInicio />
            </PhoneFrame>
          </div>
          <div>
            <PhoneFrame>
              <ScreenEntreno />
            </PhoneFrame>
          </div>
          <div>
            <PhoneFrame>
              <ScreenProgreso />
            </PhoneFrame>
          </div>
        </div>

        <div className="mt-20 text-center">
          <Link
            to="/demo"
            className="text-sm font-semibold text-slate-300 underline-offset-4 transition hover:text-white hover:underline"
          >
            Ver demo interactiva de la app →
          </Link>
        </div>
      </div>
    </section>
  );
}
