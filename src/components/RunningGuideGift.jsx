import { useState } from 'react'
import { generateRunningGuide } from '../lib/generateRunningGuide'

export default function RunningGuideGift() {
  const [downloading, setDownloading] = useState(false)

  const handleDownload = async () => {
    setDownloading(true)
    try {
      await generateRunningGuide()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <section className="bg-surface-soft py-16">
      <div className="mx-auto max-w-3xl px-6">
        <div className="flex flex-col items-center gap-4 rounded-2xl border border-orange-light bg-white p-8 text-center sm:flex-row sm:text-left">
          <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-orange/10 text-2xl">
            🎁
          </span>
          <div className="flex-1">
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
              Regalo · sin registro
            </p>
            <h3 className="mt-1 font-display text-lg font-bold text-navy">
              ¿Quieres empezar a correr? Llévate mi guía de tus primeros 5K
            </h3>
            <p className="mt-1 text-sm text-text-secondary">
              Plan de 6 semanas, de caminar a correr 5K seguidos. Gratis, sin
              email, sin trampas.
            </p>
          </div>
          <button
            type="button"
            onClick={handleDownload}
            disabled={downloading}
            className="shrink-0 rounded-full bg-orange px-6 py-3 text-sm font-semibold text-white transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
          >
            {downloading ? 'Generando…' : 'Descargar gratis →'}
          </button>
        </div>
      </div>
    </section>
  )
}