// Las funciones de animación que usa la web, en un archivo aparte: se descargan después del resto, sin
// frenar la primera carga. Mientras tanto, la página ya se ve (viene prerenderizada)
export { domAnimation as default } from 'motion/react'
