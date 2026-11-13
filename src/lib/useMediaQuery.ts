import { useSyncExternalStore } from 'react'

// Al prerenderizar no hay pantalla: el HTML sale con la versión mobile (la que indexa Google primero).
// En el navegador, React arranca con esa misma versión para que la hidratación coincida y enseguida
// pasa a la del tamaño real
export function useMediaQuery(query: string) {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia(query)
      media.addEventListener('change', onChange)
      return () => media.removeEventListener('change', onChange)
    },
    () => window.matchMedia(query).matches,
    () => false,
  )
}
