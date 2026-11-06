import { motion, useScroll, useTransform, type Transition } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { useIntroLista } from '@/lib/intro'
import { easeSuave } from '@/lib/motion'
import { portada } from '@/lib/portada'
import { useMediaQuery } from '@/lib/useMediaQuery'

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const lista = useIntroLista()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // La foto y el texto se mueven a distinta velocidad: un poco de profundidad
  const fotoY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  // En mobile ni el texto ni la foto se desplazan
  const esDesktop = useMediaQuery('(min-width: 1024px)')
  const oscuro = portada.oscuro

  return (
    // Todo queda «oculto» hasta que sube el telón de la intro; las piezas heredan el estado por variantes
    <motion.section
      ref={ref}
      id="inicio"
      className="relative isolate overflow-clip"
      initial="oculto"
      animate={lista ? 'visible' : 'oculto'}
    >
      {/* Fondo a sangre (ver lib/portada). Se descubre desde abajo con el telón y, al hacer scroll,
          sube un poco más lento que el texto */}
      <motion.div
        aria-hidden
        className={cn('absolute inset-0 -z-10', portada.base)}
        variants={{ oculto: { clipPath: 'inset(100% 0 0 0)' }, visible: { clipPath: 'inset(0% 0 0 0)' } }}
        transition={{ duration: 1.6, ease: easeSuave, delay: 0.15 }}
      >
        <motion.div className="size-full" style={{ y: esDesktop ? fotoY : 0 }}>
          <motion.div
            className="size-full"
            variants={{ oculto: { scale: 1.2 }, visible: { scale: 1.04 } }}
            transition={{ duration: 2.4, ease: easeSuave, delay: 0.15 }}
          >
            {/* Si la portada tiene versión vertical, el celular descarga esa y desktop la apaisada */}
            <picture className="block size-full">
              {portada.srcMobile && <source media="(max-width: 1023px)" srcSet={portada.srcMobile} />}
              <Picture
                src={portada.src}
                alt=""
                fetchPriority="high"
                className={cn('size-full object-cover', portada.encuadre)}
              />
            </picture>
          </motion.div>
        </motion.div>
        {oscuro ? (
          <>
            {/* Velo parejo sobre toda la foto: la apaga un poco para que no compita con el texto */}
            <span className="absolute inset-0 bg-burdeos-profundo/45" />
            {/* Más denso del lado del texto (izquierda en desktop, arriba en mobile) */}
            <span className="absolute inset-0 bg-gradient-to-b from-burdeos-profundo/90 via-burdeos-profundo/35 to-transparent lg:bg-gradient-to-r lg:from-burdeos-profundo/70 lg:via-burdeos-profundo/25 lg:to-transparent" />
          </>
        ) : (
          <>
            {/* Fondo claro: un velo crema parejo que suaviza la onda, para que acompañe y no se marque tanto */}
            {portada.suavizado && <span className={cn('absolute inset-0', portada.suavizado)} />}
            {/* Y otro más denso del lado del texto, para que la onda no le pase por debajo con fuerza */}
            <span className="absolute inset-0 bg-gradient-to-b from-crema/80 via-crema/55 to-transparent to-80% lg:bg-gradient-to-r lg:from-crema/75 lg:via-crema/30 lg:to-transparent" />
          </>
        )}
      </motion.div>

      {/* Mobile: el hero mide lo que el contenido, más aire abajo para que se vean los objetos de la foto, y la página
          ya asoma en la primera pantalla. Ojo: la foto cubre el hero por la altura, así que si el hero crece, la foto
          se agranda con él. Desktop: alto de pantalla; en pantallas bajas se achica el aire, nunca la letra */}
      <Container className={cn(oscuro && 'text-crema', 'relative flex flex-col justify-start pt-28 pb-40 lg:grid lg:min-h-svh lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-36 lg:pb-20 lg:bajo:pt-30 lg:bajo:pb-6')}>
        <motion.div className="lg:col-span-10" style={{ y: esDesktop ? textoY : 0 }}>
          <Entra y={12} delay={0.5}>
            <Eyebrow tone={oscuro ? 'light' : 'dark'}>Consultora para empresarias</Eyebrow>
          </Entra>

          <h1 className="mt-6 text-display lg:mt-8 lg:whitespace-nowrap lg:bajo:mt-6">
            {/* Desktop: dos líneas, con «tu empresa» junto a «de dirigir», para que el bloque respire.
                Mobile: tres líneas, que es lo que entra en el ancho */}
            <Line delay={0.35}>Una forma sólida</Line>
            {esDesktop ? (
              <Line delay={0.47}>de dirigir tu empresa.</Line>
            ) : (
              <>
                <Line delay={0.47}>de dirigir</Line>
                <Line delay={0.59}>tu empresa.</Line>
              </>
            )}
          </h1>

          {/* Todo alineado al mismo margen que el título: un solo filete, el del antetítulo */}
          <div className="mt-6 lg:mt-10 lg:bajo:mt-5">
            {/* Dos niveles: la idea principal en cuerpo y el complemento más chico y suave, para que el bloque no pese */}
            <Entra delay={1}>
              {/* En mobile, más angosto: la foto va anclada a la izquierda, así la cinta queda siempre a la misma
                  distancia del borde y el párrafo termina antes de pasarle por encima */}
              <p className={cn('max-w-[16.5rem] text-cuerpo lg:max-w-lg', oscuro ? 'text-crema/85' : 'text-negro/75')}>
                <span className="lg:hidden">
                  Acompañamos a empresarias a fortalecer su dirección, tomar decisiones y hacer crecer su negocio.
                </span>
                <span className="hidden lg:inline">
                  Acompañamos a empresarias a consolidar su posición en la dirección de sus negocios, encontrar
                  criterios para tomar decisiones y desarrollar nuevas posibilidades de acción.
                </span>
              </p>
              <p className={cn('mt-4 hidden max-w-lg text-detalle lg:block lg:bajo:mt-3', oscuro ? 'text-crema/65' : 'text-negro/55')}>
                Trabajamos junto a ellas sobre los desafíos de su empresa, sus equipos y su organización, para
                construir formas de funcionamiento sostenibles.
              </p>
            </Entra>
          </div>

          <Entra delay={1.15} className="mt-cta flex flex-wrap items-center gap-x-10 gap-y-6">
            <Button href="#contacto" variant={oscuro ? 'light' : 'primary'} withArrow>
              <span className="lg:hidden">Hablemos</span>
              <span className="hidden lg:inline">Conversemos sobre tu empresa</span>
            </Button>
          </Entra>
        </motion.div>
      </Container>

      <ScrollCue oscuro={oscuro} />
    </motion.section>
  )
}

// Aparece suave y sube un poco, sincronizado con la intro
function Entra({ children, delay = 0, y = 24, className }: { children: ReactNode; delay?: number; y?: number; className?: string }) {
  const transition: Transition = { duration: 1.1, ease: easeSuave, delay }
  return (
    <motion.div
      className={className}
      variants={{ oculto: { opacity: 0, y }, visible: { opacity: 1, y: 0 } }}
      transition={transition}
    >
      {children}
    </motion.div>
  )
}

// Cada línea del título sube desde una máscara, con aire abajo para que no se corten la «g» ni la «p»
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="-mb-[0.06em] block overflow-hidden pb-[0.2em]">
      <motion.span
        className="block"
        variants={{ oculto: { y: '105%' }, visible: { y: 0 } }}
        transition={{ duration: 1.3, ease: easeSuave, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

function ScrollCue({ oscuro }: { oscuro: boolean }) {
  return (
    <motion.a
      href="#sobre-mia"
      aria-label="Ir a Sobre Mía"
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 1, delay: 2 }}
    >
      <span className={cn('relative h-14 w-px overflow-hidden', oscuro ? 'bg-crema/20' : 'bg-negro/10')}>
        <motion.span
          className={cn('absolute inset-x-0 top-0 h-1/2', oscuro ? 'bg-crema' : 'bg-burdeos')}
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        />
      </span>
    </motion.a>
  )
}
