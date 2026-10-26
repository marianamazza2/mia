import { motion } from 'motion/react'
import aBurdeos from '@/assets/brand/a_mia_burdeos.svg'
import marina from '@/assets/images/equipo-marina.webp'
import { Reveal } from '@/components/motion/Reveal'
import { Picture } from '@/components/ui/Picture'
import { cn } from '@/lib/cn'
import { easeSuave } from '@/lib/motion'

type Persona = {
  nombre: string
  rol: string
  /** Retrato en WebP. Mientras falte, se muestra un lugar reservado con la «a» */
  foto?: string
}

// Pendiente: foto, nombre y rol de la segunda persona (confirmar con Marina)
const equipo: Persona[] = [
  { nombre: 'Marina Elena Nicolai', rol: 'Fundadora · Directora', foto: marina },
  { nombre: 'Nombre y apellido', rol: 'Rol en Mía' },
]

// Los retratos de quienes están detrás de Mía, el segundo desfasado hacia abajo como en una revista.
// Se usan dentro de «La mirada de Mía».
export function Retratos({ className }: { className?: string }) {
  return (
    <ul className={cn('grid grid-cols-2 gap-4 sm:gap-8 lg:gap-10', className)}>
      {equipo.map((persona, i) => (
        <li key={persona.nombre} className={i === 1 ? 'mt-14 lg:mt-28' : undefined}>
          <Retrato persona={persona} delay={i * 0.2} />
          <Reveal delay={0.3 + i * 0.2}>
            <p className="mt-5 font-serif text-[1.375rem] leading-tight font-medium lg:mt-6 lg:text-[1.75rem]">
              {persona.nombre}
            </p>
            <p className="etiqueta mt-3 flex items-center gap-3 text-[0.625rem] text-burdeos lg:text-[0.6875rem]">
              <span aria-hidden className="h-px w-6 shrink-0 bg-dorado" />
              {persona.rol}
            </p>
          </Reveal>
        </li>
      ))}
    </ul>
  )
}

// Retrato vertical con esquinas suaves que se descubre de abajo hacia arriba al entrar en pantalla
function Retrato({ persona, delay }: { persona: Persona; delay: number }) {
  return (
    // El observador va en el contenedor: con el recorte al 100 % el navegador lo da por invisible
    <motion.div
      className="relative aspect-[4/5]"
      initial="oculto"
      whileInView="visible"
      viewport={{ once: true, margin: '0px 0px -15% 0px' }}
    >
      <motion.div
        className="absolute inset-0 overflow-hidden rounded-[10px] bg-[#ebe6de]"
        variants={{ oculto: { clipPath: 'inset(100% 0 0 0)' }, visible: { clipPath: 'inset(0% 0 0 0)' } }}
        transition={{ duration: 1.6, ease: easeSuave, delay }}
      >
        {persona.foto ? (
          <motion.div
            className="size-full"
            variants={{ oculto: { scale: 1.15 }, visible: { scale: 1 } }}
            transition={{ duration: 2.2, ease: easeSuave, delay }}
          >
            <Picture src={persona.foto} alt={`Retrato de ${persona.nombre}`} loading="lazy" className="size-full object-cover object-top" />
          </motion.div>
        ) : (
          // Lugar reservado hasta tener la foto: la «a» de la marca, muy tenue
          <div className="flex size-full flex-col items-center justify-center gap-4">
            <img src={aBurdeos} alt="" className="w-1/3 opacity-[0.12]" />
            <span className="etiqueta text-[0.5625rem] text-negro/35">Retrato</span>
          </div>
        )}
      </motion.div>
    </motion.div>
  )
}
