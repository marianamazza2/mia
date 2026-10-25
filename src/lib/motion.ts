// Curva de movimiento de la marca: entradas suaves, sin rebotes (igual que --ease-suave)
export const easeSuave = [0.22, 1, 0.36, 1] as const

// Curva del telón de la intro: arranca y frena despacio, sin acelerones (igual que --ease-telon)
export const easeTelon = [0.6, 0.05, 0.3, 1] as const

// Curva serena: acelera y frena por igual, sin arranque brusco. Para detalles que tienen que pasar casi desapercibidos
export const easeSereno = [0.37, 0, 0.63, 1] as const
