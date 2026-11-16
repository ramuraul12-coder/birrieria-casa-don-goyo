import { negocio, srcSetDe } from '../data/negocio'
import { Reveal, TituloSeccion } from './ui'

export function Nosotros() {
  const { historia, textos } = negocio
  return (
    <section id="nosotros" className="bg-crema-100 py-20 sm:py-28">
      <div className="contenedor grid items-center gap-12 md:grid-cols-[5fr_6fr] md:gap-16">
        <Reveal y={32}>
          <div className="relative mx-auto max-w-md md:max-w-none">
            <div
              aria-hidden="true"
              className="absolute -top-3 -left-3 h-full w-full rounded-[2rem] border border-terracota-600/30"
            />
            <img
              src={historia.imagen.src}
              srcSet={srcSetDe(historia.imagen)}
              sizes="(min-width: 768px) 40vw, 90vw"
              alt={historia.imagen.alt}
              width={historia.imagen.ancho}
              height={historia.imagen.alto}
              loading="lazy"
              decoding="async"
              className="relative aspect-[4/5] w-full rounded-[2rem] object-cover shadow-tarjeta"
            />
          </div>
        </Reveal>

        <div>
          <TituloSeccion
            etiqueta={textos.nosotrosTitulo}
            titulo={historia.titulo}
            alineacion="izquierda"
          />
          <Reveal delay={0.1} className="space-y-5 text-base leading-relaxed text-barro-700 sm:text-lg">
            {historia.parrafos.map((p, i) => (
              <p
                key={i}
                className={i === 0 ? 'font-titulo text-xl text-barro-900 sm:text-2xl' : ''}
              >
                {p}
              </p>
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  )
}
