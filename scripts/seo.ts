/**
 * Plugin de Vite que genera el SEO a partir de src/data/negocio.ts:
 *  - <title>, meta description, canonical, Open Graph y Twitter en index.html
 *  - JSON-LD tipo Restaurant (con menú y horarios)
 *  - sitemap.xml y robots.txt en el build
 *
 * Así, al cambiar la URL del sitio en negocio.ts, todo se actualiza solo.
 */
import type { HtmlTagDescriptor, Plugin } from 'vite'
import { negocio, srcSetDe } from '../src/data/negocio.ts'

const url = negocio.sitio.url.replace(/\/$/, '')
const absoluta = (ruta: string) => `${url}${ruta}`

export function jsonLdRestaurante() {
  const horarios = negocio.horarios
    .filter((h) => h.abre && h.cierra)
    .map((h) => ({
      '@type': 'OpeningHoursSpecification',
      dayOfWeek: h.dias,
      opens: h.abre,
      closes: h.cierra,
    }))

  const menu = {
    '@type': 'Menu',
    name: `Menú de ${negocio.nombreCorto}`,
    inLanguage: negocio.sitio.idioma,
    hasMenuSection: negocio.menu.categorias.map((c) => ({
      '@type': 'MenuSection',
      name: c.nombre,
      ...(c.descripcion ? { description: c.descripcion } : {}),
      hasMenuItem: c.platillos.map((p) => ({
        '@type': 'MenuItem',
        name: p.nombre,
        ...(p.descripcion ? { description: p.descripcion } : {}),
        offers: {
          '@type': 'Offer',
          price: p.precio,
          priceCurrency: 'MXN',
        },
      })),
    })),
  }

  const redes = negocio.redes.filter((r) => !r.pendiente).map((r) => r.url)

  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    '@id': `${url}/#restaurante`,
    name: negocio.nombre,
    alternateName: negocio.nombreCorto,
    description: negocio.descripcionCorta,
    url: `${url}/`,
    telephone: negocio.contacto.telefonoE164,
    image: [absoluta(negocio.imagenes.og.src), absoluta(negocio.imagenes.hero.src)],
    priceRange: '$',
    currenciesAccepted: 'MXN',
    servesCuisine: ['Mexicana', 'Birria', 'Carnitas'],
    address: {
      '@type': 'PostalAddress',
      streetAddress: negocio.direccion.calle,
      addressLocality: negocio.direccion.alcaldia,
      addressRegion: negocio.direccion.ciudad,
      postalCode: negocio.direccion.codigoPostal,
      addressCountry: negocio.direccion.pais,
    },
    areaServed: [negocio.direccion.colonia, negocio.direccion.alcaldia],
    geo: {
      '@type': 'GeoCoordinates',
      latitude: negocio.geo.lat,
      longitude: negocio.geo.lng,
    },
    hasMap: negocio.mapas.ficha,
    openingHoursSpecification: horarios,
    hasMenu: menu,
    acceptsReservations: 'False',
    ...(redes.length ? { sameAs: redes } : {}),
  }
}

export function etiquetasHead(): HtmlTagDescriptor[] {
  const og = absoluta(negocio.imagenes.og.src)
  const meta = (attrs: Record<string, string>): HtmlTagDescriptor => ({
    tag: 'meta',
    attrs,
    injectTo: 'head',
  })
  const hero = negocio.imagenes.hero
  const heroSrcSet = srcSetDe(hero)
  return [
    { tag: 'title', children: negocio.seo.titulo, injectTo: 'head' },
    // Precarga de la foto del hero (elemento más grande de la primera pantalla).
    {
      tag: 'link',
      attrs: {
        rel: 'preload',
        as: 'image',
        href: hero.src,
        fetchpriority: 'high',
        ...(heroSrcSet ? { imagesrcset: heroSrcSet, imagesizes: '100vw' } : {}),
      },
      injectTo: 'head',
    },
    meta({ name: 'description', content: negocio.seo.descripcion }),
    meta({ name: 'keywords', content: negocio.seo.palabrasClave.join(', ') }),
    meta({ name: 'geo.region', content: 'MX-CMX' }),
    meta({ name: 'geo.placename', content: `${negocio.direccion.colonia}, ${negocio.direccion.alcaldia}` }),
    meta({ name: 'geo.position', content: `${negocio.geo.lat};${negocio.geo.lng}` }),
    meta({ name: 'ICBM', content: `${negocio.geo.lat}, ${negocio.geo.lng}` }),
    { tag: 'link', attrs: { rel: 'canonical', href: `${url}/` }, injectTo: 'head' },
    meta({ property: 'og:type', content: 'restaurant.restaurant' }),
    meta({ property: 'og:site_name', content: negocio.nombre }),
    meta({ property: 'og:locale', content: negocio.sitio.idioma.replace('-', '_') }),
    meta({ property: 'og:title', content: negocio.seo.titulo }),
    meta({ property: 'og:description', content: negocio.seo.descripcion }),
    meta({ property: 'og:url', content: `${url}/` }),
    meta({ property: 'og:image', content: og }),
    meta({ property: 'og:image:secure_url', content: og }),
    meta({ property: 'og:image:type', content: 'image/jpeg' }),
    meta({ property: 'og:image:width', content: String(negocio.imagenes.og.ancho) }),
    meta({ property: 'og:image:height', content: String(negocio.imagenes.og.alto) }),
    meta({ property: 'og:image:alt', content: negocio.imagenes.og.alt }),
    meta({ property: 'place:location:latitude', content: String(negocio.geo.lat) }),
    meta({ property: 'place:location:longitude', content: String(negocio.geo.lng) }),
    meta({ name: 'twitter:card', content: 'summary_large_image' }),
    meta({ name: 'twitter:title', content: negocio.seo.titulo }),
    meta({ name: 'twitter:description', content: negocio.seo.descripcion }),
    meta({ name: 'twitter:image', content: og }),
    {
      tag: 'script',
      attrs: { type: 'application/ld+json' },
      children: JSON.stringify(jsonLdRestaurante()),
      injectTo: 'head',
    },
  ]
}

export function sitemapXml() {
  const hoy = new Date().toISOString().slice(0, 10)
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:image="http://www.google.com/schemas/sitemap-image/1.1">
  <url>
    <loc>${url}/</loc>
    <lastmod>${hoy}</lastmod>
    <changefreq>monthly</changefreq>
    <priority>1.0</priority>
    <image:image>
      <image:loc>${absoluta(negocio.imagenes.hero.src)}</image:loc>
      <image:title>${negocio.nombre}</image:title>
    </image:image>
  </url>
</urlset>
`
}

export function robotsTxt() {
  return `User-agent: *
Allow: /

Sitemap: ${url}/sitemap.xml
`
}

export function seoPlugin(): Plugin {
  return {
    name: 'seo-negocio',
    transformIndexHtml: {
      order: 'pre',
      handler(html) {
        return {
          html: html.replace('<html lang="en">', `<html lang="${negocio.sitio.idioma}">`),
          tags: etiquetasHead(),
        }
      },
    },
    generateBundle() {
      this.emitFile({ type: 'asset', fileName: 'sitemap.xml', source: sitemapXml() })
      this.emitFile({ type: 'asset', fileName: 'robots.txt', source: robotsTxt() })
    },
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (req.url === '/sitemap.xml') {
          res.setHeader('Content-Type', 'application/xml')
          res.end(sitemapXml())
          return
        }
        if (req.url === '/robots.txt') {
          res.setHeader('Content-Type', 'text/plain')
          res.end(robotsTxt())
          return
        }
        next()
      })
    },
  }
}
