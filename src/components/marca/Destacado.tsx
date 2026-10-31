import { motion } from 'motion/react'
import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { easeSereno } from '@/lib/motion'

type DestacadoProps = {
  children: ReactNode
  /** En WindSong, la caligrafía: la palabra aparece como escrita a mano */
  firma?: boolean
  className?: string
}

// Marca la parte de una frase que se dice con más voz. Sin «firma» no cambia el texto (se quitó el filete
// dorado); queda marcada para poder probar otros tratamientos. Con «firma», va en WindSong, al mismo
// tamaño que el texto que la rodea (su letra es chica, así no invade), y se descubre de izquierda a derecha, despacio, como un trazo
export function Destacado({ children, firma = false, className }: DestacadoProps) {
  if (!firma) return <em className={cn('not-italic', className)}>{children}</em>

  return (
    // El observador va en el contenedor: con el recorte completo el navegador da al texto por invisible
    <motion.em
      className={cn('inline-block font-firma text-[1em] leading-none font-normal not-italic', className)}
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      <motion.span
        className="inline-block"
        // Márgenes negativos en el recorte: los trazos de la caligrafía salen de la caja de la letra
        variants={{
          oculto: { clipPath: 'inset(-0.4em 100% -0.4em -0.4em)' },
          visible: { clipPath: 'inset(-0.4em -0.4em -0.4em -0.4em)' },
        }}
        transition={{ duration: 2.6, ease: easeSereno, delay: 0.3 }}
      >
        {children}
      </motion.span>
    </motion.em>
  )
}
