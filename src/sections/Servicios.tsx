import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import direccionAvif from '@/assets/images/servicio-direccion.avif'
import direccionJpg from '@/assets/images/servicio-direccion.jpg'
import lecturaAvif from '@/assets/images/servicio-lectura.avif'
import lecturaJpg from '@/assets/images/servicio-lectura.jpg'
import reorganizacionAvif from '@/assets/images/servicio-reorganizacion.avif'
import reorganizacionJpg from '@/assets/images/servicio-reorganizacion.jpg'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'

// Textos provisorios: hay que validarlos con Marina
const servicios = [
  {
    numero: 'I',
    titulo: 'Acompañamiento a la dirección',
    descripcion:
      'Un proceso individual para revisar cómo decides, delegas y sostienes tu empresa. Trabajamos sobre lo que se repite y traba el movimiento, para que puedas conducir desde un lugar más claro.',
    paraQuien: 'Fundadoras y directoras que sienten que todo depende de ellas y que les cuesta delegar.',
    imagen: { avif: direccionAvif, jpg: direccionJpg, alt: 'Carpeta de Mía sobre un escritorio de madera' },
  },
  {
    numero: 'II',
    titulo: 'Lectura organizacional',
    descripcion:
      'Una mirada externa sobre la relación entre liderazgo y organización: cómo circulan las decisiones, qué roles se sostienen y dónde se pierde energía. Para decidir qué cambiar con criterio.',
    paraQuien: 'Empresas consolidadas que necesitan ordenar su funcionamiento antes de dar el siguiente paso.',
    imagen: { avif: lecturaAvif, jpg: lecturaJpg, alt: 'Empresaria revisando la carpeta y la papelería de Mía' },
  },
  {
    numero: 'III',
    titulo: 'Procesos de reorganización',
    descripcion:
      'Acompañamiento a la dirección y a su equipo en momentos de crecimiento, reorganización o expansión, sin perder de vista los objetivos del negocio.',
    paraQuien: 'Empresas que atraviesan un cambio de estructura, de etapa o de escala.',
    imagen: { avif: reorganizacionAvif, jpg: reorganizacionJpg, alt: 'Empresaria sosteniendo un sobre de Mía' },
  },
]

export function Servicios() {
  const [activo, setActivo] = useState(0)
  const [anterior, setAnterior] = useState<number | null>(null)
  const actual = servicios[activo]

  const seleccionar = (i: number) => {
    if (i === activo) return
    setAnterior(activo)
    setActivo(i)
  }

  return (
    <section id="servicios" className="relative py-28 sm:py-36 lg:py-44">
      <Container>
        <div className="grid gap-10 border-t border-dorado/40 pt-16 lg:grid-cols-12 lg:pt-24">
          <div className="lg:col-span-7">
            <Reveal y={12}>
              <Eyebrow>Servicios</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
                Tres formas de <em className="font-medium text-burdeos">acompañar.</em>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
            <p className="text-[1.0625rem] leading-[1.8] text-negro/70">
              Cada proceso parte de lo mismo: comprender qué está pasando antes de decidir qué cambiar.
            </p>
          </Reveal>
        </div>

        <div className="mt-16 grid gap-16 lg:mt-24 lg:grid-cols-12 lg:gap-12">
          <ul className="border-t border-burdeos/15 lg:col-span-7">
            {servicios.map((servicio, i) => {
              const abierto = i === activo
              return (
                <motion.li
                  key={servicio.titulo}
                  className="border-b border-burdeos/15"
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                  transition={{ duration: 1.1, ease: easeSuave, delay: i * 0.1 }}
                >
                    <h3>
                      <button
                        type="button"
                        id={`servicio-${i}`}
                        aria-expanded={abierto}
                        aria-controls={`servicio-panel-${i}`}
                        onClick={() => seleccionar(i)}
                        className="group flex w-full items-center gap-5 py-7 text-left sm:gap-8 lg:py-9"
                      >
                        <span className="w-8 shrink-0 font-serif text-lg font-medium text-burdeos-medio italic sm:w-10">
                          {servicio.numero}.
                        </span>
                        <span
                          className={cn(
                            'flex-1 font-serif text-[1.75rem] leading-tight font-semibold transition-colors duration-500 ease-suave sm:text-4xl lg:text-[2.75rem]',
                            abierto ? 'text-burdeos' : 'text-negro/35 group-hover:text-negro/70',
                          )}
                        >
                          {servicio.titulo}
                        </span>
                        <span
                          aria-hidden
                          className={cn(
                            'grid size-10 shrink-0 place-items-center rounded-full border transition-all duration-500 ease-suave',
                            abierto
                              ? 'rotate-45 border-burdeos bg-burdeos text-crema'
                              : 'border-burdeos/20 text-burdeos group-hover:border-burdeos/50',
                          )}
                        >
                          <svg viewBox="0 0 16 16" className="size-3.5" fill="none" stroke="currentColor" strokeWidth="1.25">
                            <path d="M8 1v14M1 8h14" />
                          </svg>
                        </span>
                      </button>
                    </h3>

                    <AnimatePresence initial={false}>
                      {abierto && (
                        <motion.div
                          id={`servicio-panel-${i}`}
                          role="region"
                          aria-labelledby={`servicio-${i}`}
                          className="overflow-hidden"
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.8, ease: easeSuave }}
                        >
                          <div className="pb-10 sm:pl-18 lg:pb-12">
                            <div className="mb-8 aspect-[16/10] overflow-hidden rounded-[1.5rem] lg:hidden">
                              <Picture
                                {...servicio.imagen}
                                loading="lazy"
                                className="size-full object-cover"
                              />
                            </div>
                            <p className="max-w-xl text-[1.0625rem] leading-[1.8] text-negro/70">{servicio.descripcion}</p>
                            <div className="mt-8 flex max-w-xl gap-5 rounded-[1.5rem] bg-white/60 p-6">
                              <span aria-hidden className="mt-3 h-px w-8 shrink-0 bg-dorado" />
                              <p className="text-[0.9375rem] leading-relaxed text-negro/70">
                                <span className="block text-[0.6875rem] font-medium tracking-[0.25em] text-burdeos uppercase">
                                  Para quién
                                </span>
                                <span className="mt-2 block">{servicio.paraQuien}</span>
                              </p>
                            </div>
                            <a
                              href="#contacto"
                              className="group/link mt-8 inline-flex items-center gap-3 text-xs font-medium tracking-[0.18em] text-burdeos uppercase"
                            >
                              <span className="relative py-1">
                                Consultar este servicio
                                <span className="absolute inset-x-0 -bottom-0.5 h-px bg-dorado transition-transform duration-500 ease-suave group-hover/link:scale-x-50" />
                              </span>
                              <svg
                                aria-hidden
                                viewBox="0 0 16 16"
                                className="size-3.5 transition-transform duration-500 ease-suave group-hover/link:translate-x-1"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="1.25"
                              >
                                <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" />
                              </svg>
                            </a>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                </motion.li>
              )
            })}
          </ul>

          {/* Imagen del servicio activo, en arco, que cambia con una cortina suave */}
          <div className="hidden lg:col-span-4 lg:col-start-9 lg:block">
            <div className="sticky top-32">
              <div className="relative">
                <span
                  aria-hidden
                  className="absolute inset-0 translate-x-4 translate-y-4 rounded-t-full border border-dorado/60"
                />
                <div className="relative aspect-[4/5] overflow-hidden rounded-t-full bg-burdeos">
                  {/* Precarga de las tres fotos, para que el cambio sea inmediato */}
                  <div hidden>
                    {servicios.map((servicio) => (
                      <Picture key={servicio.titulo} {...servicio.imagen} alt="" />
                    ))}
                  </div>
                  {/* La foto anterior queda fija debajo y la nueva sube encima como una cortina:
                      el marco sube y la foto baja en sentido contrario */}
                  {anterior !== null && (
                    <div key={`debajo-${anterior}`} className="absolute inset-0">
                      <Picture {...servicios[anterior].imagen} className="size-full object-cover" />
                    </div>
                  )}
                  <motion.div
                    key={activo}
                    className="absolute inset-0 overflow-hidden"
                    initial={anterior === null ? false : { y: '100%' }}
                    animate={{ y: '0%' }}
                    transition={{ duration: 1.1, ease: easeSuave }}
                  >
                    <motion.div
                      className="size-full"
                      initial={anterior === null ? false : { y: '-100%', scale: 1.15 }}
                      animate={{ y: '0%', scale: 1 }}
                      transition={{ duration: 1.1, ease: easeSuave, scale: { duration: 1.6, ease: easeSuave } }}
                    >
                      <Picture {...actual.imagen} className="size-full object-cover" />
                    </motion.div>
                  </motion.div>
                  <div className="absolute inset-0 bg-burdeos-profundo/15" />
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.span
                      key={actual.numero}
                      aria-hidden
                      className="absolute bottom-6 left-8 font-serif text-7xl font-medium text-crema italic"
                      initial={{ opacity: 0, y: 16 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -16 }}
                      transition={{ duration: 0.6, ease: easeSuave }}
                    >
                      {actual.numero}
                    </motion.span>
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  )
}
