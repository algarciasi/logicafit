import EmptyState from '../EmptyState'

export default function ExtrasTab({ client }) {
  if (!client) {
    return (
      <EmptyState
        icon="🔍"
        title="Ficha no encontrada"
        body="Tu cuenta existe pero no está vinculada a ningún cliente todavía. Escríbeme y lo reviso."
      />
    )
  }

  return (
    <div className="flex flex-col gap-6 pb-24 animate-fade-in">

      <div>
        <p className="text-sm font-bold tracking-widest text-orange uppercase">
          Material adicional
        </p>
        <h2 className="font-display text-3xl font-extrabold text-navy mt-1">
          Extras
        </h2>
      </div>

      <div className="flex flex-col items-center justify-center rounded-[2rem] bg-white px-6 py-16 text-center shadow-sm ring-1 ring-slate-100">
        <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-orange/10">
          <svg className="h-8 w-8 text-orange" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
          </svg>
        </div>

        <p className="mt-5 font-display text-lg font-bold text-navy">
          En construcción
        </p>
        <p className="mt-2 max-w-xs text-sm text-slate-400">
          Estoy preparando esta sección. Pronto tendrás aquí material
          adicional para tu entrenamiento.
        </p>
      </div>

    </div>
  )
}