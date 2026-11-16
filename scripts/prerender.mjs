/**
 * Pre-renderiza la página a HTML estático después de `vite build`.
 * Así el contenido (nombre, menú, dirección…) llega escrito en index.html,
 * carga más rápido en celular y Google lo lee sin ejecutar JavaScript.
 *
 * Lo ejecuta `npm run build`; no hace falta correrlo a mano.
 */
import { readFile, rm, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'
import { build } from 'vite'

const dist = path.resolve('dist')
const distSsr = path.resolve('dist-ssr')

// 1. Build del lado servidor (solo para renderizar una vez).
await build({
  configFile: path.resolve('vite.config.ts'),
  logLevel: 'warn',
  build: { ssr: 'src/entry-server.tsx', outDir: distSsr, emptyOutDir: true },
})

// 2. Renderizar e inyectar en dist/index.html.
const { render } = await import(pathToFileURL(path.join(distSsr, 'entry-server.js')).href)
const html = await readFile(path.join(dist, 'index.html'), 'utf8')
const marcador = '<div id="root"></div>'
if (!html.includes(marcador)) throw new Error('No se encontró <div id="root"></div> en dist/index.html')
await writeFile(path.join(dist, 'index.html'), html.replace(marcador, `<div id="root">${render()}</div>`))

// 3. Limpiar.
await rm(distSsr, { recursive: true, force: true })
console.log('✓ index.html pre-renderizado')
