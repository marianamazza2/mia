import { useId, useState, type ReactNode } from 'react'
import aCrema from '@/assets/brand/a_mia_crema.svg'
import logoNegativo from '@/assets/brand/logo_mia_negativo.svg'
import { Container } from '@/components/ui/Container'
import { contacto } from '@/lib/contacto'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/useMediaQuery'

const anio = new Date().getFullYear()

const links = [
  { href: '/#sobre-mia', label: 'Sobre Mía' },
  { href: '/#cuando', label: 'Cuándo' },
  { href: '/#servicios', label: 'Servicios' },
  { href: '/#metodologia', label: 'Metodología' },
  { href: '/#contacto', label: 'Contacto' },
]

const legales = [
  { href: '/aviso-legal', label: 'Aviso legal' },
  { href: '/privacidad', label: 'Privacidad' },
  { href: '/cookies', label: 'Cookies' },
]

export function Footer() {
  return (
    <footer className="relative overflow-hidden bg-burdeos-profundo text-crema">
      {/* La «a» de gran tamaño recortada por el borde, como en el reverso de los sobres */}
      <img
        aria-hidden
        src={aCrema}
        alt=""
        className="pointer-events-none absolute -right-[12%] -bottom-[45%] w-[70%] max-w-none opacity-[0.05] sm:w-[48%] lg:-bottom-[60%] lg:w-[38%]"
      />

      <Container className="relative pt-8 pb-6 lg:pt-16 lg:pb-8">
        {/* En escritorio, la pantalla en cuartos: la marca en la mitad izquierda; «Mía» arranca justo en el
            centro y «Barcelona» en el último cuarto */}
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className="mb-6 flex items-center gap-5 lg:mb-0 lg:block lg:pr-16">
            {/* Sin descriptor: a este tamaño no se leería; el texto de abajo ya cumple ese papel */}
            <img
              src={logoNegativo}
              alt="Mía, consultora para empresarias"
              width={112}
              height={49}
              className="h-auto w-16 shrink-0 lg:w-28"
            />
            <p className="max-w-sm font-serif text-base text-crema/80 lg:mt-5 lg:text-menor">
              Trabajar sobre aquello que, sin ser evidente, limita nuestras posibilidades.
            </p>
          </div>

          <div className="lg:grid lg:grid-cols-2">
            <nav aria-label="Pie de página" className="lg:pr-12">
              <GrupoFooter titulo="Mía">
                <ul className="grid grid-cols-2 gap-x-6 lg:mt-4 lg:block lg:space-y-2">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <a href={href} className="inline-flex min-h-11 items-center text-detalle text-crema/70 transition-colors duration-300 hover:text-crema lg:min-h-0">
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </GrupoFooter>
            </nav>

            <div>
              <GrupoFooter titulo="Barcelona" tituloMovil="Contacto y ubicación">
                <address className="space-y-2 text-detalle text-crema/70 not-italic lg:mt-4">
                  <a href={contacto.mapa} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-crema">
                    Av. Diagonal 534, entresuelo izquierda, despacho 27
                    <br />
                    08006 Barcelona
                  </a>
                  <a href={`mailto:${contacto.email}`} className="block transition-colors hover:text-crema">
                    {contacto.email}
                  </a>
                  <a href={`tel:${contacto.telefono}`} className="block transition-colors hover:text-crema">
                    {contacto.telefonoVisible}
                  </a>
                </address>
              </GrupoFooter>
            </div>
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-2 text-xs text-crema/50 sm:flex-row sm:justify-between lg:mt-16 lg:gap-3 lg:border-t lg:border-dorado/30 lg:pt-6">
          <p>© {anio} Mía · Consultora para empresarias</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legales.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="inline-flex min-h-11 items-center transition-colors hover:text-crema lg:min-h-0">
                  {label}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </footer>
  )
}

// En móvil, los enlaces se agrupan en dos filas desplegables; en escritorio quedan visibles.
function GrupoFooter({ titulo, tituloMovil = titulo, children }: { titulo: string; tituloMovil?: string; children: ReactNode }) {
  const [abierto, setAbierto] = useState(false)
  const esDesktop = useMediaQuery('(min-width: 1024px)')
  const id = useId()

  return (
    <div className="border-b border-dorado/30 lg:border-0">
      <p className="etiqueta hidden text-dorado-suave lg:block">{titulo}</p>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((valor) => !valor)}
        className="flex min-h-14 w-full items-center justify-between text-left text-dorado-suave lg:hidden"
      >
        <span className="etiqueta">{tituloMovil}</span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn('size-3 transition-transform duration-300 motion-reduce:transition-none', abierto && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>
      <div
        id={id}
        inert={!abierto && !esDesktop}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-300 motion-reduce:transition-none lg:grid-rows-[1fr] lg:opacity-100',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="pb-5 lg:pb-0">{children}</div>
        </div>
      </div>
    </div>
  )
}
