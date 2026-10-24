import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useLayoutEffect, useRef, useState } from 'react'
import aCrema from '@/assets/brand/a_mia_crema.svg'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'
import { useMediaQuery } from '@/lib/useMediaQuery'

// Textos provisorios: hay que validarlos con Marina
const pasos = [
  {
    titulo: 'Primera conversación',
    texto: 'Nos conocemos y escuchamos qué está pasando en tu empresa y qué te trae hasta aquí.',
  },
  {
    titulo: 'Lectura de la situación',
    texto: 'Observamos cómo se toman las decisiones, qué se delega y qué se repite, para comprender lo que organiza el funcionamiento.',
  },
  {
    titulo: 'Diseño del proceso',
    texto: 'Definimos juntas el foco, los tiempos y el formato del acompañamiento según el momento de la empresa.',
  },
  {
    titulo: 'Acompañamiento',
    texto: 'Trabajamos sobre la relación entre liderazgo y organización, con criterio y sin perder de vista el negocio.',
  },
  {
    titulo: 'Cierre y continuidad',
    texto: 'Revisamos lo recorrido, consolidamos lo que cambió y dejamos claro cómo sostenerlo.',
  },
]

const numero = (i: number) => String(i + 1).padStart(2, '0')

export function Metodologia() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useReducedMotion()

  return (
    <section id="metodologia" className="relative bg-burdeos-profundo text-crema">
      {isDesktop && !reduceMotion ? <LineaHorizontal /> : <LineaVertical />}
    </section>
  )
}

function Encabezado() {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow tone="light">Metodología</Eyebrow>
        <h2 className="mt-8 text-titulo lg:mt-6 lg:bajo:text-5xl">
          Cómo <em className="font-medium text-dorado-suave">trabajamos.</em>
        </h2>
      </div>
      <p className="text-cuerpo text-crema/70 lg:col-span-4 lg:col-start-9">
        Un recorrido con etapas claras, que se adapta al ritmo y al momento de cada empresa.
      </p>
    </div>
  )
}

// Escritorio: la sección queda fija y la línea de tiempo avanza en horizontal con el scroll
function LineaHorizontal() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const trackRef = useRef<HTMLDivElement>(null)
  const pasoRefs = useRef<(HTMLLIElement | null)[]>([])
  const [medidas, setMedidas] = useState({ distancia: 0, ancho: 1, cabezal: 0, nodos: [] as number[] })

  useLayoutEffect(() => {
    // El cabezal es el centro de la pantalla: todo lo que pasó por ahí queda encendido
    const medir = () => {
      const track = trackRef.current
      if (!track) return
      setMedidas({
        distancia: Math.max(track.scrollWidth - window.innerWidth, 0),
        ancho: track.scrollWidth,
        cabezal: window.innerWidth / 2,
        nodos: pasoRefs.current.map((paso) => (paso ? paso.offsetLeft + paso.offsetWidth / 2 : 0)),
      })
    }
    medir()
    const observer = new ResizeObserver(medir)
    observer.observe(trackRef.current!)
    window.addEventListener('resize', medir)
    return () => {
      observer.disconnect()
      window.removeEventListener('resize', medir)
    }
  }, [])

  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start start', 'end end'] })
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 })
  const x = useTransform(progreso, (v) => -v * medidas.distancia)
  // Hasta dónde llegó la línea dorada, en píxeles del recorrido
  const relleno = useTransform(progreso, (v) => medidas.cabezal + v * medidas.distancia)
  const rellenoEscala = useTransform(relleno, (px) => Math.min(px / medidas.ancho, 1))
  const pasoActual = useTransform(relleno, (px) => medidas.nodos.filter((nodo) => px >= nodo - 110).length)

  return (
    <div ref={sectionRef} style={{ height: `calc(100svh + ${medidas.distancia * 1.3}px)` }}>
      <div className="sticky top-0 flex h-svh flex-col overflow-hidden">
        <img
          aria-hidden
          src={aCrema}
          alt=""
          className="pointer-events-none absolute -bottom-[20%] -left-[8%] w-[38%] opacity-[0.04]"
        />

        <Container className="relative pt-28 bajo:pt-24">
          <Reveal>
            <Encabezado />
          </Reveal>
        </Container>

        <div className="relative flex flex-1 items-center">
          <motion.div ref={trackRef} className="relative flex w-max" style={{ x }}>
            {/* Riel y relleno dorado */}
            <span aria-hidden className="absolute inset-x-0 top-1/2 h-px bg-crema/15" />
            <motion.span
              aria-hidden
              className="absolute inset-x-0 top-1/2 h-px origin-left bg-dorado-suave"
              style={{ scaleX: rellenoEscala }}
            />

            <ol className="relative flex pr-[calc(50vw-12rem)] pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
              {pasos.map((paso, i) => (
                <PasoHorizontal
                  key={paso.titulo}
                  index={i}
                  paso={paso}
                  relleno={relleno}
                  nodoX={medidas.nodos[i] ?? 0}
                  pasoRef={(paso) => {
                    pasoRefs.current[i] = paso
                  }}
                />
              ))}
            </ol>
          </motion.div>
        </div>

        <Container className="relative flex items-center justify-between pb-8 text-[0.6875rem] tracking-[0.3em] text-crema/50 uppercase">
          <span>Desliza para recorrer</span>
          <span className="flex items-center gap-3 font-serif text-base tracking-normal normal-case">
            <ContadorPaso valor={pasoActual} />
            <span className="h-px w-8 bg-crema/30" />
            <span>{numero(pasos.length - 1)}</span>
          </span>
        </Container>
      </div>
    </div>
  )
}

function ContadorPaso({ valor }: { valor: MotionValue<number> }) {
  const texto = useTransform(valor, (v) => numero(Math.max(v, 1) - 1))
  return <motion.span className="text-dorado-suave">{texto}</motion.span>
}

type PasoHorizontalProps = {
  index: number
  paso: (typeof pasos)[number]
  relleno: MotionValue<number>
  nodoX: number
  pasoRef: (paso: HTMLLIElement | null) => void
}

function PasoHorizontal({ index, paso, relleno, nodoX, pasoRef }: PasoHorizontalProps) {
  const arriba = index % 2 === 0
  // 0 → la línea todavía no llegó; 1 → el paso está encendido
  const encendido = useTransform(relleno, [nodoX - 220, nodoX], [0, 1], { clamp: true })
  const opacidad = useTransform(encendido, [0, 1], [0.3, 1])
  const y = useTransform(encendido, [0, 1], [arriba ? 24 : -24, 0])
  const rellenoNumero = useTransform(encendido, (v) => `inset(${(1 - v) * 100}% 0 0 0)`)
  const escalaNodo = useTransform(encendido, [0.85, 1], [0.4, 1], { clamp: true })

  return (
    <li ref={pasoRef} className="relative w-[24rem] shrink-0">
      {/* Nodo sobre el riel */}
      <span
        aria-hidden
        className="absolute top-1/2 left-1/2 grid size-5 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-crema/30 bg-burdeos-profundo"
      >
        <motion.span className="size-2.5 rounded-full bg-dorado-suave" style={{ scale: escalaNodo, opacity: encendido }} />
      </span>
      {/* Tallo que une el nodo con el contenido */}
      <motion.span
        aria-hidden
        className={cn(
          'absolute left-1/2 h-8 w-px bg-dorado-suave/60 bajo:h-5',
          arriba ? 'bottom-1/2 mb-3 origin-bottom' : 'top-1/2 mt-3 origin-top',
        )}
        style={{ scaleY: encendido }}
      />

      <motion.div
        className={cn(
          'absolute inset-x-4 flex flex-col items-center text-center',
          arriba ? 'bottom-1/2 mb-13 bajo:mb-9' : 'top-1/2 mt-13 bajo:mt-9',
        )}
        style={{ opacity: opacidad, y }}
      >
        <span aria-hidden className="relative font-serif text-[4.5rem] leading-none font-medium italic bajo:text-[3.25rem]">
          <span className="text-transparent [-webkit-text-stroke:1px_rgb(247_245_241/0.35)]">{numero(index)}</span>
          <motion.span className="absolute inset-0 text-dorado-suave" style={{ clipPath: rellenoNumero }}>
            {numero(index)}
          </motion.span>
        </span>
        <h3 className="mt-3 text-[1.75rem] leading-tight text-crema bajo:mt-2 bajo:text-2xl">{paso.titulo}</h3>
        <p className="mt-2 max-w-[21rem] text-[0.9375rem] leading-relaxed text-crema/70 bajo:text-sm">{paso.texto}</p>
      </motion.div>
    </li>
  )
}

// Móvil y tablet: línea vertical que se va llenando a medida que se baja
function LineaVertical() {
  const listaRef = useRef<HTMLOListElement>(null)
  const { scrollYProgress } = useScroll({ target: listaRef, offset: ['start 0.65', 'end 0.65'] })

  return (
    <Container className="py-seccion">
      <Reveal>
        <Encabezado />
      </Reveal>

      <ol ref={listaRef} className="relative mt-16 sm:mt-20">
        <span aria-hidden className="absolute top-2 bottom-2 left-[9px] w-px bg-crema/15" />
        <motion.span
          aria-hidden
          className="absolute top-2 bottom-2 left-[9px] w-px origin-top bg-dorado-suave"
          style={{ scaleY: scrollYProgress }}
        />
        {pasos.map((paso, i) => (
          <motion.li
            key={paso.titulo}
            className="group relative pb-14 pl-14 last:pb-0"
            initial="apagado"
            whileInView="encendido"
            viewport={{ once: true, margin: '0px 0px -35% 0px' }}
          >
            <span
              aria-hidden
              className="absolute top-2 left-0 grid size-5 place-items-center rounded-full border border-crema/30 bg-burdeos-profundo"
            >
              <motion.span
                className="size-2.5 rounded-full bg-dorado-suave"
                variants={{ apagado: { scale: 0, opacity: 0 }, encendido: { scale: 1, opacity: 1 } }}
                transition={{ duration: 0.6, ease: easeSuave }}
              />
            </span>
            <motion.div
              variants={{ apagado: { opacity: 0.3, x: 12 }, encendido: { opacity: 1, x: 0 } }}
              transition={{ duration: 0.9, ease: easeSuave }}
            >
              <span aria-hidden className="font-serif text-5xl leading-none font-medium text-dorado-suave italic">
                {numero(i)}
              </span>
              <h3 className="mt-3 text-[1.75rem] leading-tight">{paso.titulo}</h3>
              <p className="mt-3 max-w-md text-[0.9375rem] leading-relaxed text-crema/70">{paso.texto}</p>
            </motion.div>
          </motion.li>
        ))}
      </ol>
    </Container>
  )
}
