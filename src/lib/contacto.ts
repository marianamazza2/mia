// Datos de contacto de Mía (tomados de la papelería del manual de marca)
const telefono = '+34610227804'
const mensajeWhatsApp = 'Hola, me gustaría saber más sobre el acompañamiento de Mía.'
const direccion = 'Avinguda Diagonal 534, entresuelo izquierda, 08006 Barcelona'

// Titular del sitio para las páginas legales. Lo marcado entre corchetes falta confirmarlo con Marina.
export const titular = {
  nombre: 'Marina Elena Nicolai',
  nombreComercial: 'Mía',
  nif: '[NIF pendiente]',
  dominio: 'miaconsultora.es',
  actividad: 'consultoría organizacional y acompañamiento a la dirección de empresas',
}

export const contacto = {
  email: 'contacto@miaconsultora.es',
  telefono,
  telefonoVisible: '+34 610 227 804',
  whatsapp: `https://wa.me/${telefono.replace('+', '')}?text=${encodeURIComponent(mensajeWhatsApp)}`,
  direccion,
  mapa: `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(direccion)}`,
}
