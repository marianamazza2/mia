import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import { cn } from '@/lib/cn'

type Segment = { text: string; em?: boolean }

type ScrollRevealTextProps = {
  segments: Segment[]
  className?: string
}

// El texto se va "encendiendo" palabra por palabra a medida que se hace scroll
export function ScrollRevealText({ segments, className }: ScrollRevealTextProps) {
  const ref = useRef<HTMLHeadingElement>(null)
  const reduceMotion = useReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.85', 'end 0.4'] })

  const words = segments.flatMap(({ text, em }) => text.split(' ').map((word) => ({ word, em })))

  return (
    <h2 ref={ref} className={className}>
      {words.map(({ word, em }, i) => (
        <Word
          key={i}
          progress={scrollYProgress}
          range={[i / words.length, (i + 1) / words.length]}
          static={!!reduceMotion}
          className={cn(em && 'italic text-dorado-suave')}
        >
          {word}
        </Word>
      ))}
    </h2>
  )
}

type WordProps = {
  children: string
  progress: MotionValue<number>
  range: [number, number]
  static: boolean
  className?: string
}

function Word({ children, progress, range, static: isStatic, className }: WordProps) {
  const opacity = useTransform(progress, range, [0.16, 1])

  return (
    <>
      <motion.span className={className} style={isStatic ? undefined : { opacity }}>
        {children}
      </motion.span>{' '}
    </>
  )
}
