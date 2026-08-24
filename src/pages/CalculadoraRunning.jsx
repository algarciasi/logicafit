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
    <div className="bg-surface-soft py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange-dark">
          Calculadora gratuita
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Calcula tu ritmo de carrera
        </h1>
        <p className="mt-3 text-sm text-text-secondary">
          Dinos una marca y predecimos tu ritmo para otras distancias.
        </p>
        <Link
          to="/calculadora"
          className="mt-3 inline-block text-xs font-semibold text-orange-dark hover:underline"
        >
          ¿Buscas macros y dieta? Prueba la calculadora de macros →
        </Link>
      </div>

      <div className="mx-auto mt-10 max-w-2xl px-6">
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
  )
}