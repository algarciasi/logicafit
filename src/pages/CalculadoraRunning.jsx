import { useState } from 'react'
import { Link } from 'react-router-dom'
import RunningForm from '../components/running/RunningForm'
import RunningResults from '../components/running/RunningResults'
import { parseTimeToSeconds, calcPredictions } from '../lib/running'
import { generateRunningGuide } from '../lib/generateRunningGuide'

const DEFAULT_DATA = {
  distancePreset: 5,
  customKm: 5,
  hours: 0,
  minutes: 28,
  seconds: 0,
}

export default function CalculadoraRunning() {
  const [formData, setFormData] = useState(DEFAULT_DATA)
  const [result, setResult] = useState(null)
  const [downloading, setDownloading] = useState(false)

  const handleSubmit = () => {
    const km =
      formData.distancePreset === 'custom'
        ? Number(formData.customKm)
        : Number(formData.distancePreset)

    const seconds = parseTimeToSeconds({
      h: formData.hours,
      m: formData.minutes,
      s: formData.seconds,
    })

    if (!km || !seconds) return

    const { pace, predictions } = calcPredictions(km, seconds)
    const knownLabel = `${km} km`
    setResult({ pace, predictions, knownLabel })
  }

  const handleDownloadGuide = async () => {
    setDownloading(true)
    try {
      await generateRunningGuide()
    } finally {
      setDownloading(false)
    }
  }

  return (
    <div className="bg-surface-soft min-h-screen">

      {/* 0. HERO (Imagen inmersiva con degradados, mismo lenguaje que el resto de la web) */}
      <section className="relative w-full pt-16 pb-0 sm:pt-40 sm:pb-24 lg:pt-48 lg:pb-28 flex flex-col sm:justify-center">

        {/* BLOQUE DE IMAGEN
            Móvil: bloque normal de altura fija justo debajo del membrete navy, se ve entera.
            Desktop (sm+): absolute inset-0 a pantalla completa. */}
        <div className="relative h-[38vh] min-h-[240px] w-full sm:absolute sm:inset-0 sm:h-full sm:min-h-0">
          <img
            src="/brand/alberto-running.jpg"
            alt="Alberto García corriendo, entrenador personal Lógica Fit"
            className="h-full w-full object-cover object-[center_35%] opacity-100 sm:opacity-90 animate-fade-in"
          />

          {/* Degradado inferior móvil: funde la foto con el bloque navy de texto de debajo */}
          <div className="absolute inset-0 bg-gradient-to-t from-navy via-navy/10 to-transparent sm:hidden" />

          {/* Degradados desktop */}
          <div className="hidden sm:block absolute inset-0 bg-navy/60" />
          <div className="hidden sm:block absolute inset-0 bg-gradient-to-r from-navy/95 via-navy/60 to-transparent w-full md:w-3/4" />
          <div className="hidden sm:block absolute inset-x-0 bottom-0 h-32 lg:h-40 bg-gradient-to-t from-surface-soft to-transparent" />
        </div>

        {/* BLOQUE DE TEXTO
            Móvil: flujo normal debajo de la imagen, fondo navy sólido, sin superposición.
            Desktop (sm+): overlay clásico sobre la foto. */}
        <div className="relative z-10 w-full bg-navy px-6 py-10 sm:bg-transparent sm:py-0 lg:px-8">
          <div className="mx-auto max-w-7xl w-full">
            <div className="max-w-2xl">
              <p className="text-xs sm:text-sm font-bold uppercase tracking-[0.2em] text-orange animate-fade-in-up">
                Calculadora gratuita
              </p>
              <h1 className="mt-4 font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight animate-fade-in-up delay-100 leading-[1.05]">
                Calcula tu ritmo de carrera
              </h1>
              <p className="mt-5 sm:mt-6 text-base sm:text-lg text-slate-300 font-medium animate-fade-in-up delay-200 leading-relaxed max-w-lg">
                Dinos una marca y predecimos tu ritmo para otras distancias.
              </p>
              <Link
                to="/calculadora"
                className="mt-4 inline-block text-sm font-semibold text-orange hover:underline animate-fade-in-up delay-300"
              >
                ¿Buscas macros y dieta? Prueba la calculadora de macros →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 1. FORMULARIO */}
      <div className="pt-12 sm:pt-16 pb-16">
        <div className="mx-auto max-w-2xl px-6">
          <RunningForm data={formData} onChange={setFormData} onSubmit={handleSubmit} />
        </div>

        {result && (
          <div className="mx-auto mt-6 max-w-2xl px-6">
            <RunningResults {...result} />
          </div>
        )}

        <div className="mx-auto mt-10 max-w-2xl px-6">
          <div className="flex flex-col items-center gap-3 rounded-2xl border border-orange-light bg-orange/5 px-8 py-10 text-center">
            <span className="flex h-12 w-12 items-center justify-center rounded-full bg-orange text-2xl text-white">
              🎁
            </span>
            <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
              Regalo
            </p>
            <h3 className="font-display text-lg font-bold text-navy">
              Guía gratuita: tus primeros 5K
            </h3>
            <p className="max-w-md text-sm text-text-secondary">
              Un plan de 6 semanas para pasar de cero a correr 5K seguidos, con
              consejos clave para no lesionarte por el camino.
            </p>
            <button
              type="button"
              onClick={handleDownloadGuide}
              disabled={downloading}
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-orange px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-orange-dark disabled:cursor-not-allowed disabled:opacity-60"
            >
              {downloading ? 'Generando…' : 'Descargar guía gratis →'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}