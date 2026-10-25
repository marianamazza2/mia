import { useId, useState, type ReactNode } from 'react'
import { cn } from '@/lib/cn'

type LeerMasProps = {
  children: ReactNode
  /** Color del botón según el fondo */
  tono?: 'claro' | 'oscuro'
  className?: string
}

// En mobile, el contenido arranca plegado y se despliega con «Leer más»; en desktop se ve siempre
export function LeerMas({ children, tono = 'claro', className }: LeerMasProps) {
  const [abierto, setAbierto] = useState(false)
  const id = useId()

  return (
    <div className={className}>
      <div
        id={id}
        className={cn(
          'grid transition-[grid-template-rows,opacity] duration-700 ease-suave lg:grid-rows-[1fr] lg:opacity-100',
          abierto ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0',
        )}
      >
        <div className="overflow-hidden">{children}</div>
      </div>
      <button
        type="button"
        aria-expanded={abierto}
        aria-controls={id}
        onClick={() => setAbierto((v) => !v)}
        className={cn(
          'group mt-5 inline-flex items-center gap-2.5 text-detalle lg:hidden',
          tono === 'oscuro' ? 'text-dorado-suave' : 'text-burdeos',
        )}
      >
        <span className="relative py-0.5">
          {abierto ? 'Leer menos' : 'Leer más'}
          <span className="absolute inset-x-0 -bottom-0.5 h-px bg-dorado/60" />
        </span>
        <svg
          aria-hidden
          viewBox="0 0 16 16"
          className={cn('size-2.5 transition-transform duration-500 ease-suave', abierto && 'rotate-45')}
          fill="none"
          stroke="currentColor"
          strokeWidth="1.25"
        >
          <path d="M8 1v14M1 8h14" />
        </svg>
      </button>
    </div>
  )
}
