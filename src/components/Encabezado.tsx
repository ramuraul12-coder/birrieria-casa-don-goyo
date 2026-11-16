import { useEffect, useState } from 'react'
import { enlaceWhatsApp, negocio } from '../data/negocio'
import { IconoTelefono, IconoWhatsApp } from './ui'

export function Encabezado() {
  const [solido, setSolido] = useState(false)

  useEffect(() => {
    const alDesplazar = () => setSolido(window.scrollY > 48)
    alDesplazar()
    window.addEventListener('scroll', alDesplazar, { passive: true })
    return () => window.removeEventListener('scroll', alDesplazar)
  }, [])

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
        solido ? 'bg-barro-950/90 shadow-suave backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="contenedor flex h-16 items-center justify-between gap-4">
        <a
          href="#inicio"
          className="font-titulo text-xl font-medium tracking-tight text-crema-50 sm:text-2xl"
        >
          {negocio.nombreCorto}
        </a>

        <nav aria-label="Secciones" className="hidden md:block">
          <ul className="flex items-center gap-7 text-sm font-medium text-crema-100/85">
            {negocio.textos.navegacion.map((item) => (
              <li key={item.id}>
                <a href={`#${item.id}`} className="transition-colors hover:text-crema-50">
                  {item.etiqueta}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={`tel:${negocio.contacto.telefonoE164}`}
            aria-label={`${negocio.textos.botonLlamar} al ${negocio.contacto.telefono}`}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-crema-100/30 text-crema-50 transition-colors hover:bg-crema-50/10 md:hidden"
          >
            <IconoTelefono />
          </a>
          <a
            href={enlaceWhatsApp}
            target="_blank"
            rel="noopener noreferrer"
            className="hidden items-center gap-2 rounded-full bg-chile-500 px-4 py-2 text-sm font-semibold text-crema-50 transition-colors hover:bg-chile-600 md:inline-flex"
          >
            <IconoWhatsApp className="h-4 w-4" />
            {negocio.textos.botonWhatsApp}
          </a>
        </div>
      </div>
    </header>
  )
}
