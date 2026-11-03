import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode, type RefObject } from 'react'
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

// Bloque burdeos: la idea que atraviesa el trabajo de Mía, con una llave que se dibuja con el scroll.
// Mobile: la llave queda detrás, a la derecha. Desktop: acostada en el hueco de la izquierda, bajo el título,
// con el paletón apuntando al texto, como si lo abriera
function Pregunta() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start 0.8', 'end 0.6'] })
  const llaveY = useTransform(scrollYProgress, [0, 1], ['6%', '-6%'])
  // Cada llave se dibuja según su propia posición (no la del bloque), así termina mientras todavía se ve
  const llaveMobile = useRef<HTMLDivElement>(null)
  const llaveDesktop = useRef<HTMLDivElement>(null)
  // En mobile la llave está corrida media altura hacia arriba (-translate-y-1/2), que el scroll no ve:
  // su «start» ya es el centro visible
  const trazoMobile = useTrazo(llaveMobile, ['start 1.1', 'start 0.55'])
  const trazoDesktop = useTrazo(llaveDesktop, ['start 0.95', 'center 0.55'])

  return (
    <div ref={ref} className="relative overflow-hidden bg-burdeos text-crema">
      <motion.div
        ref={llaveMobile}
        className="absolute top-1/2 right-[3%] w-28 -translate-y-1/2 rotate-[14deg] text-crema/20 sm:w-36 lg:hidden"
        style={{ y: llaveY }}
      >
        <Llave progreso={trazoMobile} className="w-full" />
      </motion.div>

      <Container className="relative py-seccion">
        <Reveal y={12}>
          <Eyebrow tone="light">Sobre Mía</Eyebrow>
        </Reveal>

        <ScrollRevealText
          className="mt-8 max-w-5xl text-titulo lg:mt-10"
          segments={[
            { text: 'Comprender una dificultad es importante; saber intervenir sobre ella, es' },
            { text: 'fundamental', firma: true },
            { text: '', pegado: true },
          ]}
        />

        <div className="mt-bloque grid lg:grid-cols-12 lg:items-center">
          {/* La caja tiene la proporción de la llave acostada; adentro va parada y se gira un cuarto de vuelta */}
          <motion.div
            ref={llaveDesktop}
            aria-hidden
            className="relative hidden aspect-[32/10] w-[calc(100%-4rem)] text-dorado-suave/55 lg:col-span-6 lg:block"
            style={{ y: llaveY }}
          >
            <div className="absolute top-1/2 left-1/2 h-[320%] w-[31.25%] -translate-x-1/2 -translate-y-1/2 -rotate-90">
              <Llave progreso={trazoDesktop} className="size-full" />
            </div>
          </motion.div>
          <Reveal className="text-cuerpo text-crema/75 lg:col-span-5 lg:col-start-7">
            <p>
              Mía es una consultora que trabaja con la relación entre la posición de quien dirige, las decisiones
              que toma y las condiciones de funcionamiento de su organización.
            </p>
            <LeerMas tono="oscuro">
              <p>
                Nos interesa identificar qué está en juego en cada situación, reconocer cómo están dispuestos los
                recursos existentes y construir criterios de intervención que permitan producir cambios concretos.
              </p>
            </LeerMas>
          </Reveal>
        </div>
      </Container>
    </div>
  )
}

// Empieza a dibujarse cuando la llave asoma por abajo y queda completa cuando su centro llega a poco más de
// la mitad de la pantalla
function useTrazo(ref: RefObject<HTMLElement | null>, offset: ScrollOffset) {
  const { scrollYProgress } = useScroll({ target: ref, offset })
  return scrollYProgress
}

type ScrollOffset = NonNullable<Parameters<typeof useScroll>[0]>['offset']

// A quién acompaña Mía, de dónde viene su mirada y quiénes están detrás.
// Desktop: los dos retratos a la izquierda, lado a lado bajo su título; título y texto a la derecha.
// Mobile: título, el texto con letra capitular y después el equipo, en un carrusel de a una persona.
function Mirada() {
  return (
    <div className="py-seccion lg:py-24">
      <Container className="grid grid-cols-1 lg:grid-cols-12 lg:grid-rows-[auto_auto] lg:gap-x-8">
        {/* Encabezado */}
        <div className="lg:col-span-5 lg:col-start-8 lg:row-start-1 lg:self-end">
          <Reveal y={12}>
            <Eyebrow>La mirada de Mía</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-6 text-frase lg:mt-10">
              Lleva esa mirada al lugar donde las decisiones suceden: <Destacado>la empresa.</Destacado>
            </h3>
          </Reveal>
        </div>

        {/* Quiénes están detrás de Mía: en mobile va al final, después del texto */}
        <Retratos className="order-last mt-bloque lg:order-none lg:col-span-6 lg:col-start-1 lg:row-span-2 lg:row-start-1 lg:mt-0 lg:self-center" />

        {/* Texto: en mobile, el primer párrafo abre con capitular y la historia queda tras «Ver más» */}
        <Reveal
          delay={0.2}
          className="mt-8 text-cuerpo text-negro/70 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:mt-10 lg:self-start"
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

      <Container className="py-10 lg:py-32 lg:text-center">
        <Reveal y={12}>
          <p className="etiqueta hidden items-center gap-4 text-dorado-suave lg:block">
            <span aria-hidden className="h-px w-10 shrink-0 bg-dorado lg:hidden" />
            Una idea resume su forma de trabajar
          </p>
        </Reveal>
        <blockquote className="max-w-5xl font-serif text-titulo text-crema lg:mx-auto lg:mt-8">
          <LineaQueSube delay={0.1}>Hacer operativo</LineaQueSube>
          <LineaQueSube delay={0.22}>
            <Destacado>lo sensible.</Destacado>
          </LineaQueSube>
        </blockquote>
        <motion.span
          aria-hidden
          className="mt-4 block h-px w-24 origin-left bg-dorado-suave lg:mx-auto lg:mt-10 lg:origin-center"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeSuave, delay: 0.5 }}
        />
        <Reveal delay={0.4}>
          <p className="mt-4 max-w-sm text-cuerpo text-balance text-crema/80 lg:mx-auto lg:mt-8 lg:max-w-xl">
            <span className="lg:hidden">Reconocer lo que ocurre en tu empresa y convertirlo en acción.</span>
            <span className="hidden lg:inline">
              Reconocer aquello que, aunque no siempre resulte evidente, interviene en el funcionamiento de una
              empresa y convertirlo en una posibilidad concreta de acción.
            </span>
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
