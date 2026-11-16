import { direccionCompleta, enlaceWhatsApp, negocio } from '../data/negocio'
import { IconoRed, IconoWhatsApp } from './ui'

export function PieDePagina() {
  const redes = negocio.redes.filter((r) => !r.pendiente)
  const anio = new Date().getFullYear()

  return (
    <footer className="bg-barro-950 pt-16 pb-28 text-crema-200/80 md:pb-14">
      <div className="contenedor grid gap-10 md:grid-cols-3">
        <div>
          <p className="font-titulo text-2xl font-medium text-crema-50">{negocio.nombre}</p>
          <p className="mt-2 max-w-xs text-sm leading-relaxed">{negocio.descripcionCorta}</p>
          <p className="mt-4 font-titulo text-base text-terracota-300 italic">
            {negocio.textos.pieAviso}
          </p>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-crema-50 uppercase">
            Contacto
          </h2>
          <ul className="mt-4 space-y-3 text-sm">
            <li>
              <a
                href={negocio.mapas.comoLlegar}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-crema-50"
              >
                {direccionCompleta}
              </a>
            </li>
            <li>
              <a href={`tel:${negocio.contacto.telefonoE164}`} className="hover:text-crema-50">
                {negocio.contacto.telefono}
              </a>
            </li>
            <li>
              <a
                href={enlaceWhatsApp}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-crema-50"
              >
                <IconoWhatsApp className="h-4 w-4 text-whatsapp" />
                {negocio.textos.botonWhatsApp}
              </a>
            </li>
            {negocio.contacto.email && (
              <li>
                <a href={`mailto:${negocio.contacto.email}`} className="hover:text-crema-50">
                  {negocio.contacto.email}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div>
          <h2 className="text-xs font-semibold tracking-[0.2em] text-crema-50 uppercase">
            Horario
          </h2>
          <ul className="mt-4 space-y-2 text-sm">
            {negocio.horarios.map((h) => (
              <li key={h.etiqueta} className="flex justify-between gap-4">
                <span>{h.etiqueta}</span>
                <span className="tabular-nums">
                  {h.abre ? `${h.abre} – ${h.cierra}` : negocio.textos.cerrado}
                </span>
              </li>
            ))}
          </ul>
          {redes.length > 0 && (
            <ul className="mt-6 flex gap-3" aria-label="Redes sociales">
              {redes.map((r) => (
                <li key={r.nombre}>
                  <a
                    href={r.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={r.nombre}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-crema-100/20 text-crema-50 transition-colors hover:bg-crema-50/10"
                  >
                    <IconoRed nombre={r.nombre} />
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>

      <div className="contenedor mt-12 border-t border-crema-100/10 pt-6 text-xs text-crema-200/75">
        © {anio} {negocio.nombre}. {negocio.direccion.colonia}, {negocio.direccion.alcaldia},{' '}
        {negocio.direccion.ciudad}.
      </div>
    </footer>
  )
}
