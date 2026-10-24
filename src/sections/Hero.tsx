import { motion, useScroll, useTransform, type Transition } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import manoAvif from '@/assets/images/bn-mano-tarjeta.avif'
import manoJpg from '@/assets/images/bn-mano-tarjeta.jpg'
import portadaAvif from '@/assets/images/bn-portada.avif'
import portadaJpg from '@/assets/images/bn-portada.jpg'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { useIntroLista } from '@/lib/intro'
import { easeSuave } from '@/lib/motion'

const ejes = ['Liderazgo', 'Organización', 'Negocio']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const lista = useIntroLista()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  // Las dos fotos se mueven a distinta velocidad: profundidad de collage
  const fotoY = useTransform(scrollYProgress, [0, 1], ['0%', '-8%'])
  const detalleY = useTransform(scrollYProgress, [0, 1], ['0%', '-38%'])
  const textoY = useTransform(scrollYProgress, [0, 1], ['0%', '14%'])

  return (
    // Todo queda «oculto» hasta que sube el telón de la intro; las piezas heredan el estado por variantes
    <motion.section
      ref={ref}
      id="inicio"
      className="relative isolate overflow-hidden"
      initial="oculto"
      animate={lista ? 'visible' : 'oculto'}
    >
      <Container className="relative grid min-h-svh items-center gap-16 pt-32 pb-20 lg:grid-cols-12 lg:gap-8 lg:pt-36 lg:pb-24">
        <motion.div className="relative z-10 lg:col-span-7" style={{ y: textoY }}>
          <Entra y={12} delay={0.5}>
            <Eyebrow>Consultora para empresarias</Eyebrow>
          </Entra>

          <h1 className="mt-8 text-display font-medium lg:mt-10">
            <Line delay={0.35}>
              Lo que <NoSeVe />
            </Line>
            <Line delay={0.47}>también dirige</Line>
            <Line delay={0.59}>tu empresa.</Line>
          </h1>

          <div className="mt-10 grid gap-10 sm:grid-cols-[auto_1fr] sm:items-start sm:gap-8 lg:mt-12">
            <motion.span
              aria-hidden
              className="mt-3 hidden h-px w-16 origin-left bg-dorado sm:block"
              variants={{ oculto: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 1.4, ease: easeSuave, delay: 1.1 }}
            />
            <Entra delay={1}>
              <p className="max-w-md text-cuerpo text-negro/70">
                Mía acompaña a mujeres que lideran empresas a comprender cómo su forma de conducir incide en
                el funcionamiento de su organización, para pensarla y desarrollarla desde un lugar más claro.
              </p>
            </Entra>
          </div>

          <Entra delay={1.15} className="mt-10 flex flex-wrap items-center gap-x-10 gap-y-6 sm:pl-24 lg:mt-12">
            <Button href="#contacto" withArrow>
              Reservar una conversación
            </Button>
            <a href="#sobre-mia" className="group relative py-1 text-xs font-medium tracking-[0.2em] text-burdeos uppercase">
              Conocer Mía
              <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado transition-transform duration-500 ease-suave group-hover:scale-x-50" />
            </a>
          </Entra>
        </motion.div>

        {/* Collage: foto principal en blanco y negro y un detalle que flota por delante */}
        <div className="relative lg:col-span-5 lg:self-stretch">
          <motion.div className="relative ml-auto w-[82%] lg:absolute lg:top-0 lg:right-0 lg:bottom-6 lg:w-[88%]" style={{ y: fotoY }}>
            {/* La foto sube desde abajo, en el mismo sentido que el telón */}
            <motion.div
              className="aspect-[4/5] size-full overflow-hidden bg-negro/5 lg:aspect-auto"
              variants={{ oculto: { clipPath: 'inset(100% 0 0 0)' }, visible: { clipPath: 'inset(0% 0 0 0)' } }}
              transition={{ duration: 1.6, ease: easeSuave, delay: 0.15 }}
            >
              <motion.div
                className="size-full"
                variants={{ oculto: { scale: 1.25 }, visible: { scale: 1 } }}
                transition={{ duration: 2.4, ease: easeSuave, delay: 0.15 }}
              >
                <Picture
                  avif={portadaAvif}
                  jpg={portadaJpg}
                  alt="Mujer con la carpeta burdeos de Mía bajo el brazo"
                  fetchPriority="high"
                  className="size-full object-cover object-[45%_center]"
                />
              </motion.div>
            </motion.div>

            {/* Ejes del trabajo, en vertical sobre el borde de la foto */}
            <motion.p
              className="absolute top-0 -left-8 hidden origin-top-left -rotate-90 text-[0.625rem] tracking-[0.4em] whitespace-nowrap text-negro/50 uppercase sm:block"
              style={{ translateX: '-100%' }}
              variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: 1.2, delay: 1.6 }}
            >
              {ejes.join('  ·  ')}
            </motion.p>
          </motion.div>

          <motion.div
            className="absolute -bottom-10 left-0 w-[46%] sm:w-[40%] lg:-bottom-4 lg:-left-[18%] lg:w-[52%]"
            style={{ y: detalleY }}
          >
            <motion.div
              className="border-[6px] border-crema shadow-[0_30px_60px_-30px_rgb(20_20_20/0.35)]"
              variants={{ oculto: { opacity: 0, y: 60 }, visible: { opacity: 1, y: 0 } }}
              transition={{ duration: 1.4, ease: easeSuave, delay: 0.9 }}
            >
              <Picture
                avif={manoAvif}
                jpg={manoJpg}
                alt=""
                className="aspect-[4/3] w-full object-cover object-[30%_center]"
              />
            </motion.div>
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

// «no se ve» entra desenfocado y se aclara: lo que no se ve, de a poco, se vuelve visible
function NoSeVe() {
  return (
    <motion.em
      className="inline-block pr-[0.06em] font-medium text-burdeos"
      variants={{ oculto: { filter: 'blur(14px)', opacity: 0.2 }, visible: { filter: 'blur(0px)', opacity: 1 } }}
      transition={{ duration: 2.2, ease: easeSuave, delay: 1.1 }}
    >
      no se ve
    </motion.em>
  )
}

// Cada línea del título sube desde una máscara
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.1em]">
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
