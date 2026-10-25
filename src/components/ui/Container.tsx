import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

// Hasta 1536 px, ancho máximo de 80rem; en pantallas más anchas se abre y se alinea con las mitades de Servicios y Contacto
export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12 2xl:max-w-none 2xl:px-(--margen-ancho)', className)} {...props} />
}
