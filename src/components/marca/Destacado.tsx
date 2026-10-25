import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { easeSereno } from '@/lib/motion'

type DestacadoProps = {
  children: ReactNode
  /** Segundos de espera antes de dibujarse */
  delay?: number
  /** Toma el estado «oculto / visible» del padre (la portada, que espera a la intro) en vez de su propia entrada en pantalla */
  heredar?: boolean
  className?: string
}

// Destaca una parte de una frase sin cambiarle el color ni ponerla en itálica: las palabras
// se apoyan en un filete dorado suave que se dibuja despacio, de izquierda a derecha, como los títulos del manual.
// El grosor acompaña al tamaño del texto, sin bajar de 1 px.
export function Destacado({ children, delay = 0.4, heredar = false, className }: DestacadoProps) {
  const entrada = heredar
    ? {}
    : { initial: 'oculto', whileInView: 'visible', viewport: { once: true, margin: '0px 0px -15% 0px' } }

  return (
    <motion.em className={cn('relative inline-block whitespace-nowrap not-italic', className)} {...entrada}>
      {children}
      <motion.span
        aria-hidden
        className="absolute -right-[0.12em] bottom-[0.04em] -left-[0.04em] h-[max(1px,0.015em)] origin-left bg-dorado-suave"
        variants={{ oculto: { scaleX: 0 }, visible: { scaleX: 1 } }}
        transition={{ duration: 2.8, ease: easeSereno, delay }}
      />
    </motion.em>
  )
}
