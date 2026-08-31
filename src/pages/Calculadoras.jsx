import { Link } from 'react-router-dom'

export default function Calculadoras() {
  return (
    <div className="bg-white py-16">
      <div className="mx-auto max-w-2xl px-6 text-center">
        <p className="text-xs font-semibold uppercase tracking-wide text-orange">
          Herramientas gratuitas
        </p>
        <h1 className="mt-2 font-display text-3xl font-extrabold text-navy sm:text-4xl">
          Calculadoras
        </h1>
        <p className="mt-3 text-sm text-slate-600">
          Ajusta tu nutrición y planifica tus entrenamientos de carrera con estas herramientas.
        </p>
      </div>

      <div className="mx-auto mt-10 grid max-w-2xl gap-4 px-6 sm:grid-cols-2">
        <Link
          to="/calculadora"
          className="rounded-2xl border border-orange/20 bg-orange/5 p-6 text-center transition hover:bg-orange/10"
        >
          <p className="font-display text-lg font-bold text-navy">🧮 Calculadora de macros</p>
          <p className="mt-2 text-sm text-slate-600">Calcula tus kcal y arma tu menú</p>
        </Link>
        <Link
          to="/calculadora-running"
          className="rounded-2xl border border-orange/20 bg-orange/5 p-6 text-center transition hover:bg-orange/10"
        >
          <p className="font-display text-lg font-bold text-navy">🏃 Calculadora de ritmo</p>
          <p className="mt-2 text-sm text-slate-600">Predice tus tiempos + guía de 5K gratis</p>
        </Link>
      </div>
    </div>
  )
}