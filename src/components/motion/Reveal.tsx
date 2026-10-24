import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { easeSuave } from '@/lib/motion'

type RevealProps = {
  children: ReactNode
  delay?: number
  y?: number
  className?: string
}

// Aparece suave al entrar en pantalla, una sola vez
export function Reveal({ children, delay = 0, y = 24, className }: RevealProps) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
      transition={{ duration: 1.1, ease: easeSuave, delay }}
    >
      {children}
    </motion.div>
  )
}
