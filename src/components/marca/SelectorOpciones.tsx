import { AnimatePresence, motion } from 'motion/react'
import { useState } from 'react'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'
import { elegirPatron, patrones, usePatron } from '@/lib/opciones'

// Panel flotante para comparar las opciones de la propuesta. Solo para revisarla, no va a producción.
export function SelectorOpciones() {
  const patron = usePatron()
  const [abierto, setAbierto] = useState(false)

  return (
    <div className="fixed bottom-4 left-4 z-[70] max-h-[calc(100svh-2rem)] w-[min(20rem,calc(100vw-2rem))] overflow-y-auto border border-burdeos/20 bg-crema/95 text-negro shadow-[0_20px_50px_-20px_rgb(20_20_20/0.35)] backdrop-blur">
      <button
        type="button"
        onClick={() => setAbierto((v) => !v)}
        aria-expanded={abierto}
        className="flex w-full items-center justify-between px-5 py-3.5 text-left"
      >
        <span className="etiqueta text-burdeos">Propuesta · patrón «a»</span>
        <span aria-hidden className={cn('text-burdeos transition-transform duration-300', abierto && 'rotate-180')}>
          ˄
        </span>
      </button>
      <AnimatePresence initial={false}>
        {abierto && (
          <motion.div
            className="overflow-hidden"
            initial={{ height: 0 }}
            animate={{ height: 'auto' }}
            exit={{ height: 0 }}
            transition={{ duration: 0.4, ease: easeSuave }}
          >
            <Grupo
              titulo="Patrón de la «a»"
              opciones={patrones}
              actual={patron}
              onElegir={(id, ancla) => {
                elegirPatron(id)
                if (ancla) document.querySelector(ancla)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

type Opcion<T> = { id: T; nombre: string; detalle: string; ancla?: string }

type GrupoProps<T extends string> = {
  titulo: string
  opciones: readonly Opcion<T>[]
  actual: T
  onElegir: (id: T, ancla?: string) => void
}

function Grupo<T extends string>({ titulo, opciones, actual, onElegir }: GrupoProps<T>) {
  return (
    <div className="border-t border-burdeos/15">
      <p className="etiqueta px-5 pt-4 pb-2 text-negro/50">{titulo}</p>
      <ul>
        {opciones.map((opcion, i) => (
          <li key={opcion.id} className="border-t border-burdeos/10">
            <button
              type="button"
              onClick={() => onElegir(opcion.id, opcion.ancla)}
              aria-pressed={actual === opcion.id}
              className={cn(
                'flex w-full gap-4 px-5 py-3.5 text-left transition-colors',
                actual === opcion.id ? 'bg-burdeos text-crema' : 'hover:bg-burdeos/5',
              )}
            >
              <span className="font-serif text-lg lining-nums">{i + 1}</span>
              <span>
                <span className="block font-serif text-lg leading-tight font-semibold">{opcion.nombre}</span>
                <span className={cn('mt-0.5 block text-xs leading-snug', actual === opcion.id ? 'text-crema/70' : 'text-negro/55')}>
                  {opcion.detalle}
                </span>
              </span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
