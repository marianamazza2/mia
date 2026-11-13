import { LazyMotion, MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import App from '@/App'

// Lo que se monta en la landing. Lo usan el navegador (main.tsx) y el prerender (entry-server.tsx):
// tiene que ser exactamente el mismo árbol en los dos lados para que la hidratación coincida
// Se pide al montar; ver lib/animaciones.ts
const cargarAnimaciones = () => import('@/lib/animaciones').then((modulo) => modulo.default)

export function RaizInicio() {
  return (
    <StrictMode>
      {/* Respeta "reducir movimiento" del sistema operativo */}
      <MotionConfig reducedMotion="user">
        {/* Animaciones en su versión liviana: solo lo que la web usa (sin arrastre ni animaciones de layout).
            «strict» avisa si algún componente usa la versión completa por error */}
        <LazyMotion features={cargarAnimaciones} strict>
          <App />
        </LazyMotion>
      </MotionConfig>
    </StrictMode>
  )
}
