/**
 * Lo que comparten los scripts de imágenes: la lista de archivos que el sitio
 * espera (leída de src/data/negocio.ts) y cómo escribir cada uno con sus
 * variantes para celular.
 *
 * Node 22.6+ puede importar el .ts directamente (quita los tipos al vuelo).
 */
import path from 'node:path'
import { negocio } from '../src/data/negocio.ts'

export const paleta = {
  barro: '#2a1714',
  barroClaro: '#52302a',
  terracota: '#a6462a',
  terracotaClara: '#c2603f',
  crema: '#f6ebd9',
  chile: '#c1272d',
  nopal: '#4c7a4a',
}

const calidadWebp = 76
const calidadJpg = 80

/**
 * Devuelve cada imagen de negocio.ts como:
 *  { base, archivo, ancho, alto, variantes, escribir(sharpInstance) }
 * `escribir` guarda el archivo principal y sus variantes en public/img.
 */
export function listaDeImagenes() {
  const todas = [
    negocio.imagenes.hero,
    negocio.imagenes.og,
    ...negocio.especialidades.map((e) => e.imagen),
    negocio.historia.imagen,
    ...negocio.galeria,
  ]
  return todas.map((img) => {
    const archivo = path.basename(img.src)
    const base = path.parse(archivo).name
    const esJpg = archivo.endsWith('.jpg')
    const variantes = (img.variantes ?? []).filter((w) => w < img.ancho)
    const destino = (nombre) => path.resolve('public/img', nombre)

    async function escribir(origen) {
      const principal = origen.clone().resize(img.ancho, img.alto, { fit: 'cover' })
      if (esJpg) {
        await principal.jpeg({ quality: calidadJpg, mozjpeg: true }).toFile(destino(archivo))
      } else {
        await principal.webp({ quality: calidadWebp }).toFile(destino(archivo))
      }
      for (const w of variantes) {
        const h = Math.round((img.alto / img.ancho) * w)
        await origen
          .clone()
          .resize(w, h, { fit: 'cover' })
          .webp({ quality: calidadWebp })
          .toFile(destino(`${base}-${w}w.webp`))
      }
    }

    return { base, archivo, ancho: img.ancho, alto: img.alto, variantes, escribir }
  })
}
