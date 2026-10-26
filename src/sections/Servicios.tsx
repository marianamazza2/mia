import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useId, useRef, useState } from 'react'
import direccion from '@/assets/images/bn-servicio-direccion.webp'
import lectura from '@/assets/images/bn-servicio-lectura.webp'
import reorganizacion from '@/assets/images/bn-servicio-reorganizacion.webp'
import { Destacado } from '@/components/marca/Destacado'
import { PatronA } from '@/components/marca/PatronA'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/useMediaQuery'

// Textos provisorios: hay que validarlos con Marina
const servicios = [
  {
    numero: '01',
    titulo: 'Acompañamiento a la dirección',
    descripcion:
      'Un proceso individual para revisar cómo decides, delegas y sostienes tu empresa. Trabajamos sobre lo que se repite y traba el movimiento, para que puedas conducir desde un lugar más claro.',
    paraQuien: 'Fundadoras y directoras que sienten que todo depende de ellas y que les cuesta delegar.',
    imagen: { src: direccion, alt: 'Manos sacando la tarjeta burdeos de Mía de un tarjetero' },
    tono: 'claro',
  },
  {
    numero: '02',
    titulo: 'Lectura organizacional',
    descripcion:
      'Una mirada externa sobre la relación entre liderazgo y organización: cómo circulan las decisiones, qué roles se sostienen y dónde se pierde energía. Para decidir qué cambiar con criterio.',
    paraQuien: 'Empresas consolidadas que necesitan ordenar su funcionamiento antes de dar el siguiente paso.',
    imagen: { src: lectura, alt: 'Empresaria revisando la carpeta y la papelería de Mía' },
    tono: 'burdeos',
  },
  {
    numero: '03',
    titulo: 'Procesos de reorganización',
    descripcion:
      'Acompañamiento a la dirección y a su equipo en momentos de crecimiento, reorganización o expansión, sin perder de vista los objetivos del negocio.',
    paraQuien: 'Empresas que atraviesan un cambio de estructura, de etapa o de escala.',
    imagen: { src: reorganizacion, alt: 'Mano sosteniendo un sobre de Mía' },
    tono: 'claro',
  },
] as const

type Servicio = (typeof servicios)[number]

export function Servicios() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useReducedMotion()

  // La marca de agua se va encendiendo mientras el encabezado sube, y se desliza apenas más lento que el texto
  const encabezadoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: encabezadoRef, offset: ['start end', 'start 0.15'] })
  const opacidadPatron = useTransform(scrollYProgress, [0, 1], [0, 0.045])
  const desplazamientoPatron = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <section id="servicios" className="relative">
      {/* Encabezado con la «a» como marca de agua, casi invisible detrás */}
      <div ref={encabezadoRef} className="relative overflow-hidden">
        <motion.div aria-hidden className="absolute inset-0" style={{ opacity: opacidadPatron, y: desplazamientoPatron }}>
          <PatronA paso={84} difuminado className="text-burdeos" />
        </motion.div>
        <Container className="relative pt-seccion pb-bloque">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal y={12}>
                <Eyebrow>Servicios</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-8 text-titulo lg:mt-10">
                  Tres formas de <Destacado>acompañar.</Destacado>
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
              <p className="text-cuerpo text-negro/70">
                Cada proceso parte de lo mismo: comprender qué está pasando antes de decidir qué cambiar.
              </p>
            </Reveal>
          </div>
        </Container>
      </div>

      {/* Desktop: paneles que se apilan (o en lista, con «reducir movimiento»); mobile y tablet: carrusel */}
      {isDesktop ? reduceMotion ? <Lista /> : <Apilados /> : <Carrusel />}
    </section>
  )
}

// Escritorio: cada servicio ocupa la pantalla y el siguiente se apoya encima, como hojas de una carpeta
function Apilados() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className="relative">
      {servicios.map((servicio, i) => (
        <div key={servicio.titulo} className="sticky top-0 h-svh">
          <PanelApilado servicio={servicio} index={i} progreso={scrollYProgress} />
        </div>
      ))}
    </div>
  )
}

function PanelApilado({ servicio, index, progreso }: { servicio: Servicio; index: number; progreso: MotionValue<number> }) {
  const total = servicios.length
  // Cuando el siguiente panel sube, este se aleja un poco y se oscurece
  const inicio = index / total
  const escala = useTransform(progreso, [inicio, 1], [1, 1 - (total - 1 - index) * 0.05])
  const velo = useTransform(progreso, [inicio, inicio + 1 / total], [0, index === total - 1 ? 0 : 0.35])

  return (
    <motion.article className="relative size-full origin-top overflow-hidden" style={{ scale: escala }}>
      <Panel servicio={servicio} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-negro" style={{ opacity: velo }} />
    </motion.article>
  )
}

function Panel({ servicio }: { servicio: Servicio }) {
  const oscuro = servicio.tono === 'burdeos'

  return (
    <div
      className={cn(
        'grid size-full lg:grid-cols-2',
        oscuro ? 'bg-burdeos text-crema' : 'border-t border-dorado/40 bg-crema text-negro',
      )}
    >
      {/* En pantallas muy anchas (2xl), el texto se centra en su mitad, alineado con el resto de la página */}
      <div className="relative flex flex-col justify-center px-6 py-20 sm:px-8 lg:py-16 lg:pr-16 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] 2xl:px-(--margen-ancho)">
        {/* Número y título en Cormorant recta; todo lo demás en Inter. Sin itálicas ni contornos,
            con la misma numeración (01, 02…) que la línea de tiempo */}
        <span
          aria-hidden
          className={cn(
            'font-serif text-numeral font-medium tabular-nums lining-nums lg:bajo:text-[7rem]',
            oscuro ? 'text-crema/15' : 'text-burdeos/15',
          )}
        >
          {servicio.numero}
        </span>

        <h3 className="mt-6 max-w-lg text-subtitulo lg:bajo:mt-4 lg:bajo:text-[2.75rem]">
          {servicio.titulo}
        </h3>
        <p className={cn('mt-6 max-w-lg text-cuerpo', oscuro ? 'text-crema/75' : 'text-negro/70')}>
          {servicio.descripcion}
        </p>

        <div className="mt-10 flex max-w-lg gap-5 lg:bajo:mt-7">
          <span aria-hidden className="mt-2.5 h-px w-10 shrink-0 bg-dorado" />
          <p className={cn('text-cuerpo', oscuro ? 'text-crema/75' : 'text-negro/70')}>
            <span className={cn('etiqueta block', oscuro ? 'text-dorado-suave' : 'text-burdeos')}>
              Para quién
            </span>
            <span className="mt-2 block">{servicio.paraQuien}</span>
          </p>
        </div>

        {/* Mismo botón que el resto de la web; en el panel burdeos va en crema */}
        <Button href="#contacto" variant={oscuro ? 'light' : 'primary'} withArrow className="mt-10 self-start lg:bajo:mt-7">
          Consultar este servicio
        </Button>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
        <Picture {...servicio.imagen} loading="lazy" className="size-full object-cover" />
      </div>
    </div>
  )
}

// Desktop con «reducir movimiento»: los tres paneles uno debajo del otro
function Lista() {
  return (
    <div>
      {servicios.map((servicio) => (
        <Reveal key={servicio.titulo} y={32}>
          <article className="[&>div]:flex [&>div]:flex-col-reverse">
            <Panel servicio={servicio} />
          </article>
        </Reveal>
      ))}
    </div>
  )
}

// Mobile y tablet: carrusel que se desliza con el dedo; se ve un poco la tarjeta siguiente
function Carrusel() {
  const pistaRef = useRef<HTMLDivElement>(null)
  const [actual, setActual] = useState(0)

  const alDeslizar = () => {
    const pista = pistaRef.current
    if (!pista) return
    const paso = (pista.children[1] as HTMLElement).offsetLeft - (pista.children[0] as HTMLElement).offsetLeft
    setActual(Math.min(Math.round(pista.scrollLeft / paso), servicios.length - 1))
  }

  const ir = (i: number) => {
    const pista = pistaRef.current
    const tarjeta = pista?.children[i] as HTMLElement | undefined
    if (!pista || !tarjeta) return
    pista.scrollTo({ left: tarjeta.offsetLeft - pista.offsetLeft - parseFloat(getComputedStyle(pista).scrollPaddingLeft || '0'), behavior: 'smooth' })
  }

  return (
    <div className="pb-seccion">
      <div
        ref={pistaRef}
        onScroll={alDeslizar}
        role="region"
        aria-label="Servicios"
        className="flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {servicios.map((servicio, i) => (
          <TarjetaServicio key={servicio.titulo} servicio={servicio} posicion={i} />
        ))}
      </div>

      {/* Contador con filete de progreso y flechas */}
      <Container className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4 font-serif text-lg lining-nums tabular-nums">
          <span className="text-burdeos">{String(actual + 1).padStart(2, '0')}</span>
          <span className="relative h-px w-16 bg-burdeos/15">
            <span
              className="absolute inset-y-0 left-0 bg-dorado transition-[width] duration-500 ease-suave"
              style={{ width: `${((actual + 1) / servicios.length) * 100}%` }}
            />
          </span>
          <span className="text-negro/40">{String(servicios.length).padStart(2, '0')}</span>
        </div>
        <div className="flex gap-3">
          <FlechaCarrusel direccion="anterior" disabled={actual === 0} onClick={() => ir(actual - 1)} />
          <FlechaCarrusel direccion="siguiente" disabled={actual === servicios.length - 1} onClick={() => ir(actual + 1)} />
        </div>
      </Container>
    </div>
  )
}

function TarjetaServicio({ servicio, posicion }: { servicio: Servicio; posicion: number }) {
  const oscuro = servicio.tono === 'burdeos'
  // Un solo desplegable abierto a la vez dentro de cada tarjeta
  const [abierto, setAbierto] = useState<'que-es' | 'para-quien' | null>(null)
  const alternar = (cual: 'que-es' | 'para-quien') => setAbierto((actual) => (actual === cual ? null : cual))

  return (
    <article
      aria-label={`${posicion + 1} de ${servicios.length}`}
      className={cn(
        'flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] sm:w-[62%] md:w-[46%]',
        oscuro ? 'bg-burdeos text-crema' : 'border border-dorado/30 bg-white/45 text-negro',
      )}
    >
      {/* Foto apaisada y baja: la tarjeta se lee de un vistazo */}
      <Picture {...servicio.imagen} loading="lazy" className="aspect-[2/1] w-full object-cover" />

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 sm:px-6">
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden
            className={cn(
              'font-serif text-2xl leading-none font-medium lining-nums tabular-nums',
              oscuro ? 'text-dorado-suave' : 'text-burdeos/40',
            )}
          >
            {servicio.numero}
          </span>
          {/* Siempre el alto de dos líneas, así todas las tarjetas miden lo mismo aunque el título ocupe una */}
          <h3 className="min-h-[2.2em] font-serif text-[1.5rem] leading-[1.1]">{servicio.titulo}</h3>
        </div>

        <div className={cn('mt-5 mb-6 border-t', oscuro ? 'border-crema/15' : 'border-burdeos/15')}>
          <Desplegable
            titulo="Qué es"
            texto={servicio.descripcion}
            oscuro={oscuro}
            abierto={abierto === 'que-es'}
            onAlternar={() => alternar('que-es')}
          />
          <Desplegable
            titulo="Para quién"
            texto={servicio.paraQuien}
            oscuro={oscuro}
            abierto={abierto === 'para-quien'}
            onAlternar={() => alternar('para-quien')}
          />
        </div>

        {/* En la tarjeta, un link discreto en minúsculas: no compite con los rótulos de los desplegables */}
        <a
          href="#contacto"
          className={cn(
            'group/link mt-auto inline-flex items-center gap-2.5 self-start text-detalle whitespace-nowrap',
            oscuro ? 'text-crema/85' : 'text-burdeos',
          )}
        >
          <span className="relative py-0.5">
            Consultar este servicio
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado/60 transition-transform duration-500 ease-suave group-hover/link:scale-x-50" />
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 16"
            className="h-3 w-4 shrink-0 transition-transform duration-500 ease-suave group-hover/link:translate-x-1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M0 8h22M16 2l6 6-6 6" />
          </svg>
        </a>
      </div>
    </article>
  )
}

type DesplegableProps = {
  titulo: string
  texto: string
  oscuro: boolean
  abierto: boolean
  onAlternar: () => void
}

// Fila plegable de la tarjeta: el texto se abre al tocar el rótulo
function Desplegable({ titulo, texto, oscuro, abierto, onAlternar }: DesplegableProps) {
  const id = useId()

  return (
    <div className={cn('border-b', oscuro ? 'border-crema/15' : 'border-burdeos/15')}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={onAlternar}
        className={cn('etiqueta flex w-full items-center justify-between py-4', oscuro ? 'text-dorado-suave' : 'text-burdeos')}
      >
        {titulo}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn('size-3 transition-transform duration-500 ease-suave', abierto && 'rotate-45')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="M8 1v14M1 8h14" />
        </svg>
      </button>
      <div
        id={id}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-suave',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <p className={cn('overflow-hidden text-cuerpo', oscuro ? 'text-crema/75' : 'text-negro/70')}>
          <span className="block pb-5">{texto}</span>
        </p>
      </div>
    </div>
  )
}

function FlechaCarrusel({
  direccion,
  disabled,
  onClick,
}: {
  direccion: 'anterior' | 'siguiente'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direccion === 'anterior' ? 'Servicio anterior' : 'Servicio siguiente'}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-burdeos/25 text-burdeos transition-colors duration-300 hover:bg-burdeos hover:text-crema disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-burdeos"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 16"
        className={cn('h-3 w-4', direccion === 'anterior' && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M0 8h22M16 2l6 6-6 6" />
      </svg>
    </button>
  )
}
