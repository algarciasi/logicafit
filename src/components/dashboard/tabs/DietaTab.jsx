import EmptyState from '../EmptyState'

export default function DietaTab() {
  return (
    <EmptyState
      icon="🍽️"
      title="Todavía no tienes un plan de nutrición"
      body="Tu menú, macros y lista de la compra aparecerán aquí en cuanto lo prepare."
    />
  )
}