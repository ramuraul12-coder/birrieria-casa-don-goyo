import { m, useReducedMotion } from 'framer-motion'
import { enlaceWhatsApp, negocio, srcSetDe } from '../data/negocio'
import { Boton, IconoEstrella, IconoPin, IconoReloj, IconoWhatsApp } from './ui'

export function Hero() {
  const reducir = useReducedMotion()
  const { hero } = negocio.imagenes
  const aparecer = (retraso: number) => ({
    initial: reducir ? false : { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay: retraso, ease: [0.22, 1, 0.36, 1] as const },
  })

  return (
    <section
      id="inicio"
      className="relative flex min-h-[100svh] items-end overflow-hidden bg-barro-950 text-crema-50"
    >
      <img
        src={hero.src}
        srcSet={srcSetDe(hero)}
        sizes="100vw"
        alt={hero.alt}
        width={hero.ancho}
        height={hero.alto}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover object-center"
      />
      {/* Degradado color barro para que el texto se lea sobre la foto */}
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-t from-barro-950 via-barro-950/70 to-barro-900/25"
      />
      <div
        aria-hidden="true"
        className="absolute inset-0 bg-gradient-to-r from-barro-950/60 to-transparent"
      />

      <div className="contenedor relative z-10 pt-28 pb-16 sm:pb-20 md:pb-24">
        <m.p
          {...aparecer(0.05)}
          className="mb-4 flex items-center gap-2 text-xs font-semibold tracking-[0.22em] text-terracota-300 uppercase sm:text-sm"
        >
          <span aria-hidden="true" className="h-px w-8 bg-terracota-300" />
          {negocio.textos.heroEtiqueta}
        </m.p>

        {/* El h1 es el elemento LCP: se anima solo en posición, nunca en opacidad, para no retrasar su pintado. */}
        <m.h1
          initial={reducir ? false : { y: 24 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-3xl text-[2.75rem] leading-[1.02] font-medium sm:text-6xl md:text-7xl"
        >
          {negocio.nombre}
        </m.h1>

        <m.p
          {...aparecer(0.25)}
          className="mt-5 max-w-xl text-lg leading-relaxed text-crema-100/90 sm:text-xl"
        >
          {negocio.eslogan}
        </m.p>

        <m.div
          {...aparecer(0.35)}
          className="mt-7 inline-flex flex-col gap-1 rounded-2xl border border-crema-100/20 bg-crema-50/10 px-5 py-3.5 backdrop-blur-sm"
        >
          <p className="flex items-center gap-2 text-base font-semibold sm:text-lg">
            <IconoReloj className="h-5 w-5 text-terracota-300" />
            {negocio.horarioResumen}
          </p>
          <p className="text-sm text-crema-100/80">{negocio.horarioDetalle}</p>
        </m.div>

        <m.div {...aparecer(0.45)} className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
          <Boton href={enlaceWhatsApp} variante="chile" icono={<IconoWhatsApp />}>
            {negocio.textos.botonWhatsApp}
          </Boton>
          <Boton href={negocio.mapas.comoLlegar} variante="contorno-claro" icono={<IconoPin />}>
            {negocio.textos.botonComoLlegar}
          </Boton>
        </m.div>

        <m.p
          {...aparecer(0.55)}
          className="mt-8 flex items-center gap-2 text-sm text-crema-100/75"
        >
          <IconoEstrella className="h-4 w-4 text-terracota-300" />
          <span>
            <strong className="font-semibold text-crema-50">{negocio.calificacion.valor}</strong> en{' '}
            {negocio.calificacion.fuente} · {negocio.calificacion.resenas} reseñas
          </span>
        </m.p>
      </div>
    </section>
  )
}
