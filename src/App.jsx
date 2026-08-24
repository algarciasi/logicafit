import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Demo from './pages/Demo'
import Calculadora from './pages/Calculadora'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/demo" element={<Demo />} />
          <Route path="/calculadora" element={<Calculadora />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App