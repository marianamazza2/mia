import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Reveal } from '@/components/motion/Reveal'
import { Container } from '@/components/ui/Container'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { cn } from '@/lib/cn'
import { documentos, ultimaActualizacion, type IdDocumento } from './documentos'

// Página de un documento legal: mismo header y footer que la landing, texto a una columna de lectura
export function PaginaLegal({ id }: { id: IdDocumento }) {
  const documento = documentos.find((d) => d.id === id)!

  return (
    <>
      <Header />
      <main className="pt-36 pb-seccion lg:pt-44">
        <Container>
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <Reveal y={12}>
                <Eyebrow>Información legal</Eyebrow>
              </Reveal>
              <Reveal delay={0.1}>
                <h1 className="mt-8 text-titulo">{documento.titulo}</h1>
              </Reveal>
              <Reveal delay={0.15}>
                <p className="mt-6 max-w-xl text-cuerpo text-negro/70">{documento.descripcion}</p>
                <p className="etiqueta mt-6 text-negro/45">Última actualización: {ultimaActualizacion}</p>
              </Reveal>
            </div>

            {/* Índice de los tres documentos */}
            <nav aria-label="Documentos legales" className="self-end lg:col-span-3 lg:col-start-10">
              <ul className="border-t border-dorado/40">
                {documentos.map((d) => {
                  const actual = d.id === id
                  return (
                    <li key={d.id} className="border-b border-dorado/40">
                      <a
                        href={d.ruta}
                        aria-current={actual ? 'page' : undefined}
                        className={cn(
                          'flex items-center justify-between py-3.5 text-detalle transition-colors duration-300',
                          actual ? 'text-burdeos' : 'text-negro/60 hover:text-burdeos',
                        )}
                      >
                        {d.nombre}
                        {actual && <span aria-hidden className="size-1.5 rounded-full bg-burdeos" />}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
          </div>

          <div className="mt-bloque grid lg:grid-cols-12">
            <article className="legal lg:col-span-8">
              {documento.apartados.map((apartado, i) => (
                <section key={apartado.titulo} className="border-t border-dorado/40 py-10 first:pt-10 lg:py-12">
                  <h2 className="flex items-baseline gap-5 text-tarjeta">
                    <span className="font-serif text-menor text-burdeos/40 lining-nums tabular-nums">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    {apartado.titulo}
                  </h2>
                  <div className="mt-5 space-y-4 text-cuerpo text-negro/75 lg:pl-11">{apartado.contenido}</div>
                </section>
              ))}
            </article>
          </div>
        </Container>
      </main>
      <Footer />
    </>
  )
}
