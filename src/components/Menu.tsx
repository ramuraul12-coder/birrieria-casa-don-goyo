import { enlaceWhatsApp, negocio } from '../data/negocio'
import { Boton, IconoWhatsApp, Reveal, TituloSeccion } from './ui'

const formatoPrecio = new Intl.NumberFormat('es-MX', {
  style: 'currency',
  currency: 'MXN',
  maximumFractionDigits: 0,
})

export function Menu() {
  const { menu, textos } = negocio
  return (
    <section id="menu" className="textura-barro bg-barro-900 py-20 text-crema-100 sm:py-28">
      <div className="contenedor">
        <TituloSeccion
          etiqueta="Carta"
          titulo={textos.menuTitulo}
          intro={textos.menuIntro}
          tono="oscuro"
        />

        {menu.pendiente && (
          <Reveal className="mx-auto mb-10 max-w-md">
            <p className="rounded-full border border-terracota-300/40 bg-terracota-700/30 px-4 py-2 text-center text-xs font-semibold tracking-wide text-terracota-300 uppercase">
              {textos.menuAviso}
            </p>
          </Reveal>
        )}

        <div className="grid gap-x-12 gap-y-12 md:grid-cols-2">
          {menu.categorias.map((cat, i) => (
            <Reveal key={cat.id} delay={(i % 2) * 0.1}>
              <div className="border-t border-crema-100/15 pt-6">
                <h3 className="text-2xl font-medium text-crema-50 sm:text-3xl">{cat.nombre}</h3>
                {cat.descripcion && (
                  <p className="mt-1 text-sm text-crema-200/70">{cat.descripcion}</p>
                )}
                <ul className="mt-6 space-y-5">
                  {cat.platillos.map((p) => (
                    <li key={p.nombre}>
                      <div className="flex items-baseline gap-3">
                        <span className="font-medium text-crema-50">
                          {p.nombre}
                          {p.etiqueta && (
                            <span className="ml-2 inline-block rounded-full bg-nopal-600 px-2 py-0.5 align-middle text-[11px] font-semibold tracking-wide text-crema-50 uppercase">
                              {p.etiqueta}
                            </span>
                          )}
                        </span>
                        <span
                          aria-hidden="true"
                          className="linea-puntos mb-1.5 h-0.5 min-w-6 flex-1 self-end text-crema-100/40"
                        />
                        <span className="font-titulo text-lg font-semibold text-terracota-300 tabular-nums">
                          {formatoPrecio.format(p.precio)}
                        </span>
                      </div>
                      {p.descripcion && (
                        <p className="mt-1 pr-16 text-sm text-crema-200/65">{p.descripcion}</p>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal className="mt-14 flex flex-col items-center gap-5 text-center">
          <p className="text-sm text-crema-200/60">{menu.nota}</p>
          <Boton href={enlaceWhatsApp} variante="chile" icono={<IconoWhatsApp />}>
            {textos.botonWhatsApp}
          </Boton>
        </Reveal>
      </div>
    </section>
  )
}
