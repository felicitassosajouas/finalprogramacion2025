import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Router from './router'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* <Toaster richColors position='top-right'/> */}
    <Router />
  </StrictMode>,
)
