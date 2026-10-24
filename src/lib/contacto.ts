// Datos de contacto de Mía (tomados de la papelería del manual de marca)
const telefono = '+34610227804'
const mensajeWhatsApp = 'Hola, me gustaría saber más sobre el acompañamiento de Mía.'
const direccion = 'Avinguda Diagonal 534, entresuelo izquierda, 08006 Barcelona'

export const contacto = {
  email: 'contacto@miaconsultora.es',
  telefono,
  telefonoVisible: '+34 610 227 804',
  whatsapp: `https://wa.me/${telefono.replace('+', '')}?text=${encodeURIComponent(mensajeWhatsApp)}`,
  direccion,
  mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`,
}
