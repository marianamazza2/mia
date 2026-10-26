import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import textura from '@/assets/images/bn-textura.webp'
import { Llave } from '@/components/marca/Llave'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollRevealText } from '@/components/motion/ScrollRevealText'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { LeerMas } from '@/components/ui/LeerMas'
import { Picture } from '@/components/ui/Picture'
import { easeSuave } from '@/lib/motion'
import { Destacado } from '@/components/marca/Destacado'
import { Retratos } from '@/sections/Retratos'

export function SobreMia() {
  return (
    <section id="sobre-mia">
      <Pregunta />
      <Mirada />
      <Sensible />
    </section>
  )
}

// Bloque burdeos: la pregunta que atraviesa el trabajo de Mía, con una llave que se dibuja detrás
function Pregunta() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const trazo = useTransform(scrollYProgress, [0, 0.9], [0, 1])
  const llaveY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])

  return (
    <div ref={ref} className="relative overflow-hidden bg-burdeos text-crema">
      <motion.div
        className="absolute top-1/2 right-[3%] w-28 -translate-y-1/2 rotate-[14deg] text-crema/30 sm:w-36 lg:right-[4%] lg:w-44"
        style={{ y: llaveY }}
      >
        <Llave progreso={trazo} className="w-full" />
      </motion.div>

      <Container className="relative py-seccion">
        <Reveal y={12}>
          <Eyebrow tone="light">Sobre Mía</Eyebrow>
        </Reveal>

        <ScrollRevealText
          className="mt-8 max-w-5xl text-titulo font-medium lg:mt-10"
          segments={[
            { text: '¿Qué hacemos con aquello que' },
            { text: 'no se ve,', em: true },
            { text: 'pero que está produciendo efectos concretos?' },
          ]}
        />

        <div className="mt-bloque grid lg:grid-cols-12">
          <Reveal className="space-y-5 text-cuerpo text-crema/75 lg:col-span-5 lg:col-start-7">
            <p>
              Esa pregunta atraviesa todo el trabajo de Mía. Porque lo que organiza el funcionamiento de una
              empresa no siempre está en sus procesos ni en su estrategia, sino en un lugar menos visible: la
              relación entre quien la dirige, las decisiones que toma y el modo en que esas decisiones ordenan
              el negocio.
            </p>
            <p className="font-serif text-destacado text-crema">Mía trabaja sobre esa relación.</p>
          </Reveal>
        </div>
      </Container>
    </div>
  )
}

// A quién acompaña Mía, de dónde viene su mirada y quiénes están detrás.
// Desktop: los dos retratos a la izquierda, desfasados como en una revista; título y texto a la derecha.
// Mobile: título, los retratos lado a lado y el texto con letra capitular.
function Mirada() {
  return (
    <div className="py-seccion lg:py-24">
      <Container className="grid lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-8">
        {/* Encabezado */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
          <Reveal y={12}>
            <Eyebrow>La mirada de Mía</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-6 text-subtitulo lg:mt-10">
              Lleva esa mirada al lugar donde las decisiones suceden: <Destacado>la empresa.</Destacado>
            </h3>
          </Reveal>
        </div>

        {/* Quiénes están detrás de Mía */}
        <Retratos className="mt-10 lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center" />

        {/* Texto: en mobile, el primer párrafo abre con capitular y la historia queda tras «Leer más» */}
        <Reveal
          delay={0.2}
          className="mt-12 space-y-5 text-cuerpo text-negro/70 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-10 lg:self-start"
        >
          <p className="max-lg:first-letter:float-left max-lg:first-letter:mt-1 max-lg:first-letter:mr-2.5 max-lg:first-letter:font-serif max-lg:first-letter:text-[3.75rem] max-lg:first-letter:leading-[0.8] max-lg:first-letter:font-medium max-lg:first-letter:text-burdeos">
            Trabaja con mujeres que lideran empresas consolidadas y que atraviesan momentos de crecimiento,
            reorganización o expansión. Mujeres que han construido un negocio, pero que empiezan a percibir que
            la forma en que hoy lo conducen ya no alcanza para lo que la empresa necesita.
          </p>
          <LeerMas>
            <p>
              Mía comenzó siendo una manera de mirar, mucho antes de ser una consultora. Desde la psicología y el
              psicoanálisis, observó que muchas veces una persona sabe qué debería hacer y tiene las herramientas,
              y aun así algo insiste, se repite y traba el movimiento.
            </p>
          </LeerMas>
        </Reveal>
      </Container>
    </div>
  )
}

// Mobile: imagen ampliada (150 % de alto) para quedarse con la zona clara y la ramita de hojas,
// sin las manchas oscuras de los bordes. Desktop: encuadre centrado en las dos ramitas.
const encuadreTextura =
  'absolute -top-[25%] h-[150%] w-full object-cover object-[11%_50%] lg:static lg:size-full lg:object-[40%_42%]'

// Franja a sangre con la textura de seda del manual: la frase que resume la forma de trabajar.
// La textura teñida de burdeos, texto en crema y detalles en dorado suave.
// Desktop: texto centrado. Mobile: franja compacta y texto alineado a la izquierda.
function Sensible() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const fondoX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <div
      ref={ref}
      className="relative isolate flex items-center overflow-hidden bg-burdeos-medio text-crema"
    >
      {/* La textura se tiñe de burdeos al multiplicarse con el fondo */}
      <motion.div
        className="absolute inset-0 -z-10 mix-blend-multiply"
        style={{ scale: escala, x: fondoX }}
      >
        <Picture
          src={textura}
          alt=""
          loading="lazy"
          className={encuadreTextura}
        />
      </motion.div>

      <Container className="py-20 lg:py-32 lg:text-center">
        <Reveal y={12}>
          <p className="etiqueta flex items-center gap-4 text-dorado-suave lg:block">
            <span aria-hidden className="h-px w-10 shrink-0 bg-dorado lg:hidden" />
            Una idea resume su forma de trabajar
          </p>
        </Reveal>
        <blockquote className="mt-6 max-w-5xl font-serif text-[2.25rem] leading-[1.05] font-medium text-crema lg:mx-auto lg:mt-8 lg:text-titulo">
          <LineaQueSube delay={0.1}>Operacionalizar</LineaQueSube>
          <LineaQueSube delay={0.22}>
            <Destacado delay={0.9}>lo sensible.</Destacado>
          </LineaQueSube>
        </blockquote>
        <motion.span
          aria-hidden
          className="mt-8 block h-px w-24 origin-left bg-dorado-suave lg:mx-auto lg:mt-10 lg:origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeSuave, delay: 0.5 }}
        />
        <Reveal delay={0.4}>
          <p className="mt-6 max-w-xs text-cuerpo text-crema/80 lg:mx-auto lg:mt-8 lg:max-w-md">
            {/* En desktop, «producir movimiento» va junto en la segunda línea */}
            Comprender qué está en juego para <br className="hidden lg:block" />
            producir movimiento.
          </p>
        </Reveal>
      </Container>
    </div>
  )
}

// Línea que sube desde una máscara al entrar en pantalla, como el título de la portada
// (el disparador va en la máscara: la línea escondida debajo no cuenta como visible para el navegador)
function LineaQueSube({ children, delay }: { children: ReactNode; delay: number }) {
  return (
    <motion.span
      className="-mb-[0.06em] block overflow-hidden pb-[0.2em]"
      initial="oculta"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -10% 0px' }}
    >
      <motion.span
        className="block"
        variants={{ oculta: { y: '105%' }, visible: { y: 0 } }}
        transition={{ duration: 1.3, ease: easeSuave, delay }}
      >
        {children}
      </motion.span>
    </motion.span>
  )
}
