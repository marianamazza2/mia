import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { Intro } from '@/components/marca/Intro'
import { Contacto } from '@/sections/Contacto'
import { Cuando } from '@/sections/Cuando'
import { Hero } from '@/sections/Hero'
import { Metodologia } from '@/sections/Metodologia'
import { Servicios } from '@/sections/Servicios'
import { SobreMia } from '@/sections/SobreMia'
import { portada } from '@/lib/portada'

function App() {
  return (
    <>
      <Intro />
      <Header sobreFoto={portada.oscuro} />
      <main>
        <Hero />
        <SobreMia />
        <Cuando />
        <Servicios />
        <Metodologia />
        <Contacto />
      </main>
      <Footer />
    </>
  )
}

export default App
