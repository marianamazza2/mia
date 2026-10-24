import { Header } from '@/components/layout/Header'
import { Contacto } from '@/sections/Contacto'
import { Hero } from '@/sections/Hero'
import { Metodologia } from '@/sections/Metodologia'
import { Servicios } from '@/sections/Servicios'
import { SobreMia } from '@/sections/SobreMia'

function App() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <SobreMia />
        <Servicios />
        <Metodologia />
        <Contacto />
      </main>
    </>
  )
}

export default App
