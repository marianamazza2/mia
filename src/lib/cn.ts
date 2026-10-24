import { clsx, type ClassValue } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

// Los tamaños y espacios propios de src/index.css: sin esto, `text-cuerpo` se confundiría con un color
// y se perdería al combinarlo con `text-negro/70`
const twMerge = extendTailwindMerge({
  extend: {
    theme: {
      text: ['display', 'titulo', 'subtitulo', 'destacado', 'cuerpo', 'detalle', 'numeral'],
      spacing: ['seccion', 'bloque'],
    },
  },
})

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}
