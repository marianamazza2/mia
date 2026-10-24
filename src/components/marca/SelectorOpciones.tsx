import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'
import { elegirPatron, patrones, usePatron, type Patron } from '@/lib/opciones'

// Panel flotante para comparar las opciones del patrón de la «a». Solo para revisar la propuesta.
export function SelectorOpciones() {
  const actual = usePatron()
  const [abierto, setAbierto] = useState(false)

  const elegir = (patron: Patron, ancla: string) => {
    elegirPatron(patron)
    document.querySelector(ancla)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  return (
    <div className="fixed bottom-4 left-4 z-[70] w-[min(20rem,calc(100vw-2rem))] border border-burdeos/20 bg-crema/95 text-negro shadow-[0_20px_50px_-20px_rgb(20_20_20/0.35)] backdrop-blur">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="text-[0.625rem] font-medium tracking-[0.3em] text-burdeos uppercase">Propuesta · patrón «a»</span>
        <span aria-hidden className={cn('text-burdeos transition-transform duration-300', abierto && 'rotate-180')}>
          ˄
        </span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.ul
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: easeSuave }}
          >
            {patrones.map((patron, i) => (
              <li key={patron.id} className="border-t border-burdeos/10">
                <button
                  type="button"
                  onClick={() => elegir(patron.id, patron.ancla)}
                  aria-pressed={actual === patron.id}
                  className={cn(
                    'flex w-full gap-4 px-5 py-3.5 text-left transition-colors',
                    actual === patron.id ? 'bg-burdeos text-crema' : 'hover:bg-burdeos/5',
                  )}
                >
                  <span className="font-serif text-lg italic">{i + 1}</span>
                  <span>
                    <span className="block font-serif text-lg leading-tight font-semibold">{patron.nombre}</span>
                    <span className={cn('mt-0.5 block text-xs leading-snug', actual === patron.id ? 'text-crema/70' : 'text-negro/55')}>
                      {patron.detalle}
                    </span>
                  </span>
                </button>
              </li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </div>
  )
}
