import llaveCinta from '@/assets/images/hero-llave-cinta.webp'
import llaveCintaMobile from '@/assets/images/hero-llave-cinta-mobile.webp'
import llaveCintaVideo from '@/assets/video/hero-llave-cinta.mp4'
import llaveCintaVideoWebm from '@/assets/video/hero-llave-cinta.webm'
import llaveCintaVideoMovilMp4 from '@/assets/video/hero-llave-cinta-mobile.mp4'
import llaveCintaVideoMovilWebm from '@/assets/video/hero-llave-cinta-mobile.webm'

// Una película en sus dos formatos. El navegador se queda con el primero que sepa reproducir: el WebM pesa
// bastante menos y lo entienden casi todos, y el MP4 queda de respaldo para los que no
type Pelicula = {
  webm?: string
  mp4: string
}

// La portada. «oscuro» decide el resto: con una imagen oscura, el texto va en crema y el header en negativo.
// «suavizado»: velo crema parejo sobre la imagen (vacío = la imagen tal cual).
// «base»: color detrás de la imagen; si la imagen se corre, es lo que se ve en el hueco
type Fondo = {
  src: string
  /** Versión vertical para mobile (hasta 1023 px): el celular descarga solo esta */
  srcMobile?: string
  /** Película de la portada: termina en la misma composición que la foto, así que al final se funde con
   *  ella sin que se note el corte. Sin esto, el hero queda con la foto fija */
  video?: Pelicula
  /** Versión vertical, para mobile: la apaisada recortada a lo alto dejaría los objetos fuera de cuadro */
  videoMovil?: Pelicula
  oscuro: boolean
  encuadre: string
  suavizado: string
  base: string
}

// La llave apoyada en la tela y la cinta que sube por la columna, a la derecha; la izquierda queda libre para
// el texto. En desktop la imagen se ajusta por la altura, anclada a la derecha, y se corre 8rem hacia la
// derecha: los objetos se alejan del texto sin perderse en pantallas más angostas. En mobile va su versión
// vertical, por detrás del texto: corrida a la derecha y bastante hacia abajo (un 15 % de su alto), para que
// la llave y la esfera queden más abajo que el párrafo. El hueco que deja el corrimiento es la «base», un
// gris como el de la pared, y el borde de la imagen se funde con él
export const portada: Fondo = {
  src: llaveCinta,
  srcMobile: llaveCintaMobile,
  video: { webm: llaveCintaVideoWebm, mp4: llaveCintaVideo },
  videoMovil: { webm: llaveCintaVideoMovilWebm, mp4: llaveCintaVideoMovilMp4 },
  oscuro: false,
  encuadre:
    'object-[0%_bottom] translate-y-[15%] [mask-image:linear-gradient(to_bottom,transparent,black_18%)] lg:translate-x-32 lg:translate-y-0 lg:object-right lg:[mask-image:linear-gradient(to_right,transparent,black_18%)]',
  suavizado: '',
  base: 'bg-[#aca6a3] lg:bg-[#d0ccc9]',
}
