import type { ComponentProps } from 'react'

type PictureProps = ComponentProps<'img'> & {
  /** Imagen en WebP: es el único formato que usa el sitio */
  src: string
  alt: string
}

// Foto del sitio: WebP, decodificada sin bloquear el resto de la página
export function Picture({ src, alt, ...props }: PictureProps) {
  return <img src={src} alt={alt} decoding="async" {...props} />
}
