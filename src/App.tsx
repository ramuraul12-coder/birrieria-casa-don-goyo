import { LazyMotion, domAnimation } from 'framer-motion'
import { Encabezado } from './components/Encabezado'
import { Especialidades } from './components/Especialidades'
import { Galeria } from './components/Galeria'
import { Hero } from './components/Hero'
import { Menu } from './components/Menu'
import { Nosotros } from './components/Nosotros'
import { PieDePagina } from './components/PieDePagina'
import { Ubicacion } from './components/Ubicacion'
import { WhatsAppFlotante } from './components/WhatsAppFlotante'

export default function App() {
  return (
    <LazyMotion features={domAnimation} strict>
      <Encabezado />
      <main>
        <Hero />
        <Especialidades />
        <Menu />
        <Nosotros />
        <Ubicacion />
        <Galeria />
      </main>
      <PieDePagina />
      <WhatsAppFlotante />
    </LazyMotion>
  )
}
