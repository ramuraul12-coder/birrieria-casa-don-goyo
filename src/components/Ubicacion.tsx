import { direccionCompleta, negocio } from '../data/negocio'
import { Boton, IconoPin, IconoReloj, IconoTelefono, Reveal, TituloSeccion } from './ui'

export function Ubicacion() {
  const { textos, horarios, contacto, direccion } = negocio
  return (
    <section
      id="ubicacion"
      className="textura-barro bg-terracota-700 py-20 text-crema-50 sm:py-28"
    >
      <div className="contenedor">
        <TituloSeccion
          etiqueta="Visítanos"
          titulo={textos.ubicacionTitulo}
          intro={textos.ubicacionIntro}
          tono="oscuro"
        />

        <div className="grid gap-8 md:grid-cols-2 md:gap-10">
          <Reveal>
            <div className="flex h-full flex-col gap-8 rounded-3xl bg-barro-950/35 p-6 backdrop-blur-sm sm:p-8">
              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <IconoReloj className="h-5 w-5 text-terracota-300" />
                  Horario
                </h3>
                <dl className="mt-4 divide-y divide-crema-100/15">
                  {horarios.map((h) => (
                    <div key={h.etiqueta} className="flex items-center justify-between py-3">
                      <dt className="font-medium">{h.etiqueta}</dt>
                      <dd
                        className={`tabular-nums ${
                          h.abre ? 'text-crema-50' : 'text-terracota-300'
                        }`}
                      >
                        {h.abre ? `${h.abre} – ${h.cierra}` : textos.cerrado}
                      </dd>
                    </div>
                  ))}
                </dl>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <IconoPin className="h-5 w-5 text-terracota-300" />
                  Dirección
                </h3>
                <address className="mt-3 leading-relaxed text-crema-100/90 not-italic">
                  {direccion.calle}
                  <br />
                  {direccion.colonia}, {direccion.alcaldia}
                  <br />
                  {direccion.codigoPostal}, {direccion.ciudad}
                  {direccion.referencia && (
                    <span className="mt-2 block text-sm text-crema-200/70">
                      {direccion.referencia}
                    </span>
                  )}
                </address>
              </div>

              <div>
                <h3 className="flex items-center gap-2 text-lg font-semibold">
                  <IconoTelefono className="h-5 w-5 text-terracota-300" />
                  Teléfono
                </h3>
                <a
                  href={`tel:${contacto.telefonoE164}`}
                  className="mt-2 inline-block text-xl font-medium tabular-nums underline-offset-4 hover:underline"
                >
                  {contacto.telefono}
                </a>
              </div>

              <div className="mt-auto flex flex-col gap-3 sm:flex-row">
                <Boton href={negocio.mapas.comoLlegar} variante="chile" icono={<IconoPin />}>
                  {textos.botonComoLlegar}
                </Boton>
                <Boton
                  href={`tel:${contacto.telefonoE164}`}
                  variante="contorno-claro"
                  externo={false}
                  icono={<IconoTelefono />}
                >
                  {textos.botonLlamar}
                </Boton>
              </div>
            </div>
          </Reveal>

          <Reveal delay={0.1}>
            <div className="h-full min-h-80 overflow-hidden rounded-3xl bg-barro-950/35 shadow-tarjeta">
              <iframe
                title={`Mapa de ${negocio.nombre} en ${direccionCompleta}`}
                src={negocio.mapas.embed}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
                className="h-full min-h-80 w-full border-0 md:min-h-[28rem]"
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}
