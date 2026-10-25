import type { CSSProperties } from 'react'
import { cn } from '@/lib/cn'

type PatronAProps = {
  /** Distancia entre «a», en píxeles */
  paso?: number
  /** Se desvanece hacia los bordes, como una marca de agua */
  difuminado?: boolean
  className?: string
}

// Fondo con la «a» repetida en tresbolillo. El color sale de `text-*` y la intensidad de `opacity-*`.
export function PatronA({ paso = 72, difuminado = false, className }: PatronAProps) {
  return (
    <div
      aria-hidden
      className={cn(
        'pointer-events-none absolute inset-0',
        difuminado && '[mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_70%)]',
        className,
      )}
    >
      <div className="patron-a size-full" style={{ '--paso': `${paso}px` } as CSSProperties} />
    </div>
  )
}
