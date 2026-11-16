# Birriería Casa Don Goyo — sitio web

Sitio de una sola página para la birriería, hecho con React + Vite + TypeScript + Tailwind CSS + Framer Motion y desplegado en Vercel.

## Editar el contenido

**Todo el texto del negocio vive en un solo archivo: [`src/data/negocio.ts`](src/data/negocio.ts).**
Nombre, eslogan, dirección, teléfono, WhatsApp, horarios, menú con precios, historia, redes, coordenadas, fotos y la URL del sitio. Ningún componente lleva texto escrito a mano.

Lo que aún falta confirmar está marcado con `pendiente: true` o con un comentario `PENDIENTE` y lleva un valor de ejemplo. Al final del archivo hay una lista `pendientes` con todo lo que falta.

Cuando cambies `negocio.sitio.url` por el dominio final, el sitemap, el Open Graph y el JSON-LD se actualizan solos en el siguiente build.

## Reemplazar las fotos

Las imágenes de `public/img` son de relleno. Para poner las reales:

1. Pon tus fotos en una carpeta (por ejemplo `fotos-originales/`) con el **mismo nombre base** que la de relleno que reemplazan:
   - `hero-birria` (foto grande del platillo estrella)
   - `especialidad-birria`, `especialidad-carnitas`, `especialidad-pancita`
   - `nosotros-familia`
   - `galeria-01-birria-plato` … `galeria-06-local`
   - `og-casa-don-goyo` (la que se ve al compartir en WhatsApp)
2. Corre:
   ```bash
   npm run imagenes:optimizar -- fotos-originales/
   ```
   El script las recorta a la medida correcta, las convierte a WebP y genera las versiones chicas para celular.

Para volver a generar las de relleno: `npm run imagenes:relleno`.

## Comandos

```bash
npm install        # instalar dependencias
npm run dev        # servidor local en http://localhost:5173
npm run build      # build de producción en dist/ (incluye pre-render y sitemap)
npm run preview    # ver el build de producción
```

## Despliegue

El repositorio está conectado a Vercel: cada `git push` a `main` despliega a producción y cada rama abre una vista previa.

Para desplegar a mano:

```bash
npx vercel          # vista previa
npx vercel --prod   # producción
```

## SEO

- `<title>`, meta description, canonical, Open Graph y Twitter se generan desde `negocio.ts` en [`scripts/seo.ts`](scripts/seo.ts).
- JSON-LD tipo `Restaurant` con dirección, teléfono, horarios, coordenadas, cocina y menú.
- `sitemap.xml` y `robots.txt` se generan en cada build.
- La página se pre-renderiza a HTML estático ([`scripts/prerender.mjs`](scripts/prerender.mjs)), así que el contenido se lee sin JavaScript.
- Un solo `h1`, HTML semántico, `alt` en todas las imágenes, WebP con `srcset` y carga diferida.
