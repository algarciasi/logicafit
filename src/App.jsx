import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext'
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

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <ScrollToTop />
        <div className="min-h-screen bg-white">
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/planes" element={<Planes />} />
            <Route path="/demo" element={<Demo />} />
            <Route path="/calculadoras" element={<Calculadoras />} />
            <Route path="/calculadora" element={<Calculadora />} />
            <Route path="/calculadora-running" element={<CalculadoraRunning />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/casos-reales" element={<CasosReales />} />
            <Route path="/login" element={<Login />} />
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