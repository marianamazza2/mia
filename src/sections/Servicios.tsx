import { motion, useReducedMotion, useScroll, useTransform, type MotionValue } from 'motion/react'
import { createContext, useContext, useId, useRef, useState, type ReactNode } from 'react'
import direccion from '@/assets/images/bn-servicio-direccion.webp'
import lectura from '@/assets/images/bn-servicio-lectura.webp'
import { Destacado } from '@/components/marca/Destacado'
import { PatronA } from '@/components/marca/PatronA'
import { Reveal } from '@/components/motion/Reveal'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { easeSereno } from '@/lib/motion'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Servicio = {
  numero: string
  titulo: string
  /** Frase de entrada del servicio */
  bajada: string
  /** Descripción completa, por párrafos */
  descripcion: string[]
  /** Aclaración que conviene destacar (por ejemplo, que no exige un proceso continuado) */
  nota?: string
  /** Duración o modalidad */
  formato?: string
  /** Se puede ampliar con las intervenciones complementarias */
  ampliable?: boolean
  /** Adónde lleva «Consultar este servicio»: la reserva por WhatsApp o el formulario, en Contacto */
  consulta: '#reservar' | '#escribenos'
  imagen: { src: string; alt: string }
  tono: 'claro' | 'burdeos'
}

const servicios: Servicio[] = [
  {
    numero: '01',
    titulo: 'Punto de Partida Mía',
    bajada: 'Una sesión para comenzar a trabajar sobre aquello que hoy te preocupa de tu empresa.',
    descripcion: [
      'Un espacio en el que podrás plantear una situación, dificultad o decisión que necesites abordar.',
      'Te ayudamos a ordenar lo que está ocurriendo, reconocer los aspectos más importantes de la situación y considerar posibles caminos para avanzar.',
    ],
    nota: 'Una primera experiencia de trabajo con Mía, sin necesidad de comprometerte con un proceso continuado.',
    formato: 'Sesión de trabajo individual de 60 a 90 minutos',
    consulta: '#reservar',
    imagen: { src: direccion, alt: 'Manos sacando la tarjeta burdeos de Mía de un tarjetero' },
    tono: 'claro',
  },
  {
    numero: '02',
    titulo: 'Mentoría Mía',
    bajada: 'Un espacio para consolidar tu posición en la dirección y trabajar sobre el desarrollo de tu empresa.',
    descripcion: [
      'Acompañamiento individual y sostenido para empresarias que necesitan fortalecer su manera de conducir el negocio, afrontar dificultades y construir nuevas formas de organización y trabajo.',
      'El propósito es que puedas desarrollar una forma de dirección sólida, con criterios propios y mayores posibilidades para sostener el funcionamiento de tu negocio.',
    ],
    ampliable: true,
    consulta: '#escribenos',
    imagen: { src: lectura, alt: 'Empresaria revisando la carpeta y la papelería de Mía' },
    tono: 'burdeos',
  },
]

type Intervencion = {
  titulo: string
  /** Texto por párrafos */
  texto: string[]
}

// Intervenciones que se suman a la Mentoría (02) cuando la empresa lo necesita: no se contratan solas
const intervenciones: Intervencion[] = [
  {
    titulo: 'Construcción de equipos',
    texto: [
      'Diseñamos la estructura y acompañamos en la organización de equipos conforme a la orientación y necesidades de la marca: desde la definición de perfiles y selección de personas hasta procesos de incorporación, distribución de funciones y progresivo desarrollo de modos de trabajo.',
    ],
  },
  {
    titulo: 'Intervención en equipos',
    texto: [
      'Tratando las dificultades de coordinación, comunicación, dinámicas y modos de trabajo de quienes forman parte de la empresa, nos ocupamos de la puesta en funcionamiento y sostenimiento de acuerdos, criterios y formas de organización que favorezcan un funcionamiento consistente entre las distintas áreas de la empresa.',
    ],
  },
  {
    titulo: 'Desarrollo y expansión',
    texto: [
      'Acompañamos a empresarias que necesitan reorganizar su negocio, desarrollar nuevas áreas o evaluar posibilidades de crecimiento.',
      'Trabajamos sobre los recursos, las estrategias, decisiones y condiciones organizativas necesarias para llevar adelante cada proyecto de manera sostenible.',
    ],
  },
]

const mentoria = servicios.find((servicio) => servicio.ampliable)!

// Si las intervenciones están desplegadas, y cómo abrirlas o cerrarlas desde la Mentoría o desde el bloque
type Ampliacion = { abierta: boolean; id: string; alternar: (desde?: 'mentoria' | 'bloque') => void }
const AmpliacionContext = createContext<Ampliacion>({ abierta: false, id: '', alternar: () => {} })

export function Servicios() {
  const isDesktop = useMediaQuery('(min-width: 1024px)')
  const reduceMotion = useReducedMotion()

  // Las intervenciones arrancan plegadas: se despliegan desde la Mentoría y se vuelven a plegar
  const [ampliada, setAmpliada] = useState(false)
  const intervencionesId = useId()
  const intervencionesRef = useRef<HTMLDivElement>(null)
  const alternarAmpliacion = (desde: 'mentoria' | 'bloque' = 'mentoria') => {
    const abrir = !ampliada
    setAmpliada(abrir)
    const bloque = intervencionesRef.current
    if (!bloque) return
    const comportamiento = reduceMotion ? 'auto' : 'smooth'
    // Al abrirlas, el scroll acompaña hasta el bloque, que aparece debajo de la Mentoría
    if (abrir) window.setTimeout(() => bloque.scrollIntoView({ behavior: comportamiento, block: 'start' }), 250)
    // Al cerrarlas desde el bloque, se vuelve a la Mentoría, que queda justo arriba
    else if (desde === 'bloque') {
      window.scrollTo({
        top: bloque.getBoundingClientRect().top + window.scrollY - window.innerHeight,
        behavior: comportamiento,
      })
    }
  }

  // La marca de agua se va encendiendo mientras el encabezado sube, y se desliza apenas más lento que el texto
  const encabezadoRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: encabezadoRef, offset: ['start end', 'start 0.15'] })
  const opacidadPatron = useTransform(scrollYProgress, [0, 1], [0, 0.045])
  const desplazamientoPatron = useTransform(scrollYProgress, [0, 1], [40, 0])

  return (
    <section id="servicios" className="relative">
      {/* Encabezado con la «a» como marca de agua, casi invisible detrás */}
      <div ref={encabezadoRef} className="relative overflow-hidden">
        <motion.div
          aria-hidden
          className="absolute inset-0"
          style={{ opacity: opacidadPatron, y: desplazamientoPatron }}
        >
          <PatronA paso={84} difuminado className="text-burdeos" />
        </motion.div>
        <Container className="relative pt-seccion pb-bloque">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="lg:col-span-7">
              <Reveal y={12}>
                <Eyebrow>Servicios</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h2 className="mt-8 text-titulo lg:mt-10">
                  Una propuesta para <Destacado>cada momento</Destacado> de tu empresa.
                </h2>
              </Reveal>
            </div>
            <Reveal delay={0.2} className="self-end lg:col-span-4 lg:col-start-9">
              <p className="text-cuerpo text-negro/70">
                En Mía ofrecemos distintas modalidades de acompañamiento, según las necesidades de cada empresaria y la
                profundidad del trabajo que requiera su negocio.
              </p>
            </Reveal>
          </div>
        </Container>
      </div>

      <AmpliacionContext.Provider value={{ abierta: ampliada, id: intervencionesId, alternar: alternarAmpliacion }}>
        {/* Desktop: paneles que se apilan (o en lista, con «reducir movimiento»); mobile y tablet: carrusel */}
        {isDesktop ? reduceMotion ? <Lista /> : <Apilados /> : <Carrusel />}

        {/* Debajo de la Mentoría, sin corte de color, lo que se le puede sumar: plegado hasta que se pide */}
        <div
          id={intervencionesId}
          ref={intervencionesRef}
          inert={!ampliada}
          className={cn(
            'grid scroll-mt-16 transition-[grid-template-rows,opacity] duration-1000 ease-suave',
            ampliada ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <Intervenciones plegables={!isDesktop} />
          </div>
        </div>
      </AmpliacionContext.Provider>
    </section>
  )
}

// Escritorio: cada servicio ocupa la pantalla y el siguiente se apoya encima, como hojas de una carpeta
function Apilados() {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end end'] })

  return (
    <div ref={ref} className="relative">
      {servicios.map((servicio, i) => (
        <div key={servicio.titulo} className="sticky top-0 h-svh">
          <PanelApilado servicio={servicio} index={i} progreso={scrollYProgress} />
        </div>
      ))}
    </div>
  )
}

function PanelApilado({
  servicio,
  index,
  progreso,
}: {
  servicio: Servicio
  index: number
  progreso: MotionValue<number>
}) {
  const total = servicios.length
  // Cuando el siguiente panel sube, este se aleja un poco y se oscurece
  const inicio = index / total
  const escala = useTransform(progreso, [inicio, 1], [1, 1 - (total - 1 - index) * 0.05])
  const velo = useTransform(progreso, [inicio, inicio + 1 / total], [0, index === total - 1 ? 0 : 0.35])

  return (
    <motion.article className="relative size-full origin-top overflow-hidden" style={{ scale: escala }}>
      <Panel servicio={servicio} />
      <motion.div aria-hidden className="pointer-events-none absolute inset-0 bg-negro" style={{ opacity: velo }} />
    </motion.article>
  )
}

function Panel({ servicio }: { servicio: Servicio }) {
  const oscuro = servicio.tono === 'burdeos'

  return (
    <div
      className={cn(
        'grid size-full lg:grid-cols-2',
        oscuro ? 'bg-burdeos text-crema' : 'border-t border-dorado/40 bg-crema text-negro',
      )}
    >
      {/* En pantallas muy anchas (2xl), el texto se centra en su mitad, alineado con el resto de la página */}
      <div className="relative flex flex-col justify-center px-6 py-20 sm:px-8 lg:py-16 lg:pr-16 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] 2xl:px-(--margen-ancho)">
        {/* Número y título en Cormorant recta; todo lo demás en Inter. Sin itálicas ni contornos,
            con la misma numeración (01, 02…) que la línea de tiempo */}
        <span
          aria-hidden
          className={cn(
            'font-serif text-[6rem] leading-[0.8] font-medium tabular-nums lining-nums lg:bajo:text-[4.5rem]',
            oscuro ? 'text-crema/15' : 'text-burdeos/15',
          )}
        >
          {servicio.numero}
        </span>

        <h3 className="mt-5 max-w-lg text-subtitulo lg:bajo:mt-3">{servicio.titulo}</h3>

        {/* Como en la portada: la bajada en el cuerpo de texto y la descripción, más chica y más suave, debajo.
            La Cormorant queda solo para el número y el título */}
        <p className={cn('mt-5 max-w-lg text-cuerpo lg:bajo:mt-4', oscuro ? 'text-crema/80' : 'text-negro/75')}>
          {servicio.bajada}
        </p>
        <div
          className={cn(
            'mt-4 max-w-lg space-y-3 text-detalle lg:bajo:mt-3',
            oscuro ? 'text-crema/60' : 'text-negro/55',
          )}
        >
          {servicio.descripcion.map((parrafo) => (
            <p key={parrafo}>{parrafo}</p>
          ))}
        </div>

        {(servicio.nota || servicio.formato) && (
          <Ficha servicio={servicio} oscuro={oscuro} className="mt-7 max-w-lg lg:bajo:mt-5" />
        )}
        {servicio.ampliable && <Ampliable className="mt-7 lg:bajo:mt-5" />}

        {/* Mismo botón que el resto de la web; en el panel burdeos va en crema */}
        <Button
          href={servicio.consulta}
          variant={oscuro ? 'light' : 'primary'}
          withArrow
          className="mt-12 self-start lg:bajo:mt-9"
        >
          Consultar este servicio
        </Button>
      </div>

      <div className="relative aspect-[4/3] overflow-hidden lg:aspect-auto">
        <Picture {...servicio.imagen} loading="lazy" className="size-full object-cover" />
      </div>
    </div>
  )
}

// Nota destacada con filete dorado y formato con ícono de reloj
function Ficha({ servicio, oscuro, className }: { servicio: Servicio; oscuro: boolean; className?: string }) {
  return (
    <div className={cn('space-y-4', className)}>
      {servicio.nota && (
        <p
          className={cn(
            'border-l pl-4 text-detalle',
            oscuro ? 'border-dorado-suave text-crema' : 'border-dorado text-negro/85',
          )}
        >
          {servicio.nota}
        </p>
      )}
      {servicio.formato && (
        <p className={cn('flex items-center gap-3 text-detalle', oscuro ? 'text-crema/80' : 'text-burdeos')}>
          <IconoReloj />
          {servicio.formato}
        </p>
      )}
    </div>
  )
}

function IconoReloj() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

// En la Mentoría: despliega las intervenciones que siguen debajo y las vuelve a plegar. El «+» gira a «×»
function Ampliable({ compacto = false, className }: { compacto?: boolean; className?: string }) {
  const { abierta, id, alternar } = useContext(AmpliacionContext)

  return (
    <button
      type="button"
      aria-expanded={abierta}
      aria-controls={id}
      onClick={() => alternar('mentoria')}
      className={cn(
        'group/ampliar inline-flex items-center self-start text-left',
        compacto ? 'gap-2.5 text-[0.8125rem] text-crema/75' : 'gap-3 text-detalle text-crema/85',
        className,
      )}
    >
      <Mas
        girado={abierta}
        className={cn(
          'transition-colors duration-500 ease-suave group-hover/ampliar:bg-dorado-suave group-hover/ampliar:text-burdeos',
          compacto ? 'size-4 [&_svg]:size-2' : 'size-6',
        )}
      />
      <span className="relative py-0.5">
        {abierta ? 'Ocultar las intervenciones complementarias' : 'Se puede ampliar con intervenciones complementarias'}
        {!compacto && (
          <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado-suave/50 transition-transform duration-500 ease-suave group-hover/ampliar:scale-x-50" />
        )}
      </span>
    </button>
  )
}

// El «+» en un círculo dorado: la marca de lo que se suma a la Mentoría; girado, es la «×» que cierra
function Mas({ girado = false, className }: { girado?: boolean; className?: string }) {
  return (
    <span
      aria-hidden
      className={cn(
        'grid shrink-0 place-items-center rounded-full border border-dorado-suave/60 text-dorado-suave',
        className,
      )}
    >
      <svg
        viewBox="0 0 16 16"
        className={cn('size-2.5 transition-transform duration-500 ease-suave', girado && 'rotate-45')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M8 1v14M1 8h14" />
      </svg>
    </span>
  )
}

// Desktop con «reducir movimiento»: los tres paneles uno debajo del otro
function Lista() {
  return (
    <div>
      {servicios.map((servicio) => (
        <Reveal key={servicio.titulo} y={32}>
          <article className="[&>div]:flex [&>div]:flex-col-reverse">
            <Panel servicio={servicio} />
          </article>
        </Reveal>
      ))}
    </div>
  )
}

// Mobile y tablet: carrusel que se desliza con el dedo; se ve un poco la tarjeta siguiente
function Carrusel() {
  const pistaRef = useRef<HTMLDivElement>(null)
  const [actual, setActual] = useState(0)

  const alDeslizar = () => {
    const pista = pistaRef.current
    if (!pista) return
    const paso = (pista.children[1] as HTMLElement).offsetLeft - (pista.children[0] as HTMLElement).offsetLeft
    setActual(Math.min(Math.round(pista.scrollLeft / paso), servicios.length - 1))
  }

  const ir = (i: number) => {
    const pista = pistaRef.current
    const tarjeta = pista?.children[i] as HTMLElement | undefined
    if (!pista || !tarjeta) return
    pista.scrollTo({
      left: tarjeta.offsetLeft - pista.offsetLeft - parseFloat(getComputedStyle(pista).scrollPaddingLeft || '0'),
      behavior: 'smooth',
    })
  }

  return (
    <div className="pb-bloque">
      <div
        ref={pistaRef}
        onScroll={alDeslizar}
        role="region"
        aria-label="Servicios"
        className="flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {servicios.map((servicio, i) => (
          <TarjetaServicio key={servicio.titulo} servicio={servicio} posicion={i} />
        ))}
      </div>

      {/* Contador con filete de progreso y flechas */}
      <Container className="mt-8 flex items-center justify-between">
        <div className="flex items-center gap-4 font-serif text-lg lining-nums tabular-nums">
          <span className="text-burdeos">{String(actual + 1).padStart(2, '0')}</span>
          <span className="relative h-px w-16 bg-burdeos/15">
            <span
              className="absolute inset-y-0 left-0 bg-dorado transition-[width] duration-500 ease-suave"
              style={{ width: `${((actual + 1) / servicios.length) * 100}%` }}
            />
          </span>
          <span className="text-negro/40">{String(servicios.length).padStart(2, '0')}</span>
        </div>
        <div className="flex gap-3">
          <FlechaCarrusel direccion="anterior" disabled={actual === 0} onClick={() => ir(actual - 1)} />
          <FlechaCarrusel
            direccion="siguiente"
            disabled={actual === servicios.length - 1}
            onClick={() => ir(actual + 1)}
          />
        </div>
      </Container>
    </div>
  )
}

function TarjetaServicio({ servicio, posicion }: { servicio: Servicio; posicion: number }) {
  const oscuro = servicio.tono === 'burdeos'
  const [abierto, setAbierto] = useState(false)

  return (
    <article
      aria-label={`${posicion + 1} de ${servicios.length}`}
      className={cn(
        'flex w-[88%] shrink-0 snap-start flex-col overflow-hidden rounded-[10px] sm:w-[62%] md:w-[46%]',
        oscuro ? 'bg-burdeos text-crema' : 'border border-dorado/30 bg-white/45 text-negro',
      )}
    >
      {/* Foto apaisada y baja: la tarjeta se lee de un vistazo */}
      <Picture {...servicio.imagen} loading="lazy" className="aspect-[2/1] w-full object-cover" />

      <div className="flex flex-1 flex-col px-5 pt-5 pb-5 sm:px-6">
        <div className="flex items-baseline gap-4">
          <span
            aria-hidden
            className={cn(
              'font-serif text-2xl leading-none font-medium lining-nums tabular-nums',
              oscuro ? 'text-dorado-suave' : 'text-burdeos/40',
            )}
          >
            {servicio.numero}
          </span>
          <h3 className="text-tarjeta">{servicio.titulo}</h3>
        </div>

        {/* Bajada siempre visible; la descripción completa y la nota, en «En detalle» */}
        <p className={cn('mt-4 text-detalle', oscuro ? 'text-crema/85' : 'text-negro/75')}>{servicio.bajada}</p>

        <div className={cn('mt-5 border-t', oscuro ? 'border-crema/15' : 'border-burdeos/15')}>
          <Desplegable titulo="En detalle" oscuro={oscuro} abierto={abierto} onAlternar={() => setAbierto((v) => !v)}>
            <div className="space-y-3">
              {servicio.descripcion.map((parrafo) => (
                <p key={parrafo}>{parrafo}</p>
              ))}
              {servicio.nota && (
                <Ficha servicio={{ ...servicio, formato: undefined }} oscuro={oscuro} className="pt-2" />
              )}
            </div>
          </Desplegable>
        </div>

        {servicio.formato && (
          <p
            className={cn('mt-4 flex items-center gap-2.5 text-[0.8125rem]', oscuro ? 'text-crema/75' : 'text-burdeos')}
          >
            <IconoReloj />
            {servicio.formato}
          </p>
        )}

        {servicio.ampliable && <Ampliable compacto className="mt-4" />}

        <div className="mt-6 flex-1" />
        {/* En la tarjeta, un link discreto en minúsculas: no compite con los rótulos de los desplegables */}
        <EnlaceConsulta href={servicio.consulta} oscuro={oscuro}>
          Consultar este servicio
        </EnlaceConsulta>
      </div>
    </article>
  )
}

function EnlaceConsulta({ href, children, oscuro }: { href: string; children: ReactNode; oscuro: boolean }) {
  return (
    <a
      href={href}
      className={cn(
        'group/link inline-flex items-center gap-2.5 self-start text-detalle whitespace-nowrap',
        oscuro ? 'text-crema/85' : 'text-burdeos',
      )}
    >
      <span className="relative py-0.5">
        {children}
        <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado/60 transition-transform duration-500 ease-suave group-hover/link:scale-x-50" />
      </span>
      <svg
        aria-hidden
        viewBox="0 0 24 16"
        className="h-3 w-4 shrink-0 transition-transform duration-500 ease-suave group-hover/link:translate-x-1.5"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
      >
        <path d="M0 8h22M16 2l6 6-6 6" />
      </svg>
    </a>
  )
}

// Las intervenciones complementarias no se contratan solas: amplían la Mentoría. Por eso el bloque sigue
// el burdeos del panel 02 sin corte, hereda su numeración (02.1, 02.2, 02.3) y un filete dorado baja
// desde la Mentoría hasta el «+» que las abre y se ramifica sobre las tres
function Intervenciones({ plegables }: { plegables: boolean }) {
  const tituloId = useId()
  const { id, alternar } = useContext(AmpliacionContext)

  return (
    <section id="intervenciones" aria-labelledby={tituloId} className="relative bg-burdeos text-crema">
      <Container className="pb-seccion">
        {/* El observador va en el contenedor: el filete arranca en escala cero y el navegador no lo ve */}
        <motion.div initial="oculto" whileInView="visible" viewport={{ once: true, margin: '0px 0px -15% 0px' }}>
          <motion.span
            aria-hidden
            className="ml-[0.875rem] block h-14 w-px origin-top bg-dorado-suave/50 lg:h-24"
            variants={{ oculto: { scaleY: 0 }, visible: { scaleY: 1 } }}
            transition={{ duration: 1.4, ease: easeSereno }}
          />
          <motion.div
            className="flex items-center gap-4"
            variants={{ oculto: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: 1.2, ease: easeSereno, delay: 1 }}
          >
            <Mas className="size-7" />
            <p className="etiqueta flex-1 text-dorado-suave">
              Complementos de {mentoria.numero} · {mentoria.titulo}
            </p>
            {/* Plegar el bloque desde aquí también: se vuelve a la Mentoría */}
            <button
              type="button"
              aria-expanded
              aria-controls={id}
              onClick={() => alternar('bloque')}
              className="group/ocultar inline-flex shrink-0 items-center gap-2.5 text-detalle text-crema/70 transition-colors duration-500 hover:text-crema"
            >
              Ocultar
              <svg
                aria-hidden
                viewBox="0 0 16 16"
                className="size-2.5"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.25"
              >
                <path d="M2 2l12 12M14 2 2 14" />
              </svg>
            </button>
          </motion.div>
        </motion.div>

        <div className="mt-8 grid gap-5 lg:mt-10 lg:grid-cols-12 lg:gap-10">
          <Reveal delay={0.2} className="lg:col-span-6">
            <h3 id={tituloId} className="text-subtitulo">
              Intervenciones complementarias
            </h3>
          </Reveal>
          <Reveal delay={0.3} className="self-end lg:col-span-5 lg:col-start-8">
            <p className="text-cuerpo text-crema/75">
              A partir del trabajo de mentoría, Mía desarrolla intervenciones específicas cuando las necesidades de la
              empresa lo requieren.
            </p>
          </Reveal>
        </div>

        {/* La rama: un filete dorado corrido con un punto donde arranca cada intervención */}
        <motion.ol
          className="relative mt-12 lg:mt-16 lg:grid lg:grid-cols-3 lg:gap-12"
          initial="oculto"
          whileInView="visible"
          viewport={{ once: true, margin: '0px 0px -15% 0px' }}
        >
          <motion.span
            aria-hidden
            className="absolute inset-x-0 top-0 h-px origin-left bg-dorado-suave/40"
            variants={{ oculto: { scaleX: 0 }, visible: { scaleX: 1 } }}
            transition={{ duration: 2, ease: easeSereno }}
          />
          {intervenciones.map((intervencion, i) => (
            <ItemIntervencion
              key={intervencion.titulo}
              intervencion={intervencion}
              numero={`${mentoria.numero}.${i + 1}`}
              indice={i}
              plegable={plegables}
            />
          ))}
        </motion.ol>

        {/* Cierre: la condición dicha con todas las letras, y la consulta va por la Mentoría */}
        <Reveal className="mt-12 flex flex-col gap-7 lg:mt-16 lg:flex-row lg:items-center lg:justify-between lg:gap-10">
          <p className="max-w-xl border-l border-dorado-suave pl-4 text-detalle text-crema">
            Se suman al proceso de {mentoria.titulo} cuando la empresa lo necesita; no se contratan por separado.
          </p>
          {plegables ? (
            <EnlaceConsulta href="#escribenos" oscuro>
              Consultar por la mentoría
            </EnlaceConsulta>
          ) : (
            <Button href="#escribenos" variant="light" withArrow className="shrink-0">
              Consultar por la mentoría
            </Button>
          )}
        </Reveal>
      </Container>
    </section>
  )
}

type ItemIntervencionProps = {
  intervencion: Intervencion
  numero: string
  indice: number
  /** En mobile, cada intervención se abre al tocarla */
  plegable: boolean
}

function ItemIntervencion({ intervencion, numero, indice, plegable }: ItemIntervencionProps) {
  const [abierto, setAbierto] = useState(false)
  const id = useId()

  const numeral = (
    <span className="font-serif text-menor leading-none text-dorado-suave lining-nums tabular-nums">{numero}</span>
  )
  const texto = (
    <div className="space-y-3 text-detalle text-crema/70">
      {intervencion.texto.map((parrafo) => (
        <p key={parrafo}>{parrafo}</p>
      ))}
    </div>
  )

  if (plegable) {
    return (
      <li className="border-b border-crema/15">
        <h4>
          <button
            type="button"
            aria-expanded={abierto}
            aria-controls={id}
            onClick={() => setAbierto((v) => !v)}
            className="flex w-full items-baseline gap-4 py-5 text-left"
          >
            {numeral}
            <span className="flex-1 font-serif text-tarjeta">{intervencion.titulo}</span>
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className={cn(
                'size-3 shrink-0 self-center text-dorado-suave transition-transform duration-500 ease-suave',
                abierto && 'rotate-45',
              )}
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M8 1v14M1 8h14" />
            </svg>
          </button>
        </h4>
        <div
          id={id}
          className={cn(
            'grid transition-[grid-template-rows,opacity] duration-500 ease-suave',
            abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
          )}
        >
          <div className="overflow-hidden">
            <div className="pb-6">{texto}</div>
          </div>
        </div>
      </li>
    )
  }

  return (
    <motion.li
      className="relative pt-9"
      variants={{ oculto: { opacity: 0, y: 16 }, visible: { opacity: 1, y: 0 } }}
      transition={{ duration: 1.2, ease: easeSereno, delay: 0.5 + indice * 0.35 }}
    >
      {/* El punto donde la rama toca cada intervención */}
      <span aria-hidden className="absolute -top-[2.5px] left-0 size-1.5 rounded-full bg-dorado-suave" />
      {numeral}
      <h4 className="mt-3 text-tarjeta">{intervencion.titulo}</h4>
      <div className="mt-5">{texto}</div>
    </motion.li>
  )
}

type DesplegableProps = {
  titulo: string
  children: ReactNode
  oscuro: boolean
  abierto: boolean
  onAlternar: () => void
}

// Fila plegable de la tarjeta: el texto se abre al tocar el rótulo
function Desplegable({ titulo, children, oscuro, abierto, onAlternar }: DesplegableProps) {
  const id = useId()

  return (
    <div className={cn('border-b', oscuro ? 'border-crema/15' : 'border-burdeos/15')}>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={onAlternar}
        className={cn(
          'etiqueta flex w-full items-center justify-between py-4',
          oscuro ? 'text-dorado-suave' : 'text-burdeos',
        )}
      >
        {titulo}
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn('size-3 transition-transform duration-500 ease-suave', abierto && 'rotate-45')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="M8 1v14M1 8h14" />
        </svg>
      </button>
      <div
        id={id}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-500 ease-suave',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className={cn('overflow-hidden text-detalle', oscuro ? 'text-crema/75' : 'text-negro/70')}>
          <div className="pb-5">{children}</div>
        </div>
      </div>
    </div>
  )
}

function FlechaCarrusel({
  direccion,
  disabled,
  onClick,
}: {
  direccion: 'anterior' | 'siguiente'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direccion === 'anterior' ? 'Servicio anterior' : 'Servicio siguiente'}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-burdeos/25 text-burdeos transition-colors duration-300 hover:bg-burdeos hover:text-crema disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-burdeos"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 16"
        className={cn('h-3 w-4', direccion === 'anterior' && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M0 8h22M16 2l6 6-6 6" />
      </svg>
    </button>
  )
}
