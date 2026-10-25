import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import sillonAvif from '@/assets/images/bn-sillon-carpeta.avif'
import sillonJpg from '@/assets/images/bn-sillon-carpeta.jpg'
import texturaAvif from '@/assets/images/bn-textura.avif'
import texturaJpg from '@/assets/images/bn-textura.jpg'
import { Llave } from '@/components/marca/Llave'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollRevealText } from '@/components/motion/ScrollRevealText'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { LeerMas } from '@/components/ui/LeerMas'
import { Picture } from '@/components/ui/Picture'
import { easeSuave } from '@/lib/motion'
import { Destacado } from '@/components/marca/Destacado'

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

// A quién acompaña Mía y de dónde viene su mirada.
// Desktop: foto a sangre por la izquierda y texto centrado a la derecha.
// Mobile: composición editorial: título, foto corrida a la derecha con un rótulo vertical en el margen,
// y el texto con letra capitular.
function Mirada() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const fotoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className="relative py-20 lg:py-0">
      <div className="grid lg:grid-cols-12 lg:grid-rows-[minmax(6rem,1fr)_auto_auto_minmax(6rem,1fr)]">
        {/* Encabezado */}
        <div className="px-6 sm:px-8 lg:col-span-5 lg:col-start-8 lg:row-start-2 lg:px-0 lg:pr-12 2xl:pr-(--margen-ancho)">
          <Reveal y={12}>
            <Eyebrow>La mirada de Mía</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h3 className="mt-6 text-subtitulo lg:mt-10">
              Lleva esa mirada al lugar donde las decisiones suceden: <Destacado>la empresa.</Destacado>
            </h3>
          </Reveal>
        </div>

        {/* Foto */}
        <div className="relative mt-10 pr-6 pl-16 sm:pr-8 sm:pl-24 lg:col-span-6 lg:col-start-1 lg:row-span-full lg:row-start-1 lg:mt-0 lg:p-0">
          {/* Rótulo vertical en el margen, solo en mobile */}
          <p
            aria-hidden
            className="etiqueta absolute top-0 left-6 rotate-180 text-[0.625rem] text-negro/45 [writing-mode:vertical-rl] sm:left-8 lg:hidden"
          >
            Psicología · Psicoanálisis · Empresa
          </p>
          {/* El observador va en el contenedor: con el recorte al 100 % el navegador lo da por invisible */}
          <motion.div
            className="relative aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto"
            initial="oculta"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden rounded-[10px] lg:rounded-none"
              variants={{ oculta: { clipPath: 'inset(0 100% 0 0)' }, visible: { clipPath: 'inset(0 0% 0 0)' } }}
              transition={{ duration: 1.8, ease: easeSuave }}
            >
              <motion.div className="absolute inset-x-0 -top-[8%] h-[116%]" style={{ y: fotoY }}>
                <Picture
                  avif={sillonAvif}
                  jpg={sillonJpg}
                  alt="Empresaria con la carpeta burdeos de Mía sobre las piernas"
                  loading="lazy"
                  className="size-full object-cover object-[50%_40%]"
                />
              </motion.div>
            </motion.div>
          </motion.div>
        </div>

        {/* Texto: en mobile, el primer párrafo abre con capitular y la historia queda tras «Leer más» */}
        <Reveal
          delay={0.2}
          className="mt-10 space-y-5 px-6 text-cuerpo text-negro/70 sm:px-8 lg:col-span-5 lg:col-start-8 lg:row-start-3 lg:px-0 lg:pr-12 2xl:pr-(--margen-ancho)"
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
      </div>
    </div>
  )
}

// Franja a sangre con la textura de seda del manual: la frase que resume la forma de trabajar
function Sensible() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], [1.08, 1])
  const fondoX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  // En desktop, mismo alto que el bloque «La mirada de Mía» (~750 px)
  return (
    <div ref={ref} className="relative isolate flex items-center overflow-hidden lg:min-h-[47rem]">
      <motion.div className="absolute inset-0 -z-10" style={{ scale: escala, x: fondoX }}>
        {/* Encuadre centrado en las dos ramitas de hojas de la textura */}
        <Picture avif={texturaAvif} jpg={texturaJpg} alt="" loading="lazy" className="size-full object-cover object-[18%_36%] lg:object-[40%_42%]" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-crema/35" />

      <Container className="py-20 text-center lg:py-28">
        <Reveal y={12}>
          <p className="etiqueta text-burdeos">Una idea resume su forma de trabajar</p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mx-auto mt-6 max-w-5xl font-serif text-titulo font-medium text-negro lg:mt-8">
            Operacionalizar
            <br />
            <Destacado delay={0.6}>lo sensible.</Destacado>
          </blockquote>
        </Reveal>
        <motion.span
          aria-hidden
          className="mx-auto mt-8 block h-px w-24 bg-dorado lg:mt-10"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeSuave, delay: 0.4 }}
        />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-6 max-w-md text-cuerpo text-negro/75 lg:mt-8">
            Comprender qué está en juego para producir movimiento.
          </p>
        </Reveal>
      </Container>
    </div>
  )
}
