import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { useRef } from 'react'
import direccionAvif from '@/assets/images/bn-servicio-direccion.avif'
import direccionJpg from '@/assets/images/bn-servicio-direccion.jpg'
import lecturaAvif from '@/assets/images/bn-servicio-lectura.avif'
import lecturaJpg from '@/assets/images/bn-servicio-lectura.jpg'
import reorganizacionAvif from '@/assets/images/bn-servicio-reorganizacion.avif'
import reorganizacionJpg from '@/assets/images/bn-servicio-reorganizacion.jpg'
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
    imagen: { avif: direccionAvif, jpg: direccionJpg, alt: 'Manos sacando la tarjeta burdeos de Mía de un tarjetero' },
    tono: 'claro',
  },
  {
    numero: '02',
    titulo: 'Lectura organizacional',
    descripcion:
      'Una mirada externa sobre la relación entre liderazgo y organización: cómo circulan las decisiones, qué roles se sostienen y dónde se pierde energía. Para decidir qué cambiar con criterio.',
    paraQuien: 'Empresas consolidadas que necesitan ordenar su funcionamiento antes de dar el siguiente paso.',
    imagen: { avif: lecturaAvif, jpg: lecturaJpg, alt: 'Empresaria revisando la carpeta y la papelería de Mía' },
    tono: 'burdeos',
  },
  {
    numero: '03',
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

  // La marca de agua se va encendiendo mientras el encabezado sube, y se desliza apenas más lento que el texto
  const encabezadoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: encabezadoRef, offset: ['start end', 'start 0.15'] })
  const opacidadPatron = useTransform(scrollYProgress, [0, 1], [0, 0.03])
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
