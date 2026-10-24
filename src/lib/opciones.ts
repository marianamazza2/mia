import { useSyncExternalStore } from 'react'

// Opciones de la propuesta para usar la «a» como patrón. Se eligen con el selector
// flotante (visible en desarrollo o con ?opciones en la URL) o con ?patron=… directamente.
export const patrones = [
  { id: 'forro', nombre: 'Forro', detalle: 'Tono sobre tono en el bloque de contacto, como el interior de la carpeta', ancla: '#contacto' },
  { id: 'marca-de-agua', nombre: 'Marca de agua', detalle: 'Casi invisible detrás del equilibrio de Mía', ancla: '#equilibrio' },
  { id: 'cinta', nombre: 'Cinta', detalle: 'Una franja que corre lenta antes del contacto', ancla: '#cinta' },
] as const

export type Patron = (typeof patrones)[number]['id']

const params = new URLSearchParams(window.location.search)
const inicial = patrones.find((p) => p.id === params.get('patron'))?.id

let actual: Patron = inicial ?? 'forro'
const oyentes = new Set<() => void>()

export const mostrarOpciones = import.meta.env.DEV || params.has('opciones')

export function elegirPatron(patron: Patron) {
  actual = patron
  const url = new URL(window.location.href)
  url.searchParams.set('patron', patron)
  window.history.replaceState(null, '', url)
  oyentes.forEach((oyente) => oyente())
}

export function usePatron() {
  return useSyncExternalStore(
    (oyente) => {
      oyentes.add(oyente)
      return () => oyentes.delete(oyente)
    },
    () => actual,
  )
}
