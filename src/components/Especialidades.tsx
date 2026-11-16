import { negocio, srcSetDe } from '../data/negocio'
import { Reveal, TituloSeccion } from './ui'

export function Especialidades() {
  return (
    <section id="especialidades" className="bg-crema-50 py-20 sm:py-28">
      <div className="contenedor">
        <TituloSeccion
          etiqueta="Especialidades"
          titulo={negocio.textos.especialidadesTitulo}
          intro={negocio.textos.especialidadesIntro}
        />

        <ul className="grid gap-8 sm:gap-6 md:grid-cols-3 md:gap-8">
          {negocio.especialidades.map((esp, i) => (
            <li key={esp.id}>
              <Reveal delay={i * 0.1} className="group h-full">
                <article className="flex h-full flex-col">
                  <div className="overflow-hidden rounded-3xl shadow-tarjeta">
                    <img
                      src={esp.imagen.src}
                      srcSet={srcSetDe(esp.imagen)}
                      sizes="(min-width: 768px) 30vw, 100vw"
                      alt={esp.imagen.alt}
                      width={esp.imagen.ancho}
                      height={esp.imagen.alto}
                      loading="lazy"
                      decoding="async"
                      className="aspect-[4/3] w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                    />
                  </div>
                  <h3 className="mt-6 text-2xl font-medium text-barro-900 sm:text-3xl">
                    {esp.nombre}
                  </h3>
                  <p className="mt-2 leading-relaxed text-barro-700">{esp.descripcion}</p>
                </article>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
