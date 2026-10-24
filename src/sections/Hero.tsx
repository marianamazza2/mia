import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import isotipo from '@/assets/brand/isotipo_mia_principal.svg'
import heroAvif from '@/assets/images/hero-carpeta.avif'
import heroJpg from '@/assets/images/hero-carpeta.jpg'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { easeSuave } from '@/lib/motion'

const ejes = ['Liderazgo', 'Organización', 'Negocio']

export function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-12%'])
  const contentOpacity = useTransform(scrollYProgress, [0, 0.7], [1, 0])

  return (
    <section ref={ref} id="inicio" className="relative isolate z-10 flex min-h-svh items-end bg-burdeos-profundo text-crema">
      {/* Foto a sangre con un velo burdeos */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <motion.div className="absolute inset-x-0 -top-[5%] h-[115%]" style={{ y: imageY }}>
          <motion.div
            className="size-full"
            initial={{ scale: 1.12, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 2.6, ease: easeSuave }}
          >
            <Picture
              avif={heroAvif}
              jpg={heroJpg}
              alt=""
              fetchPriority="high"
              className="size-full object-cover object-[62%_center] lg:object-[70%_center]"
            />
          </motion.div>
        </motion.div>
        <div className="absolute inset-0 bg-burdeos opacity-55 mix-blend-multiply" />
        <div className="absolute inset-0 bg-burdeos-profundo/45" />
        {/* Velo extra del lado del texto, para que la foto no compita con el título */}
        <div className="absolute inset-0 bg-burdeos-profundo/35 lg:bg-transparent lg:bg-linear-to-r lg:from-burdeos-profundo/80 lg:via-burdeos-profundo/45 lg:via-45% lg:to-transparent lg:to-75%" />
      </div>

      <Container className="relative pt-36 pb-28 sm:pb-32 lg:pt-40 lg:pb-36">
        <motion.div className="grid items-end gap-16 lg:grid-cols-12" style={{ y: contentY, opacity: contentOpacity }}>
          <div className="lg:col-span-8">
            <Reveal y={12} delay={0.3}>
              <Eyebrow tone="light">Consultora para empresarias</Eyebrow>
            </Reveal>

            <h1 className="mt-8 text-[2.9rem] leading-[1.02] font-medium sm:text-6xl lg:text-[5.25rem] xl:text-[6rem]">
              <Line delay={0.45}>
                Lo que <em className="text-dorado-suave">no se ve</em>
              </Line>
              <Line delay={0.57}>también dirige</Line>
              <Line delay={0.69}>tu empresa.</Line>
            </h1>

            <Reveal delay={0.95}>
              <p className="mt-8 max-w-lg text-[1.0625rem] leading-relaxed text-crema/80">
                Mía acompaña a mujeres que lideran empresas a comprender cómo su forma de conducir incide en
                el funcionamiento de su organización, para pensarla y desarrollarla desde un lugar más claro.
              </p>
            </Reveal>

            <Reveal delay={1.1} className="mt-12 flex flex-wrap items-center gap-x-8 gap-y-5">
              <Button href="#contacto" variant="light" withArrow>
                Reservar una conversación
              </Button>
              <a
                href="#sobre-mia"
                className="group relative py-1 text-xs font-medium tracking-[0.18em] text-crema uppercase"
              >
                Conocer Mía
                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-dorado-suave transition-transform duration-500 ease-suave group-hover:scale-x-50" />
              </a>
            </Reveal>
          </div>

          {/* Ejes del trabajo de Mía, como en la referencia */}
          <motion.ul
            className="hidden justify-self-end text-right lg:col-span-3 lg:col-start-10 lg:block"
            initial="hidden"
            animate="visible"
            transition={{ delayChildren: 1.3, staggerChildren: 0.12 }}
          >
            {ejes.map((eje) => (
              <motion.li
                key={eje}
                className="py-1.5 text-[0.6875rem] tracking-[0.35em] text-crema/85 uppercase"
                variants={{ hidden: { opacity: 0, x: 12 }, visible: { opacity: 1, x: 0 } }}
                transition={{ duration: 1, ease: easeSuave }}
              >
                {eje}
              </motion.li>
            ))}
            <motion.li
              aria-hidden
              className="mt-4 ml-auto h-px w-14 origin-right bg-dorado-suave"
              variants={{ hidden: { scaleX: 0 }, visible: { scaleX: 1 } }}
              transition={{ duration: 1.2, ease: easeSuave }}
            />
          </motion.ul>
        </motion.div>
      </Container>

      <ScrollCue />
      <Seal />
    </section>
  )
}

// Cada línea del título sube desde una máscara
function Line({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <span className="block overflow-hidden pb-[0.08em]">
      <motion.span
        className="block"
        initial={{ y: '105%' }}
        animate={{ y: 0 }}
        transition={{ duration: 1.3, ease: easeSuave, delay }}
      >
        {children}
      </motion.span>
    </span>
  )
}

// Sello circular con el isotipo y un texto que gira muy lento; queda a caballo entre el hero y la sección siguiente
function Seal() {
  return (
    <div className="absolute right-6 bottom-0 z-10 translate-y-1/2 sm:right-10 lg:right-[max(3rem,calc((100vw-80rem)/2+3rem))]">
      <motion.div
        className="size-28 sm:size-32 lg:size-40"
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: easeSuave, delay: 1.5 }}
      >
        <div className="relative size-full rounded-full bg-crema ring-1 ring-dorado/50 ring-offset-4 ring-offset-transparent">
          <motion.svg
            aria-hidden
            viewBox="0 0 200 200"
            className="absolute inset-0 size-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 48, ease: 'linear', repeat: Infinity }}
          >
            <defs>
              <path id="sello-circulo" d="M100,100 m-74,0 a74,74 0 1,1 148,0 a74,74 0 1,1 -148,0" />
            </defs>
            <text className="fill-burdeos font-sans text-[12.5px] font-medium tracking-[0.2em] uppercase">
              <textPath href="#sello-circulo" textLength="462" lengthAdjust="spacing">
                Consultora para empresarias · Barcelona ·
              </textPath>
            </text>
          </motion.svg>
          <img src={isotipo} alt="" className="absolute inset-[31%] size-[38%]" />
        </div>
      </motion.div>
    </div>
  )
}

function ScrollCue() {
  return (
    <motion.a
      href="#sobre-mia"
      aria-label="Ir a Sobre Mía"
      className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-3 lg:flex"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 2 }}
    >
      <span className="text-[0.625rem] tracking-[0.3em] text-crema/60 uppercase">Descubrir</span>
      <span className="relative h-12 w-px overflow-hidden bg-crema/20">
        <motion.span
          className="absolute inset-x-0 top-0 h-1/2 bg-dorado-suave"
          animate={{ y: ['-100%', '200%'] }}
          transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity }}
        />
      </span>
    </motion.a>
  )
}
