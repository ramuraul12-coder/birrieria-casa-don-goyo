import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const raiz = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// En producción el HTML ya viene renderizado (ver scripts/prerender.mjs): se hidrata.
// En desarrollo el contenedor está vacío: se monta desde cero.
if (raiz.hasChildNodes()) {
  hydrateRoot(raiz, app)
} else {
  createRoot(raiz).render(app)
}
