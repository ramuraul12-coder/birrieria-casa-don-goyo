/**
 * ÚNICO archivo de contenido del sitio.
 * Todo lo que ve la gente (textos, teléfonos, horarios, menú, fotos, redes)
 * se edita aquí. Ningún componente lleva texto del negocio escrito a mano.
 *
 * Lo que aún no está confirmado lleva `pendiente: true` o un comentario
 * "PENDIENTE" y un valor de ejemplo para que el sitio se vea completo.
 */

/* ---------- Tipos ---------- */

export type Imagen = {
  /** Ruta dentro de /public. Reemplaza el archivo conservando el nombre. */
  src: string
  alt: string
  ancho: number
  alto: number
  /**
   * Anchos (px) de las versiones reducidas que se sirven en celular,
   * nombradas `archivo-800w.webp`, etc. Las generan los scripts de imágenes.
   */
  variantes?: number[]
}

/** Atributo srcset de una imagen a partir de sus variantes. */
export function srcSetDe(img: Imagen): string | undefined {
  if (!img.variantes?.length) return undefined
  const base = img.src.replace(/\.(webp|jpg|png)$/, '')
  return img.variantes
    .map((w) => (w >= img.ancho ? `${img.src} ${img.ancho}w` : `${base}-${w}w.webp ${w}w`))
    .join(', ')
}

export type Platillo = {
  nombre: string
  descripcion?: string
  /** Precio en pesos mexicanos. */
  precio: number
  /** Etiqueta corta opcional, p. ej. "Favorito" o "Para llevar". */
  etiqueta?: string
}

export type CategoriaMenu = {
  id: string
  nombre: string
  descripcion?: string
  platillos: Platillo[]
}

export type Especialidad = {
  id: string
  nombre: string
  descripcion: string
  imagen: Imagen
}

/** Días en inglés porque así los pide schema.org para el JSON-LD. */
export type DiaSemana =
  | 'Monday'
  | 'Tuesday'
  | 'Wednesday'
  | 'Thursday'
  | 'Friday'
  | 'Saturday'
  | 'Sunday'

export type Horario = {
  dias: DiaSemana[]
  etiqueta: string
  /** Formato 24 h "HH:MM". `null` = cerrado. */
  abre: string | null
  cierra: string | null
}

export type RedSocial = {
  nombre: 'Facebook' | 'Instagram' | 'TikTok'
  url: string
  /** Si es true, no se muestra en el sitio. */
  pendiente: boolean
}

/* ---------- Horarios ---------- */

const horarios: Horario[] = [
  { dias: ['Saturday'], etiqueta: 'Sábado', abre: '10:00', cierra: '18:00' },
  { dias: ['Sunday'], etiqueta: 'Domingo', abre: '09:00', cierra: '18:00' },
  {
    dias: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
    etiqueta: 'Lunes a viernes',
    abre: null,
    cierra: null,
  },
]

/* ---------- Especialidades ---------- */

const especialidades: Especialidad[] = [
  {
    id: 'birria',
    nombre: 'Birria',
    descripcion:
      'Carne suave que se deshace, cocida horas en su adobo de chiles. Se sirve en plato o en tacos, con su consomé para despertar.',
    imagen: {
      src: '/img/especialidad-birria.webp',
      alt: 'Plato de birria de Casa Don Goyo con consomé, cebolla y cilantro',
      ancho: 900,
      alto: 675,
      variantes: [480, 900],
    },
  },
  {
    id: 'carnitas',
    nombre: 'Carnitas',
    descripcion:
      'Doradas por fuera y jugosas por dentro, confitadas en cazo de cobre. Pide maciza, surtida o tu parte favorita, por kilo o en taco.',
    imagen: {
      src: '/img/especialidad-carnitas.webp',
      alt: 'Carnitas recién salidas del cazo, picadas sobre tabla de madera',
      ancho: 900,
      alto: 675,
      variantes: [480, 900],
    },
  },
  {
    id: 'pancita',
    nombre: 'Pancita',
    descripcion:
      'Caldo rojo, espeso y bien sazonado, de los que curan todo. Con su orégano, cebolla, limón y chile de árbol al gusto.',
    imagen: {
      src: '/img/especialidad-pancita.webp',
      alt: 'Plato hondo de pancita con orégano, cebolla y limón',
      ancho: 900,
      alto: 675,
      variantes: [480, 900],
    },
  },
]

/* ---------- Menú ---------- */
// PENDIENTE: menú real con precios. Todo lo de abajo es de EJEMPLO.

const categoriasMenu: CategoriaMenu[] = [
  {
    id: 'birria',
    nombre: 'Birria',
    descripcion: 'De res, cocida a fuego lento desde la madrugada.',
    platillos: [
      { nombre: 'Taco de birria', precio: 25 },
      { nombre: 'Taco dorado de birria', descripcion: 'Con queso, para mojar en consomé', precio: 30 },
      {
        nombre: 'Plato de birria',
        descripcion: 'Con consomé, tortillas, cebolla y cilantro',
        precio: 130,
        etiqueta: 'Favorito',
      },
      { nombre: 'Consomé', precio: 35 },
      { nombre: 'Birria por kilo', descripcion: 'Para llevar, con consomé', precio: 420 },
    ],
  },
  {
    id: 'carnitas',
    nombre: 'Carnitas',
    descripcion: 'Maciza, surtida, costilla, buche, cueritos, trompa.',
    platillos: [
      { nombre: 'Taco de carnitas', precio: 25 },
      { nombre: 'Cuarto de kilo', precio: 110 },
      { nombre: 'Medio kilo', precio: 210 },
      {
        nombre: 'Kilo de carnitas',
        descripcion: 'Incluye tortillas y salsas',
        precio: 400,
        etiqueta: 'Para la familia',
      },
    ],
  },
  {
    id: 'pancita',
    nombre: 'Pancita',
    platillos: [
      { nombre: 'Plato de pancita', precio: 90 },
      { nombre: 'Pancita con pata', precio: 100 },
      { nombre: 'Pancita por litro', descripcion: 'Para llevar', precio: 160 },
    ],
  },
  {
    id: 'bebidas',
    nombre: 'Bebidas',
    platillos: [
      { nombre: 'Chocolate caliente', descripcion: 'Batido con molinillo', precio: 35, etiqueta: 'De la casa' },
      { nombre: 'Café de olla', precio: 25 },
      { nombre: 'Agua fresca del día', precio: 25 },
      { nombre: 'Refresco', precio: 25 },
    ],
  },
  {
    id: 'extras',
    nombre: 'Extras',
    platillos: [
      { nombre: 'Orden de tortillas hechas a mano', precio: 15 },
      { nombre: 'Salsa para llevar', precio: 20 },
    ],
  },
]

/* ---------- Galería ---------- */
// PENDIENTE: fotos reales del local. Reemplaza los archivos en /public/img conservando el nombre.

const cuadrada = { ancho: 800, alto: 800, variantes: [400, 800] }
const galeria: Imagen[] = [
  { src: '/img/galeria-01-birria-plato.webp', alt: 'Plato de birria servido con consomé', ...cuadrada },
  { src: '/img/galeria-02-carnitas-cazo.webp', alt: 'Cazo de cobre con carnitas friéndose', ...cuadrada },
  { src: '/img/galeria-03-pancita-olla.webp', alt: 'Olla de pancita humeante', ...cuadrada },
  { src: '/img/galeria-04-tacos.webp', alt: 'Tacos de birria con cebolla y cilantro', ...cuadrada },
  { src: '/img/galeria-05-chocolate.webp', alt: 'Taza de chocolate caliente batido con molinillo', ...cuadrada },
  { src: '/img/galeria-06-local.webp', alt: 'Fachada de Birriería Casa Don Goyo', ...cuadrada },
]

/* ---------- Redes ---------- */
// PENDIENTE: enlaces reales. Las que tengan `pendiente: true` no se muestran.

const redes: RedSocial[] = [
  { nombre: 'Facebook', url: 'https://www.facebook.com/', pendiente: true },
  { nombre: 'Instagram', url: 'https://www.instagram.com/', pendiente: true },
  { nombre: 'TikTok', url: 'https://www.tiktok.com/', pendiente: true },
]

/* ---------- Imágenes principales ---------- */

const imagenes: { hero: Imagen; og: Imagen } = {
  hero: {
    src: '/img/hero-birria.webp',
    alt: 'Plato de birria de Casa Don Goyo, el platillo estrella',
    ancho: 1600,
    alto: 1067,
    variantes: [800, 1200, 1600],
  },
  /** Imagen para WhatsApp y redes (Open Graph). 1200×630, JPG. */
  og: {
    src: '/img/og-casa-don-goyo.jpg',
    alt: 'Birriería Casa Don Goyo: birria, carnitas y pancita',
    ancho: 1200,
    alto: 630,
  },
}

/* ---------- El negocio ---------- */

export const negocio = {
  nombre: 'Birriería Casa Don Goyo',
  nombreCorto: 'Casa Don Goyo',
  tipo: 'Birriería y fonda mexicana',
  // PENDIENTE: eslogan oficial. Valor de ejemplo:
  eslogan: 'Birria de fin de semana, como se hace en casa',
  esloganPendiente: true,
  descripcionCorta:
    'Birriería de barrio en San Jerónimo Aculco, Magdalena Contreras. Birria, carnitas y pancita hechas a fuego lento, sábados y domingos.',

  sitio: {
    /**
     * PENDIENTE: dominio final. Mientras tanto, la URL de Vercel.
     * Se usa en el sitemap, el Open Graph y el JSON-LD. Al conectar el
     * dominio, cambia solo esta línea (sin diagonal al final).
     */
    url: 'https://birrieria-casa-don-goyo.vercel.app',
    urlPendiente: true,
    idioma: 'es-MX',
  },

  seo: {
    titulo: 'Birria, carnitas y pancita en San Jerónimo Aculco | Birriería Casa Don Goyo',
    descripcion:
      'Birriería Casa Don Goyo: birria, carnitas y pancita en San Jerónimo Aculco, Magdalena Contreras, CDMX. Abrimos sábados y domingos. Pide por WhatsApp o ven a desayunar.',
    palabrasClave: [
      'birria',
      'carnitas',
      'pancita',
      'birriería',
      'San Jerónimo Aculco',
      'Magdalena Contreras',
      'CDMX',
    ],
  },

  contacto: {
    telefono: '55 2709 9782',
    telefonoE164: '+525527099782',
    whatsapp: {
      // PENDIENTE: confirmar que este número tiene WhatsApp. Se usa el teléfono del local.
      numero: '525527099782',
      pendiente: true,
      mensaje: 'Hola, vi su página y quiero hacer un pedido.',
    },
    // PENDIENTE: correo del negocio (opcional). Déjalo vacío si no hay.
    email: '',
  },

  direccion: {
    calle: 'Alvarado esq. 19 de Agosto',
    colonia: 'San Jerónimo Aculco',
    alcaldia: 'La Magdalena Contreras',
    codigoPostal: '10400',
    ciudad: 'Ciudad de México',
    estado: 'CDMX',
    pais: 'MX',
    // PENDIENTE: referencia para llegar. Valor de ejemplo:
    referencia: 'A unos pasos del mercado, sobre Alvarado.',
    referenciaPendiente: true,
  },

  geo: {
    lat: 19.3201482,
    lng: -99.2263558,
  },

  mapas: {
    comoLlegar: 'https://www.google.com/maps/dir/?api=1&destination=19.3201482,-99.2263558',
    embed: 'https://www.google.com/maps?q=19.3201482,-99.2263558&z=17&hl=es&output=embed',
    // PENDIENTE: enlace directo a la ficha de Google Maps (botón "Compartir" en Maps).
    ficha:
      'https://www.google.com/maps/search/?api=1&query=Birrier%C3%ADa%20Casa%20Don%20Goyo%2C%20San%20Jer%C3%B3nimo%20Aculco',
    fichaPendiente: true,
  },

  horarios,
  /** Texto corto para el hero. */
  horarioResumen: 'Sábados y domingos',
  horarioDetalle: 'Sábado 10:00 a 18:00 · Domingo 9:00 a 18:00',

  calificacion: {
    valor: 4.5,
    resenas: 12,
    fuente: 'Google',
  },

  especialidades,

  menu: {
    pendiente: true, // PENDIENTE: quitar cuando el menú sea el real.
    nota: 'Precios en pesos mexicanos. Pueden cambiar sin previo aviso.',
    categorias: categoriasMenu,
  },

  historia: {
    // PENDIENTE: historia real del negocio. Texto de EJEMPLO:
    pendiente: true,
    titulo: 'Una birriería de barrio, con el orgullo de siempre',
    parrafos: [
      'Casa Don Goyo nació en San Jerónimo Aculco como un puesto de fin de semana, con una receta de birria que la familia ha cuidado por generaciones.',
      'Hoy seguimos haciendo lo mismo: levantarnos de madrugada, prender la leña y cocer la carne despacio para que al abrir la puerta ya huela a sábado.',
      'No somos un restaurante elegante. Somos la fonda de la esquina donde la gente del barrio desayuna, se encuentra y se lleva su kilo para la comida.',
    ],
    imagen: {
      src: '/img/nosotros-familia.webp',
      alt: 'La familia de Casa Don Goyo frente a la cazuela de birria',
      ancho: 900,
      alto: 1125,
      variantes: [600, 900],
    } as Imagen,
  },

  galeria,
  imagenes,
  redes,

  /** Qué se ofrece en el local. PENDIENTE confirmar. */
  servicios: {
    pendiente: true,
    pagos: ['Efectivo', 'Transferencia'],
    paraLlevar: true,
    comerAqui: true,
    entregaADomicilio: false,
  },

  textos: {
    navegacion: [
      { id: 'especialidades', etiqueta: 'Especialidades' },
      { id: 'menu', etiqueta: 'Menú' },
      { id: 'nosotros', etiqueta: 'Nosotros' },
      { id: 'ubicacion', etiqueta: 'Ubicación' },
      { id: 'galeria', etiqueta: 'Galería' },
    ],
    botonWhatsApp: 'Pedir por WhatsApp',
    botonComoLlegar: 'Cómo llegar',
    botonLlamar: 'Llamar',
    heroEtiqueta: 'Birriería en San Jerónimo Aculco, CDMX',
    especialidadesTitulo: 'Lo que nos hace famosos',
    especialidadesIntro: 'Tres platillos, una sola forma de hacerlos: despacio y con cariño.',
    menuTitulo: 'Menú',
    menuIntro: 'Para comer aquí o para llevar. Pregunta por kilo para la fiesta.',
    menuAviso: 'Menú de ejemplo. Precios por confirmar.',
    nosotrosTitulo: 'Sobre nosotros',
    ubicacionTitulo: 'Horarios y ubicación',
    ubicacionIntro: 'Solo abrimos en fin de semana. Llega temprano, la birria se acaba.',
    galeriaTitulo: 'Galería',
    galeriaIntro: 'Un vistazo a la cocina y al local.',
    cerrado: 'Cerrado',
    pieAviso: 'Hecho en el barrio, con orgullo.',
    whatsappFlotante: 'Escríbenos por WhatsApp',
  },
}

export type Negocio = typeof negocio

/** Enlace de WhatsApp con mensaje prellenado. */
export const enlaceWhatsApp = `https://wa.me/${negocio.contacto.whatsapp.numero}?text=${encodeURIComponent(
  negocio.contacto.whatsapp.mensaje,
)}`

/** Dirección en una sola línea. */
export const direccionCompleta = `${negocio.direccion.calle}, ${negocio.direccion.colonia}, ${negocio.direccion.alcaldia}, ${negocio.direccion.codigoPostal}, ${negocio.direccion.estado}`

/** Lista de pendientes para quien administra el sitio. */
export const pendientes = [
  'Menú real con precios (categoriasMenu)',
  'Confirmar que el teléfono tiene WhatsApp (negocio.contacto.whatsapp)',
  'Historia del negocio (negocio.historia)',
  'Eslogan oficial (negocio.eslogan)',
  'Fotos reales del local (public/img, conservar nombres de archivo)',
  'Redes sociales (redes)',
  'Dominio final (negocio.sitio.url)',
  'Enlace a la ficha de Google Maps (negocio.mapas.ficha)',
  'Referencia para llegar (negocio.direccion.referencia)',
  'Formas de pago y servicios (negocio.servicios)',
]
