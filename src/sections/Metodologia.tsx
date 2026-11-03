import {
  motion,
  useMotionValueEvent,
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
import { useMediaQuery } from '@/lib/useMediaQuery'
import { Destacado } from '@/components/marca/Destacado'

const pasos = [
  {
    titulo: 'Conocemos tu punto de partida',
    texto: 'Hablamos del momento que atraviesa tu empresa y de aquello que se repite aunque ya hayas probado otras soluciones.',
  },
  {
    titulo: 'Precisamos sobre qué trabajaremos y las alternativas posibles',
    texto: 'Analizamos las dificultades y los elementos que intervienen en ellas para identificar posibilidades concretas de acción.',
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
      {isDesktop && !reduceMotion ? <LineaHorizontal /> : <LineaVertical />}
    </section>
  )
}

function Encabezado() {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow tone="light">Metodología</Eyebrow>
        <h2 className="mt-5 text-titulo lg:mt-6">
          Cómo <Destacado>trabajamos.</Destacado>
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

        <Container className="relative pt-28 bajo:pt-[5.25rem]">
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

        <Container className="relative flex items-center justify-between pb-8 bajo:pb-5 text-[0.6875rem] tracking-[0.3em] text-crema/50 uppercase">
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

// Móvil: cada paso dispone de casi una pantalla de scroll, incluido el último.
// Si el conjunto supera la pantalla, acompaña el recorrido desplazándose hacia arriba.
function LineaVertical() {
  const [abierto, setAbierto] = useState<number | null>(0)
  const reduceMotion = useReducedMotion()
  const recorridoRef = useRef<HTMLDivElement>(null)
  const contenidoRef = useRef<HTMLDivElement>(null)
  const pantallaRef = useRef<HTMLDivElement>(null)
  const [medidas, setMedidas] = useState({ altura: 0, pantalla: 0, paso: 0 })
  const margenSuperior = 72

  useLayoutEffect(() => {
    const contenido = contenidoRef.current
    const pantalla = pantallaRef.current
    if (!contenido || !pantalla) return
    const paneles = Array.from(contenido.querySelectorAll<HTMLElement>('[data-paso-panel]'))
    const textos = Array.from(contenido.querySelectorAll<HTMLElement>('[data-paso-texto]'))
    // Medimos la descripción más alta, incluso cerrada. Abrir otro paso nunca
    // puede desactivar el sticky ni acortar de golpe la sección durante el scroll.
    const medir = () => {
      const alturaCerrada = contenido.getBoundingClientRect().height
        - paneles.reduce((total, panel) => total + panel.getBoundingClientRect().height, 0)
      const altura = Math.ceil(alturaCerrada + Math.max(...textos.map((texto) => texto.getBoundingClientRect().height)))
      const paso = Math.ceil(Math.max(...textos.map((texto) => {
        const titulo = texto.closest('li')?.querySelector('h3')
        return (titulo?.getBoundingClientRect().height ?? 0) + texto.getBoundingClientRect().height
      })))
      const altoPantalla = pantalla.offsetHeight
      setMedidas((actual) => actual.altura === altura && actual.pantalla === altoPantalla && actual.paso === paso
        ? actual
        : { altura, pantalla: altoPantalla, paso })
    }
    const observer = new ResizeObserver(medir)
    observer.observe(contenido)
    observer.observe(pantalla)
    textos.forEach((texto) => observer.observe(texto))
    medir()
    return () => {
      observer.disconnect()
    }
  }, [])

  // Solo recurrimos al acordeón manual si ni siquiera cabe un paso completo.
  const fija = medidas.pantalla > 0 && medidas.paso + margenSuperior + 48 <= medidas.pantalla && !reduceMotion
  const { scrollYProgress } = useScroll({
    target: recorridoRef,
    offset: [`start ${margenSuperior}px`, `end ${medidas.pantalla}px`],
  })
  const desplazamiento = useTransform(scrollYProgress, (progreso) => {
    const sobrante = Math.max(0, medidas.altura - (medidas.pantalla - margenSuperior))
    // El último paso ya debe verse completo al abrirse, antes de salir de la sección.
    const avance = Math.max(0, Math.min(1, progreso / ((pasos.length - 1) / pasos.length)))
    return fija ? -sobrante * avance : 0
  })
  useMotionValueEvent(scrollYProgress, 'change', (progreso) => {
    if (fija) setAbierto(Math.max(0, Math.min(pasos.length - 1, Math.floor(progreso * pasos.length))))
  })

  const abrir = (i: number) => {
    if (!fija || !recorridoRef.current) {
      setAbierto((actual) => actual === i ? null : i)
      return
    }
    const recorrido = recorridoRef.current
    const inicio = recorrido.getBoundingClientRect().top + window.scrollY - margenSuperior
    const distancia = recorrido.offsetHeight - medidas.pantalla + margenSuperior
    window.scrollTo({ top: inicio + distancia * ((i + 0.5) / pasos.length), behavior: 'smooth' })
  }

  return (
    <div ref={recorridoRef} className="relative" style={fija ? { height: `calc(${100 + pasos.length * 90}svh - ${margenSuperior}px)` } : undefined}>
      <div ref={pantallaRef} aria-hidden className="pointer-events-none absolute top-0 h-svh w-px invisible" />
      <div className={cn(fija && 'sticky top-18 overflow-hidden')} style={fija ? { height: `calc(100svh - ${margenSuperior}px)` } : undefined}>
        <motion.div style={{ y: desplazamiento }}>
          <Container ref={contenidoRef} className="py-seccion">
            <Reveal>
              <Encabezado />
            </Reveal>
            <ol className="mt-8 lg:mt-10">
              {pasos.map((paso, i) => (
                <PasoAcordeon
                  key={paso.titulo}
                  paso={paso}
                  index={i}
                  abierto={abierto === i}
                  pasado={abierto !== null && i <= abierto}
                  onAbrir={() => abrir(i)}
                />
              ))}
            </ol>
          </Container>
        </motion.div>
      </div>
    </div>
  )
}

type PasoAcordeonProps = {
  paso: (typeof pasos)[number]
  index: number
  abierto: boolean
  pasado: boolean
  onAbrir: () => void
}

function PasoAcordeon({ paso, index, abierto, pasado, onAbrir }: PasoAcordeonProps) {
  const id = `paso-${index}`

  return (
    <li className="relative pb-4 pl-8 last:pb-0 before:absolute before:top-6 before:bottom-0 before:left-[9px] before:w-px before:bg-crema/15 last:before:hidden lg:pl-12">
      {/* Nodo sobre la línea: se enciende en los pasos ya recorridos */}
      <span
        aria-hidden
        className="absolute top-[0.8rem] left-0 grid size-5 place-items-center rounded-full border border-crema/30 bg-burdeos-profundo"
      >
        <span
          className={cn(
            'size-2.5 rounded-full bg-dorado-suave transition-transform duration-500 ease-suave',
            pasado ? 'scale-100' : 'scale-0',
          )}
        />
      </span>

      <h3>
        <button
          type="button"
          aria-expanded={abierto}
          aria-controls={id}
          onClick={onAbrir}
          className="flex min-h-11 w-full items-baseline gap-3 py-2.5 text-left lg:gap-4"
        >
          <span
            className={cn(
              'font-serif text-xl font-medium tabular-nums lining-nums transition-colors duration-500',
              abierto ? 'text-dorado-suave' : 'text-crema/35',
            )}
          >
            {numero(index)}
          </span>
          <span
            className={cn(
              'flex-1 font-serif text-tarjeta text-balance transition-colors duration-500',
              abierto ? 'text-crema' : 'text-crema/60',
            )}
          >
            {paso.titulo}
          </span>
          <svg
            aria-hidden
            viewBox="0 0 16 16"
            className={cn('size-3 shrink-0 self-center text-dorado-suave transition-transform duration-300 motion-reduce:transition-none', abierto && 'rotate-180')}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m3 6 5 5 5-5" />
          </svg>
        </button>
      </h3>

      <div
        id={id}
        data-paso-panel
        inert={!abierto}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 ease-suave motion-reduce:transition-none',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <p className="overflow-hidden pl-[2.2rem] text-detalle text-crema/70">
          <span data-paso-texto className="block pb-5">{paso.texto}</span>
        </p>
      </div>
    </li>
  )
}
