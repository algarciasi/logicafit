// El email del entrenador/admin se define en tu .env como VITE_ADMIN_EMAIL.
// Cualquier usuario logueado con ese email verá el panel de administración.
export const ADMIN_EMAIL = (import.meta.env.VITE_ADMIN_EMAIL || '').trim().toLowerCase()

export function isAdminEmail(email) {
  if (!ADMIN_EMAIL || !email) return false
  return email.trim().toLowerCase() === ADMIN_EMAIL
}