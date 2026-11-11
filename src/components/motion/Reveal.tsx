import { motion } from 'motion/react'
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
  className?: string
}

// Aparece suave al entrar en pantalla, una sola vez
export function Reveal({ children, delay = 0, y = 24, duracion = 1.1, curva = 'suave', className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: duracion, ease: curva === 'serena' ? easeSereno : easeSuave, delay }}
    >
      {children}
    </motion.div>
  )
}
