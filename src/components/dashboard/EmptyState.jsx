export default function EmptyState({ icon, title, body }) {
  return (
    <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed border-slate-200 px-6 py-12 text-center">
      <span className="text-3xl">{icon}</span>
      <p className="font-display font-bold text-navy">{title}</p>
      <p className="max-w-xs text-sm text-text-secondary">{body}</p>
      <a
        href="https://wa.me/"
        className="mt-2 inline-flex items-center gap-2 rounded-full bg-whatsapp px-5 py-2.5 text-xs font-semibold text-white transition hover:brightness-95"
      >
        Escribir por WhatsApp
      </a>
    </div>
  )
}