import { AnimatePresence, motion } from 'motion/react'
import { useState, type FormEvent, type ReactNode } from 'react'
import aBurdeos from '@/assets/brand/a_mia_burdeos.svg'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'
import { contacto } from '@/lib/contacto'
import { easeSuave } from '@/lib/motion'

const motivos = ['Acompañamiento a la dirección', 'Lectura organizacional', 'Procesos de reorganización', 'Otro']

const canales = [
  { etiqueta: 'Email', valor: contacto.email, href: `mailto:${contacto.email}`, icono: <IconoEmail /> },
  { etiqueta: 'Teléfono', valor: contacto.telefonoVisible, href: `tel:${contacto.telefono}`, icono: <IconoTelefono /> },
  {
    etiqueta: 'WhatsApp',
    valor: 'Escribir un mensaje',
    href: contacto.whatsapp,
    externo: true,
    icono: <IconoWhatsApp />,
  },
  {
    etiqueta: 'Dónde estamos',
    valor: 'Av. Diagonal 534, Barcelona',
    href: contacto.mapa,
    externo: true,
    icono: <IconoUbicacion />,
  },
]

export function Contacto() {
  return (
    <section id="contacto" className="relative overflow-hidden py-28 sm:py-36 lg:py-44">
      {/* La «a» recortada por el borde, como en el reverso de la carpeta y los sobres */}
      <img
        aria-hidden
        src={aBurdeos}
        alt=""
        className="pointer-events-none absolute -bottom-28 -left-24 w-72 opacity-[0.06] sm:w-96 lg:-left-32 lg:w-[34rem]"
      />

      <Container className="relative grid gap-16 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <Reveal y={12}>
            <Eyebrow>Contacto</Eyebrow>
          </Reveal>
          <Reveal delay={0.1}>
            <h2 className="mt-8 text-[2.75rem] leading-[1.05] sm:text-6xl lg:text-7xl">
              Empecemos por una <em className="font-medium text-burdeos">conversación.</em>
            </h2>
          </Reveal>
          <Reveal delay={0.2}>
            <p className="mt-8 max-w-md text-[1.0625rem] leading-[1.8] text-negro/70">
              Cuéntanos en qué momento está tu empresa. Te responderemos personalmente lo antes posible.
            </p>
          </Reveal>

          <ul className="mt-12 border-t border-burdeos/15">
            {canales.map((canal, i) => (
              <motion.li
                key={canal.etiqueta}
                className="border-b border-burdeos/15"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '0px 0px -10% 0px' }}
                transition={{ duration: 1, ease: easeSuave, delay: 0.25 + i * 0.08 }}
              >
                <a
                  href={canal.href}
                  {...(canal.externo && { target: '_blank', rel: 'noopener noreferrer' })}
                  className="group flex items-center gap-5 py-5 transition-colors duration-500 ease-suave"
                >
                  <span className="grid size-12 shrink-0 place-items-center rounded-full border border-burdeos/20 text-burdeos transition-all duration-500 ease-suave group-hover:border-burdeos group-hover:bg-burdeos group-hover:text-crema">
                    {canal.icono}
                  </span>
                  <span className="min-w-0 flex-1">
                    <span className="block text-[0.6875rem] font-medium tracking-[0.25em] text-burdeos/70 uppercase">
                      {canal.etiqueta}
                    </span>
                    <span className="mt-1 block truncate font-serif text-xl font-medium text-negro transition-colors duration-500 group-hover:text-burdeos sm:text-2xl">
                      {canal.valor}
                    </span>
                  </span>
                  <Flecha className="text-burdeos/40 transition-all duration-500 ease-suave group-hover:translate-x-1 group-hover:text-burdeos" />
                </a>
              </motion.li>
            ))}
          </ul>
        </div>

        <Reveal delay={0.15} className="lg:col-span-6 lg:col-start-7">
          <Formulario />
        </Reveal>
      </Container>
    </section>
  )
}

type Estado = 'inicial' | 'enviando' | 'enviado' | 'correo' | 'error'
type Errores = Partial<Record<'nombre' | 'email' | 'mensaje' | 'privacidad', string>>

function Formulario() {
  const [motivo, setMotivo] = useState(motivos[0])
  const [estado, setEstado] = useState<Estado>('inicial')
  const [errores, setErrores] = useState<Errores>({})

  const enviar = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const form = event.currentTarget
    const datos = Object.fromEntries(new FormData(form)) as Record<string, string>

    const nuevosErrores: Errores = {}
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
        `Nombre: ${datos.nombre}`,
        `Email: ${datos.email}`,
        datos.telefono && `Teléfono: ${datos.telefono}`,
        datos.empresa && `Empresa: ${datos.empresa}`,
      ]
        .filter((linea) => linea !== '' && linea !== undefined)
        .join('\n')
      window.location.href = `mailto:${contacto.email}?subject=${encodeURIComponent(`Consulta web: ${motivo}`)}&body=${encodeURIComponent(cuerpo)}`
      setEstado('correo')
      return
    }

    setEstado('enviando')
    try {
      const respuesta = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ ...datos, motivo }),
      })
      if (!respuesta.ok) throw new Error(String(respuesta.status))
      form.reset()
      setEstado('enviado')
    } catch {
      setEstado('error')
    }
  }

  return (
    <div className="relative rounded-[2rem] border border-burdeos/10 bg-white/70 p-7 sm:p-10 lg:p-12">
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
            <fieldset>
              <legend className="text-[0.6875rem] font-medium tracking-[0.25em] text-burdeos uppercase">
                ¿En qué podemos acompañarte?
              </legend>
              <div className="mt-4 flex flex-wrap gap-2">
                {motivos.map((opcion) => (
                  <label key={opcion} className="cursor-pointer">
                    <input
                      type="radio"
                      name="motivo"
                      value={opcion}
                      checked={motivo === opcion}
                      onChange={() => setMotivo(opcion)}
                      className="peer sr-only"
                    />
                    <span className="block rounded-full border border-burdeos/20 px-4 py-2 text-[0.8125rem] text-negro/70 transition-all duration-300 ease-suave peer-checked:border-burdeos peer-checked:bg-burdeos peer-checked:text-crema peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burdeos hover:border-burdeos/50">
                      {opcion}
                    </span>
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="mt-8 grid gap-x-8 gap-y-6 sm:grid-cols-2">
              <Campo nombre="nombre" etiqueta="Nombre" autoComplete="name" error={errores.nombre} />
              <Campo nombre="email" etiqueta="Email" tipo="email" autoComplete="email" error={errores.email} />
              <Campo nombre="telefono" etiqueta="Teléfono (opcional)" tipo="tel" autoComplete="tel" />
              <Campo nombre="empresa" etiqueta="Empresa (opcional)" autoComplete="organization" />
              <Campo nombre="mensaje" etiqueta="Tu mensaje" multilinea error={errores.mensaje} className="sm:col-span-2" />
            </div>

            <label className="mt-8 flex cursor-pointer items-start gap-3 text-sm leading-relaxed text-negro/70">
              <input type="checkbox" name="privacidad" className="peer sr-only" />
              <span
                aria-hidden
                className="mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border border-burdeos/30 text-transparent transition-colors duration-300 peer-checked:border-burdeos peer-checked:bg-burdeos peer-checked:text-crema peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-burdeos"
              >
                <svg viewBox="0 0 16 16" className="size-3" fill="none" stroke="currentColor" strokeWidth="2">
                  <path d="m3 8.5 3 3 7-7" />
                </svg>
              </span>
              <span>
                He leído y acepto la{' '}
                <a href="#privacidad" className="text-burdeos underline decoration-dorado underline-offset-4">
                  política de privacidad
                </a>
                .
              </span>
            </label>
            {errores.privacidad && <MensajeError>{errores.privacidad}</MensajeError>}

            <div className="mt-10 flex flex-wrap items-center gap-x-6 gap-y-4">
              <button
                type="submit"
                disabled={estado === 'enviando'}
                className="group inline-flex h-13 items-center justify-center gap-3 rounded-full bg-burdeos px-8 text-xs font-medium tracking-[0.18em] whitespace-nowrap text-crema uppercase transition-colors duration-500 ease-suave hover:bg-burdeos-medio focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burdeos disabled:opacity-60"
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
    'peer block w-full resize-none border-b bg-transparent pt-6 pb-2 text-[1.0625rem] text-negro outline-none transition-colors',
    error ? 'border-burdeos' : 'border-burdeos/20',
  )

  return (
    <div className={className}>
      <div className="relative">
        {multilinea ? (
          <textarea id={id} name={nombre} rows={4} placeholder=" " aria-invalid={!!error} className={clases} />
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
          className="pointer-events-none absolute top-6 left-0 origin-left text-[1.0625rem] text-negro/50 transition-all duration-300 ease-suave peer-focus:top-0 peer-focus:text-xs peer-focus:tracking-wide peer-focus:text-burdeos peer-[:not(:placeholder-shown)]:top-0 peer-[:not(:placeholder-shown)]:text-xs peer-[:not(:placeholder-shown)]:tracking-wide"
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
      <p className="mt-8 font-serif text-4xl font-medium text-burdeos">
        {porCorreo ? 'Ya casi está.' : 'Gracias por escribirnos.'}
      </p>
      <p className="mt-4 max-w-sm text-[1.0625rem] leading-relaxed text-negro/70">
        {porCorreo
          ? 'Se abrió tu correo con el mensaje listo. Solo falta que lo envíes.'
          : 'Recibimos tu mensaje. Te responderemos personalmente lo antes posible.'}
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
    <svg aria-hidden viewBox="0 0 16 16" className={cn('size-3.5 shrink-0', className)} fill="none" stroke="currentColor" strokeWidth="1.25">
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

function IconoWhatsApp() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.25">
      <path d="M3.5 20.5 4.8 16A8.5 8.5 0 1 1 8 19.2Z" />
      <path d="M9 8.5c0 3.5 3 6.5 6.5 6.5l1-1.5-2-1-1 .8a5 5 0 0 1-2.3-2.3l.8-1-1-2Z" />
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
