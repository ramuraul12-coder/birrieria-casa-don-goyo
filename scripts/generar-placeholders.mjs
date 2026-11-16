/**
 * Genera imágenes de RELLENO en public/img con los nombres y medidas que
 * declara src/data/negocio.ts (incluidas las variantes para celular).
 * Cuando tengas fotos reales, pásalas por `npm run imagenes:optimizar`.
 *
 *   npm run imagenes:relleno
 */
import sharp from 'sharp'
import { mkdir } from 'node:fs/promises'
import path from 'node:path'
import { listaDeImagenes, paleta } from './imagenes-comunes.mjs'

const salida = path.resolve('public')
await mkdir(path.join(salida, 'img'), { recursive: true })

/** SVG decorativo: fondo cálido, "plato" y una etiqueta con el nombre del archivo. */
function svgRelleno({ ancho, alto, titulo, archivo, tono }) {
  const colores = {
    terracota: [paleta.terracotaClara, paleta.barro],
    barro: [paleta.barroClaro, paleta.barro],
    chile: [paleta.chile, paleta.barro],
    nopal: [paleta.nopal, paleta.barro],
  }[tono]
  const r = Math.min(ancho, alto) * 0.3
  const cx = ancho * 0.62
  const cy = alto * 0.48
  const fuente = Math.round(Math.min(ancho, alto) * 0.085)
  const fuenteChica = Math.round(Math.min(ancho, alto) * 0.032)
  return `
<svg xmlns="http://www.w3.org/2000/svg" width="${ancho}" height="${alto}" viewBox="0 0 ${ancho} ${alto}">
  <defs>
    <radialGradient id="g" cx="30%" cy="20%" r="90%">
      <stop offset="0" stop-color="${colores[0]}"/>
      <stop offset="1" stop-color="${colores[1]}"/>
    </radialGradient>
    <radialGradient id="p" cx="45%" cy="40%" r="60%">
      <stop offset="0" stop-color="#8a2f1e"/>
      <stop offset="1" stop-color="#4a1a12"/>
    </radialGradient>
  </defs>
  <rect width="${ancho}" height="${alto}" fill="url(#g)"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="${paleta.crema}" opacity="0.95"/>
  <circle cx="${cx}" cy="${cy}" r="${r * 0.78}" fill="url(#p)"/>
  <circle cx="${cx - r * 0.25}" cy="${cy - r * 0.2}" r="${r * 0.12}" fill="${paleta.nopal}" opacity="0.9"/>
  <circle cx="${cx + r * 0.2}" cy="${cy + r * 0.15}" r="${r * 0.09}" fill="${paleta.crema}" opacity="0.8"/>
  <text x="${ancho * 0.06}" y="${alto * 0.88}" font-family="Georgia, serif" font-size="${fuente}" fill="${paleta.crema}" font-weight="600">${titulo}</text>
  <text x="${ancho * 0.06}" y="${alto * 0.94}" font-family="Arial, sans-serif" font-size="${fuenteChica}" fill="${paleta.crema}" opacity="0.75">FOTO DE RELLENO · reemplazar por ${archivo}</text>
</svg>`
}

/** Título corto y tono por archivo (solo para que el relleno se vea variado). */
const decoracion = {
  'hero-birria': ['Birria', 'barro'],
  'especialidad-birria': ['Birria', 'chile'],
  'especialidad-carnitas': ['Carnitas', 'terracota'],
  'especialidad-pancita': ['Pancita', 'barro'],
  'nosotros-familia': ['La familia', 'terracota'],
  'galeria-01-birria-plato': ['Birria', 'chile'],
  'galeria-02-carnitas-cazo': ['Carnitas', 'terracota'],
  'galeria-03-pancita-olla': ['Pancita', 'barro'],
  'galeria-04-tacos': ['Tacos', 'nopal'],
  'galeria-05-chocolate': ['Chocolate', 'barro'],
  'galeria-06-local': ['El local', 'terracota'],
  'og-casa-don-goyo': ['Birriería Casa Don Goyo', 'chile'],
}

for (const img of listaDeImagenes()) {
  const [titulo, tono] = decoracion[img.base] ?? [img.base, 'terracota']
  const svg = Buffer.from(
    svgRelleno({ ancho: img.ancho, alto: img.alto, titulo, archivo: img.archivo, tono }),
  )
  await img.escribir(sharp(svg))
  console.log('✓', img.archivo, img.variantes.length ? `(+${img.variantes.length} variantes)` : '')
}

// Icono para iPhone (180×180) a partir del favicon.
const favicon = `
<svg xmlns="http://www.w3.org/2000/svg" width="180" height="180" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="14" fill="${paleta.barro}"/>
  <circle cx="32" cy="32" r="20" fill="${paleta.crema}"/>
  <circle cx="32" cy="32" r="15" fill="${paleta.chile}"/>
  <circle cx="27" cy="29" r="3" fill="${paleta.nopal}"/>
  <circle cx="36" cy="35" r="2.2" fill="${paleta.crema}"/>
</svg>`
await sharp(Buffer.from(favicon)).png().toFile(path.join(salida, 'apple-touch-icon.png'))
console.log('✓ apple-touch-icon.png')
