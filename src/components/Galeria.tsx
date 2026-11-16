import { useEffect, useRef, useState } from 'react'
import { negocio, srcSetDe } from '../data/negocio'
import { Reveal, TituloSeccion } from './ui'

export function Galeria() {
  const { galeria, textos } = negocio
  const [abierta, setAbierta] = useState<number | null>(null)
  const dialogo = useRef<HTMLDialogElement>(null)

  useEffect(() => {
    const d = dialogo.current
    if (!d) return
    if (abierta !== null && !d.open) d.showModal()
    if (abierta === null && d.open) d.close()
  }, [abierta])

  const foto = abierta !== null ? galeria[abierta] : null

  return (
    <section id="galeria" className="bg-crema-50 py-20 sm:py-28">
      <div className="contenedor">
        <TituloSeccion
          etiqueta="Fotos"
          titulo={textos.galeriaTitulo}
          intro={textos.galeriaIntro}
        />

        <ul className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3">
          {galeria.map((img, i) => (
            <li key={img.src}>
              <Reveal delay={(i % 3) * 0.08}>
                <button
                  type="button"
                  onClick={() => setAbierta(i)}
                  aria-label={`Ver foto: ${img.alt}`}
                  className="group block w-full overflow-hidden rounded-2xl shadow-suave"
                >
                  <img
                    src={img.src}
                    srcSet={srcSetDe(img)}
                    sizes="(min-width: 768px) 30vw, 45vw"
                    alt={img.alt}
                    width={img.ancho}
                    height={img.alto}
                    loading="lazy"
                    decoding="async"
                    className="aspect-square w-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.05]"
                  />
                </button>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>

      <dialog
        ref={dialogo}
        onClose={() => setAbierta(null)}
        onClick={(e) => {
          if (e.target === dialogo.current) setAbierta(null)
        }}
        className="m-auto max-h-[92vh] w-[min(92vw,56rem)] rounded-3xl bg-barro-950 p-2 text-crema-50 shadow-tarjeta backdrop:bg-barro-950/85 backdrop:backdrop-blur-sm"
      >
        {foto && (
          <figure className="relative">
            <img
              src={foto.src}
              alt={foto.alt}
              width={foto.ancho}
              height={foto.alto}
              className="max-h-[80vh] w-full rounded-2xl object-contain"
            />
            <figcaption className="px-3 py-3 text-center text-sm text-crema-200/80">
              {foto.alt}
            </figcaption>
            <button
              type="button"
              onClick={() => setAbierta(null)}
              aria-label="Cerrar"
              className="absolute top-3 right-3 flex h-10 w-10 items-center justify-center rounded-full bg-barro-950/70 text-xl leading-none text-crema-50 hover:bg-chile-500"
            >
              ×
            </button>
          </figure>
        )}
      </dialog>
    </section>
  )
}
