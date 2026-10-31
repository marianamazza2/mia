import { AnimatePresence, motion } from 'motion/react'
import { useCallback, useEffect, useId, useRef, useState } from 'react'
import aBurdeos from '@/assets/brand/a_mia_burdeos.svg'
import marina from '@/assets/images/equipo-marina.webp'
import { Reveal } from '@/components/motion/Reveal'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'
import { useMediaQuery } from '@/lib/useMediaQuery'

type Persona = {
  nombre: string
  rol: string
  /** Retrato en WebP. Mientras falte, se muestra un lugar reservado con la «a» */
  foto?: string
  /** Presentación completa, por párrafos: se lee en el panel de perfil */
  bio: string[]
  /** Perfil de LinkedIn. Pendiente: pasar las direcciones */
  linkedin: string
}

const equipo: Persona[] = [
  {
    nombre: 'Marina Elena Nicolai',
    rol: 'Fundadora y directora',
    foto: marina,
    bio: [
      'Psicóloga y psicoanalista, con más de 9 años de trayectoria en el trabajo institucional y organizacional, así como en la docencia y la práctica clínica.',
      'Su trabajo parte de la singularidad de cada situación, buscando reconocer aquello que realmente está en juego y construir, desde allí, posibilidades concretas de intervención.',
      'Como fundadora y directora de Mía, es responsable de la orientación metodológica y estratégica de la consultora.',
    ],
    linkedin: '#',
  },
  {
    nombre: 'Lucia Carolina Nicolai',
    rol: 'Procesos e implementación',
    bio: [
      'Con sólida formación en Ingeniería Industrial y experiencia en el trabajo con equipos empresariales, aporta una perspectiva orientada al análisis de procesos, la organización del trabajo y el funcionamiento operativo de las empresas.',
      'En Mía trabaja dentro de las organizaciones, realizando el mapeo y análisis de sus procesos, observando las dinámicas de trabajo y examinando cómo se llevan adelante las decisiones en la práctica.',
    ],
    linkedin: '#',
  },
]

// Los retratos de quienes están detrás de Mía, bajo el título «Dirección y coordinación», lado a lado y a la
// misma altura. Debajo, solo nombre, rol y «Ver perfil»: la presentación completa se abre en un panel de perfil.
export function Retratos({ className }: { className?: string }) {
  const [abierta, setAbierta] = useState<Persona | null>(null)
  const cerrar = useCallback(() => setAbierta(null), [])

  return (
    <>
      <div className={className}>
        <Reveal>
          <h4 className="text-subtitulo">
            Dirección y coordinación
          </h4>
        </Reveal>
        <ul className="mt-6 grid grid-cols-2 gap-4 sm:gap-8 lg:mt-8 lg:gap-10">
          {equipo.map((persona, i) => (
            <li key={persona.nombre}>
              <button
                type="button"
                onClick={() => setAbierta(persona)}
                aria-label={`Ver el perfil de ${persona.nombre}`}
                className="group block w-full text-left"
              >
                <Retrato persona={persona} delay={i * 0.2} />
              </button>
              <Reveal delay={0.3 + i * 0.2}>
                <p className="mt-5 font-serif text-tarjeta lg:mt-6">
                  {persona.nombre}
                </p>
                {/* De 1024 a 1279 px la columna es angosta: se cierra el espaciado para que el rol entre en una línea */}
                <p className="etiqueta mt-3 text-[0.625rem] leading-snug text-burdeos lg:tracking-[0.16em] xl:text-[0.6875rem] xl:tracking-[0.28em]">
                  {persona.rol}
                </p>
                <button
                  type="button"
                  onClick={() => setAbierta(persona)}
                  className="group/link mt-4 inline-flex items-center gap-2.5 text-detalle text-burdeos"
                >
                  <span className="relative py-0.5">
                    Ver perfil
                    <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado/60 transition-transform duration-500 ease-suave group-hover/link:scale-x-50" />
                  </span>
                  <Flecha className="transition-transform duration-500 ease-suave group-hover/link:translate-x-1" />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <AnimatePresence>
        {abierta && <PanelPerfil key={abierta.nombre} persona={abierta} onCerrar={cerrar} />}
      </AnimatePresence>
    </>
  )
}

// Retrato vertical con esquinas suaves que se descubre de abajo hacia arriba al entrar en pantalla
function Retrato({ persona, delay }: { persona: Persona; delay: number }) {
  return (
    // El observador va en el contenedor: con el recorte al 100 % el navegador lo da por invisible
    <motion.div
      className="relative aspect-[4/5]"
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#ebe6de]"
        variants={{ oculto: { clipPath: 'inset(100% 0 0 0)' }, visible: { clipPath: 'inset(0% 0 0 0)' } }}
        transition={{ duration: 1.6, ease: easeSuave, delay }}
      >
        <motion.div
          className="size-full"
          variants={{ oculto: { scale: 1.15 }, visible: { scale: 1 } }}
          transition={{ duration: 2.2, ease: easeSuave, delay }}
        >
          {/* Al pasar el mouse, la foto se acerca apenas: invita a abrir el perfil */}
          <div className="size-full transition-transform duration-700 ease-suave group-hover:scale-[1.03]">
            <Foto persona={persona} />
          </div>
        </motion.div>
      </motion.div>
    </motion.div>
  )
}

function Foto({ persona }: { persona: Persona }) {
  if (persona.foto) {
    return (
      <Picture
        src={persona.foto}
        alt={`Retrato de ${persona.nombre}`}
        loading="lazy"
        className="size-full object-cover object-top"
      />
    )
  }
  // Lugar reservado hasta tener la foto: la «a» de la marca, muy tenue
  return (
    <div className="flex size-full flex-col items-center justify-center gap-4 bg-[#ebe6de]">
      <img src={aBurdeos} alt="" className="w-1/3 opacity-[0.12]" />
      <span className="etiqueta text-[0.5625rem] text-negro/35">Retrato</span>
    </div>
  )
}

// Panel de perfil: en desktop entra desde la derecha; en mobile es una hoja que sube desde abajo
function PanelPerfil({ persona, onCerrar }: { persona: Persona; onCerrar: () => void }) {
  const esDesktop = useMediaQuery('(min-width: 1024px)')
  const cerrarRef = useRef<HTMLButtonElement>(null)
  const tituloId = useId()

  useEffect(() => {
    const anterior = document.activeElement as HTMLElement | null
    document.body.style.overflow = 'hidden'
    cerrarRef.current?.focus()
    const alTeclear = (event: KeyboardEvent) => event.key === 'Escape' && onCerrar()
    window.addEventListener('keydown', alTeclear)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', alTeclear)
      anterior?.focus()
    }
  }, [onCerrar])

  const fuera = esDesktop ? { x: '100%' } : { y: '100%' }

  return (
    <motion.div className="fixed inset-0 z-[85]" role="dialog" aria-modal="true" aria-labelledby={tituloId}>
      <motion.div
        className="absolute inset-0 bg-negro/45 backdrop-blur-[2px]"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
        onClick={onCerrar}
      />
      <motion.aside
        className={cn(
          'absolute overflow-y-auto bg-crema text-negro shadow-[0_0_80px_-20px_rgb(20_20_20/0.4)]',
          esDesktop ? 'inset-y-0 right-0 w-[min(36rem,100%)]' : 'inset-x-0 bottom-0 max-h-[88svh] rounded-t-[20px]',
        )}
        initial={fuera}
        animate={{ x: 0, y: 0 }}
        exit={fuera}
        transition={{ duration: 0.75, ease: easeSuave }}
      >
        <div className="relative px-6 pt-8 pb-10 sm:px-10 lg:px-14 lg:pt-14 lg:pb-16">
          {!esDesktop && (
            <span aria-hidden className="absolute top-3 left-1/2 h-1 w-10 -translate-x-1/2 rounded-full bg-negro/15" />
          )}
          <button
            ref={cerrarRef}
            type="button"
            onClick={onCerrar}
            aria-label="Cerrar el perfil"
            className="absolute top-5 right-5 grid size-11 place-items-center rounded-full text-burdeos transition-colors duration-300 hover:bg-burdeos/5 lg:top-8 lg:right-8"
          >
            <svg
              aria-hidden
              viewBox="0 0 16 16"
              className="size-3.5"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.25"
            >
              <path d="M2 2l12 12M14 2 2 14" />
            </svg>
          </button>

          <div className="flex items-end gap-5 pr-10 lg:gap-6">
            <div className="aspect-[4/5] w-24 shrink-0 overflow-hidden rounded-[10px] lg:w-32">
              <Foto persona={persona} />
            </div>
            <div>
              <h4 id={tituloId} className="text-tarjeta">
                {persona.nombre}
              </h4>
              <p className="etiqueta mt-3 text-[0.625rem] leading-snug text-burdeos lg:text-[0.6875rem]">
                {persona.rol}
              </p>
            </div>
          </div>

          <div className="mt-8 space-y-4 border-t border-dorado/40 pt-8 text-cuerpo text-negro/75 lg:mt-10 lg:pt-10">
            {persona.bio.map((parrafo) => (
              <p key={parrafo}>{parrafo}</p>
            ))}
          </div>

          <a
            href={persona.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-10 inline-flex h-12 items-center gap-3 rounded-[40px] border border-burdeos/30 px-6 text-[0.6875rem] font-medium tracking-[0.16em] text-burdeos uppercase transition-colors duration-500 ease-suave hover:border-burdeos hover:bg-burdeos hover:text-crema"
          >
            <IconoLinkedin />
            Ver en LinkedIn
          </a>
        </div>
      </motion.aside>
    </motion.div>
  )
}

function Flecha({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 16"
      className={cn('h-3 w-4 shrink-0', className)}
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 8h22M16 2l6 6-6 6" />
    </svg>
  )
}

function IconoLinkedin() {
  return (
    <svg aria-hidden viewBox="0 0 24 24" className="size-4" fill="currentColor">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9.75h4v11H3v-11Zm6.5 0h3.8v1.5h.05c.53-1 1.83-2.05 3.77-2.05 4.03 0 4.78 2.65 4.78 6.1v5.45h-4v-4.83c0-1.15-.02-2.63-1.6-2.63-1.6 0-1.85 1.25-1.85 2.55v4.91h-4v-11Z" />
    </svg>
  )
}
