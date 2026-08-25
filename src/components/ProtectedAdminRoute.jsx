import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { ADMIN_EMAIL } from '../lib/adminConfig'

export default function ProtectedAdminRoute({ children }) {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <p className="text-sm text-text-secondary">Cargando…</p>
      </div>
    )
  }

  if (!user || !ADMIN_EMAIL || user.email !== ADMIN_EMAIL) {
    return <Navigate to="/login" replace />
  }

  return children
}