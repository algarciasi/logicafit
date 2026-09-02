import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AuthProvider, useAuth } from './context/AuthContext'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import ProtectedRoute from './components/ProtectedRoute'
import ProtectedAdminRoute from './components/ProtectedAdminRoute'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Demo from './pages/Demo'
import Calculadoras from './pages/Calculadoras'
import Calculadora from './pages/Calculadora'
import CalculadoraRunning from './pages/CalculadoraRunning'
import Blog from './pages/Blog'
import CasosReales from './pages/CasosReales'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import StravaCallback from './pages/StravaCallback'
import AdminClients from './pages/admin/AdminClients'
import AdminClientDetail from './pages/admin/AdminClientDetail'
import About from './components/About'
import Aprende from './pages/Aprende'
import Article from './pages/Article'
import { isAdminEmail } from './lib/adminConfig'

// Detecta si corre dentro de Capacitor (app nativa Android/iOS)
const isNativeApp = () =>
  typeof window !== 'undefined' && window.Capacitor !== undefined

// En app nativa, redirige rutas no disponibles al inicio
function NativeOnly({ children }) {
  if (isNativeApp()) return <Navigate to="/" replace />
  return children
}

// Ruta raíz inteligente
function RootRoute() {
  const { user, loading } = useAuth()
  if (loading) return null
  if (isNativeApp()) {
    if (!user) return <Navigate to="/login" replace />
    if (isAdminEmail(user.email)) return <Navigate to="/admin/clientes" replace />
    return <Navigate to="/dashboard" replace />
  }
  return <Home />
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<RootRoute />} />

            {/* Solo disponibles en web */}
            <Route path="/planes"       element={<NativeOnly><Planes /></NativeOnly>} />
            <Route path="/demo"         element={<NativeOnly><Demo /></NativeOnly>} />
            <Route path="/blog"         element={<NativeOnly><Blog /></NativeOnly>} />
            <Route path="/casos-reales" element={<NativeOnly><CasosReales /></NativeOnly>} />
            <Route path="/conoceme"     element={<NativeOnly><About /></NativeOnly>} />

            {/* Disponibles en web y en app */}
            <Route path="/calculadoras"        element={<Calculadoras />} />
            <Route path="/calculadora"         element={<Calculadora />} />
            <Route path="/calculadora-running" element={<CalculadoraRunning />} />
            <Route path="/aprende"             element={<Aprende />} />
            <Route path="/aprende/:slug"       element={<Article />} />
            <Route path="/login"               element={<Login />} />

            {/* Rutas protegidas */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/strava/callback"
              element={
                <ProtectedRoute>
                  <StravaCallback />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/clientes"
              element={
                <ProtectedAdminRoute>
                  <AdminClients />
                </ProtectedAdminRoute>
              }
            />
            <Route
              path="/admin/clientes/:id"
              element={
                <ProtectedAdminRoute>
                  <AdminClientDetail />
                </ProtectedAdminRoute>
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </AuthProvider>
  )
}

export default App