import { enlaceWhatsApp, negocio } from '../data/negocio'
import { IconoWhatsApp } from './ui'

/** Botón fijo, siempre visible en celular (y también en escritorio). */
export function WhatsAppFlotante() {
  return (
    <a
      href={enlaceWhatsApp}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={negocio.textos.whatsappFlotante}
      className="fixed right-4 bottom-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-whatsapp text-barro-950 shadow-tarjeta transition-transform duration-200 hover:scale-105 active:scale-95 sm:right-6 sm:bottom-6"
      style={{ paddingBottom: 'env(safe-area-inset-bottom, 0)' }}
    >
      <IconoWhatsApp className="h-7 w-7" />
    </a>
  )
}
