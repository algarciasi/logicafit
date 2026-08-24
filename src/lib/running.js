export const STANDARD_DISTANCES = [
  { label: '5K', km: 5 },
  { label: '10K', km: 10 },
  { label: 'Media maratón', km: 21.0975 },
  { label: 'Maratón', km: 42.195 },
]

export function parseTimeToSeconds({ h = 0, m = 0, s = 0 }) {
  return Number(h) * 3600 + Number(m) * 60 + Number(s)
}

export function formatSecondsToTime(totalSeconds) {
  const s = Math.round(totalSeconds)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const sec = s % 60
  if (h > 0) {
    return `${h}h ${String(m).padStart(2, '0')}m ${String(sec).padStart(2, '0')}s`
  }
  return `${m}m ${String(sec).padStart(2, '0')}s`
}

export function formatPace(secondsPerKm) {
  const m = Math.floor(secondsPerKm / 60)
  const s = Math.round(secondsPerKm % 60)
  return `${m}:${String(s).padStart(2, '0')} /km`
}

// Fórmula de Riegel: predice el tiempo en otra distancia a partir de un resultado conocido
export function riegelPredict(knownKm, knownSeconds, targetKm) {
  return knownSeconds * Math.pow(targetKm / knownKm, 1.06)
}

export function calcPredictions(knownKm, knownSeconds) {
  const pace = knownSeconds / knownKm
  const predictions = STANDARD_DISTANCES.map((d) => ({
    ...d,
    seconds: riegelPredict(knownKm, knownSeconds, d.km),
  }))
  return { pace, predictions }
}