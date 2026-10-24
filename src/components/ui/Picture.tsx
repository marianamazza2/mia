import type { ComponentProps } from 'react'

type PictureProps = ComponentProps<'img'> & {
  avif: string
  jpg: string
  alt: string
}

// AVIF con JPG de respaldo
export function Picture({ avif, jpg, alt, ...props }: PictureProps) {
  return (
    <picture>
      <source srcSet={avif} type="image/avif" />
      <img src={jpg} alt={alt} decoding="async" {...props} />
    </picture>
  )
}
