import { m, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import logoNegativo from '@/assets/brand/logo_mia_negativo.svg'
import { cn } from '@/lib/cn'
import { marcarIntroLista } from '@/lib/intro'
import { easeSereno, easeTelon } from '@/lib/motion'

type Fase = 'logo' | 'despide' | 'telon' | 'fin'

// Tiempos de la intro, en milisegundos. El logo y el descriptor terminan de aparecer a los ~1,7 s,
// quedan medio segundo quietos y se despiden; el telón sube cuando ya casi no se ven.
const DESPIDE_LOGO = 2150
const SUBE_TELON = DESPIDE_LOGO + 650
const DURACION_TELON = 2.1 // segundos
// La portada arranca cuando el telón ya dejó ver la parte de arriba
const ARRANCA_PORTADA = SUBE_TELON + 500
const TERMINA = SUBE_TELON + 2400

// Pantalla burdeos con el logotipo que se escribe; después el telón burdeos sube despacio
// y detrás pasa uno dorado, que deja ver la portada.
export function Intro() {
  const reduceMotion = useReducedMotion()
  // Siempre arranca con el telón puesto: así sale en el HTML prerenderizado y tapa la página mientras carga
  const [fase, setFase] = useState<Fase>('logo')

  useEffect(() => {
    // Se ve una vez por visita. Con un enlace a una sección (#contacto) o con «reducir movimiento», tampoco:
    // va directo a la página. El script del <head> de index.html ya lo decidió antes de pintar (clase sin-intro)
    if (reduceMotion || window.location.hash || document.documentElement.classList.contains('sin-intro')) {
      setFase('fin')
      marcarIntroLista()
      return
    }
    try {
      sessionStorage.setItem('mia-intro', 'vista')
    } catch {
      // Sin almacenamiento (navegación privada estricta): la intro se vuelve a ver, nada más
    }
    const html = document.documentElement
    html.style.overflow = 'hidden'
    window.history.scrollRestoration = 'manual'
    window.scrollTo(0, 0)

    const despide = window.setTimeout(() => setFase('despide'), DESPIDE_LOGO)
    // Mientras sube el telón, la página ya se puede usar
    const telon = window.setTimeout(() => {
      html.style.overflow = ''
      setFase('telon')
    }, SUBE_TELON)
    const portada = window.setTimeout(marcarIntroLista, ARRANCA_PORTADA)
    const fin = window.setTimeout(() => setFase('fin'), TERMINA)
    return () => {
      window.clearTimeout(despide)
      window.clearTimeout(telon)
      window.clearTimeout(portada)
      window.clearTimeout(fin)
      html.style.overflow = ''
    }
    // Solo al entrar: si después cambia la preferencia de movimiento, la intro ya pasó
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  if (fase === 'fin') return null
  const sube = fase === 'telon'
  const despidiendo = fase !== 'logo'

  return (
    <div aria-hidden className={cn('intro fixed inset-0 z-[80] overflow-hidden', sube && 'pointer-events-none')}>
      {/* Telón dorado: pasa justo detrás del burdeos, como un filete de luz */}
      <m.div
        className="absolute inset-0 bg-linear-to-b from-dorado via-dorado-suave to-dorado"
        initial={false}
        animate={{ y: sube ? '-100%' : '0%' }}
        transition={{ duration: DURACION_TELON, ease: easeTelon, delay: 0.12 }}
      />

      {/* Telón burdeos con el logotipo */}
      <m.div
        className="absolute inset-0 flex items-center justify-center bg-burdeos-profundo"
        initial={false}
        animate={{ y: sube ? '-100%' : '0%' }}
        transition={{ duration: DURACION_TELON, ease: easeTelon }}
      >
        {/* La entrada (brillo, logo, filete y descriptor) va en CSS (index.css): arranca apenas se pinta el HTML,
            sin esperar al JavaScript, y no le pesa al celular. La salida sí la maneja motion */}
        {/* Brillo dorado muy tenue que aparece detrás del logo */}
        <div className="intro-brillo absolute size-[80vmax] rounded-full bg-[radial-gradient(circle,rgb(201_168_107/0.18),transparent_60%)]" />

        <m.div
          className="relative flex flex-col items-center"
          animate={despidiendo ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: easeSereno }}
        >
          {/* El logotipo se escribe de izquierda a derecha */}
          <img src={logoNegativo} alt="" width={304} height={134} className="intro-logo h-auto w-[min(58vw,19rem)]" />
          <span className="intro-filete mt-8 block h-px w-24 bg-dorado-suave" />
          <span className="intro-descriptor etiqueta mt-6 tracking-[0.38em] text-crema/80">Consultora para empresarias</span>
        </m.div>
      </m.div>
    </div>
  )
}
