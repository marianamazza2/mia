import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import sillonAvif from '@/assets/images/bn-sillon-carpeta.avif'
import sillonJpg from '@/assets/images/bn-sillon-carpeta.jpg'
import texturaAvif from '@/assets/images/bn-textura.avif'
import texturaJpg from '@/assets/images/bn-textura.jpg'
import { Llave } from '@/components/marca/Llave'
import { PatronA } from '@/components/marca/PatronA'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollRevealText } from '@/components/motion/ScrollRevealText'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { easeSuave } from '@/lib/motion'
import { usePatron } from '@/lib/opciones'

const equilibrios = [
  { valor: 'Sensibilidad', matiz: 'sin perder rigor' },
  { valor: 'Profundidad', matiz: 'sin volverse solemne' },
  { valor: 'Humanidad', matiz: 'sin perder dirección comercial' },
]

const descartes = ['coaching', 'terapia', 'consultoría tradicional']

export function SobreMia() {
  return (
    <section id="sobre-mia">
      <Pregunta />
      <Mirada />
      <Sensible />
      <Equilibrio />
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
            <p className="font-serif text-destacado text-crema italic">Mía trabaja sobre esa relación.</p>
          </Reveal>
        </div>
      </Container>
    </div>
  )
}

// A quién acompaña Mía y de dónde viene su mirada. Foto en B/N a sangre por la izquierda.
function Mirada() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const fotoY = useTransform(scrollYProgress, [0, 1], ['-6%', '6%'])

  return (
    <div ref={ref} className="relative py-seccion lg:py-0">
      <div className="grid lg:min-h-[110svh] lg:grid-cols-12">
        <div className="relative px-6 sm:px-8 lg:col-span-6 lg:px-0">
          {/* El observador va en el contenedor: con el recorte al 100 % el navegador lo da por invisible */}
          <motion.div
            className="relative aspect-[4/5] lg:absolute lg:inset-0 lg:aspect-auto"
            initial="oculta"
            whileInView="visible"
            viewport={{ once: true, margin: '0px 0px -20% 0px' }}
          >
            <motion.div
              className="absolute inset-0 overflow-hidden"
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

        <div className="mt-bloque flex items-center px-6 sm:px-8 lg:col-span-5 lg:col-start-8 lg:mt-0 lg:px-0 lg:py-seccion lg:pr-12">
          <div>
            <Reveal y={12}>
              <Eyebrow>La mirada de Mía</Eyebrow>
            </Reveal>

            <Reveal delay={0.1}>
              <h3 className="mt-8 text-subtitulo lg:mt-10">
                Lleva esa mirada al lugar donde las decisiones suceden:{' '}
                <em className="font-medium text-burdeos">la empresa.</em>
              </h3>
            </Reveal>

            <Reveal delay={0.2} className="mt-8 space-y-5 text-cuerpo text-negro/70 lg:mt-10">
              <p>
                Trabaja con mujeres que lideran empresas consolidadas y que atraviesan momentos de crecimiento,
                reorganización o expansión. Mujeres que han construido un negocio, pero que empiezan a percibir
                que la forma en que hoy lo conducen ya no alcanza para lo que la empresa necesita.
              </p>
              <p>
                Mía comenzó siendo una manera de mirar, mucho antes de ser una consultora. Desde la psicología y
                el psicoanálisis, observó que muchas veces una persona sabe qué debería hacer y tiene las
                herramientas, y aun así algo insiste, se repite y traba el movimiento.
              </p>
            </Reveal>
          </div>
        </div>
      </div>
    </div>
  )
}

// Franja a sangre con la textura de seda del manual: la frase que resume la forma de trabajar
function Sensible() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const escala = useTransform(scrollYProgress, [0, 1], [1.18, 1])
  const fondoX = useTransform(scrollYProgress, [0, 1], ['-3%', '3%'])

  return (
    <div ref={ref} className="relative isolate flex min-h-[85svh] items-center overflow-hidden">
      <motion.div className="absolute inset-0 -z-10" style={{ scale: escala, x: fondoX }}>
        <Picture avif={texturaAvif} jpg={texturaJpg} alt="" loading="lazy" className="size-full object-cover" />
      </motion.div>
      <div className="absolute inset-0 -z-10 bg-crema/55" />

      <Container className="py-seccion text-center">
        <Reveal y={12}>
          <p className="etiqueta text-burdeos">Una idea resume su forma de trabajar</p>
        </Reveal>
        <Reveal delay={0.1}>
          <blockquote className="mx-auto mt-8 max-w-5xl font-serif text-display font-medium text-negro lg:mt-10">
            Operacionalizar <em className="block text-burdeos">lo sensible.</em>
          </blockquote>
        </Reveal>
        <motion.span
          aria-hidden
          className="mx-auto mt-12 block h-px w-24 bg-dorado"
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, ease: easeSuave, delay: 0.4 }}
        />
        <Reveal delay={0.3}>
          <p className="mx-auto mt-8 max-w-md text-cuerpo text-negro/75">
            Comprender qué está en juego para producir movimiento.
          </p>
        </Reveal>
      </Container>
    </div>
  )
}

// Lo que Mía no es (tachado) y el equilibrio desde el que trabaja
function Equilibrio() {
  const patron = usePatron()

  return (
    <div id="equilibrio" className="relative overflow-hidden py-seccion">
      {patron === 'marca-de-agua' && <PatronA paso={84} difuminado className="text-burdeos opacity-[0.07]" />}

      <Container className="relative">
        <Reveal>
          <p className="max-w-5xl font-serif text-titulo leading-[1.15] font-medium">
            No es{' '}
            {descartes.map((descarte, i) => (
              <span key={descarte}>
                {/* Palabra por palabra, para que el tachado acompañe el salto de línea */}
                {descarte.split(' ').map((palabra, j) => (
                  <span key={palabra}>
                    {j > 0 && ' '}
                    <Tachado delay={0.4 + i * 0.35 + j * 0.2}>{palabra}</Tachado>
                  </span>
                ))}
                {i < descartes.length - 1 ? ', ni ' : '.'}
              </span>
            ))}
          </p>
        </Reveal>
        <Reveal delay={0.2}>
          <p className="mt-8 max-w-xl text-cuerpo text-negro/70 lg:mt-10 lg:ml-[calc(100%/12*6)]">
            Es una forma distinta de mirar las organizaciones, construida sobre un equilibrio poco común.
          </p>
        </Reveal>

        <ul className="mt-bloque grid border-t border-dorado/40 sm:grid-cols-3">
          {equilibrios.map(({ valor, matiz }, i) => (
            <motion.li
              key={valor}
              className="border-b border-dorado/40 py-10 sm:border-b-0 sm:border-l sm:px-8 sm:py-14 sm:first:border-l-0 sm:first:pl-0 lg:px-12"
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '0px 0px -10% 0px' }}
              transition={{ duration: 1.1, ease: easeSuave, delay: i * 0.15 }}
            >
              <span className="font-serif text-lg text-burdeos-medio italic">{['I', 'II', 'III'][i]}.</span>
              <p className="mt-6 font-serif text-subtitulo font-semibold text-burdeos">{valor}</p>
              <p className="mt-3 font-serif text-destacado text-negro/60 italic">{matiz}</p>
            </motion.li>
          ))}
        </ul>
      </Container>
    </div>
  )
}

// Palabra que se tacha con un filete burdeos al entrar en pantalla
function Tachado({ children, delay }: { children: string; delay: number }) {
  return (
    <span className="relative inline-block text-negro/35">
      {children}
      <motion.span
        aria-hidden
        className="absolute inset-x-0 top-[55%] h-[2px] origin-left bg-burdeos"
        initial={{ scaleX: 0 }}
        whileInView={{ scaleX: 1 }}
        viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        transition={{ duration: 0.9, ease: easeSuave, delay }}
      />
    </span>
  )
}
