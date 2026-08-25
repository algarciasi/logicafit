import EmptyState from '../EmptyState'

export default function InicioTab({ userEmail }) {
  return (
    <div>
      <p className="font-display text-lg font-bold text-navy">
        Hola {userEmail?.split('@')[0] || ''} 👋
      </p>
      <div className="mt-6">
        <EmptyState
          icon="🗓️"
          title="Aún no tienes ningún entreno asignado"
          body="En cuanto diseñe tu plan lo verás aquí. Si tienes prisa, escríbeme."
        />
      </div>
    </div>
  )
}