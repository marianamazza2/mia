import {
  motion,
  useInView,
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
import { Destacado } from '@/components/marca/Destacado'

const pasos = [
  {
    titulo: 'Conocemos tu punto de partida',
    texto: 'Hablamos del momento que atraviesa tu empresa y de aquello que se repite, aunque ya hayas probado otras soluciones.',
  },
  {
    titulo: 'Precisamos sobre qué trabajaremos y las alternativas posibles',
    texto: 'Analizamos las dificultades y los elementos que intervienen en ellas, para identificar posibilidades concretas de acción.',
  },
  {
    titulo: 'Diseñamos un camino y criterios para avanzar',
    texto: 'Definimos una orientación de trabajo a partir de tus objetivos, recursos y condiciones de tu empresa.',
  },
  {
    titulo: 'Llevamos las decisiones a la práctica',
    texto: 'Acompañamos su puesta en marcha, trabajando sobre los recursos y las condiciones necesarias para hacerlas posibles.',
  },
  {
    titulo: 'Ajustamos para consolidar',
    texto: 'Abordamos las situaciones que se presentan y redefinimos estrategias para consolidar las formas de funcionamiento que permiten sostener a la empresa.',
  },
]

const numero = (i: number) => String(i + 1).padStart(2, '0')

export function Metodologia() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useReducedMotion()

  return (
    <section id="metodologia" className="relative bg-burdeos-profundo text-crema">
      {isDesktop && !reduceMotion ? <LineaHorizontal /> : <LineaMovil />}
    </section>
  )
}

function Encabezado() {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow tone="light">Metodología</Eyebrow>
        <h2 className="mt-5 text-titulo lg:mt-6">
          Cómo <Destacado>trabajamos</Destacado>
        </h2>
      </div>
      <p className="hidden text-cuerpo text-crema/70 lg:col-span-4 lg:col-start-9 lg:block">
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

  // El recorrido empieza cuando la sección llega debajo de la navbar (80 px), que es donde se fija
  const { scrollYProgress } = useScroll({ target: sectionRef, offset: ['start 80px', 'end end'] })
  const progreso = useSpring(scrollYProgress, { stiffness: 140, damping: 32, mass: 0.4 })
  const x = useTransform(progreso, (v) => -v * medidas.distancia)
  // Hasta dónde llegó la línea dorada, en píxeles del recorrido
  const relleno = useTransform(progreso, (v) => medidas.cabezal + v * medidas.distancia)
  const rellenoEscala = useTransform(relleno, (px) => Math.min(px / medidas.ancho, 1))
  const pasoActual = useTransform(relleno, (px) => medidas.nodos.filter((nodo) => px >= nodo - 110).length)

  return (
    <div ref={sectionRef} style={{ height: `calc(100svh - 5rem + ${medidas.distancia * 1.3}px)` }}>
      {/* Se fija justo debajo de la navbar y ocupa el resto de la pantalla, como los paneles de Servicios */}
      <div className="sticky top-20 flex h-[calc(100svh-5rem)] flex-col overflow-hidden">
        <img
          aria-hidden
          src={aCrema}
          alt=""
          className="pointer-events-none absolute -bottom-[20%] -left-[8%] w-[38%] opacity-[0.04]"
        />

        <Container className="relative pt-12 bajo:pt-8">
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

            <ol className="relative flex pr-[calc(50vw-14rem)] pl-[max(3rem,calc((100vw-80rem)/2+3rem))] 2xl:pl-(--margen-ancho)">
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

        <Container className="relative flex items-center justify-end pb-8 text-crema/50 bajo:pb-5">
          <span className="flex items-center gap-3 font-serif text-base">
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
    <li ref={pasoRef} className="relative w-[28rem] shrink-0">
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
        <span aria-hidden className="relative font-serif text-[3.75rem] leading-none font-medium tabular-nums lining-nums bajo:text-[2.75rem]">
          <span className="text-transparent [-webkit-text-stroke:1px_rgb(247_245_241/0.35)]">{numero(index)}</span>
          <motion.span className="absolute inset-0 text-dorado-suave" style={{ clipPath: rellenoNumero }}>
            {numero(index)}
          </motion.span>
        </span>
        <h3 className="mt-3 text-tarjeta text-crema bajo:mt-2">{paso.titulo}</h3>
        <p className="mt-2 max-w-[23rem] text-[0.9375rem] leading-relaxed text-crema/70 bajo:text-sm">{paso.texto}</p>
      </motion.div>
    </li>
  )
}

// Móvil y movimiento reducido: los pasos en fila, para deslizar con el dedo. Al entrar la sección en pantalla
// la línea se pinta sola, sin esperar al usuario: primer círculo, el tramo hasta el siguiente, el segundo
// círculo… y así hasta el último, aunque esos pasos todavía no se vean.
const duracionNodo = 0.35
const duracionTramo = 0.7

function LineaMovil() {
  const reduceMotion = useReducedMotion()
  // Se observa la ventana del carrusel (ancho de pantalla), no la fila entera, que es mucho más ancha
  const filaRef = useRef<HTMLDivElement>(null)
  const enVista = useInView(filaRef, { once: true, amount: 0.5 })
  const pintada = enVista || !!reduceMotion

  return (
    <div className="py-seccion">
      <Container>
        <Reveal>
          <Encabezado />
        </Reveal>
        <Reveal delay={0.1}>
          <p className="etiqueta mt-10 flex items-center justify-end gap-2 text-crema/50">
            {pasos.length} pasos · Desliza
            <svg aria-hidden viewBox="0 0 24 16" className="h-2.5 w-3.5" fill="none" stroke="currentColor" strokeWidth="1.25">
              <path d="M0 8h22M16 2l6 6-6 6" />
            </svg>
          </p>
        </Reveal>
      </Container>

      <div ref={filaRef} className="mt-8 snap-x snap-mandatory scroll-px-6 overflow-x-auto overscroll-x-contain [scrollbar-width:none] sm:scroll-px-8 [&::-webkit-scrollbar]:hidden">
        <ol className="flex w-max px-6 sm:px-8">
          {pasos.map((paso, i) => (
            <PasoFila key={paso.titulo} paso={paso} index={i} pintada={pintada} instantaneo={!!reduceMotion} />
          ))}
        </ol>
      </div>
    </div>
  )
}

type PasoFilaProps = {
  paso: (typeof pasos)[number]
  index: number
  pintada: boolean
  instantaneo: boolean
}

function PasoFila({ paso, index, pintada, instantaneo }: PasoFilaProps) {
  const ultimo = index === pasos.length - 1
  const inicio = 0.2 + index * (duracionNodo + duracionTramo)
  const transicion = (delay: number, duration: number) =>
    instantaneo ? { duration: 0 } : { delay, duration, ease: easeSuave }

  return (
    // El último ocupa el ancho de pantalla: así, al llegar al final, también queda alineado con el margen
    <li
      className={cn(
        'relative shrink-0 snap-start',
        ultimo ? 'w-[calc(100vw-3rem)] sm:w-[calc(100vw-4rem)]' : 'w-[78vw] max-w-80 pr-8',
      )}
    >
      {/* Tramo de línea hasta el círculo del paso siguiente */}
      {!ultimo && (
        <span aria-hidden className="absolute top-[9.5px] right-0 left-5 h-px bg-crema/15">
          <motion.span
            className="absolute inset-0 origin-left bg-dorado-suave"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: pintada ? 1 : 0 }}
            transition={transicion(inicio + duracionNodo, duracionTramo)}
          />
        </span>
      )}
      {/* Círculo */}
      <span
        aria-hidden
        className="relative grid size-5 place-items-center rounded-full border border-crema/30 bg-burdeos-profundo"
      >
        <motion.span
          className="size-2.5 rounded-full bg-dorado-suave"
          initial={{ scale: 0 }}
          animate={{ scale: pintada ? 1 : 0 }}
          transition={transicion(inicio, duracionNodo)}
        />
      </span>

      <div className="pr-2">
        <span className="mt-8 block font-serif text-xl font-medium text-dorado-suave tabular-nums lining-nums">
          {numero(index)}
        </span>
        <h3 className="mt-3 font-serif text-tarjeta text-balance text-crema">{paso.titulo}</h3>
        <p className="mt-3 text-detalle text-crema/70">{paso.texto}</p>
      </div>
    </li>
  )
}
