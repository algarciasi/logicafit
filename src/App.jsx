import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import ScrollToTop from './components/ScrollToTop'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Demo from './pages/Demo'
import Calculadora from './pages/Calculadora'
import CalculadoraRunning from './pages/CalculadoraRunning'
import Blog from './pages/Blog'

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/calculadora" element={<Calculadora />} />
          <Route path="/calculadora-running" element={<CalculadoraRunning />} />
          <Route path="/blog" element={<Blog />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App