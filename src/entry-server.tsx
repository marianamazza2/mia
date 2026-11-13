import { renderToString } from 'react-dom/server'
import type { IdDocumento } from '@/legal/documentos'
import { RaizLegal } from '@/legal/RaizLegal'
import { RaizInicio } from '@/RaizInicio'

// Prerender: al compilar, scripts/prerender.mjs llama a estas funciones y escribe el HTML resultante dentro
// de <div id="root"> de cada página. Así el contenido llega en el HTML, sin esperar al JavaScript

export function renderInicio() {
  return renderToString(<RaizInicio />)
}

export function renderLegal(id: IdDocumento) {
  return renderToString(<RaizLegal id={id} />)
}
