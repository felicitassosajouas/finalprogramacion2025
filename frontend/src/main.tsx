import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router'
import './index.css'

// 🔥 Aplicar tema guardado antes de renderizar
const savedTheme = localStorage.getItem("theme")

if (savedTheme === "dark") {
  document.documentElement.classList.add("dark")
} else {
  document.documentElement.classList.remove("dark")
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Toaster richColors position='top-right'/> */}
    <Router />
  </StrictMode>,
)