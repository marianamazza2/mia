import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

const variants = {
  primary: 'bg-burdeos text-crema hover:bg-burdeos-medio',
  outline: 'border border-burdeos/25 text-burdeos hover:border-burdeos hover:bg-burdeos hover:text-crema',
  light: 'bg-crema text-burdeos hover:bg-white',
}

const sizes = {
  sm: 'h-10 px-5 text-[0.6875rem]',
  md: 'h-13 px-7 text-xs sm:px-8',
}

type ButtonProps = ComponentProps<'a'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  withArrow?: boolean
}

export function Button({
  variant = 'primary',
  size = 'md',
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        'group inline-flex items-center justify-center gap-3 rounded-full font-medium tracking-[0.14em] whitespace-nowrap uppercase sm:tracking-[0.18em]',
        'transition-colors duration-500 ease-suave',
        'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burdeos',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {children}
      {withArrow && <Arrow />}
    </a>
  )
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 16 16"
      className="size-3.5 transition-transform duration-500 ease-suave group-hover:translate-x-1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.25"
    >
      <path d="M1 8h13M9.5 3.5 14 8l-4.5 4.5" />
    </svg>
  )
}
