import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/inter/wght.css'
import '@fontsource/windsong/400.css'
import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    {/* Respeta "reducir movimiento" del sistema operativo */}
    <MotionConfig reducedMotion="user">
      <App />
    </MotionConfig>
  </StrictMode>,
)
