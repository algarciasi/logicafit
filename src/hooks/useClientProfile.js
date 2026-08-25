import { useEffect, useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { getClientByEmail } from '../lib/clients'

// Vincula el usuario logueado (Supabase Auth) con su ficha en la tabla `clients`
// buscando por email — no asumimos que auth.users.id === clients.id.
export function useClientProfile() {
  const { user } = useAuth()
  const [client, setClient] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!user?.email) {
      setLoading(false)
      return
    }

    let active = true
    setLoading(true)

    getClientByEmail(user.email).then(({ client, error }) => {
      if (!active) return
      setClient(client)
      setError(error)
      setLoading(false)
    })

    return () => {
      active = false
    }
  }, [user?.email])

  return { client, loading, error }
}