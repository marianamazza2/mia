// Qué respondió la persona en el aviso de cookies. Hoy la web no instala nada que dependa de esto: se guarda
// para no volver a preguntar y para que, el día que se agregue medición, pueda consultarse antes de cargarla

/** Dónde se guarda la decisión en el navegador */
export const CLAVE_COOKIES = 'mia-cookies'

export type DecisionCookies = 'aceptadas' | 'rechazadas'

/** Lo elegido, o null si todavía no eligió. Si el navegador no deja leer, se trata como «sin elegir» */
export function decisionCookies(): DecisionCookies | null {
  try {
    const guardada = localStorage.getItem(CLAVE_COOKIES)
    return guardada === 'aceptadas' || guardada === 'rechazadas' ? guardada : null
  } catch {
    return null
  }
}

/** Guarda la decisión. Sin almacenamiento (navegación privada estricta), se vuelve a preguntar la próxima vez */
export function guardarDecisionCookies(decision: DecisionCookies) {
  try {
    localStorage.setItem(CLAVE_COOKIES, decision)
  } catch {
    // Nada que hacer: el aviso se mostrará de nuevo
  }
}
