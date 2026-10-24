import { motion, useReducedMotion } from 'motion/react'
import aBurdeos from '@/assets/brand/a_mia_burdeos.svg'

const palabras = ['Liderazgo', 'Organización', 'Negocio', 'Criterio', 'Movimiento']

// Franja que corre muy lenta: palabras del trabajo de Mía separadas por la «a»
export function CintaA() {
  const reduceMotion = useReducedMotion()
  // Dos copias seguidas: al llegar a la mitad, el bucle no se nota
  const fila = [...palabras, ...palabras]

  return (
    <div id="cinta" aria-hidden className="overflow-hidden border-y border-dorado/40 bg-crema py-7">
      <motion.div
        className="flex w-max"
        animate={reduceMotion ? undefined : { x: ['0%', '-50%'] }}
        transition={{ duration: 60, ease: 'linear', repeat: Infinity }}
      >
        {[0, 1].map((copia) => (
          <div key={copia} className="flex shrink-0 items-center">
            {fila.map((palabra, i) => (
              <span key={`${palabra}-${i}`} className="flex items-center">
                <span className="px-10 font-serif text-3xl text-negro/80 italic sm:text-4xl">{palabra}</span>
                <img src={aBurdeos} alt="" className="size-8 sm:size-9" />
              </span>
            ))}
          </div>
        ))}
      </motion.div>
    </div>
  )
}
