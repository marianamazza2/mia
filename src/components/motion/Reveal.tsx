import { m } from 'motion/react'
import type { ReactNode } from 'react'
import { easeSereno, easeSuave } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  /** Segundos; más largo para textos que tienen que aparecer despacio */
  duracion?: number
  /** «serena»: parejo de principio a fin, sin el arranque rápido de la curva de siempre */
  curva?: 'suave' | 'serena'
  /** Si se pasa, aparece cuando pasa a «true» (no al entrar en pantalla): para atarlo a otra animación */
  mostrar?: boolean
  className?: string
}

// Aparece suave al entrar en pantalla, una sola vez (o cuando «mostrar» pasa a true)
export function Reveal({ children, delay = 0, y = 24, duracion = 1.1, curva = 'suave', mostrar, className }: RevealProps) {
  const oculto = { opacity: 0, y }
  const visible = { opacity: 1, y: 0 }
  const disparo =
    mostrar === undefined
      ? { whileInView: visible, viewport: { once: true, margin: '0px 0px -10% 0px' } }
      : { animate: mostrar ? visible : oculto }
  return (
    <m.div
      className={className}
      initial={oculto}
      {...disparo}
      transition={{ duration: duracion, ease: curva === 'serena' ? easeSereno : easeSuave, delay }}
    >
      {children}
    </m.div>
  )
}
