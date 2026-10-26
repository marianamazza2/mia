import { motion, useScroll, useTransform, type Transition } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import portada from '@/assets/images/bn-portada.webp'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { useIntroLista } from '@/lib/intro'
import { easeSuave } from '@/lib/motion'
import { useMediaQuery } from '@/lib/useMediaQuery'

const ejes = ['Liderazgo', 'Organización', 'Negocio']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const lista = useIntroLista()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // La foto y el texto se mueven a distinta velocidad: un poco de profundidad
  const fotoY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])
  // En mobile ni el texto ni la foto se desplazan: la foto queda fija y la hoja con el texto sube por encima
  const esDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    // Todo queda «oculto» hasta que sube el telón de la intro; las piezas heredan el estado por variantes
    <motion.section
      ref={ref}
      id="inicio"
      className="relative isolate overflow-clip"
      initial="oculto"
      animate={lista ? 'visible' : 'oculto'}
    >
      {/* Mobile y tablet: foto a sangre arriba y el texto en una hoja crema que se apoya sobre ella.
          Desktop: texto a la izquierda y foto a la derecha */}
      <Container className="relative grid lg:min-h-svh lg:grid-cols-12 lg:items-center lg:gap-8 lg:pt-32 lg:pb-20">
        <motion.div
          className="relative z-10 -mx-6 -mt-14 rounded-t-[20px] bg-crema px-6 pt-9 pb-14 sm:-mx-8 sm:px-8 lg:col-span-7 lg:mx-0 lg:mt-0 lg:rounded-none lg:bg-transparent lg:p-0"
          style={{ y: esDesktop ? textoY : 0 }}
        >
          <Entra y={12} delay={0.5}>
            <Eyebrow>Consultora para empresarias</Eyebrow>
          </Entra>

          <h1 className="mt-6 text-titulo leading-[0.94] font-medium lg:mt-8 lg:text-[6rem] lg:bajo:text-[5.25rem]">
            <Line delay={0.35}>
              Lo que no se ve
            </Line>
            <Line delay={0.47}>también dirige</Line>
            <Line delay={0.59}>tu empresa.</Line>
          </h1>

          <div className="mt-8 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 lg:mt-10">
            <motion.span
              aria-hidden
              className="mt-3 hidden h-px w-16 origin-left bg-dorado sm:block"
              variants={{ oculto: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 1.4, ease: easeSuave, delay: 1.1 }}
            />
            <Entra delay={1}>
              <p className="max-w-lg text-cuerpo text-negro/70">
                Mía acompaña a mujeres que lideran empresas a comprender cómo su forma de conducir incide en
                el funcionamiento de su organización, para pensarla y desarrollarla desde un lugar más claro.
              </p>
            </Entra>
          </div>

          <Entra delay={1.15} className="mt-8 flex flex-wrap items-center gap-x-10 gap-y-6 sm:pl-24 lg:mt-10">
            <Button href="#contacto" withArrow>
              Reservar una conversación
            </Button>
          </Entra>
        </motion.div>

        {/* Foto principal en blanco y negro. En mobile queda fija arriba y la hoja de texto sube y la tapa */}
        <div className="sticky top-0 order-first -mx-6 sm:-mx-8 lg:relative lg:order-none lg:col-span-5 lg:mx-0 lg:self-stretch">
          <motion.div
            className="relative h-[46svh] min-h-72 w-full lg:absolute lg:top-0 lg:right-0 lg:bottom-6 lg:h-auto lg:min-h-0 lg:w-[88%]"
            style={{ y: esDesktop ? fotoY : 0 }}
          >
            {/* La foto sube desde abajo, en el mismo sentido que el telón */}
            <motion.div
              className="size-full overflow-hidden bg-negro/5 lg:rounded-[10px]"
              variants={{ oculto: { clipPath: 'inset(100% 0 0 0)' }, visible: { clipPath: 'inset(0% 0 0 0)' } }}
              transition={{ duration: 1.6, ease: easeSuave, delay: 0.15 }}
            >
              <motion.div
                className="size-full"
                variants={{ oculto: { scale: 1.25 }, visible: { scale: 1 } }}
                transition={{ duration: 2.4, ease: easeSuave, delay: 0.15 }}
              >
                <Picture
                  src={portada}
                  alt="Mujer con la carpeta burdeos de Mía bajo el brazo"
                  fetchPriority="high"
                  className="size-full object-cover object-[50%_30%] lg:object-[45%_center]"
                />
              </motion.div>
            </motion.div>

            {/* Ejes del trabajo, en vertical sobre el borde de la foto */}
            <motion.p
              className="absolute top-0 -left-8 hidden origin-top-left -rotate-90 text-[0.625rem] tracking-[0.4em] whitespace-nowrap text-negro/50 uppercase lg:block"
              style={{ translateX: '-100%' }}
              variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 1.2, delay: 1.6 }}
            >
              {ejes.join('  ·  ')}
            </motion.p>
          </motion.div>

        </div>
      </Container>

      <ScrollCue />
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

function ScrollCue() {
  return (
    <motion.a
      href="#sobre-mia"
      aria-label="Ir a Sobre Mía"
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
      transition={{ duration: 1, delay: 2 }}
    >
      <span className="relative h-14 w-px overflow-hidden bg-negro/10">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-burdeos"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        />
      </span>
    </motion.a>
  )
}
