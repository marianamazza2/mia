import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/inter/wght.css'
import { MotionConfig } from 'motion/react'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { marcarIntroLista } from '@/lib/intro'
import '../index.css'
import type { IdDocumento } from './documentos'
import { PaginaLegal } from './PaginaLegal'

// Entrada de las páginas legales: cada HTML indica su documento en <body data-documento="…">
const id = document.body.dataset.documento as IdDocumento

// Estas páginas no tienen intro: el header aparece de entrada
marcarIntroLista()

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <MotionConfig reducedMotion="user">
      <PaginaLegal id={id} />
    </MotionConfig>
  </StrictMode>,
)
