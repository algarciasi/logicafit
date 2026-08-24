const MESSAGES = [
  { from: 'client', text: 'Esta semana el miércoles no puedo entrenar.', time: '10:02' },
  {
    from: 'coach',
    text: 'Sin problema. Movemos la sesión de fuerza al jueves y dejamos el miércoles como descanso.',
    time: '10:05',
  },
  { from: 'client', text: '¿Y la carrera del sábado?', time: '10:06' },
  {
    from: 'coach',
    text: 'La mantenemos. Te ajusto el jueves para que llegues fresco.',
    time: '10:08',
  },
]

export default function WhatsappPreview() {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-xl shadow-slate-200/60">
      <div className="flex items-center gap-3 border-b border-slate-100 bg-navy px-5 py-4">
        <div className="flex h-9 w-9 items-center justify-center rounded-full bg-orange text-xs font-bold text-white">
          AG
        </div>
        <div>
          <p className="font-display text-sm font-bold text-white">Alberto · Lógica Fit</p>
          <p className="flex items-center gap-1 text-[11px] text-slate-300">
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" /> Responde en el día
          </p>
        </div>
      </div>

      <div className="space-y-2.5 bg-surface-soft/60 p-4">
        {MESSAGES.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'coach' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[80%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
                m.from === 'coach'
                  ? 'rounded-tr-sm bg-orange text-white'
                  : 'rounded-tl-sm bg-white text-navy-light'
              }`}
            >
              {m.text}
              <div
                className={`mt-1 text-right text-[10px] ${
                  m.from === 'coach' ? 'text-white/70' : 'text-text-secondary'
                }`}
              >
                {m.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}