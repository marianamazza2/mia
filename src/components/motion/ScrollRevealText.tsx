import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { Fragment, useRef } from 'react'
import { Destacado } from '@/components/marca/Destacado'

type Segment = {
  text: string
  /** En caligrafía (Destacado con «firma») */
  firma?: boolean
  /** Va pegado al segmento anterior, sin espacio (por ejemplo, el punto final) */
  pegado?: boolean
}

type ScrollRevealTextProps = {
  segments: Segment[]
  className?: string
}

// El texto se va "encendiendo" palabra por palabra a medida que se hace scroll
export function ScrollRevealText({ segments, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()
  // Arranca cuando el texto asoma por abajo y termina cuando su última línea llega a dos tercios de la pantalla:
  // así se lee entero, encendido, antes de que suba hacia el borde de arriba
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.95', 'end 0.68'] })

  const total = segments.reduce((suma, { text }) => suma + text.split(' ').length, 0)
  let indice = 0

  return (
    <h2 ref={ref} className={className}>
      {segments.map(({ text, firma, pegado }, s) => {
        const palabras = text.split(' ').map((palabra, p) => {
          const i = indice++
          return (
            <Fragment key={i}>
              {p > 0 && ' '}
              <Word progress={scrollYProgress} range={[i / total, (i + 1) / total]} static={!!reduceMotion}>
                {palabra}
              </Word>
            </Fragment>
          )
        })

        return (
          <Fragment key={s}>
            {s > 0 && !pegado && ' '}
            {firma ? <Destacado firma>{palabras}</Destacado> : palabras}
          </Fragment>
        )
      })}
    </h2>
  )
}

type WordProps = {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  static: boolean
}

function Word({ children, progress, range, static: isStatic }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1])

  return <motion.span style={isStatic ? undefined : { opacity }}>{children}</motion.span>
}
