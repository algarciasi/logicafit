import EmptyState from '../EmptyState'

export default function ProgresoTab() {
  return (
    <EmptyState
      icon="📈"
      title="Todavía no hay progreso registrado"
      body="Cuando empieces a entrenar, aquí verás tu evolución de peso, sesiones y esfuerzo."
    />
  )
}