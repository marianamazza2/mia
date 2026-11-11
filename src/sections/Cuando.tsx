import { useEffect, useRef, useState } from 'react'
import abrazo from '@/assets/images/cuando-abrazo.webp'
import cuaderno from '@/assets/images/cuando-cuaderno.webp'
import libros from '@/assets/images/cuando-libros.webp'
import llaves from '@/assets/images/cuando-llaves.webp'
import reunion from '@/assets/images/cuando-reunion.webp'
import { Reveal } from '@/components/motion/Reveal'
import { ScrollRevealText } from '@/components/motion/ScrollRevealText'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'

type Situacion = {
  titulo: string
  texto: string
  /** Foto de fondo: se tiñe de burdeos cuando la fila está activa */
  foto: string
  /** Encuadre de la foto en la tira (object-position): dónde está lo que importa de la imagen */
  encuadre: string
}

// Las situaciones en las que una empresaria suele llegar a Mía: cada una completa la frase «En Mía te acompañamos cuando…»
const situaciones: Situacion[] = [
  {
    titulo: 'La empresa depende demasiado de ti y necesitas que tu equipo asuma mayores responsabilidades',
    texto:
      'Has construido un negocio que funciona, pero muchas cuestiones siguen necesitando tu presencia, decisiones o supervisión constante.',
    foto: llaves,
    // Tener todas las llaves en la mano: el encuadre baja hasta el manojo de llaves
    encuadre: 'object-[50%_78%]',
  },
  {
    titulo: 'No sabes cómo gestionar las situaciones diarias con tu equipo',
    texto:
      'Cuentas con personas que trabajan contigo, pero todavía resulta difícil distribuir funciones o consolidar una organización con mayor autonomía.',
    foto: reunion,
    // Una reunión: la persona sentada con los papeles, de la cintura para arriba
    encuadre: 'object-[55%_0%]',
  },
  {
    titulo: 'Hay situaciones y conflictos que no consigues resolver',
    texto:
      'Has intentado introducir cambios, conversar con tu equipo o modificar ciertas formas de trabajo, pero las dificultades continúan apareciendo.',
    foto: abrazo,
    // Abrazarse a sí misma: la tensión de lo que no se resuelve
    encuadre: 'object-[45%_55%]',
  },
  {
    titulo: 'Tienes decisiones importantes por delante',
    texto:
      'Necesitas valorar alternativas, considerar sus consecuencias y encontrar una orientación que te permita avanzar.',
    foto: cuaderno,
    // Escribir antes de decidir: la mano y el cuaderno
    encuadre: 'object-[50%_72%]',
  },
  {
    titulo: 'Sientes necesario volver a definir el rumbo y el horizonte de tu marca',
    texto:
      'Tu empresa está cambiando y estás considerando nuevas posibilidades o necesitas reorganizar aspectos de su funcionamiento para la etapa que quieres construir.',
    foto: libros,
    // Avanzar con lo necesario bajo el brazo: libros, anteojos y la mano
    encuadre: 'object-[50%_55%]',
  },
]

// Antes de los servicios: cuándo es el momento de trabajar con Mía. Arriba, la frase que nombra la soledad de
// dirigir y la introducción, que termina en «En Mía te acompañamos cuando…»; debajo, a todo el ancho, una fila
// por situación, así cada una completa esa frase al leerla.
// Cada fila: el texto a la izquierda, el título al centro y el número a la derecha. La fila que cruza el centro
// de la pantalla (o la que está bajo el mouse) se enciende: aparece su foto teñida de burdeos y el texto pasa a crema.
// En mobile, número y título arriba, el texto debajo.
export function Cuando() {
  const filas = useRef<(HTMLLIElement | null)[]>([])
  const [enCentro, setEnCentro] = useState<number | null>(null)
  const [bajoMouse, setBajoMouse] = useState<number | null>(null)
  const activa = bajoMouse ?? enCentro

  useEffect(() => {
    // Una franja de 1 px en el medio de la pantalla: la fila que la atraviesa es la activa
    const observer = new IntersectionObserver(
      (entradas) => {
        entradas.forEach((entrada) => {
          const i = filas.current.indexOf(entrada.target as HTMLLIElement)
          if (entrada.isIntersecting) setEnCentro(i)
          else setEnCentro((actual) => (actual === i ? null : actual))
        })
      },
      { rootMargin: '-50% 0px -50% 0px' },
    )
    filas.current.forEach((fila) => fila && observer.observe(fila))
    return () => observer.disconnect()
  }, [])

  // Sin aire abajo: las filas cierran con su filete y el espacio hasta Servicios lo pone Servicios
  return (
    <section id="cuando" className="relative pt-seccion">
      <Container>
        <Reveal y={12}>
          <Eyebrow>¿Cuándo trabajar con Mía?</Eyebrow>
        </Reveal>
        <ScrollRevealText
          className="mt-8 max-w-5xl text-titulo lg:mt-10"
          segments={[
            { text: 'Dirigir una empresa, algunas veces, puede sentirse como un camino' },
            { text: 'demasiado', firma: true },
            { text: 'solitario' },
          ]}
        />

        {/* Mobile: el párrafo y después la frase, que abre las filas. Desktop: la frase arriba y el párrafo debajo */}
        <div className="mt-bloque grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-x-10">
          <Reveal delay={0.15} className="lg:col-span-9 lg:row-start-2">
            <p className="text-cuerpo text-negro/70">
              Hay momentos en los que las exigencias del funcionamiento cotidiano, las responsabilidades de dirección
              y el porvenir de la empresa requieren decisiones que implican algo más que una respuesta inmediata:
              necesitan un espacio desde el cual poder pensarlas y construir cómo llevarlas adelante.
            </p>
          </Reveal>
          <Reveal delay={0.1} className="lg:col-span-7 lg:row-start-1">
            <p className="font-serif text-frase text-burdeos">En Mía te acompañamos cuando…</p>
          </Reveal>
        </div>
      </Container>

      <ul className="mt-bloque border-b border-dorado/30" onMouseLeave={() => setBajoMouse(null)}>
        {situaciones.map((situacion, i) => (
          <li
            key={situacion.titulo}
            ref={(fila) => {
              filas.current[i] = fila
            }}
            onMouseEnter={() => setBajoMouse(i)}
            className="relative isolate overflow-hidden border-t border-dorado/30"
          >
            <Fila situacion={situacion} indice={i} activa={activa === i} />
          </li>
        ))}
      </ul>
    </section>
  )
}

function Fila({ situacion, indice, activa }: { situacion: Situacion; indice: number; activa: boolean }) {
  return (
    <>
      {/* Fondo: la foto con sus tonos, apenas teñida de burdeos y oscurecida lo justo para que el texto crema se lea */}
      <div
        aria-hidden
        className={cn(
          'absolute inset-0 -z-10 bg-negro transition-opacity duration-700 ease-suave',
          activa ? 'opacity-100' : 'opacity-0',
        )}
      >
        <Picture
          src={situacion.foto}
          alt=""
          loading="lazy"
          className={cn(
            'size-full object-cover transition-transform duration-[1.6s] ease-suave',
            situacion.encuadre,
            activa ? 'scale-100' : 'scale-110',
          )}
        />
        <span className="absolute inset-0 bg-burdeos/40" />
        <span className="absolute inset-0 bg-negro/25" />
      </div>

      <Container className="py-16 lg:py-24">
        <Reveal y={16} className="grid grid-cols-[auto_1fr] gap-x-5 lg:grid-cols-12 lg:items-center lg:gap-x-10">
          <span
            className={cn(
              'font-serif text-menor tabular-nums lining-nums transition-colors duration-700 ease-suave lg:col-start-12 lg:row-start-1 lg:text-right lg:text-tarjeta',
              activa ? 'text-dorado-suave' : 'text-burdeos',
            )}
          >
            {String(indice + 1).padStart(2, '0')}
          </span>
          <h3
            className={cn(
              'font-serif text-tarjeta text-balance transition-colors duration-700 ease-suave lg:col-span-7 lg:col-start-5 lg:row-start-1 lg:text-frase',
              activa ? 'text-crema' : 'text-negro',
            )}
          >
            {situacion.titulo}
          </h3>
          <p
            className={cn(
              'col-start-2 mt-3 text-detalle transition-colors duration-700 ease-suave lg:col-span-3 lg:col-start-1 lg:row-start-1 lg:mt-0',
              activa ? 'text-crema/85' : 'text-negro/65',
            )}
          >
            {situacion.texto}
          </p>
        </Reveal>
      </Container>
    </>
  )
}
