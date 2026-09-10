export default function EmptyState({ icon, title, body }) {
  return (
    <div className="flex flex-col items-center justify-center rounded-[2.5rem] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-100 animate-fade-in-up">
      {/* Icono */}
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange/10 text-3xl">
        {icon}
      </div>

      {/* Título y Texto */}
      <h3 className="mt-5 font-display text-xl font-bold text-navy">
        {title}
      </h3>
      <p className="mt-3 max-w-xs text-sm text-slate-500 font-medium leading-relaxed">
        {body}
      </p>

      {/* Botón WhatsApp funcional */}
      <a
        href="https://wa.me/34678951544?text=Hola!%20Estaba%20revisando%20mi%20área%20de%20cliente%20y%20tengo%20una%20duda..."
        target="_blank"
        rel="noopener noreferrer"
        className="mt-8 inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3.5 text-sm font-bold text-white shadow-md shadow-green-500/20 transition-all hover:scale-105 hover:bg-[#20b858] active:scale-95"
      >
        Hablar con Alberto
      </a>
    </div>
  )
}