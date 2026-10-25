import { useSyncExternalStore } from 'react'

// Avisa cuándo el telón de la intro empieza a subir, para que la portada y el header
// arranquen sus animaciones en ese momento y no debajo del telón.
let lista = false
const oyentes = new Set<() => void>()

export function marcarIntroLista() {
  if (lista) return
  lista = true
  oyentes.forEach((oyente) => oyente())
}

export function useIntroLista() {
  return useSyncExternalStore(
    (oyente) => {
      oyentes.add(oyente)
      return () => oyentes.delete(oyente)
    },
    () => lista,
  )
}
