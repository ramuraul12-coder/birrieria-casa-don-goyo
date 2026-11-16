import { m, useReducedMotion } from 'framer-motion'
import type { ReactNode } from 'react'

/* ---------- Animación suave al entrar en pantalla ---------- */

type RevealProps = {
  children: ReactNode
  className?: string
  delay?: number
  /** Desplazamiento inicial en px. */
  y?: number
}

export function Reveal({ children, className, delay = 0, y = 24 }: RevealProps) {
  const reducir = useReducedMotion()
  return (
    <m.div
      className={className}
      initial={reducir ? false : { opacity: 0, y }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -60px 0px' }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </m.div>
  )
}

/* ---------- Encabezado de sección ---------- */

type TituloProps = {
  etiqueta?: string
  titulo: string
  intro?: string
  tono?: 'claro' | 'oscuro'
  alineacion?: 'izquierda' | 'centro'
}

export function TituloSeccion({
  etiqueta,
  titulo,
  intro,
  tono = 'claro',
  alineacion = 'centro',
}: TituloProps) {
  const oscuro = tono === 'oscuro'
  return (
    <Reveal
      className={`mb-10 max-w-2xl sm:mb-14 ${alineacion === 'centro' ? 'mx-auto text-center' : ''}`}
    >
      {etiqueta && (
        <p
          className={`mb-3 text-xs font-semibold tracking-[0.22em] uppercase ${
            oscuro ? 'text-terracota-300' : 'text-terracota-600'
          }`}
        >
          {etiqueta}
        </p>
      )}
      <h2
        className={`text-3xl leading-[1.08] font-medium sm:text-4xl md:text-5xl ${
          oscuro ? 'text-crema-50' : 'text-barro-900'
        }`}
      >
        {titulo}
      </h2>
      {intro && (
        <p
          className={`mt-4 text-base leading-relaxed sm:text-lg ${
            oscuro ? 'text-crema-200/85' : 'text-barro-700'
          }`}
        >
          {intro}
        </p>
      )}
    </Reveal>
  )
}

/* ---------- Botones ---------- */

type BotonProps = {
  href: string
  children: ReactNode
  variante?: 'chile' | 'contorno-claro' | 'contorno-oscuro' | 'whatsapp'
  className?: string
  externo?: boolean
  icono?: ReactNode
}

const estilosBoton = {
  chile:
    'bg-chile-500 text-crema-50 hover:bg-chile-600 active:bg-chile-600 shadow-suave',
  whatsapp:
    'bg-whatsapp text-barro-950 hover:bg-whatsapp-oscuro hover:text-crema-50 shadow-suave',
  'contorno-claro':
    'border border-crema-100/60 text-crema-50 hover:bg-crema-50/10 backdrop-blur-sm',
  'contorno-oscuro':
    'border border-barro-900/30 text-barro-900 hover:bg-barro-900 hover:text-crema-50',
}

export function Boton({
  href,
  children,
  variante = 'chile',
  className = '',
  externo = true,
  icono,
}: BotonProps) {
  return (
    <a
      href={href}
      {...(externo ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
      className={`inline-flex min-h-12 items-center justify-center gap-2.5 rounded-full px-6 text-[15px] font-semibold tracking-wide transition-colors duration-200 ${estilosBoton[variante]} ${className}`}
    >
      {icono}
      {children}
    </a>
  )
}

/* ---------- Iconos (SVG inline, sin dependencias) ---------- */

type IconoProps = { className?: string }

export function IconoWhatsApp({ className = 'h-5 w-5' }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M17.5 14.4c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.39-1.48-.88-.79-1.48-1.76-1.65-2.06-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.61-.91-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.23 1.36.2 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.17-1.41-.07-.13-.27-.2-.57-.35M12.04 21.8h-.01a9.87 9.87 0 0 1-5.03-1.38l-.36-.21-3.74.98 1-3.65-.24-.37a9.86 9.86 0 0 1-1.51-5.26c0-5.45 4.44-9.88 9.89-9.88 2.64 0 5.12 1.03 6.99 2.9a9.82 9.82 0 0 1 2.89 6.99c0 5.45-4.44 9.88-9.88 9.88m8.41-18.3A11.82 11.82 0 0 0 12.04 0C5.5 0 .17 5.33.16 11.88c0 2.1.55 4.14 1.59 5.94L.06 24l6.31-1.65a11.87 11.87 0 0 0 5.67 1.44h.01c6.54 0 11.87-5.33 11.88-11.88 0-3.18-1.24-6.16-3.48-8.41" />
    </svg>
  )
}

export function IconoPin({ className = 'h-5 w-5' }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M12 22s7-6.1 7-12a7 7 0 1 0-14 0c0 5.9 7 12 7 12Z" />
      <circle cx="12" cy="10" r="2.6" />
    </svg>
  )
}

export function IconoReloj({ className = 'h-5 w-5' }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7v5l3 2" />
    </svg>
  )
}

export function IconoTelefono({ className = 'h-5 w-5' }: IconoProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      className={className}
    >
      <path d="M5 4h4l2 5-2.5 1.5a11 11 0 0 0 5 5L15 13l5 2v4a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z" />
    </svg>
  )
}

export function IconoEstrella({ className = 'h-4 w-4' }: IconoProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="m12 2 2.9 6.6 7.1.7-5.4 4.8 1.6 7L12 17.4 5.8 21l1.6-7L2 9.3l7.1-.7L12 2Z" />
    </svg>
  )
}

export function IconoRed({ nombre, className = 'h-5 w-5' }: IconoProps & { nombre: string }) {
  if (nombre === 'Facebook') {
    return (
      <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
        <path d="M13.5 22v-8h2.7l.4-3.2h-3.1V8.8c0-.9.3-1.6 1.6-1.6h1.7V4.4c-.3 0-1.3-.1-2.5-.1-2.5 0-4.1 1.5-4.1 4.2v2.3H7.4V14h2.8v8h3.3Z" />
      </svg>
    )
  }
  if (nombre === 'Instagram') {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.8"
        aria-hidden="true"
        className={className}
      >
        <rect x="3" y="3" width="18" height="18" rx="5" />
        <circle cx="12" cy="12" r="4" />
        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
      </svg>
    )
  }
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" className={className}>
      <path d="M16.6 5.8A4.3 4.3 0 0 1 15.5 3h-3.1v12.4a2.6 2.6 0 1 1-2.6-2.6c.3 0 .5 0 .8.1V9.7a5.7 5.7 0 1 0 4.9 5.7V9.1a7.4 7.4 0 0 0 4.3 1.4V7.4a4.3 4.3 0 0 1-3.2-1.6Z" />
    </svg>
  )
}
