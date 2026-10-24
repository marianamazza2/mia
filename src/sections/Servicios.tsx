import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import direccionAvif from '@/assets/images/bn-servicio-direccion.avif'
import direccionJpg from '@/assets/images/bn-servicio-direccion.jpg'
import lecturaAvif from '@/assets/images/bn-servicio-lectura.avif'
import lecturaJpg from '@/assets/images/bn-servicio-lectura.jpg'
import reorganizacionAvif from '@/assets/images/bn-servicio-reorganizacion.avif'
import reorganizacionJpg from '@/assets/images/bn-servicio-reorganizacion.jpg'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/useMediaQuery'

// Textos provisorios: hay que validarlos con Marina
const servicios = [
  {
    numero: 'I',
    titulo: 'Acompañamiento a la dirección',
    descripcion:
      'Un proceso individual para revisar cómo decides, delegas y sostienes tu empresa. Trabajamos sobre lo que se repite y traba el movimiento, para que puedas conducir desde un lugar más claro.',
    paraQuien: 'Fundadoras y directoras que sienten que todo depende de ellas y que les cuesta delegar.',
    imagen: { avif: direccionAvif, jpg: direccionJpg, alt: 'Manos sacando la tarjeta burdeos de Mía de un tarjetero' },
    tono: 'claro',
  },
  {
    numero: 'II',
    titulo: 'Lectura organizacional',
    descripcion:
      'Una mirada externa sobre la relación entre liderazgo y organización: cómo circulan las decisiones, qué roles se sostienen y dónde se pierde energía. Para decidir qué cambiar con criterio.',
    paraQuien: 'Empresas consolidadas que necesitan ordenar su funcionamiento antes de dar el siguiente paso.',
    imagen: { avif: lecturaAvif, jpg: lecturaJpg, alt: 'Empresaria revisando la carpeta y la papelería de Mía' },
    tono: 'burdeos',
  },
  {
    numero: 'III',
    titulo: 'Procesos de reorganización',
    descripcion:
      'Acompañamiento a la dirección y a su equipo en momentos de crecimiento, reorganización o expansión, sin perder de vista los objetivos del negocio.',
    paraQuien: 'Empresas que atraviesan un cambio de estructura, de etapa o de escala.',
    imagen: { avif: reorganizacionAvif, jpg: reorganizacionJpg, alt: 'Mano sosteniendo un sobre de Mía' },
    tono: 'claro',
  },
] as const

type Servicio = (typeof servicios)[number]

export function Servicios() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useReducedMotion()
  const apilar = isDesktop && !reduceMotion

  return (
    <section id="servicios" className="relative">
      <Container className="pt-28 pb-20 sm:pt-36 lg:pt-48 lg:pb-28">
        <div className="grid gap-10 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <Eyebrow>Servicios</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-10 text-[2.75rem] leading-[1.02] sm:text-6xl lg:text-[5.5rem]">
                Tres formas de <em className="font-medium text-burdeos">acompañar.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-[1.8] text-negro/70">
              Cada proceso parte de lo mismo: comprender qué está pasando antes de decidir qué cambiar.
            </p>
          </Reveal>
        </div>
      </Container>

      {apilar ? <Apilados /> : <Lista />}
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
      <div className="relative flex flex-col justify-center px-6 py-20 sm:px-8 lg:py-16 lg:pr-16 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))]">
        <span
          aria-hidden
          className={cn(
            'font-serif text-[7rem] leading-[0.8] font-medium italic lg:text-[10rem] lg:bajo:text-[7rem]',
            oscuro
              ? 'text-transparent [-webkit-text-stroke:1px_rgb(201_168_107/0.7)]'
              : 'text-transparent [-webkit-text-stroke:1px_rgb(79_11_18/0.45)]',
          )}
        >
          {servicio.numero}
        </span>

        <h3 className="mt-8 max-w-lg text-[2.25rem] leading-[1.05] sm:text-5xl lg:bajo:mt-5 lg:bajo:text-[2.75rem]">
          {servicio.titulo}
        </h3>
        <p className={cn('mt-6 max-w-lg text-[1.0625rem] leading-[1.8]', oscuro ? 'text-crema/75' : 'text-negro/70')}>
          {servicio.descripcion}
        </p>

        <div className="mt-10 flex max-w-lg gap-5 lg:bajo:mt-7">
          <span aria-hidden className="mt-2.5 h-px w-10 shrink-0 bg-dorado" />
          <p className={cn('text-[0.9375rem] leading-relaxed', oscuro ? 'text-crema/75' : 'text-negro/70')}>
            <span
              className={cn(
                'block text-[0.6875rem] font-medium tracking-[0.25em] uppercase',
                oscuro ? 'text-dorado-suave' : 'text-burdeos',
              )}
            >
              Para quién
            </span>
            <span className="mt-2 block font-serif text-xl italic">{servicio.paraQuien}</span>
          </p>
        </div>

        <a
          href="#contacto"
          className={cn(
            'group/link mt-10 inline-flex items-center gap-4 self-start text-xs font-medium tracking-[0.2em] uppercase lg:bajo:mt-7',
            oscuro ? 'text-crema' : 'text-burdeos',
          )}
        >
          <span className="relative py-1">
            Consultar este servicio
            <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado transition-transform duration-500 ease-suave group-hover/link:scale-x-50" />
          </span>
          <svg
            aria-hidden
            viewBox="0 0 24 16"
            className="h-3.5 w-5 transition-transform duration-500 ease-suave group-hover/link:translate-x-1.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
          >
            <path d="M0 8h22M16 2l6 6-6 6" />
          </svg>
        </a>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
        <Picture {...servicio.imagen} loading="lazy" className="size-full object-cover" />
      </div>
    </div>
  )
}

// Móvil y tablet: los tres paneles uno debajo del otro
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
