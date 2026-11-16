import { AnimatePresence, m } from 'motion/react'
import { useEffect, useRef, useState } from 'react'
import { ButtonAccion } from '@/components/ui/Button'
import { Eyebrow } from '@/components/ui/Eyebrow'
import { decisionCookies, guardarDecisionCookies, type DecisionCookies } from '@/lib/cookies'
import { useIntroLista } from '@/lib/intro'
import { easeSuave } from '@/lib/motion'

// Aviso de cookies: una tarjeta centrada sobre un velo, con la píldora de la marca.
// Se muestra una sola vez; la decisión queda guardada en el navegador.
export function AvisoCookies({ conIntro = false }: { conIntro?: boolean }) {
  const [visible, setVisible] = useState(false)
  const aceptar = useRef<HTMLButtonElement>(null)
  // En la landing espera a que suba el telón de la intro; en las páginas legales no hay intro
  const introLista = useIntroLista()
  const listo = !conIntro || introLista

  // El primer render tiene que coincidir con el HTML prerenderizado, que no sabe qué eligió cada persona:
  // por eso nunca se pinta en el servidor, y en el navegador aparece un momento después
  useEffect(() => {
    if (!listo || decisionCookies()) return
    const t = setTimeout(() => setVisible(true), 1200)
    return () => clearTimeout(t)
  }, [listo])

  useEffect(() => {
    if (!visible) return
    aceptar.current?.focus()
  }, [visible])

  const decidir = (decision: DecisionCookies) => {
    guardarDecisionCookies(decision)
    setVisible(false)
  }

  // Con Escape se entiende que no acepta: es lo que menos da por sentado
  useEffect(() => {
    if (!visible) return
    const alTeclear = (evento: KeyboardEvent) => evento.key === 'Escape' && decidir('rechazadas')
    window.addEventListener('keydown', alTeclear)
    return () => window.removeEventListener('keydown', alTeclear)
  }, [visible])

  return (
    <AnimatePresence>
      {visible && (
        <m.div
          className="fixed inset-0 z-[90] flex items-center justify-center p-6"
          role="dialog"
          aria-modal="true"
          aria-labelledby="aviso-cookies"
        >
          {/* El velo no cierra al tocarlo: la decisión se toma con los botones */}
          <m.div
            aria-hidden
            className="absolute inset-0 bg-negro/45 backdrop-blur-[2px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, ease: easeSuave }}
          />

          <m.div
            className="relative w-[min(26rem,100%)] rounded-[10px] bg-crema p-8 text-negro shadow-[0_0_80px_-20px_rgb(20_20_20/0.45)] sm:p-10"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.6, ease: easeSuave }}
          >
            <Eyebrow>
              <span id="aviso-cookies">Cookies</span>
            </Eyebrow>

            <p className="mt-6 text-detalle text-negro/70">
              Este sitio solo usa almacenamiento técnico, imprescindible para que funcione. No medimos tu
              navegación ni compartimos datos con terceros. Puedes consultar la{' '}
              <a
                href="/cookies"
                className="group/link relative text-burdeos transition-colors duration-300 hover:text-burdeos-medio"
              >
                política de cookies
                <span
                  aria-hidden
                  className="absolute inset-x-0 -bottom-0.5 h-px origin-left bg-dorado/60 transition-transform duration-500 ease-suave group-hover/link:scale-x-50"
                />
              </a>
              .
            </p>

            <div className="mt-8 flex flex-col gap-3">
              <ButtonAccion ref={aceptar} size="sm" className="w-full" onClick={() => decidir('aceptadas')}>
                Aceptar
              </ButtonAccion>
              <ButtonAccion variant="outline" size="sm" className="w-full" onClick={() => decidir('rechazadas')}>
                Rechazar
              </ButtonAccion>
            </div>
          </m.div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
