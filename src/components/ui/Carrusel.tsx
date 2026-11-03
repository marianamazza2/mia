import { Children, useRef, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type CarruselProps = {
  /** Nombre de la región para lectores de pantalla («Servicios», «Equipo»…) */
  etiqueta: string
  /** Ancho de cada elemento: lo justo para que se asome el siguiente */
  anchoItem?: string
  className?: string
  children: ReactNode
}

// Mobile y tablet: se desliza con el dedo, de a un elemento, y se ve un poco el siguiente.
// Debajo, el contador con filete de progreso y las flechas. El mismo en toda la web.
export function Carrusel({ etiqueta, anchoItem = 'w-[88%] sm:w-[62%] md:w-[46%]', className, children }: CarruselProps) {
  const items = Children.toArray(children)
  const pistaRef = useRef<HTMLDivElement>(null)
  const [actual, setActual] = useState(0)

  const alDeslizar = () => {
    const pista = pistaRef.current
    if (!pista || pista.children.length < 2) return
    const paso = (pista.children[1] as HTMLElement).offsetLeft - (pista.children[0] as HTMLElement).offsetLeft
    setActual(Math.min(Math.round(pista.scrollLeft / paso), items.length - 1))
  }

  const ir = (i: number) => {
    const pista = pistaRef.current
    const item = pista?.children[i] as HTMLElement | undefined
    if (!pista || !item) return
    pista.scrollTo({
      left: item.offsetLeft - pista.offsetLeft - parseFloat(getComputedStyle(pista).scrollPaddingLeft || '0'),
      behavior: 'smooth',
    })
  }

  return (
    // min-w-0: dentro de una grilla, la pista no debe estirar la columna (desbordaría la página)
    <div className={cn('min-w-0', className)}>
      <div
        ref={pistaRef}
        onScroll={alDeslizar}
        role="region"
        aria-label={etiqueta}
        className="flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto px-6 pb-2 [scrollbar-width:none] sm:scroll-px-8 sm:px-8 [&::-webkit-scrollbar]:hidden"
      >
        {items.map((item, i) => (
          <div
            key={i}
            aria-label={`${i + 1} de ${items.length}`}
            role="group"
            className={cn('flex shrink-0 snap-start', anchoItem)}
          >
            {item}
          </div>
        ))}
      </div>

      <div className="mt-8 flex items-center justify-between px-6 sm:px-8">
        <div className="flex items-center gap-4 font-serif text-lg lining-nums tabular-nums">
          <span className="text-burdeos">{String(actual + 1).padStart(2, '0')}</span>
          <span className="relative h-px w-16 bg-burdeos/15">
            <span
              className="absolute inset-y-0 left-0 bg-dorado transition-[width] duration-500 ease-suave"
              style={{ width: `${((actual + 1) / items.length) * 100}%` }}
            />
          </span>
          <span className="text-negro/40">{String(items.length).padStart(2, '0')}</span>
        </div>
        <div className="flex gap-3">
          <Flecha direccion="anterior" disabled={actual === 0} onClick={() => ir(actual - 1)} />
          <Flecha direccion="siguiente" disabled={actual === items.length - 1} onClick={() => ir(actual + 1)} />
        </div>
      </div>
    </div>
  )
}

function Flecha({
  direccion,
  disabled,
  onClick,
}: {
  direccion: 'anterior' | 'siguiente'
  disabled: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-label={direccion === 'anterior' ? 'Anterior' : 'Siguiente'}
      disabled={disabled}
      onClick={onClick}
      className="grid size-11 place-items-center rounded-full border border-burdeos/25 text-burdeos transition-colors duration-300 hover:bg-burdeos hover:text-crema disabled:opacity-30 disabled:hover:bg-transparent disabled:hover:text-burdeos"
    >
      <svg
        aria-hidden
        viewBox="0 0 24 16"
        className={cn('h-3 w-4', direccion === 'anterior' && 'rotate-180')}
        fill="none"
        stroke="currentColor"
        strokeWidth="1.25"
      >
        <path d="M0 8h22M16 2l6 6-6 6" />
      </svg>
    </button>
  )
}
