import aCrema from '@/assets/brand/a_mia_crema.svg'
import logoNegativo from '@/assets/brand/logo_mia_negativo.svg'
import { Container } from '@/components/ui/Container'
import { contacto } from '@/lib/contacto'

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

      <Container className="relative pt-14 pb-8 lg:pt-16">
        <div className="grid grid-cols-[auto_1fr] gap-x-10 gap-y-10 lg:grid-cols-12 lg:gap-16">
          <div className="col-span-2 lg:col-span-5">
            {/* Sin descriptor: a este tamaño no se leería; el texto de abajo ya cumple ese papel */}
            <img src={logoNegativo} alt="Mía, consultora para empresarias" className="w-24 lg:w-28" />
            <p className="mt-5 max-w-sm font-serif text-menor text-crema/80">
              Darle lugar a aquello que, sin ser percibido, organiza el funcionamiento de una empresa.
            </p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3 lg:col-start-7">
            <p className="etiqueta text-dorado-suave">Mía</p>
            <ul className="mt-4 space-y-2">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a href={href} className="text-detalle text-crema/70 transition-colors duration-300 hover:text-crema">
                    {label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="lg:col-span-3">
            <p className="etiqueta text-dorado-suave">Barcelona</p>
            <address className="mt-4 space-y-2 text-detalle text-crema/70 not-italic">
              <a href={contacto.mapa} target="_blank" rel="noopener noreferrer" className="block transition-colors hover:text-crema">
                Av. Diagonal 534, entresuelo izquierda
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
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-dorado/30 pt-6 text-xs lg:mt-16 text-crema/50 sm:flex-row sm:justify-between">
          <p>© {anio} Mía · Consultora para empresarias</p>
          <ul className="flex flex-wrap gap-x-6 gap-y-2">
            {legales.map(({ href, label }) => (
              <li key={href}>
                <a href={href} className="transition-colors hover:text-crema">
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
