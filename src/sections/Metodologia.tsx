import {
  motion,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from 'motion/react'
import { useLayoutEffect, useRef, useState, type Ref } from 'react'
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
      {isDesktop && !reduceMotion ? <LineaHorizontal /> : <LineaVertical fija={!reduceMotion} />}
    </section>
  )
}

// «compacto»: en la versión fija de mobile, el párrafo se oculta en pantallas bajas para que entren los cinco pasos
function Encabezado({ compacto = false }: { compacto?: boolean }) {
  return (
    <div className="grid gap-8 lg:grid-cols-12 lg:items-end">
      <div className="lg:col-span-7">
        <Eyebrow tone="light">Metodología</Eyebrow>
        <h2 className={cn('mt-8 text-titulo lg:mt-6', compacto && '[@media(max-height:720px)]:mt-5')}>
          Cómo <Destacado>trabajamos.</Destacado>
        </h2>
      </div>
      <p className={cn('text-cuerpo text-crema/70 lg:col-span-4 lg:col-start-9', compacto && '[@media(max-height:860px)]:hidden')}>
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

// Móvil y tablet: la línea vertical como acordeón. Se ven los cinco pasos y se abre el que se toca;
// la línea dorada se llena hasta el paso abierto
function LineaVertical({ fija }: { fija: boolean }) {
  const [abierto, setAbierto] = useState(0)
  // Alto de cada fila cerrada (los títulos ocupan una, dos o tres líneas). Los pasos anteriores al abierto
  // están siempre cerrados, así que el nodo de cada paso queda a la suma de las filas que tiene arriba
  const filasRef = useRef<(HTMLHeadingElement | null)[]>([])
  const [filas, setFilas] = useState<number[]>([])
  const hasta = (i: number) => filas.slice(0, i).reduce((suma, alto) => suma + alto, 0)

  useLayoutEffect(() => {
    const medir = () => setFilas(filasRef.current.map((fila) => fila?.offsetHeight ?? 0))
    medir()
    window.addEventListener('resize', medir)
    return () => window.removeEventListener('resize', medir)
  }, [])

  // Versión fija: la sección queda quieta en pantalla y cada tramo de scroll abre el paso siguiente
  const recorridoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: recorridoRef, offset: ['start start', 'end end'] })
  useMotionValueEvent(scrollYProgress, 'change', (v) => {
    if (fija) setAbierto(Math.min(pasos.length - 1, Math.max(0, Math.floor(v * pasos.length))))
  })

  // Al tocar un paso en la versión fija, se lleva el scroll hasta su tramo
  const abrir = (i: number) => {
    const recorrido = recorridoRef.current
    if (!fija || !recorrido) return setAbierto(i)
    const inicio = recorrido.getBoundingClientRect().top + window.scrollY
    const largo = recorrido.offsetHeight - window.innerHeight
    window.scrollTo({ top: inicio + (largo * (i + 0.5)) / pasos.length, behavior: 'smooth' })
  }

  const contenido = (
    <>
      <Reveal>
        <Encabezado compacto={fija} />
      </Reveal>

      <ol className={cn('relative mt-10', fija && '[@media(max-height:720px)]:mt-5')}>
        <span aria-hidden className="absolute top-[1.4rem] left-[9px] w-px bg-crema/15" style={{ height: hasta(pasos.length - 1) }} />
        <motion.span
          aria-hidden
          className="absolute top-[1.4rem] left-[9px] w-px bg-dorado-suave"
          initial={false}
          animate={{ height: hasta(abierto) }}
          transition={{ duration: 0.8, ease: easeSuave }}
        />
        {pasos.map((paso, i) => (
          <PasoAcordeon
            key={paso.titulo}
            paso={paso}
            index={i}
            abierto={abierto === i}
            pasado={i <= abierto}
            onAbrir={() => abrir(i)}
            filaRef={(fila) => {
              filasRef.current[i] = fila
            }}
          />
        ))}
      </ol>
    </>
  )

  if (!fija) return <Container className="py-seccion">{contenido}</Container>

  return (
    <div ref={recorridoRef} style={{ height: `calc(100svh + ${pasos.length * 45}svh)` }}>
      {/* Alineado arriba (no centrado), así el bloque no se corre cuando cambia el largo del texto abierto */}
      <div className="sticky top-0 h-svh overflow-hidden">
        <Container className="pt-[max(4.5rem,11svh)]">{contenido}</Container>
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
  filaRef?: Ref<HTMLHeadingElement>
}

function PasoAcordeon({ paso, index, abierto, pasado, onAbrir, filaRef }: PasoAcordeonProps) {
  const id = `paso-${index}`

  return (
    <li className="relative pl-12">
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

      <h3 ref={filaRef}>
        <button
          type="button"
          aria-expanded={abierto}
          aria-controls={id}
          onClick={onAbrir}
          className="flex w-full items-baseline gap-4 py-2.5 text-left"
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
        </button>
      </h3>

      <div
        id={id}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-700 ease-suave',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <p className="overflow-hidden pl-[2.2rem] text-detalle text-crema/70">
          <span className="block pb-5">{paso.texto}</span>
        </p>
      </div>
    </li>
  )
}
