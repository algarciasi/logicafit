const MESSAGES = [
  { from: 'client', text: 'Se me complicó el finde, ¿qué hago con la sesión de hoy?', time: '09:14' },
  { from: 'coach', text: 'Sin problema. La pasamos a mañana y te ajusto el resto de la semana 👍', time: '09:16' },
  { from: 'client', text: '¿Puedo cambiar el pollo por atún en la comida?', time: '14:02' },
  { from: 'coach', text: 'Claro, mismos macros. Te lo dejo anotado en tu plan de hoy.', time: '14:05' },
  { from: 'client', text: 'Llevo 3 semanas sin fallar ni un día 💪', time: '19:40' },
  { from: 'coach', text: 'Se nota en tus números. Vamos a subir un poco la carga esta semana.', time: '19:42' },
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
            <span className="h-1.5 w-1.5 rounded-full bg-whatsapp" /> En línea
          </p>
        </div>
      </div>

      <div className="space-y-2.5 bg-surface-soft/60 p-4">
        {MESSAGES.map((m, i) => (
          <div key={i} className={`flex ${m.from === 'coach' ? 'justify-end' : 'justify-start'}`}>
            <div
              className={`max-w-[78%] rounded-2xl px-3.5 py-2 text-[13px] leading-snug shadow-sm ${
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

      <div className="border-t border-slate-100 bg-white px-4 py-2.5 text-center text-[11px] text-text-secondary">
        Así es hablar con tu entrenador. Todos los días, no solo el día de sesión.
      </div>
    </div>
  )
}