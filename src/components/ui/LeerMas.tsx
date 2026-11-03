import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useMediaQuery } from '@/lib/useMediaQuery'

type LeerMasProps = {
  children: ReactNode
  /** Color del botón según el fondo */
  tono?: 'claro' | 'oscuro'
  className?: string
}

// En mobile, el contenido arranca plegado y se despliega con «Ver más», pegado al texto; en desktop se ve siempre.
// El aire entre párrafos va dentro de lo plegado, así cerrado no deja un hueco antes del botón
export function LeerMas({ children, tono = 'claro', className }: LeerMasProps) {
  const [abierto, setAbierto] = useState(false)
  const id = useId()
  const esDesktop = useMediaQuery('(min-width: 1024px)')

  return (
    <div className={className}>
      <div
        id={id}
        inert={!abierto && !esDesktop}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-700 ease-suave lg:grid-rows-[1fr] lg:opacity-100',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">
          <div className="pt-5">{children}</div>
        </div>
      </div>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((v) => !v)}
        className={cn(
          'group mt-3 inline-flex min-h-11 items-center gap-2.5 text-detalle lg:hidden',
          tono === 'oscuro' ? 'text-dorado-suave' : 'text-burdeos',
        )}
      >
        <span className="relative py-0.5">
          {abierto ? 'Ver menos' : 'Ver más'}
          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-dorado/60" />
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn('size-3 transition-transform duration-300 ease-suave motion-reduce:transition-none', abierto && 'rotate-180')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="m3 6 5 5 5-5" />
        </svg>
      </button>
    </div>
  )
}
