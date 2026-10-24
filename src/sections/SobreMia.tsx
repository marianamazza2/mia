import { motion, useScroll, useTransform } from 'motion/react'
import { useRef } from 'react'
import aCrema from '@/assets/brand/a_mia_crema.svg'
import sillonAvif from '@/assets/images/sobre-mia-sillon.avif'
import sillonJpg from '@/assets/images/sobre-mia-sillon.jpg'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollRevealText } from '@/components/motion/ScrollRevealText'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { easeSuave } from '@/lib/motion'

const equilibrios = [
  { valor: 'Sensibilidad', matiz: 'sin perder rigor' },
  { valor: 'Profundidad', matiz: 'sin volverse solemne' },
  { valor: 'Humanidad', matiz: 'sin perder dirección comercial' },
]

export function SobreMia() {
  return (
    <section id="sobre-mia">
      <Pregunta />
      <Mirada />
    </section>
  )
}

// Bloque burdeos: la pregunta que atraviesa el trabajo de Mía
function Pregunta() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const aY = useTransform(scrollYProgress, [0, 1], ['-12%', '12%'])

  return (
    <div ref={ref} className="relative overflow-hidden bg-burdeos text-crema">
      <motion.img
        aria-hidden
        src={aCrema}
        alt=""
        className="pointer-events-none absolute top-1/2 -right-[30%] w-[110%] max-w-none -translate-y-1/2 opacity-[0.05] sm:-right-[18%] sm:w-[75%] lg:w-[60%]"
        style={{ y: aY }}
      />

      <Container className="relative py-28 sm:py-36 lg:py-48">
        <Reveal y={12}>
          <Eyebrow tone="light">Sobre Mía</Eyebrow>
        </Reveal>

        <ScrollRevealText
          className="mt-10 max-w-5xl text-[2.25rem] leading-[1.12] font-medium sm:text-5xl lg:text-[4.25rem]"
          segments={[
            { text: '¿Qué hacemos con aquello que' },
            { text: 'no se ve,', em: true },
            { text: 'pero que está produciendo efectos concretos?' },
          ]}
        />

        <div className="mt-16 grid lg:mt-24 lg:grid-cols-12">
          <Reveal className="space-y-5 text-[1.0625rem] leading-[1.8] text-crema/75 lg:col-span-6 lg:col-start-7">
            <p>
              Esa pregunta atraviesa todo el trabajo de Mía. Porque lo que organiza el funcionamiento de una
              empresa no siempre está en sus procesos ni en su estrategia, sino en un lugar menos visible: la
              relación entre quien la dirige, las decisiones que toma y el modo en que esas decisiones ordenan
              el negocio.
            </p>
            <p className="text-crema">Mía trabaja sobre esa relación.</p>
          </Reveal>
        </div>
      </Container>
    </div>
  )
}

// Bloque crema: a quién acompaña Mía, de dónde viene su mirada y desde qué equilibrio trabaja
function Mirada() {
  return (
    <div className="py-28 sm:py-36 lg:py-44">
      <Container className="grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
          <motion.div
            className="relative aspect-[4/5] overflow-hidden rounded-[2rem] bg-burdeos/10"
            initial={{ clipPath: 'inset(12% 8% 12% 8% round 2rem)', opacity: 0 }}
            whileInView={{ clipPath: 'inset(0% 0% 0% 0% round 2rem)', opacity: 1 }}
            viewport={{ once: true, margin: '0px 0px -15% 0px' }}
            transition={{ duration: 1.6, ease: easeSuave }}
          >
            <Picture
              avif={sillonAvif}
              jpg={sillonJpg}
              alt="Empresaria leyendo una carpeta de Mía en un sillón"
              loading="lazy"
              className="size-full object-cover object-[40%_center]"
            />
          </motion.div>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal y={12}>
            <Eyebrow>La mirada de Mía</Eyebrow>
          </Reveal>

          <Reveal delay={0.1}>
            <h3 className="mt-8 text-4xl leading-[1.1] sm:text-5xl">
              Lleva esa mirada al lugar donde las decisiones suceden:{' '}
              <em className="font-medium text-burdeos">la empresa.</em>
            </h3>
          </Reveal>

          <Reveal delay={0.2} className="mt-10 space-y-5 text-[1.0625rem] leading-[1.8] text-negro/70">
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

          <Reveal className="mt-12">
            <figure className="border-l border-dorado pl-6 sm:pl-8">
              <blockquote className="font-serif text-4xl leading-[1.05] font-medium text-burdeos italic sm:text-5xl">
                Operacionalizar lo sensible.
              </blockquote>
              <figcaption className="mt-4 text-[1.0625rem] leading-relaxed text-negro/70">
                Comprender qué está en juego para producir movimiento.
              </figcaption>
            </figure>
          </Reveal>

          <Reveal className="mt-16 border-t border-dorado/40 pt-10">
            <p className="font-serif text-2xl leading-snug font-medium text-burdeos italic sm:text-[1.75rem]">
              No es coaching, ni terapia, ni consultoría tradicional.
            </p>
            <p className="mt-4 max-w-lg text-[1.0625rem] leading-[1.8] text-negro/70">
              Es una forma distinta de mirar las organizaciones, construida sobre un equilibrio poco común.
            </p>
          </Reveal>

          <ul className="mt-12 grid gap-4 sm:grid-cols-3">
            {equilibrios.map(({ valor, matiz }, i) => (
              <motion.li
                key={valor}
                className="group rounded-[1.5rem] border border-burdeos/10 bg-white/50 p-6 transition-colors duration-500 ease-suave hover:border-burdeos/25 hover:bg-white"
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1.1, ease: easeSuave, delay: i * 0.12 }}
              >
                <span className="font-serif text-lg text-burdeos-medio italic">0{i + 1}</span>
                <span aria-hidden className="mt-4 block h-px w-8 bg-dorado transition-all duration-500 ease-suave group-hover:w-14" />
                <p className="mt-5 font-serif text-2xl font-semibold text-burdeos">{valor}</p>
                <p className="mt-1 text-sm leading-relaxed text-negro/60">{matiz}</p>
              </motion.li>
            ))}
          </ul>
        </div>
      </Container>
    </div>
  )
}
