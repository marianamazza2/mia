import { AnimatePresence, motion, useMotionValueEvent, useScroll } from 'motion/react'
import { useEffect, useState } from 'react'
import logoNegativo from '@/assets/brand/logo_mia_negativo.svg'
import logo from '@/assets/brand/logo_mia_principal.svg'
import { Button } from '@/components/ui/Button'
import { Container } from '@/components/ui/Container'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'

const links = [
  { href: '#inicio', label: 'Inicio' },
  { href: '#sobre-mia', label: 'Sobre Mía' },
  { href: '#servicios', label: 'Servicios' },
  { href: '#metodologia', label: 'Metodología' },
  { href: '#contacto', label: 'Contacto' },
]

export function Header() {
  const { scrollY } = useScroll()
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)

  // Se oculta al bajar y reaparece al subir
  useMotionValueEvent(scrollY, 'change', (y) => {
    const previous = scrollY.getPrevious() ?? 0
    setScrolled(y > 24)
    setHidden(y > previous && y > 200)
  })

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    if (!open) return
    const onKeyDown = (event: KeyboardEvent) => event.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [open])

  // La portada es clara: el header solo va en negativo con el menú móvil abierto
  const onDark = open

  return (
    <>
      <motion.header
        className={cn(
          'fixed inset-x-0 top-0 z-50 border-b transition-[background-color,border-color] duration-500',
          scrolled && !open ? 'border-dorado/25 bg-crema/85 backdrop-blur-md' : 'border-transparent',
        )}
        initial={{ y: '-100%' }}
        animate={{ y: hidden && !open ? '-100%' : '0%' }}
        transition={{ duration: 0.7, ease: easeSuave }}
      >
        <Container className="flex h-20 items-center justify-between lg:h-24">
          <a href="#inicio" aria-label="Mía, ir al inicio" onClick={() => setOpen(false)}>
            <img src={onDark ? logoNegativo : logo} alt="" className="w-[140px] lg:w-[150px]" />
          </a>

          <nav aria-label="Principal" className="hidden lg:block">
            <ul className="flex items-center gap-10">
              {links.map(({ href, label }) => (
                <li key={href}>
                  <a
                    href={href}
                    className={cn(
                      'group relative py-2 text-[0.8125rem] tracking-wide transition-colors duration-300',
                      onDark ? 'text-crema/80 hover:text-crema' : 'text-negro/75 hover:text-burdeos',
                    )}
                  >
                    {label}
                    <span className="absolute inset-x-0 bottom-0 h-px origin-left scale-x-0 bg-dorado transition-transform duration-500 ease-suave group-hover:scale-x-100" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <Button href="#contacto" size="sm" variant={onDark ? 'light' : 'outline'} className="hidden lg:inline-flex">
            Hablemos
          </Button>

          <button
            type="button"
            className="relative -mr-2 grid size-11 place-items-center lg:hidden"
            aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((value) => !value)}
          >
            <span
              className={cn(
                'absolute h-px w-6 transition-all duration-500 ease-suave',
                open ? 'rotate-45' : '-translate-y-1',
                onDark ? 'bg-crema' : 'bg-burdeos',
              )}
            />
            <span
              className={cn(
                'absolute h-px w-6 transition-all duration-500 ease-suave',
                open ? '-rotate-45' : 'translate-y-1',
                onDark ? 'bg-crema' : 'bg-burdeos',
              )}
            />
          </button>
        </Container>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            className="fixed inset-0 z-40 flex flex-col bg-burdeos pt-28 pb-10 lg:hidden"
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.8, ease: easeSuave }}
          >
            <Container className="flex flex-1 flex-col justify-between">
              <nav aria-label="Menú móvil">
                <ul className="space-y-2">
                  {links.map(({ href, label }, i) => (
                    <li key={href} className="overflow-hidden">
                      <motion.a
                        href={href}
                        onClick={() => setOpen(false)}
                        className="block py-1 font-serif text-[2.5rem] leading-tight font-medium text-crema"
                        initial={{ y: '100%' }}
                        animate={{ y: 0 }}
                        transition={{ duration: 0.8, ease: easeSuave, delay: 0.25 + i * 0.06 }}
                      >
                        {label}
                      </motion.a>
                    </li>
                  ))}
                </ul>
              </nav>

              <motion.div
                className="space-y-8"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 0.6 }}
              >
                <span aria-hidden className="block h-px w-16 bg-dorado" />
                <Button href="#contacto" variant="light" withArrow onClick={() => setOpen(false)}>
                  Reservar una conversación
                </Button>
              </motion.div>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
