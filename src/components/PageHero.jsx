export default function PageHero({
  image,
  imageAlt,
  eyebrow,
  title,
  accent,
  description,
  secondary,
  children,
  objectPosition = "sm:object-[70%_25%]",
  mobileObjectPosition = "object-center",
  mobileImageHeight = "h-[42vh] min-h-[300px]",
  minHeight = "sm:min-h-[650px]",
}) {
  return (
    <section className="relative overflow-hidden bg-navy">
      {/* 
        MOBILE:
        La imagen vive como bloque independiente.

        DESKTOP:
        La imagen pasa a ser fondo del hero.
      */}
      <div
        className={`relative w-full ${mobileImageHeight} sm:absolute sm:inset-0 sm:h-full sm:min-h-0`}
      >
        <img
          src={image}
          alt={imageAlt}
          fetchPriority="high"
          className={`h-full w-full object-cover ${mobileObjectPosition} ${objectPosition}`}
        />

        {/* Mobile: fundido suave hacia el bloque navy */}
        <div className="absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-navy to-transparent sm:hidden" />

        {/* Desktop: overlay general muy ligero */}
        <div className="absolute inset-0 hidden bg-navy/15 sm:block" />

        {/* Desktop: oscurecemos solo la zona donde vive el copy */}
        <div className="absolute inset-0 hidden bg-gradient-to-r from-navy/95 via-navy/55 via-[42%] to-transparent to-[72%] sm:block" />
      </div>

      {/* Contenido */}
      <div
        className={`relative z-10 bg-navy px-6 pb-14 pt-7 sm:flex sm:items-center sm:bg-transparent sm:pb-20 sm:pt-32 lg:px-8 ${minHeight}`}
      >
        <div className="mx-auto w-full max-w-7xl">
          <div className="max-w-[680px]">
            {eyebrow && (
              <p className="text-sm font-semibold text-brand-yellow">
                {eyebrow}
              </p>
            )}

            <h1 className="mt-4 font-display text-[2.8rem] font-extrabold leading-[0.98] tracking-[-0.045em] text-white sm:mt-5 sm:text-6xl lg:text-[4.6rem]">
              {title}

              {accent && (
                <>
                  <br />
                  <span className="brand-gradient-text">
                    {accent}
                  </span>
                </>
              )}
            </h1>

            {description && (
              <p className="mt-6 max-w-xl text-base leading-7 text-slate-200 sm:text-lg sm:leading-8">
                {description}
              </p>
            )}

            {secondary && (
              <p className="mt-3 max-w-xl text-sm leading-6 text-slate-400">
                {secondary}
              </p>
            )}

            {children && (
              <div className="mt-8">
                {children}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}
