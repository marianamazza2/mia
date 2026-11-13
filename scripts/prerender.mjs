// Después de `vite build` (el sitio) y `vite build --ssr` (el render del servidor), escribe en cada HTML de
// dist el contenido ya renderizado. Si algo no coincide, corta el build: mejor fallar que publicar vacío
import { readFile, rm, writeFile } from 'node:fs/promises'
import { fileURLToPath } from 'node:url'

const raiz = fileURLToPath(new URL('..', import.meta.url))
const servidor = `${raiz}dist-ssr/entry-server.js`
const { renderInicio, renderLegal } = await import(servidor)

const paginas = [
  ['index.html', () => renderInicio()],
  ['aviso-legal.html', () => renderLegal('aviso-legal')],
  ['privacidad.html', () => renderLegal('privacidad')],
  ['cookies.html', () => renderLegal('cookies')],
]

const VACIO = '<div id="root"></div>'

for (const [archivo, render] of paginas) {
  const ruta = `${raiz}dist/${archivo}`
  const html = await readFile(ruta, 'utf8')
  if (!html.includes(VACIO)) throw new Error(`${archivo}: no encuentro ${VACIO}`)
  const contenido = render()
  if (!contenido) throw new Error(`${archivo}: el render salió vacío`)
  await writeFile(ruta, html.replace(VACIO, `<div id="root">${contenido}</div>`))
  console.log(`prerender: ${archivo} (${Math.round(contenido.length / 1024)} kB)`)
}

await rm(`${raiz}dist-ssr`, { recursive: true, force: true })
