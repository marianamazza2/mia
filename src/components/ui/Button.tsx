import type { ComponentProps } from 'react'
import { cn } from '@/lib/cn'

// Píldora de 40 px: el único elemento redondeado, contrasta con las fotos de esquinas vivas
const variants = {
  primary: 'bg-burdeos text-crema hover:bg-burdeos-medio',
  outline: 'border border-burdeos/30 text-burdeos hover:border-burdeos hover:bg-burdeos hover:text-crema',
  light: 'bg-crema text-burdeos hover:bg-white',
}

const sizes = {
  sm: 'h-11 px-6 text-[0.6875rem]',
  md: 'h-14 px-8 text-xs sm:px-10',
}

type ButtonProps = ComponentProps<'a'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
  withArrow?: boolean
}

// Las clases de la píldora, compartidas por el enlace (Button) y el botón de acción (ButtonAccion)
function claseBoton(variant: keyof typeof variants = 'primary', size: keyof typeof sizes = 'md', className?: string) {
  return cn(
    'group inline-flex items-center justify-center gap-4 rounded-[40px] font-medium tracking-[0.14em] whitespace-nowrap uppercase sm:tracking-[0.2em]',
    'transition-colors duration-500 ease-suave',
    'focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-burdeos',
    variants[variant],
    sizes[size],
    className,
  )
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
    <a className={claseBoton(variant, size, className)} {...props}>
      {children}
      {withArrow && <Arrow />}
    </a>
  )
}

function Arrow() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 16"
      className="h-3.5 w-5 shrink-0 transition-transform duration-500 ease-suave group-hover:translate-x-1.5"
      fill="none"
      stroke="currentColor"
      strokeWidth="1"
    >
      <path d="M0 8h22M16 2l6 6-6 6" />
    </svg>
  )
}

type ButtonAccionProps = ComponentProps<'button'> & {
  variant?: keyof typeof variants
  size?: keyof typeof sizes
}

// La misma píldora como <button>, para acciones en la página (por ejemplo, abrir el formulario)
export function ButtonAccion({
  variant = 'primary',
  size = 'md',
  className,
  type = 'button',
  ...props
}: ButtonAccionProps) {
  return <button type={type} className={claseBoton(variant, size, className)} {...props} />
}
