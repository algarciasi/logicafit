import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Planes from './pages/Planes'
import Demo from './pages/Demo'

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-white">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/planes" element={<Planes />} />
          <Route path="/demo" element={<Demo />} />
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App