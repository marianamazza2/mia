import type { ReactNode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'

// En producción el HTML ya trae la página prerenderizada y React solo la «toma» (hidratación).
// En desarrollo (vite dev) el contenedor llega vacío y se renderiza desde cero
export function montar(contenido: ReactNode) {
  const raiz = document.getElementById('root')!
  if (raiz.hasChildNodes()) hydrateRoot(raiz, contenido)
  else createRoot(raiz).render(contenido)
}
