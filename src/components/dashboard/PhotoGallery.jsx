import { PHOTO_SLOTS } from '../../lib/notes'

export default function PhotoGallery({ entries }) {
  const latestWithPhoto = [...entries].reverse().find((e) => PHOTO_SLOTS.some((s) => e[s.key]))

  if (!latestWithPhoto) return null

  return (
    <div className="rounded-2xl border border-slate-100 p-4">
      <p className="text-[11px] font-semibold uppercase tracking-wide text-text-secondary">
        Últimas fotos ({new Date(latestWithPhoto.created_at).toLocaleDateString('es-ES')})
      </p>
      <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-4">
        {PHOTO_SLOTS.map(({ key, label }) =>
          latestWithPhoto[key] ? (
            <div key={key}>
              <img
                src={latestWithPhoto[key]}
                alt={label}
                className="aspect-square w-full rounded-lg object-cover"
              />
              <p className="mt-1 text-center text-[10px] text-text-secondary">{label}</p>
            </div>
          ) : null
        )}
      </div>
    </div>
  )
}