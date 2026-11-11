import esfera from '@/assets/images/hero-esfera.webp'
import llave from '@/assets/images/hero-llave.webp'
import llaveCinta from '@/assets/images/hero-llave-cinta.webp'
import llaveCintaMobile from '@/assets/images/hero-llave-cinta-mobile.webp'
import seda from '@/assets/images/hero-seda.webp'
import velo from '@/assets/images/hero-velo.webp'
import llaveCintaVideo from '@/assets/video/hero-llave-cinta.mp4'

// Fondos probados para la portada. «oscuro» decide el resto: texto en crema y header en negativo
// sobre la seda; texto oscuro y header normal sobre los fondos claros.
// «suavizado»: velo crema parejo sobre la imagen clara (vacío = la imagen tal cual)
// «base»: color detrás de la imagen; si la imagen se corre, es lo que se ve en el hueco
type Fondo = {
  src: string
  /** Versión vertical para mobile (hasta 1023 px): el celular descarga solo esta */
  srcMobile?: string
  /** Película de la portada, solo en desktop: termina en la misma composición que la foto, así que al
   *  final se funde con ella sin que se note el corte. Sin esto, el hero queda con la foto fija */
  video?: string
  oscuro: boolean
  encuadre: string
  suavizado: string
  base: string
}

const fondos = {
  seda: { src: seda, oscuro: true, encuadre: 'object-[62%_center] lg:object-center', suavizado: '', base: 'bg-burdeos' },
  // La imagen es más ancha que la pantalla, así que «object-position» no la mueve en vertical: se agranda
  // un 20 % y se sube la mitad de eso, de modo que la onda queda más arriba sin dejar un hueco abajo
  velo: {
    src: velo,
    oscuro: false,
    encuadre: 'object-[30%_center] lg:object-center -translate-y-[10%] scale-[1.2]',
    suavizado: 'bg-crema/55',
    base: 'bg-crema',
  },
  // La esfera burdeos va a la derecha: deja libre la izquierda para el texto. En mobile se corre el encuadre
  // para que la esfera siga a la vista
  esfera: { src: esfera, oscuro: false, encuadre: 'object-[80%_center] lg:object-[center_60%]', suavizado: '', base: 'bg-crema' },
  // La llave, la esfera y la cinta burdeos a la derecha; la izquierda queda libre para el texto. En mobile se
  // corre el encuadre para que la llave siga a la vista. En desktop la imagen se ajusta por la altura, anclada a
  // la derecha (la llave queda siempre a unos 300 px del borde), y se corre 8rem hacia la derecha: los objetos
  // se alejan del texto sin perderse en pantallas más angostas. El hueco de la izquierda es la «base», el gris de
  // la pared, y el borde de la imagen se funde con él
  llave: {
    src: llave,
    oscuro: false,
    encuadre:
      'object-[78%_center] lg:translate-x-32 lg:object-right lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]',
    suavizado: '',
    base: 'bg-[#e3dfde]',
  },
  // Variante más oscura: la llave apoyada en la tela y la cinta que sube por la columna. Mismo tratamiento que
  // «llave»; la base es el gris de la pared a la izquierda. En mobile va su versión vertical, por detrás del texto:
  // corrida a la derecha y bastante hacia abajo (un 15 % de su alto), para que la llave y la esfera queden más
  // abajo que el párrafo. El hueco de arriba es la «base», un gris como el de la pared, y el borde se funde con él
  llaveCinta: {
    src: llaveCinta,
    srcMobile: llaveCintaMobile,
    video: llaveCintaVideo,
    oscuro: false,
    encuadre:
      'object-[0%_bottom] translate-y-[15%] [mask-image:linear-gradient(to_bottom,transparent,black_18%)] lg:translate-x-32 lg:translate-y-0 lg:object-right lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]',
    suavizado: '',
    base: 'bg-[#aca6a3] lg:bg-[#d0ccc9]',
  },
} satisfies Record<string, Fondo>

// Para cambiar de fondo: fondos.seda, fondos.velo, fondos.esfera, fondos.llave o fondos.llaveCinta
export const portada: Fondo = fondos.llaveCinta
