import { Footer } from '@/components/layout/Footer'
import { Header } from '@/components/layout/Header'
import { CintaA } from '@/components/marca/CintaA'
import { Intro } from '@/components/marca/Intro'
import { SelectorOpciones } from '@/components/marca/SelectorOpciones'
import { mostrarOpciones, usePatron } from '@/lib/opciones'
import { Contacto } from '@/sections/Contacto'
import { Cuando } from '@/sections/Cuando'
import { Hero } from '@/sections/Hero'
import { Metodologia } from '@/sections/Metodologia'
import { Servicios } from '@/sections/Servicios'
import { SobreMia } from '@/sections/SobreMia'

function App() {
  const patron = usePatron()

  return (
    <>
      <Intro />
      <Header />
      <main>
        <Hero />
        <SobreMia />
        <Cuando />
        <Servicios />
        <Metodologia />
        {patron === 'cinta' && <CintaA />}
        <Contacto />
      </main>
      <Footer />
      {mostrarOpciones && <SelectorOpciones />}
    </>
  )
}

export default App
