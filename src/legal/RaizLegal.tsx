import { LazyMotion, MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import type { IdDocumento } from './documentos'
import { PaginaLegal } from './PaginaLegal'

// Lo que se monta en cada página legal; igual que RaizInicio, lo comparten el navegador y el prerender
// Se pide al montar; ver lib/animaciones.ts
const cargarAnimaciones = () => import('@/lib/animaciones').then((modulo) => modulo.default)

export function RaizLegal({ id }: { id: IdDocumento }) {
  return (
    <StrictMode>
      <MotionConfig reducedMotion="user">
        {/* Animaciones en su versión liviana: solo lo que la web usa (sin arrastre ni animaciones de layout).
            «strict» avisa si algún componente usa la versión completa por error */}
        <LazyMotion features={cargarAnimaciones} strict>
          <PaginaLegal id={id} />
        </LazyMotion>
      </MotionConfig>
    </StrictMode>
  )
}
