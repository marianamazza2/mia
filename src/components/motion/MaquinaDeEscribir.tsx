import { motion, useInView, useReducedMotion } from 'motion/react'
import { Fragment, useEffect, useRef, useState } from 'react'
import { Destacado } from '@/components/marca/Destacado'
import { cn } from '@/lib/cn'

type Linea = {
  texto: string
  destacado?: boolean
}

type MaquinaDeEscribirProps = {
  lineas: Linea[]
  className?: string
  /** Milisegundos por letra */
  ritmo?: number
  /** Pausa antes de empezar, en milisegundos */
  espera?: number
  /** Avisa cuando empieza a escribirse cada línea (0, 1…): para que otras piezas entren a tiempo */
  alEmpezarLinea?: (linea: number) => void
}

// Pausa en el salto de línea, como el carro de la máquina que vuelve
const PAUSA_LINEA = 380

// Las letras aparecen una a una, como en una máquina de escribir, con un cursor dorado fino que las sigue.
// Las que faltan ya ocupan su lugar (transparentes): el texto no se reacomoda mientras se escribe.
// Al terminar, el cursor parpadea un momento y se apaga. «lineas» tiene que ser estable (una constante):
// si cambia, la escritura vuelve a empezar.
export function MaquinaDeEscribir({
  lineas,
  className,
  ritmo = 75,
  espera = 300,
  alEmpezarLinea,
}: MaquinaDeEscribirProps) {
  const ref = useRef<HTMLQuoteElement>(null)
  const enPantalla = useInView(ref, { once: true, margin: '0px 0px -20% 0px' })
  const reduceMotion = useReducedMotion()
  const total = lineas.reduce((suma, linea) => suma + linea.texto.length, 0)
  const [escritas, setEscritas] = useState(0)
  const [cursorVisible, setCursorVisible] = useState(true)
  const visibles = reduceMotion ? total : escritas
  const conCursor = !reduceMotion && cursorVisible
  // El aviso se guarda aparte: si quien lo pasa lo crea de nuevo en cada render, la escritura no se reinicia
  const aviso = useRef(alEmpezarLinea)
  useEffect(() => {
    aviso.current = alEmpezarLinea
  })

  useEffect(() => {
    if (!enPantalla) return
    if (reduceMotion) {
      // Todo a la vista de entrada: las demás piezas también
      lineas.forEach((_, l) => aviso.current?.(l))
      return
    }
    const tiempos: number[] = []
    let momento = espera
    let indice = 0
    lineas.forEach((linea, l) => {
      if (l > 0) momento += PAUSA_LINEA
      tiempos.push(window.setTimeout(() => aviso.current?.(l), momento))
      for (let c = 0; c < linea.texto.length; c++) {
        indice++
        const hasta = indice
        // Un ritmo apenas irregular, como el de una mano: los espacios van un poco más rápido
        momento += linea.texto[c] === ' ' ? ritmo * 0.6 : ritmo * (0.85 + ((c * 7) % 5) * 0.075)
        tiempos.push(window.setTimeout(() => setEscritas(hasta), momento))
      }
    })
    tiempos.push(window.setTimeout(() => setCursorVisible(false), momento + 2600))
    return () => tiempos.forEach((t) => window.clearTimeout(t))
  }, [enPantalla, reduceMotion, lineas, ritmo, espera])

  // Dónde empieza cada línea dentro de la cuenta total de letras
  const inicios = lineas.map((_, l) => lineas.slice(0, l).reduce((suma, linea) => suma + linea.texto.length, 0))

  return (
    <blockquote ref={ref} className={className} aria-label={lineas.map((l) => l.texto).join(' ')}>
      {lineas.map((linea, l) => {
        const desde = inicios[l]
        const letras = (
          <span aria-hidden>
            {[...linea.texto].map((letra, c) => {
              const i = desde + c
              // El cursor va detrás de la última letra escrita (antes de la primera, mientras espera);
              // no ocupa lugar, así no empuja el texto
              return (
                <Fragment key={c}>
                  {conCursor && visibles === 0 && i === 0 && <Cursor />}
                  <span className={cn(i >= visibles && 'opacity-0')}>{letra}</span>
                  {conCursor && i === visibles - 1 && <Cursor />}
                </Fragment>
              )
            })}
          </span>
        )
        return (
          <span key={l} className="block">
            {linea.destacado ? <Destacado>{letras}</Destacado> : letras}
          </span>
        )
      })}
    </blockquote>
  )
}

function Cursor() {
  return (
    <span className="relative inline-block w-0 align-baseline">
      <motion.span
        className="absolute bottom-[-0.08em] left-[0.06em] h-[0.9em] w-px bg-dorado-suave"
        animate={{ opacity: [1, 1, 0, 0] }}
        transition={{ duration: 1, times: [0, 0.5, 0.55, 1], repeat: Infinity }}
      />
    </span>
  )
}
