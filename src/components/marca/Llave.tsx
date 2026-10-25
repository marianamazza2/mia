import { motion, useMotionValue, useReducedMotion, type MotionValue } from 'motion/react'
import { cn } from '@/lib/cn'

type LlaveProps = {
  /** 0 → sin dibujar, 1 → dibujada. Si no se pasa, aparece dibujada. */
  progreso?: MotionValue<number>
  className?: string
}

// Llave antigua a línea fina, que se dibuja con el scroll. Elemento de fondo, nunca protagonista.
export function Llave({ progreso, className }: LlaveProps) {
  const reduceMotion = useReducedMotion()
  const dibujada = useMotionValue(1)
  const trazo = reduceMotion || !progreso ? dibujada : progreso

  return (
    <svg
      aria-hidden
      viewBox="0 0 100 320"
      fill="none"
      stroke="currentColor"
      strokeWidth="0.6"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={cn('pointer-events-none', className)}
    >
      {/* Ojo de la llave: anillo doble con calado interior */}
      <Trazo progreso={trazo} d="M50 6 C70 6 84 22 84 44 C84 66 70 82 50 82 C30 82 16 66 16 44 C16 22 30 6 50 6 Z" />
      <Trazo progreso={trazo} d="M50 18 C63 18 72 29 72 44 C72 59 63 70 50 70 C37 70 28 59 28 44 C28 29 37 18 50 18 Z" />
      <Trazo
        progreso={trazo}
        d="M50 30 C54 36 56 40 50 44 C44 40 46 36 50 30 Z M50 58 C46 52 44 48 50 44 C56 48 54 52 50 58 Z M36 44 C42 40 46 38 50 44 C46 50 42 48 36 44 Z M64 44 C58 48 54 50 50 44 C54 38 58 40 64 44 Z"
      />
      {/* Cuello con anillos */}
      <Trazo progreso={trazo} d="M41 88 C41 84 59 84 59 88 C59 92 41 92 41 88 Z" />
      <Trazo progreso={trazo} d="M43 97 C43 94 57 94 57 97 C57 100 43 100 43 97 Z" />
      {/* Caña */}
      <Trazo progreso={trazo} d="M46 82 V100 M54 82 V100 M46.5 100 V292 M53.5 100 V292" />
      {/* Paletón */}
      <Trazo progreso={trazo} d="M53.5 236 H82 V250 H74 V260 H82 V278 H66 V286 H53.5" />
      {/* Punta */}
      <Trazo progreso={trazo} d="M44 292 C44 289 56 289 56 292 C56 296 44 296 44 292 Z" />
    </svg>
  )
}

function Trazo({ d, progreso }: { d: string; progreso: MotionValue<number> }) {
  return <motion.path d={d} vectorEffect="non-scaling-stroke" style={{ pathLength: progreso }} />
}
