import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import logoNegativo from '@/assets/brand/logo_mia_negativo.svg'
import { cn } from '@/lib/cn'
import { marcarIntroLista } from '@/lib/intro'
import { easeSereno, easeTelon } from '@/lib/motion'

type Fase = 'logo' | 'despide' | 'telon' | 'fin'

// Tiempos de la intro, en milisegundos. El logo y el descriptor terminan de aparecer a los ~2,1 s,
// quedan un segundo quietos y se despiden despacio; el telón sube cuando ya casi no se ven.
const DESPIDE_LOGO = 3150
const SUBE_TELON = DESPIDE_LOGO + 1000
const DURACION_TELON = 2.1 // segundos
// La portada arranca cuando el telón ya dejó ver la parte de arriba
const ARRANCA_PORTADA = SUBE_TELON + 500
const TERMINA = SUBE_TELON + 2400

// Pantalla burdeos con el logotipo que se escribe; después el telón burdeos sube despacio
// y detrás pasa uno dorado, que deja ver la portada.
export function Intro() {
  const reduceMotion = useReducedMotion()
  // Con un enlace a una sección (#contacto) o con «reducir movimiento», se va directo a la página
  const [saltar] = useState(() => Boolean(reduceMotion || window.location.hash))
  const [fase, setFase] = useState<Fase>(saltar ? 'fin' : 'logo')

  useEffect(() => {
    if (saltar) {
      marcarIntroLista()
      return
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
  }, [saltar])

  if (fase === 'fin') return null
  const sube = fase === 'telon'
  const despidiendo = fase !== 'logo'

  return (
    <div aria-hidden className={cn('fixed inset-0 z-[80] overflow-hidden', sube && 'pointer-events-none')}>
      {/* Telón dorado: pasa justo detrás del burdeos, como un filete de luz */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-dorado via-dorado-suave to-dorado"
        initial={false}
        animate={{ y: sube ? '-100%' : '0%' }}
        transition={{ duration: DURACION_TELON, ease: easeTelon, delay: 0.12 }}
      />

      {/* Telón burdeos con el logotipo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-burdeos-profundo"
        initial={false}
        animate={{ y: sube ? '-100%' : '0%' }}
        transition={{ duration: DURACION_TELON, ease: easeTelon }}
      >
        {/* Brillo dorado muy tenue que respira detrás del logo */}
        <motion.div
          className="absolute size-[80vmax] rounded-full bg-[radial-gradient(circle,rgb(201_168_107/0.18),transparent_60%)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: easeSereno }}
        />

        <motion.div
          className="relative flex flex-col items-center"
          animate={despidiendo ? { opacity: 0, y: -12 } : { opacity: 1, y: 0 }}
          transition={{ duration: 1.6, ease: easeSereno }}
        >
          {/* El logotipo se escribe de izquierda a derecha */}
          <motion.img
            src={logoNegativo}
            alt=""
            className="w-[min(58vw,19rem)]"
            initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.06 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
            transition={{ duration: 1.3, ease: easeSereno, delay: 0.15 }}
          />
          <motion.span
            className="mt-8 block h-px w-24 bg-dorado-suave"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.1, ease: easeSereno, delay: 0.8 }}
          />
          <motion.span
            className="etiqueta mt-6 text-crema/80"
            initial={{ opacity: 0, letterSpacing: '0.48em' }}
            animate={{ opacity: 1, letterSpacing: '0.38em' }}
            transition={{ duration: 1.4, ease: easeSereno, delay: 0.75 }}
          >
            Consultora para empresarias
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}
