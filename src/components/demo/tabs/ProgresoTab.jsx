import { Link } from 'react-router-dom'
import MeasurementsChart from '../../dashboard/MeasurementsChart'
import { demoProgressEntries } from '../demoData'

export default function ProgresoTab() {
  return (
    <div className="space-y-4">
      <Link
        to="/planes"
        className="block w-full rounded-2xl border border-dashed border-orange-light bg-orange/5 px-4 py-3 text-center text-sm font-semibold text-orange-dark transition hover:bg-orange/10"
      >
        + Registrar medidas de esta semana
      </Link>

      <MeasurementsChart entries={demoProgressEntries} />

      <p className="text-center text-[11px] text-text-secondary">
        También puedes subir fotos (frente, perfiles, espalda) para ver tu evolución visual.
      </p>
    </div>
  )
}