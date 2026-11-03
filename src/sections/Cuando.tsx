import { Reveal } from '@/components/motion/Reveal'
import { Carrusel } from '@/components/ui/Carrusel'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Situacion = {
  titulo: string
  texto: string
}

// Las situaciones en las que una empresaria suele llegar a Mía: cada una completa la frase «En Mía te acompañamos cuando…»
const situaciones: Situacion[] = [
  {
    titulo: 'La empresa depende demasiado de ti y necesitas que tu equipo asuma mayores responsabilidades',
    texto:
      'Has construido un negocio que funciona, pero muchas cuestiones siguen necesitando tu presencia, decisiones o supervisión constante.',
  },
  {
    titulo: 'No sabes cómo gestionar las situaciones diarias con tu equipo',
    texto:
      'Cuentas con personas que trabajan contigo, pero todavía resulta difícil distribuir funciones o consolidar una organización con mayor autonomía.',
  },
  {
    titulo: 'Hay situaciones y conflictos que no consigues resolver',
    texto:
      'Has intentado introducir cambios, conversar con tu equipo o modificar ciertas formas de trabajo, pero las dificultades continúan apareciendo.',
  },
  {
    titulo: 'Tienes decisiones importantes por delante',
    texto:
      'Necesitas valorar alternativas, considerar sus consecuencias y encontrar una orientación que te permita avanzar.',
  },
  {
    titulo: 'Sientes necesario volver a definir el rumbo y el horizonte de tu marca',
    texto:
      'Tu empresa está cambiando y estás considerando nuevas posibilidades o necesitas reorganizar aspectos de su funcionamiento para la etapa que quieres construir.',
  },
]

// Antes de los servicios: cuándo es el momento de trabajar con Mía. Arriba, la frase que nombra la soledad de
// dirigir; debajo, en desktop, la introducción queda fija a la izquierda terminando en «En Mía te acompañamos
// cuando…» mientras a la derecha pasan las situaciones, así cada una completa esa frase al leerla.
// En mobile, las situaciones van en un carrusel de tarjetas (sin la lista con filetes, que dejaba una doble línea)
export function Cuando() {
  const esDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <section id="cuando" className="relative border-b border-dorado/30">
      <Container className="py-seccion">
        <Reveal y={12}>
          <Eyebrow>¿Cuándo trabajar con Mía?</Eyebrow>
        </Reveal>
        <Reveal delay={0.1}>
          <h2 className="mt-8 max-w-5xl text-titulo lg:mt-10">
            Dirigir una empresa, algunas veces, puede sentirse como un camino demasiado solitario.
          </h2>
        </Reveal>

        <div className="mt-bloque grid grid-cols-1 gap-6 lg:grid-cols-12 lg:gap-10">
          <div className="lg:sticky lg:top-32 lg:col-span-5 lg:self-start">
            <Reveal delay={0.15}>
              <p className="text-cuerpo text-negro/70">
                Hay momentos en los que las exigencias del funcionamiento cotidiano, las responsabilidades de dirección
                y el porvenir de la empresa requieren decisiones que implican algo más que una respuesta inmediata:
                necesitan un espacio desde el cual poder pensarlas y construir cómo llevarlas adelante.
              </p>
              <p className="mt-6 font-serif text-frase text-burdeos lg:mt-10">En Mía te acompañamos cuando…</p>
            </Reveal>
          </div>

          {esDesktop ? (
            <ul className="border-b border-dorado/30 lg:col-span-6 lg:col-start-7">
              {situaciones.map((situacion) => (
                <li key={situacion.titulo} className="border-t border-dorado/30">
                  <Reveal y={20} className="group grid grid-cols-[auto_1fr] gap-x-6 py-10">
                    {/* Filete que se alarga al pasar el mouse: marca la situación que se está leyendo */}
                    <span
                      aria-hidden
                      className="mt-[0.7em] h-px w-5 bg-dorado transition-[width] duration-700 ease-suave group-hover:w-9"
                    />
                    <div>
                      <h3 className="text-tarjeta transition-colors duration-700 ease-suave group-hover:text-burdeos">
                        {situacion.titulo}
                      </h3>
                      <p className="mt-3 max-w-lg text-detalle text-negro/65">{situacion.texto}</p>
                    </div>
                  </Reveal>
                </li>
              ))}
            </ul>
          ) : (
            // Mobile y tablet: una situación por tarjeta, en el mismo carrusel que Servicios
            <Carrusel etiqueta="Situaciones" className="-mx-6 sm:-mx-8">
              {situaciones.map((situacion, i) => (
                <article
                  key={situacion.titulo}
                  className="flex w-full flex-col rounded-[10px] border border-dorado/30 bg-white/45 p-6"
                >
                  <div className="flex items-center gap-4">
                    <span className="font-serif text-menor text-burdeos lining-nums tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span aria-hidden className="h-px w-8 bg-dorado" />
                  </div>
                  <h3 className="mt-5 text-tarjeta">{situacion.titulo}</h3>
                  <p className="mt-3 text-detalle text-negro/65">{situacion.texto}</p>
                </article>
              ))}
            </Carrusel>
          )}
        </div>
      </Container>
    </section>
  )
}
