import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

export function Container({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mx-auto w-full max-w-7xl px-6 sm:px-8 lg:px-12', className)} {...props} />
}
