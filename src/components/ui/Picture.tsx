import type { ComponentProps } from 'react'

type PictureProps = ComponentProps<'img'> & {
  /** Imagen en WebP: es el único formato que usa el sitio */
  src: string
  alt: string
  /** Versión de 900 px de ancho: el celular descarga esta en lugar de la grande */
  chica?: string
  /** Ancho real de «src», en píxeles (hace falta para que el navegador elija entre las dos) */
  ancho?: number
  /** Qué ancho ocupa la foto en pantalla (atributo «sizes»); por defecto, todo el ancho */
  tamanos?: string
}

// Foto del sitio: WebP, decodificada sin bloquear el resto de la página. Con «chica» y «ancho», el navegador
// elige la versión según el ancho de la pantalla y su densidad de píxeles
export function Picture({ src, alt, chica, ancho, tamanos = '100vw', ...props }: PictureProps) {
  const variantes = chica && ancho ? { srcSet: `${chica} 900w, ${src} ${ancho}w`, sizes: tamanos } : {}
  return <img src={src} alt={alt} decoding="async" {...variantes} {...props} />
}
