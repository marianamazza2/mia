import { useSyncExternalStore } from 'react'

// Opciones de la propuesta que se comparan en vivo. Se eligen con el selector flotante
// (visible en desarrollo o con ?opciones en la URL) o directamente con ?patron=…

// Dónde más usar la «a» como patrón (la marca de agua de Servicios ya queda fija)
export const patrones = [
  { id: 'forro', nombre: 'Forro', detalle: 'Tono sobre tono en el bloque de contacto, como el interior de la carpeta', ancla: '#contacto' },
  { id: 'cinta', nombre: 'Cinta', detalle: 'Una franja que corre lenta antes del contacto', ancla: '#cinta' },
] as const

export type Patron = (typeof patrones)[number]['id']

const params = new URLSearchParams(window.location.search)

export const mostrarOpciones = import.meta.env.DEV || params.has('opciones')

// Una opción: su valor vive en la URL (así se puede compartir el enlace) y avisa a quien la use
function crearOpcion<T extends string>(parametro: string, ids: readonly T[], porDefecto: T) {
  let actual = ids.find((id) => id === params.get(parametro)) ?? porDefecto
  const oyentes = new Set<() => void>()

  const elegir = (valor: T) => {
    actual = valor
    const url = new URL(window.location.href)
    url.searchParams.set(parametro, valor)
    window.history.replaceState(null, '', url)
    oyentes.forEach((oyente) => oyente())
  }

  function useOpcion() {
    return useSyncExternalStore(
      (oyente) => {
        oyentes.add(oyente)
        return () => oyentes.delete(oyente)
      },
      () => actual,
    )
  }

  return { elegir, useOpcion }
}

const patron = crearOpcion(
  'patron',
  patrones.map((p) => p.id),
  'forro',
)
export const elegirPatron = patron.elegir
export const usePatron = patron.useOpcion
