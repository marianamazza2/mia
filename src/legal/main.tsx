import '@fontsource-variable/cormorant-garamond/wght.css'
import '@fontsource-variable/inter/wght.css'
import '../index.css'
import { marcarIntroLista } from '@/lib/intro'
import { montar } from '@/lib/montar'
import { RaizLegal } from './RaizLegal'
import type { IdDocumento } from './documentos'

// Entrada de las páginas legales: cada HTML indica su documento en <body data-documento="…">
const id = document.body.dataset.documento as IdDocumento

// Estas páginas no tienen intro: el header aparece de entrada
marcarIntroLista()

montar(<RaizLegal id={id} />)
