import { AnimatePresence, motion, useReducedMotion } from 'motion/react'
import { useEffect, useId, useRef, useState, type FormEvent, type KeyboardEvent, type ReactNode } from 'react'
import aCrema from '@/assets/brand/a_mia_crema.svg'
import { PatronA } from '@/components/marca/PatronA'
import { Reveal } from '@/components/motion/Reveal'
import { Button, ButtonAccion } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'
import { contacto } from '@/lib/contacto'
import { easeSereno, easeSuave } from '@/lib/motion'
import { usePatron } from '@/lib/opciones'
import { Destacado } from '@/components/marca/Destacado'

// La reserva va por WhatsApp; aquí quedan los demás canales
const canales = [
  {
    etiqueta: 'Email',
    valor: contacto.email,
    href: `mailto:${contacto.email}`,
    icono: <IconoEmail />,
  },
  {
    etiqueta: 'Teléfono',
    valor: contacto.telefonoVisible,
    href: `tel:${contacto.telefono}`,
    icono: <IconoTelefono />,
  },
  {
    etiqueta: 'Dónde estamos',
    valor: 'Av. Diagonal 534, Barcelona',
    href: contacto.mapa,
    externo: true,
    icono: <IconoUbicacion />,
  },
]

// Arriba, la invitación en horizontal. Debajo, las dos maneras de empezar como un pliego abierto: dos mitades
// unidas de borde a borde, con un filete dorado al medio como lomo y, sobre él, la flecha que va y viene.
// A la izquierda, reservar Punto de Partida por WhatsApp; a la derecha, escribir para conocer las propuestas.
// Más abajo, los demás canales sobre el burdeos con la «a»: en una franja con el formulario cerrado y, al
// abrirlo, en la mitad izquierda, con el formulario en la derecha, justo debajo de la opción que lo abrió
export function Contacto() {
  const [formularioAbierto, setFormularioAbierto] = useState(false)
  const panelId = useId()
  const panelRef = useRef<HTMLDivElement>(null)
  const reduceMotion = useReducedMotion()

  const alternarFormulario = () => {
    const abrir = !formularioAbierto
    setFormularioAbierto(abrir)
    // Al abrirlo, el scroll acompaña hasta el formulario, que aparece más abajo
    if (abrir) {
      window.setTimeout(
        () => panelRef.current?.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'start' }),
        250,
      )
    }
  }

  return (
    <section id="contacto" className="relative">
      <Container className="pt-seccion">
        {/* Encabezado en dos columnas, como el de Servicios */}
        <div className="grid gap-8 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-6">
            <Reveal y={12}>
              <Eyebrow>Contacto</Eyebrow>
            </Reveal>
            <Reveal delay={0.1}>
              <h2 className="mt-8 text-titulo lg:mt-10">
                Hablemos de <Destacado>tu empresa.</Destacado>
              </h2>
            </Reveal>
          </div>
          <Reveal delay={0.2} className="self-end lg:col-span-6 lg:col-start-7">
            <p className="text-cuerpo text-negro/70">
              Si estás atravesando una dificultad, tienes una decisión importante por delante o quieres revisar algún
              aspecto del funcionamiento de tu negocio, podemos comenzar por una conversación.
            </p>
            <p className="mt-4 text-detalle text-negro/50">
              No necesitas tener todas las respuestas ni saber exactamente qué tipo de acompañamiento necesitas.
            </p>
          </Reveal>
        </div>
      </Container>

      {/* El pliego: las dos opciones unidas, con el mismo orden (canal, pregunta, texto, botón al pie) */}
      <div className="mt-bloque grid border-t border-dorado/30 lg:grid-cols-2">
        <Mitad id="reservar" lado="izquierdo" canal="Por WhatsApp" icono={<IconoWhatsApp className="size-4" />}>
          <Camino titulo="¿Quieres comenzar por una situación concreta?">
            Reserva <span className="text-negro">Punto de Partida Mía</span>, una sesión individual para trabajar sobre
            aquello que hoy necesitas abordar.
          </Camino>
          <Pie nota="Coordinamos el día y la hora por WhatsApp.">
            <Button
              href={contacto.whatsappSesion}
              target="_blank"
              rel="noopener noreferrer"
              withArrow
              className="self-start"
            >
              Reservar una sesión
            </Button>
          </Pie>
        </Mitad>

        <Mitad
          id="escribenos"
          lado="derecho"
          canal="Por formulario"
          icono={<IconoFormulario />}
          activa={formularioAbierto}
          delay={0.15}
          // La flecha va sobre el lomo: arriba al medio en mobile, a la izquierda y a media altura en desktop
          sobreElLomo={<IdaYVuelta />}
        >
          <Camino titulo="¿Quieres conocer nuestras propuestas de acompañamiento?">
            Si estás considerando trabajar con Mía o quieres conocer más sobre nuestras propuestas de acompañamiento,
            puedes escribirnos a través de este formulario. Nos pondremos en contacto contigo para conocer tu empresa,
            lo que necesitas y valorar cómo podemos trabajar juntas.
          </Camino>
          <Pie nota="Te responderemos lo antes posible.">
            <ButtonAccion
              aria-expanded={formularioAbierto}
              aria-controls={panelId}
              onClick={alternarFormulario}
              className="self-start"
            >
              {formularioAbierto ? 'Cerrar el formulario' : 'Abrir el formulario'}
              {/* Flecha hacia abajo: el formulario se abre debajo */}
              <svg
                aria-hidden
                viewBox="0 0 16 24"
                className={cn(
                  'h-4 w-3 shrink-0 transition-transform duration-500 ease-suave',
                  formularioAbierto ? 'rotate-180' : 'group-hover:translate-y-0.5',
                )}
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M8 1v21M2 16l6 6 6-6" />
              </svg>
            </ButtonAccion>
          </Pie>
        </Mitad>
      </div>

      {/* Cerrado: los demás canales en una franja burdeos con la «a», pegada al pliego */}
      <div
        inert={formularioAbierto}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-700 ease-suave',
          formularioAbierto ? 'grid-rows-[0fr] opacity-0' : 'grid-rows-[1fr] opacity-100',
        )}
      >
        <div className="overflow-hidden">
          <FondoA>
            <Container className="py-8 lg:py-10">
              <Canales disposicion="franja" />
            </Container>
          </FondoA>
        </div>
      </div>

      {/* Abierto: dos mitades pegadas, alineadas con las del pliego: a la izquierda, los canales sobre el
          burdeos con la «a»; a la derecha, el formulario, como continuación de la opción que lo abrió */}
      <div
        id={panelId}
        ref={panelRef}
        inert={!formularioAbierto}
        className={cn(
          'grid scroll-mt-16 transition-[grid-template-rows,opacity] duration-700 ease-suave lg:scroll-mt-40',
          formularioAbierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          {/* Mismo marco que el pliego: filete dorado arriba y el lomo al medio */}
          <div className="grid border-t border-dorado/30 lg:grid-cols-2">
            <FondoA
              className="order-2 lg:order-none"
              claseContenido={cn(ladoIzquierdo, 'flex h-full flex-col justify-center')}
            >
              <Rotulo oscuro>Otros canales</Rotulo>
              <p className="max-w-sm text-detalle text-crema/70">
                Si lo prefieres, también puedes escribirnos o llamarnos directamente.
              </p>
              <Canales disposicion="lista" className="mt-8 max-w-md" />
            </FondoA>
            <div className={cn(ladoDerecho, 'order-1 bg-white/45 lg:order-none lg:border-l lg:border-dorado/30')}>
              <Rotulo>Escríbenos</Rotulo>
              <Formulario />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

// Aire de cada mitad: el texto de la izquierda arranca donde arranca el contenido de la página y el de la
// derecha termina donde termina; en pantallas muy anchas (2xl), se alinean con el resto
const ladoIzquierdo =
  'px-6 py-14 sm:px-8 lg:py-16 lg:pr-16 lg:pl-[max(3rem,calc((100vw-80rem)/2+3rem))] xl:pr-24 2xl:px-(--margen-ancho)'
const ladoDerecho =
  'px-6 py-14 sm:px-8 lg:py-16 lg:pr-[max(3rem,calc((100vw-80rem)/2+3rem))] lg:pl-16 xl:pl-24 2xl:px-(--margen-ancho)'

// Acción al pie de cada opción, con una nota breve debajo: así los dos botones quedan a la par
function Pie({ nota, children }: { nota: string; children: ReactNode }) {
  return (
    <div className="mt-8 flex flex-1 flex-col justify-end">
      {children}
      <p className="mt-4 text-[0.8125rem] text-negro/50">{nota}</p>
    </div>
  )
}

// Rótulo con filete corto, como el de las tarjetas
function Rotulo({ oscuro = false, children }: { oscuro?: boolean; children: ReactNode }) {
  return (
    <>
      <p className={cn('etiqueta', oscuro ? 'text-dorado-suave' : 'text-burdeos')}>{children}</p>
      <div className={cn('mt-6 mb-7 h-px w-10', oscuro ? 'bg-dorado-suave/60' : 'bg-dorado/60')} />
    </>
  )
}

type MitadProps = {
  id: string
  lado: 'izquierdo' | 'derecho'
  /** Por dónde sigue la conversación: se lee antes que la pregunta */
  canal: string
  icono: ReactNode
  /** Con el formulario abierto, la mitad se tiñe apenas, como el formulario que continúa debajo */
  activa?: boolean
  delay?: number
  sobreElLomo?: ReactNode
  children: ReactNode
}

// Cada mitad del pliego. La derecha lleva el lomo: un filete dorado arriba (mobile) o a la izquierda (desktop).
// Al pasar el mouse, la mitad se aclara apenas: invita a elegirla
function Mitad({ id, lado, canal, icono, activa = false, delay = 0, sobreElLomo, children }: MitadProps) {
  return (
    <article
      id={id}
      className={cn(
        'relative flex scroll-mt-20 flex-col transition-colors duration-700 ease-suave',
        lado === 'izquierdo' ? ladoIzquierdo : cn(ladoDerecho, 'border-t border-dorado/30 lg:border-t-0 lg:border-l'),
        activa ? 'bg-white/45' : 'hover:bg-white/25',
      )}
    >
      {sobreElLomo}
      <Reveal y={24} delay={delay} className="flex flex-1 flex-col">
        <p className="etiqueta flex items-center gap-3 text-burdeos">
          {icono}
          {canal}
        </p>
        <div className="mt-6 mb-7 h-px w-10 bg-dorado/60" />
        {children}
      </Reveal>
    </article>
  )
}

// Plano burdeos con la «a» de la marca de fondo (tono sobre tono con la opción «forro», o una sola «a» grande)
function FondoA({
  className,
  claseContenido,
  children,
}: {
  className?: string
  claseContenido?: string
  children: ReactNode
}) {
  const patron = usePatron()

  return (
    <div className={cn('relative overflow-hidden bg-burdeos text-crema', className)}>
      {patron === 'forro' ? (
        <>
          <PatronA paso={92} className="text-burdeos-medio opacity-55" />
          <div aria-hidden className="absolute inset-0 bg-burdeos/60" />
        </>
      ) : (
        <img
          aria-hidden
          src={aCrema}
          alt=""
          className="pointer-events-none absolute -right-20 -bottom-24 w-72 opacity-[0.06] lg:w-96"
        />
      )}
      <div className={cn('relative', claseContenido)}>{children}</div>
    </div>
  )
}

// Sobre el lomo del pliego, una flecha que va y otra que vuelve, meciéndose despacio: se elige una u otra.
// En mobile, girada, en la línea que separa las dos opciones
function IdaYVuelta() {
  const reduceMotion = useReducedMotion()
  const vaiven = (sentido: 1 | -1) =>
    reduceMotion
      ? {}
      : {
          animate: { x: [0, 3 * sentido, 0] },
          transition: {
            duration: 3.2,
            ease: easeSereno,
            repeat: Infinity,
            delay: sentido === 1 ? 0 : 1.6,
          },
        }

  return (
    <div aria-hidden className="absolute top-0 left-1/2 z-10 -translate-x-1/2 -translate-y-1/2 lg:top-1/2 lg:left-0">
      <span className="grid size-14 place-items-center rounded-full border border-dorado/50 bg-crema text-burdeos max-lg:rotate-90">
        <svg viewBox="0 0 24 24" className="size-6 overflow-visible" fill="none" stroke="currentColor" strokeWidth="1">
          <motion.g {...vaiven(1)}>
            <path d="M4 8.5h15M15.5 5l3.5 3.5-3.5 3.5" />
          </motion.g>
          <motion.g {...vaiven(-1)}>
            <path d="M20 15.5H5M8.5 12 5 15.5 8.5 19" />
          </motion.g>
        </svg>
      </span>
    </div>
  )
}

// Los demás canales, siempre sobre el burdeos: en franja (desktop, con el formulario cerrado) o en lista
function Canales({ disposicion, className }: { disposicion: 'franja' | 'lista'; className?: string }) {
  const franja = disposicion === 'franja'

  return (
    <div className={cn(franja && 'lg:flex lg:items-center lg:gap-12', className)}>
      {franja && <p className="etiqueta mb-4 shrink-0 text-dorado-suave lg:mb-0">Otros canales</p>}
      <ul
        className={cn(
          'border-t border-crema/15',
          franja && 'lg:flex lg:flex-1 lg:justify-between lg:gap-8 lg:border-t-0',
        )}
      >
        {canales.map((canal) => (
          <li key={canal.etiqueta} className={cn('border-b border-crema/15', franja && 'lg:border-b-0')}>
            <a
              href={canal.href}
              {...(canal.externo && {
                target: '_blank',
                rel: 'noopener noreferrer',
              })}
              aria-label={`${canal.etiqueta}: ${canal.valor}`}
              className={cn('group flex items-center gap-4 py-3.5', franja && 'lg:gap-3 lg:py-0')}
            >
              <span className="text-dorado-suave">{canal.icono}</span>
              <span className="min-w-0 flex-1 truncate font-serif text-menor text-crema transition-colors duration-500 group-hover:text-dorado-suave">
                {canal.valor}
              </span>
              <Flecha className="text-crema/40 transition-all duration-500 ease-suave group-hover:translate-x-1 group-hover:text-dorado-suave" />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}

// Pregunta y explicación de cada opción
function Camino({ titulo, children }: { titulo: string; children: ReactNode }) {
  return (
    <>
      <h3 className="max-w-md text-tarjeta">{titulo}</h3>
      <p className="mt-4 max-w-lg text-detalle text-negro/65">{children}</p>
    </>
  )
}

type Estado = 'inicial' | 'enviando' | 'enviado' | 'correo' | 'error'
type Errores = Partial<Record<'consulta' | 'nombre' | 'email' | 'mensaje' | 'privacidad', string>>

// Sobre qué quiere consultar: ordena el mensaje antes de leerlo
const temasConsulta = ['Mentoría Mía', 'Punto de Partida Mía', 'Otra consulta']

function Formulario() {
  const [estado, setEstado] = useState<Estado>('inicial')
  const [errores, setErrores] = useState<Errores>({})

  const enviar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const datos = Object.fromEntries(new FormData(form)) as Record<string, string>

    const nuevosErrores: Errores = {}
    if (!datos.consulta) nuevosErrores.consulta = 'Elige sobre qué te gustaría consultar.'
    if (!datos.nombre?.trim()) nuevosErrores.nombre = 'Escribe tu nombre.'
    if (!/^\S+@\S+\.\S+$/.test(datos.email ?? '')) nuevosErrores.email = 'Revisa tu email.'
    if (!datos.mensaje?.trim()) nuevosErrores.mensaje = 'Cuéntanos brevemente qué necesitas.'
    if (!datos.privacidad) nuevosErrores.privacidad = 'Necesitamos tu consentimiento para responderte.'
    setErrores(nuevosErrores)
    if (Object.keys(nuevosErrores).length > 0) return

    const endpoint = import.meta.env.VITE_FORM_ENDPOINT
    // Sin servicio configurado, se abre el correo con el mensaje ya escrito
    if (!endpoint) {
      const cuerpo = [
        datos.mensaje,
        '',
        `Consulta: ${datos.consulta}`,
        `Nombre: ${datos.nombre}`,
        `Email: ${datos.email}`,
        datos.telefono && `Teléfono: ${datos.telefono}`,
        datos.empresa && `Empresa: ${datos.empresa}`,
      ]
        .filter((linea) => linea !== '' && linea !== undefined)
        .join('\n')
      window.location.href = `mailto:${contacto.email}?subject=${encodeURIComponent(`Consulta desde la web: ${datos.consulta}`)}&body=${encodeURIComponent(cuerpo)}`
      setEstado('correo')
      return
    }

    setEstado('enviando')
    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(datos),
      })
      if (!respuesta.ok) throw new Error(String(respuesta.status))
      form.reset()
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  return (
    <div className="relative">
      <AnimatePresence mode="wait" initial={false}>
        {estado === 'enviado' || estado === 'correo' ? (
          <Gracias key="gracias" porCorreo={estado === 'correo'} onVolver={() => setEstado('inicial')} />
        ) : (
          <motion.form
            key="formulario"
            noValidate
            onSubmit={enviar}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.5, ease: easeSuave }}
          >
            <div className="grid gap-x-10 gap-y-6 sm:grid-cols-2">
              <CampoOpciones
                nombre="consulta"
                etiqueta="¿Sobre qué te gustaría consultar?"
                opciones={temasConsulta}
                error={errores.consulta}
                className="sm:col-span-2"
              />
              <Campo nombre="nombre" etiqueta="Nombre" autoComplete="name" error={errores.nombre} />
              <Campo nombre="email" etiqueta="Email" tipo="email" autoComplete="email" error={errores.email} />
              <Campo nombre="telefono" etiqueta="Teléfono (opcional)" tipo="tel" autoComplete="tel" />
              <Campo nombre="empresa" etiqueta="Empresa (opcional)" autoComplete="organization" />
              <Campo
                nombre="mensaje"
                etiqueta="Tu mensaje"
                multilinea
                error={errores.mensaje}
                className="sm:col-span-2"
              />
            </div>

            <label className="mt-7 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-negro/70">
              <input type="checkbox" name="privacidad" className="peer sr-only" />
              <span
                aria-hidden
                className="mt-0.5 grid size-5 shrink-0 place-items-center border border-burdeos/30 text-transparent transition-colors duration-300 peer-checked:border-burdeos peer-checked:bg-burdeos peer-checked:text-crema peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burdeos"
              >
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 8.5 3 3 7-7" />
                </svg>
              </span>
              <span>
                He leído y acepto la{' '}
                <a
                  href="/privacidad"
                  target="_blank"
                  rel="noopener"
                  className="text-burdeos underline decoration-dorado underline-offset-4"
                >
                  política de privacidad
                </a>
                .
              </span>
            </label>
            {errores.privacidad && <MensajeError>{errores.privacidad}</MensajeError>}

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="group inline-flex h-14 items-center justify-center gap-4 rounded-[40px] bg-burdeos px-10 text-xs font-medium tracking-[0.2em] whitespace-nowrap text-crema uppercase transition-colors duration-500 ease-suave hover:bg-burdeos-medio focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burdeos disabled:opacity-60"
              >
                {estado === 'enviando' ? 'Enviando…' : 'Enviar mensaje'}
                <Flecha className="transition-transform duration-500 ease-suave group-hover:translate-x-1" />
              </button>
              {estado === 'error' && (
                <p role="alert" className="text-sm text-burdeos">
                  No pudimos enviarlo. Escríbenos a{' '}
                  <a href={`mailto:${contacto.email}`} className="underline decoration-dorado underline-offset-4">
                    {contacto.email}
                  </a>
                  .
                </p>
              )}
            </div>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  )
}

type CampoProps = {
  nombre: string
  etiqueta: string
  tipo?: string
  autoComplete?: string
  multilinea?: boolean
  error?: string
  className?: string
}

// Campo con etiqueta flotante y filete dorado que se dibuja al enfocar
function Campo({ nombre, etiqueta, tipo = 'text', autoComplete, multilinea, error, className }: CampoProps) {
  const id = `contacto-${nombre}`
  const clases = cn(
    'peer block w-full resize-none border-b bg-transparent pt-5 pb-1.5 text-base text-negro outline-none transition-colors lg:pt-6 lg:pb-2 lg:text-[1.0625rem]',
    error ? 'border-burdeos' : 'border-burdeos/20',
  )

  return (
    <div className={className}>
      <div className="relative">
        {multilinea ? (
          <textarea
            id={id}
            name={nombre}
            rows={3}
            placeholder=" "
            aria-invalid={!!error}
            className={cn(clases, 'max-lg:h-24')}
          />
        ) : (
          <input
            id={id}
            name={nombre}
            type={tipo}
            autoComplete={autoComplete}
            placeholder=" "
            aria-invalid={!!error}
            className={clases}
          />
        )}
        <label
          htmlFor={id}
          className="pointer-events-none absolute top-5 left-0 origin-left text-detalle text-negro/45 lg:top-6 transition-all duration-300 ease-suave peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-wide peer-focus:text-burdeos peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-wide"
        >
          {etiqueta}
        </label>
        <span
          aria-hidden
          className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-dorado transition-transform duration-500 ease-suave peer-focus:scale-x-100"
        />
      </div>
      {error && <MensajeError>{error}</MensajeError>}
    </div>
  )
}

type CampoOpcionesProps = {
  nombre: string
  etiqueta: string
  opciones: string[]
  error?: string
  className?: string
}

// Desplegable propio (no el del sistema): el campo se ve como los demás, con línea abajo, etiqueta flotante y
// filete dorado, y la lista se abre debajo en una hoja crema con borde dorado. Se maneja con el mouse, el dedo
// o el teclado (flechas, Enter, Escape) y el valor viaja en un campo oculto con el formulario
function CampoOpciones({ nombre, etiqueta, opciones, error, className }: CampoOpcionesProps) {
  const id = `contacto-${nombre}`
  const listaId = useId()
  const [valor, setValor] = useState('')
  const [abierto, setAbierto] = useState(false)
  const [activa, setActiva] = useState(0)
  const contenedorRef = useRef<HTMLDivElement>(null)
  const botonRef = useRef<HTMLButtonElement>(null)
  const reduceMotion = useReducedMotion()

  // Se cierra al tocar o hacer clic fuera
  useEffect(() => {
    if (!abierto) return
    const alTocarFuera = (event: PointerEvent) => {
      if (!contenedorRef.current?.contains(event.target as Node)) setAbierto(false)
    }
    document.addEventListener('pointerdown', alTocarFuera)
    return () => document.removeEventListener('pointerdown', alTocarFuera)
  }, [abierto])

  const abrir = () => {
    setActiva(Math.max(0, opciones.indexOf(valor)))
    setAbierto(true)
  }
  const elegir = (opcion: string) => {
    setValor(opcion)
    setAbierto(false)
    botonRef.current?.focus()
  }

  const alTeclear = (event: KeyboardEvent<HTMLButtonElement>) => {
    const teclas = ['ArrowDown', 'ArrowUp', 'Home', 'End', 'Enter', ' ', 'Escape']
    if (!teclas.includes(event.key)) return
    if (event.key === 'Escape') {
      if (abierto) event.preventDefault()
      setAbierto(false)
      return
    }
    event.preventDefault()
    if (!abierto) return abrir()
    if (event.key === 'ArrowDown') setActiva((i) => Math.min(i + 1, opciones.length - 1))
    if (event.key === 'ArrowUp') setActiva((i) => Math.max(i - 1, 0))
    if (event.key === 'Home') setActiva(0)
    if (event.key === 'End') setActiva(opciones.length - 1)
    if (event.key === 'Enter' || event.key === ' ') elegir(opciones[activa])
  }

  const arriba = valor || abierto

  return (
    <div ref={contenedorRef} className={cn('relative', className)}>
      <input type="hidden" name={nombre} value={valor} />
      <div className="relative">
        <button
          ref={botonRef}
          id={id}
          type="button"
          aria-haspopup="listbox"
          aria-expanded={abierto}
          aria-controls={listaId}
          aria-labelledby={`${id}-etiqueta ${id}`}
          aria-activedescendant={abierto ? `${listaId}-${activa}` : undefined}
          aria-invalid={!!error}
          onClick={() => (abierto ? setAbierto(false) : abrir())}
          onKeyDown={alTeclear}
          className={cn(
            'peer block w-full border-b bg-transparent pt-5 pr-8 pb-1.5 text-left text-base text-negro outline-none transition-colors lg:pt-6 lg:pb-2 lg:text-[1.0625rem]',
            error ? 'border-burdeos' : 'border-burdeos/20',
          )}
        >
          {/* Mismo alto de línea que los demás campos, con o sin valor */}
          <span className="block h-6 lg:h-[1.625rem]">{valor}</span>
        </button>
        <span
          id={`${id}-etiqueta`}
          className={cn(
            'pointer-events-none absolute left-0 origin-left text-negro/45 transition-all duration-300 ease-suave',
            arriba ? 'top-0 text-xs tracking-wide' : 'top-5 text-detalle lg:top-6',
            abierto && 'text-burdeos',
          )}
        >
          {etiqueta}
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn(
            'pointer-events-none absolute right-1 bottom-3.5 size-3 text-burdeos/60 transition-transform duration-500 ease-suave lg:bottom-4',
            abierto && 'rotate-180',
          )}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="m3 6 5 5 5-5" />
        </svg>
        <span
          aria-hidden
          className={cn(
            'absolute inset-x-0 bottom-0 h-px origin-left bg-dorado transition-transform duration-500 ease-suave peer-focus-visible:scale-x-100',
            abierto ? 'scale-x-100' : 'scale-x-0',
          )}
        />
      </div>

      <AnimatePresence>
        {abierto && (
          <motion.ul
            id={listaId}
            role="listbox"
            aria-labelledby={`${id}-etiqueta`}
            className="absolute inset-x-0 top-full z-20 mt-2 overflow-hidden rounded-[10px] border border-dorado/30 bg-crema py-2 shadow-[0_24px_48px_-24px_rgb(20_20_20/0.25)]"
            initial={reduceMotion ? false : { opacity: 0, y: -6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.35, ease: easeSuave }}
          >
            {opciones.map((opcion, i) => {
              const elegida = opcion === valor
              return (
                <li
                  key={opcion}
                  id={`${listaId}-${i}`}
                  role="option"
                  aria-selected={elegida}
                  onPointerEnter={() => setActiva(i)}
                  onClick={() => elegir(opcion)}
                  className={cn(
                    'flex cursor-pointer items-center justify-between gap-4 px-5 py-3 text-[0.9375rem] transition-colors duration-300',
                    i === activa ? 'bg-burdeos/[0.05] text-burdeos' : 'text-negro/80',
                  )}
                >
                  {opcion}
                  {elegida && (
                    <svg
                      aria-hidden
                      viewBox="0 0 16 16"
                      className="size-3.5 shrink-0 text-dorado"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    >
                      <path d="m3 8.5 3 3 7-7" />
                    </svg>
                  )}
                </li>
              )
            })}
          </motion.ul>
        )}
      </AnimatePresence>
      {error && <MensajeError>{error}</MensajeError>}
    </div>
  )
}

function MensajeError({ children }: { children: ReactNode }) {
  return <p className="mt-2 text-xs text-burdeos-medio">{children}</p>
}

function Gracias({ porCorreo, onVolver }: { porCorreo: boolean; onVolver: () => void }) {
  return (
    <motion.div
      role="status"
      className="flex min-h-[26rem] flex-col items-center justify-center text-center"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, ease: easeSuave }}
    >
      <svg viewBox="0 0 64 64" className="size-16 text-burdeos" fill="none" stroke="currentColor" strokeWidth="1.25">
        <motion.circle
          cx="32"
          cy="32"
          r="30"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, ease: easeSuave }}
        />
        <motion.path
          d="m21 33 7 7 15-16"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 0.6, ease: easeSuave, delay: 0.9 }}
        />
      </svg>
      <p className="mt-8 font-serif text-frase text-burdeos">
        {porCorreo ? 'Ya casi está.' : 'Gracias por escribirnos.'}
      </p>
      <p className="mt-4 max-w-sm text-cuerpo text-negro/70">
        {porCorreo
          ? 'Se abrió tu correo con el mensaje listo. Solo falta que lo envíes.'
          : 'Recibimos tu mensaje. Te responderemos lo antes posible.'}
      </p>
      <button
        type="button"
        onClick={onVolver}
        className="mt-8 text-xs font-medium tracking-[0.18em] text-burdeos uppercase underline decoration-dorado underline-offset-8"
      >
        Volver al formulario
      </button>
    </motion.div>
  )
}

function Flecha({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className={cn('size-3.5 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" />
    </svg>
  )
}

function IconoEmail() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.25">
      <rect x="3" y="5.5" width="18" height="13" rx="2" />
      <path d="m3.5 7 8.5 6 8.5-6" />
    </svg>
  )
}

function IconoTelefono() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M5 4h3.5l1.7 4.3-2.2 1.4a11 11 0 0 0 6.3 6.3l1.4-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5A16.5 16.5 0 0 1 3.5 5.6 1.5 1.5 0 0 1 5 4Z" />
    </svg>
  )
}

function IconoWhatsApp({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className={cn('size-5 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.3-2.3l.8-1-1-2Z" />
    </svg>
  )
}

function IconoFormulario() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <rect x="4.5" y="3.5" width="15" height="17" rx="1.5" />
      <path d="M8 8.5h8M8 12h8M8 15.5h5" />
    </svg>
  )
}

function IconoUbicacion() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M12 21s-6.5-5.8-6.5-11a6.5 6.5 0 0 1 13 0c0 5.2-6.5 11-6.5 11Z" />
      <circle cx="12" cy="10" r="2.25" />
    </svg>
  )
}
