/**
 * Convierte fotos reales a WebP con las medidas y variantes que espera el
 * sitio, para reemplazar las de relleno sin tocar el código.
 *
 *   npm run imagenes:optimizar -- fotos-originales/
 *
 * Pon en esa carpeta las fotos con el MISMO nombre base que en public/img
 * (p. ej. hero-birria.jpg, galeria-01-birria-plato.png). El script las
 * recorta/redimensiona a las medidas de negocio.ts y genera las variantes.
 * Los nombres que no reconozca los omite y te lo dice.
 */
import sharp from 'sharp'
import { readdir } from 'node:fs/promises'
import path from 'node:path'
import { listaDeImagenes } from './imagenes-comunes.mjs'

const origen = process.argv[2]
if (!origen) {
  console.error('Uso: npm run imagenes:optimizar -- <carpeta-con-fotos>')
  process.exit(1)
}

const esperadas = new Map(listaDeImagenes().map((img) => [img.base, img]))
let hechas = 0

for (const archivo of await readdir(origen)) {
  const base = path.parse(archivo).name
  const img = esperadas.get(base)
  if (!img) {
    console.log('· omitido (nombre no reconocido):', archivo)
    continue
  }
  await img.escribir(sharp(path.join(origen, archivo)).rotate())
  console.log('✓', img.archivo)
  hechas++
}

console.log(`\n${hechas} imagen(es) optimizadas. Nombres esperados:`)
for (const base of esperadas.keys()) console.log('  -', base)
