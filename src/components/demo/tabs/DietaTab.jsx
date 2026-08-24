import { useState } from 'react'

const SUBTABS = ['Menú', 'Tu plan', 'Suples', 'Compra']

const MEALS = [
  {
    name: 'Desayuno',
    time: '08:00 · Antes de la oficina',
    kcal: '~500 kcal',
    options: [
      '60g avena + 250ml leche semi + 1 plátano + 25g whey',
      '200g yogur natural + 50g granola + 80g frutos rojos',
    ],
  },
  {
    name: 'Comida',
    time: '14:00',
    kcal: '~700 kcal',
    options: [
      '150g arroz + 180g pechuga + verdura + AOVE',
      '200g pasta integral + 150g atún + tomate',
    ],
  },
]

const SUPPLEMENTS = [
  { name: 'Whey protein', dose: '25 g/día', when: 'Desayuno o post-entreno', tag: 'Recomendado' },
  { name: 'Creatina monohidrato', dose: '5 g/día', when: 'Cualquier momento', tag: 'Recomendado' },
  { name: 'Vitamina D3', dose: '2000 UI/día', when: 'Con desayuno', tag: 'Opcional' },
]

const SHOPPING = [
  { cat: 'Proteínas', items: ['Pechuga de pollo · 1,2 kg', 'Salmón · 500 g', 'Huevos · 2 docenas'] },
  { cat: 'Carbohidratos', items: ['Arroz basmati · 1 kg', 'Avena en copos · 500 g'] },
]

function MenuView() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-slate-100 p-4">
        <div className="flex items-center justify-between">
          <p className="font-display text-xl font-extrabold text-navy">2.200 kcal/día</p>
          <span className="text-[11px] font-semibold text-text-secondary">130p · 240c · 65g</span>
        </div>
        <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-surface-soft">
          <div className="flex h-full w-full">
            <div className="w-[30%] bg-orange" />
            <div className="w-[50%] bg-amber-400" />
            <div className="w-[20%] bg-indigo-400" />
          </div>
        </div>
      </div>

      {MEALS.map((meal) => (
        <div key={meal.name} className="rounded-2xl border border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <p className="font-display font-bold text-navy">{meal.name}</p>
            <span className="rounded-full bg-orange/10 px-2 py-0.5 text-[11px] font-semibold text-orange-dark">
              {meal.kcal}
            </span>
          </div>
          <p className="text-[11px] text-text-secondary">{meal.time}</p>
          <div className="mt-2 space-y-1.5">
            {meal.options.map((o, i) => (
              <p key={i} className="text-xs text-navy-light">
                <span className="mr-1 font-semibold text-orange-dark">{String.fromCharCode(65 + i)}</span>
                {o}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}

function PlanView() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl border border-orange-light bg-orange/5 p-4">
        <p className="text-[11px] font-semibold uppercase tracking-wide text-orange-dark">
          De tu entrenador, para ti
        </p>
        <p className="mt-2 text-sm text-navy-light">
          Vamos arrancando con un plan adaptado a tu ritmo de oficina y tus 4
          sesiones de tarde. Tienes margen para apretar — confía en el
          proceso y registra todo.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-100 p-4">
        <p className="font-display font-bold text-navy">Pautas generales</p>
        <ul className="mt-2 space-y-1.5 text-xs text-navy-light">
          <li>• Beber al menos 2 litros de agua al día.</li>
          <li>• Pesar los carbohidratos en crudo.</li>
          <li>• Alcohol del finde con moderación: 1-2 copas máximo.</li>
        </ul>
      </div>
    </div>
  )
}

function SuplesView() {
  return (
    <div className="space-y-3">
      {SUPPLEMENTS.map((s) => (
        <div key={s.name} className="rounded-2xl border border-slate-100 p-4">
          <div className="flex items-center justify-between">
            <p className="font-display font-bold text-navy">{s.name}</p>
            <span
              className={`rounded-full px-2 py-0.5 text-[10px] font-semibold ${
                s.tag === 'Recomendado'
                  ? 'bg-orange/10 text-orange-dark'
                  : 'bg-surface-soft text-text-secondary'
              }`}
            >
              {s.tag}
            </span>
          </div>
          <p className="mt-1 text-xs text-text-secondary">
            {s.dose} · {s.when}
          </p>
        </div>
      ))}
    </div>
  )
}

function CompraView() {
  return (
    <div className="space-y-3">
      <div className="rounded-2xl bg-surface-soft p-4 text-sm font-semibold text-navy">
        Lista para la semana · 23 productos
      </div>
      {SHOPPING.map((group) => (
        <div key={group.cat} className="rounded-2xl border border-slate-100 p-4">
          <p className="font-display text-sm font-bold text-navy">{group.cat}</p>
          <ul className="mt-2 space-y-1.5 text-xs text-navy-light">
            {group.items.map((it) => (
              <li key={it}>• {it}</li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  )
}

export default function DietaTab() {
  const [sub, setSub] = useState('Menú')

  const view = { Menú: <MenuView />, 'Tu plan': <PlanView />, Suples: <SuplesView />, Compra: <CompraView /> }[sub]

  return (
    <div>
      <div className="flex gap-2 overflow-x-auto pb-1">
        {SUBTABS.map((s) => (
          <button
            key={s}
            onClick={() => setSub(s)}
            className={`whitespace-nowrap rounded-full px-3.5 py-1.5 text-xs font-semibold transition ${
              sub === s ? 'bg-navy text-white' : 'bg-surface-soft text-text-secondary hover:bg-slate-200'
            }`}
          >
            {s}
          </button>
        ))}
      </div>
      <div className="mt-4">{view}</div>
    </div>
  )
}