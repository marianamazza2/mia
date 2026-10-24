import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

type EyebrowProps = {
  children: ReactNode
  tone?: 'dark' | 'light'
  className?: string
}

// Antetítulo en mayúsculas con filete dorado, como el descriptor del logotipo
export function Eyebrow({ children, tone = 'dark', className }: EyebrowProps) {
  return (
    <p
      className={cn(
        'etiqueta flex items-center gap-4',
        tone === 'dark' ? 'text-burdeos' : 'text-dorado-suave',
        className,
      )}
    >
      <span aria-hidden className="h-px w-10 bg-dorado" />
      {children}
    </p>
  )
}
