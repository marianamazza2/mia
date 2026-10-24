import aCrema from '@/assets/brand/a_mia_crema.svg'
import logoDescriptor from '@/assets/brand/logo_mia_primario_negativo_con_descriptor.svg'
import { Container } from '@/components/ui/Container'
import { contacto } from '@/lib/contacto'

const anio = new Date().getFullYear()

const links = [
  { href: '#sobre-mia', label: 'Sobre Mía' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#metodologia', label: 'Metodología' },
  { href: '#contacto', label: 'Contacto' },
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

      <Container className="relative pt-seccion pb-10">
        <div className="grid gap-16 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <img src={logoDescriptor} alt="Mía, consultora para empresarias" className="w-56 lg:w-64" />
            <p className="mt-10 max-w-xs font-serif text-destacado text-crema/80 italic">
              Darle lugar a aquello que, sin ser percibido, organiza el funcionamiento de una empresa.
            </p>
          </div>

          <nav aria-label="Pie de página" className="lg:col-span-3 lg:col-start-7">
            <p className="etiqueta text-dorado-suave">Mía</p>
            <ul className="mt-6 space-y-3">
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
            <address className="mt-6 space-y-3 text-detalle text-crema/70 not-italic">
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

        <div className="mt-bloque flex flex-col gap-4 border-t border-dorado/30 pt-8 text-xs text-crema/50 sm:flex-row sm:justify-between">
          <p>© {anio} Mía · Consultora para empresarias</p>
          <a href="#privacidad" className="transition-colors hover:text-crema">
            Política de privacidad
          </a>
        </div>
      </Container>
    </footer>
  )
}
