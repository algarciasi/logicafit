import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { hideNativeSplash } from './lib/nativeSplash'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)

// Red de seguridad: si el usuario ya tiene sesión y no pasa por el Login,
// el splash nativo se quitaría igualmente. Es idempotente.
setTimeout(hideNativeSplash, 2500)
