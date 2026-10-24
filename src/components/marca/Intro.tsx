import { motion, useReducedMotion } from 'motion/react'
import { useEffect, useState } from 'react'
import logoNegativo from '@/assets/brand/logo_mia_negativo.svg'
import { marcarIntroLista } from '@/lib/intro'
import { easeSuave, easeTelon } from '@/lib/motion'

type Fase = 'logo' | 'telon' | 'fin'

// Tiempos de la intro, en milisegundos
const SUBE_TELON = 1700
const TERMINA = SUBE_TELON + 1500

// Pantalla burdeos con el logotipo que se escribe; después el telón burdeos sube
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

    const telon = window.setTimeout(() => {
      setFase('telon')
      marcarIntroLista()
    }, SUBE_TELON)
    const fin = window.setTimeout(() => {
      html.style.overflow = ''
      setFase('fin')
    }, TERMINA)
    return () => {
      window.clearTimeout(telon)
      window.clearTimeout(fin)
      html.style.overflow = ''
    }
  }, [saltar])

  if (fase === 'fin') return null
  const sube = fase === 'telon'

  return (
    <div aria-hidden className="fixed inset-0 z-[80] overflow-hidden">
      {/* Telón dorado: pasa justo detrás del burdeos, como un filete de luz */}
      <motion.div
        className="absolute inset-0 bg-linear-to-b from-dorado via-dorado-suave to-dorado"
        initial={false}
        animate={{ y: sube ? '-100%' : '0%' }}
        transition={{ duration: 1.15, ease: easeTelon, delay: 0.07 }}
      />

      {/* Telón burdeos con el logotipo */}
      <motion.div
        className="absolute inset-0 flex items-center justify-center bg-burdeos-profundo"
        initial={false}
        animate={{ y: sube ? '-100%' : '0%' }}
        transition={{ duration: 1.15, ease: easeTelon }}
      >
        {/* Brillo dorado muy tenue que respira detrás del logo */}
        <motion.div
          className="absolute size-[80vmax] rounded-full bg-[radial-gradient(circle,rgb(201_168_107/0.18),transparent_60%)]"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.8, ease: easeSuave }}
        />

        <motion.div
          className="relative flex flex-col items-center"
          animate={sube ? { opacity: 0, y: -60 } : { opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: easeTelon }}
        >
          {/* El logotipo se escribe de izquierda a derecha */}
          <motion.img
            src={logoNegativo}
            alt=""
            className="w-[min(58vw,19rem)]"
            initial={{ clipPath: 'inset(0 100% 0 0)', scale: 1.06 }}
            animate={{ clipPath: 'inset(0 0% 0 0)', scale: 1 }}
            transition={{ duration: 1.2, ease: easeSuave, delay: 0.15 }}
          />
          <motion.span
            className="mt-8 block h-px w-24 bg-dorado-suave"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1, ease: easeSuave, delay: 0.75 }}
          />
          <motion.span
            className="etiqueta mt-6 text-crema/80"
            initial={{ opacity: 0, letterSpacing: '0.7em' }}
            animate={{ opacity: 1, letterSpacing: '0.38em' }}
            transition={{ duration: 1.3, ease: easeSuave, delay: 0.85 }}
          >
            Consultora para empresarias
          </motion.span>
        </motion.div>
      </motion.div>
    </div>
  )
}
