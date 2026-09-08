const IconWeight = <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
const IconTape = <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.121 14.121L19 19m-7-7l7-7m-7 7l-2.879 2.879M12 12L9.121 9.121m0 5.758a3 3 0 10-4.243-4.243 3 3 0 004.243 4.243z" /></svg>
const IconDumbbell = <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" /></svg>

// Mini gráfica de área, misma estética que MeasurementsChart
function MiniChart({ points, color, labels }) {
  const line = points.map((p) => `${p.x},${p.y}`).join(' ')
  const area = `${line} ${points[points.length - 1].x},100 ${points[0].x},100`
  return (
    <div>
      <svg viewBox="0 0 260 110" className="h-24 w-full">
        <defs>
          <linearGradient id={`g-${color.replace('#', '')}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity="0.35" />
            <stop offset="95%" stopColor={color} stopOpacity="0" />
          </linearGradient>
        </defs>
        {[25, 50, 75].map((y) => (
          <line key={y} x1="8" y1={y} x2="252" y2={y} stroke="#f1f5f9" strokeWidth="1" strokeDasharray="3 3" />
        ))}
        <polygon points={area} fill={`url(#g-${color.replace('#', '')})`} />
        <polyline points={line} fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
        {points.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="3.5" fill="#fff" stroke={color} strokeWidth="2.5" />
        ))}
      </svg>
      <div className="flex justify-between px-1">
        {labels.map((l) => (
          <span key={l} className="text-[8px] font-bold text-slate-400">{l}</span>
        ))}
      </div>
    </div>
  )
}

function ChartCard({ title, subtitle, icon, color, unit, value, delta, deltaGood, metric, points, labels }) {
  return (
    <div className="mb-4 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
      <div className="mb-4 flex items-start justify-between gap-3">
        <div className="min-w-0">
          <h3 className="font-display text-base font-extrabold text-navy">{title}</h3>
          <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-slate-400">{subtitle}</p>
        </div>
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{ backgroundColor: `${color}15`, color }}
        >
          {icon}
        </div>
      </div>

      <div className="mb-3 flex items-start justify-between">
        <div>
          <p className="mb-0.5 text-[8px] font-extrabold uppercase tracking-widest text-slate-400">Valor actual</p>
          <div className="flex items-baseline gap-1">
            <span className="font-display text-2xl font-extrabold tracking-tight text-navy">{value}</span>
            <span className="text-sm font-bold" style={{ color }}>{unit}</span>
          </div>
        </div>

        <div className="flex flex-col items-end gap-2">
          <div className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1">
            <span className="text-[9px] font-extrabold text-navy">{metric} ▾</span>
          </div>
          <div className={`rounded-full border px-2 py-0.5 ${deltaGood ? 'border-green-100 bg-green-50' : 'border-red-100 bg-red-50'}`}>
            <span className={`text-[9px] font-extrabold ${deltaGood ? 'text-green-600' : 'text-red-600'}`}>{delta}</span>
          </div>
        </div>
      </div>

      <MiniChart points={points} color={color} labels={labels} />
    </div>
  )
}

const PESO = [
  { x: 8, y: 30 }, { x: 50, y: 38 }, { x: 92, y: 45 },
  { x: 134, y: 52 }, { x: 176, y: 48 }, { x: 218, y: 60 }, { x: 252, y: 66 },
]
const CINTURA = [
  { x: 8, y: 28 }, { x: 50, y: 34 }, { x: 92, y: 42 },
  { x: 134, y: 46 }, { x: 176, y: 55 }, { x: 218, y: 58 }, { x: 252, y: 64 },
]
const PRESS = [
  { x: 8, y: 72 }, { x: 50, y: 66 }, { x: 92, y: 58 },
  { x: 134, y: 50 }, { x: 176, y: 44 }, { x: 218, y: 34 }, { x: 252, y: 26 },
]
const LABELS = ['15 jun', '6 jul', '27 jul', '17 ago']

export default function ProgresoTab() {
  return (
    <div className="flex flex-col gap-5">

      <div>
        <p className="text-xs font-bold uppercase tracking-widest text-orange">Tu evolución</p>
        <h2 className="mt-1 font-display text-2xl font-extrabold text-navy">Progreso</h2>
        <p className="mt-2 text-[11px] font-medium leading-relaxed text-slate-500">
          Registra tus medidas, analiza tu gráfica de peso, revisa tu cambio físico y vincula
          tus carreras.
        </p>
      </div>

      <div className="rounded-2xl border border-dashed border-orange/40 bg-orange/5 py-2.5 text-center">
        <p className="text-[11px] font-bold text-orange-dark">+ Registrar medidas de esta semana</p>
      </div>

      <div className="flex flex-col">

        <ChartCard
          title="Peso corporal"
          subtitle="Tendencia histórica"
          icon={IconWeight}
          color="#EA580C"
          unit="kg"
          value="78,4"
          delta="−3,2 kg"
          deltaGood
          metric="Peso"
          points={PESO}
          labels={LABELS}
        />

        <ChartCard
          title="Medidas corporales"
          subtitle="Evolución de contornos"
          icon={IconTape}
          color="#3B82F6"
          unit="cm"
          value="82,5"
          delta="−4,5 cm"
          deltaGood
          metric="Cintura"
          points={CINTURA}
          labels={LABELS}
        />

        <ChartCard
          title="Rendimiento"
          subtitle="Evolución de pesos"
          icon={IconDumbbell}
          color="#10B981"
          unit="kg"
          value="82,5"
          delta="+17,5 kg"
          deltaGood
          metric="Press banca"
          points={PRESS}
          labels={LABELS}
        />

        {/* Cambio físico */}
        <div className="mb-4 rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center justify-between">
            <div>
              <h3 className="font-display text-base font-extrabold text-navy">Cambio físico</h3>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-slate-400">
                Comparativa visual
              </p>
            </div>
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-navy/5 text-navy">
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-2">
            {['Marzo', 'Agosto'].map((mes) => (
              <div key={mes}>
                <div className="flex aspect-[3/4] items-center justify-center rounded-xl bg-slate-100">
                  <svg className="h-7 w-7 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                  </svg>
                </div>
                <p className="mt-1.5 text-center text-[9px] font-bold text-slate-400">{mes}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Actividad Strava */}
        <div className="rounded-[1.5rem] bg-white p-4 shadow-sm ring-1 ring-slate-100">
          <div className="mb-4 flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FC4C02]/10 text-[#FC4C02]">
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M15.387 17.944l-2.089-4.116h-3.065L15.387 24l5.15-10.172h-3.066m-7.008-5.599l2.836 5.598h4.172L10.463 0l-7 13.828h4.169" />
              </svg>
            </div>
            <div>
              <h3 className="font-display text-base font-extrabold text-navy">Actividad Strava</h3>
              <p className="mt-0.5 text-[8px] font-semibold uppercase tracking-widest text-slate-400">
                Sincronización GPS
              </p>
            </div>
          </div>

          <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
            <div className="mb-2.5 flex items-center justify-between">
              <span className="text-[8px] font-extrabold uppercase tracking-widest text-slate-400">
                Últimas actividades
              </span>
              <div className="rounded-full bg-[#FC4C02] px-2 py-0.5">
                <span className="text-[8px] font-bold text-white">Sincronizar</span>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <div className="rounded-lg bg-white p-2.5">
                <p className="text-[11px] font-bold text-navy">Rodaje matutino</p>
                <p className="mt-0.5 text-[9px] text-slate-400">Run · 8,2 km · 44 min ↗</p>
              </div>
              <div className="rounded-lg bg-white p-2.5">
                <p className="text-[11px] font-bold text-navy">Fuerza · Tren superior</p>
                <p className="mt-0.5 text-[9px] text-slate-400">WeightTraining · 52 min ↗</p>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  )
}