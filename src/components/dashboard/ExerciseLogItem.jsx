import { useEffect, useState } from "react";
import {
  listExerciseHistory,
  addProgressEntry,
} from "../../lib/progresoEjercicios";

export default function ExerciseLogItem({ clientId, routineEntry }) {
  const {
    ejercicio_id: ejercicioId,
    ejercicios,
    series_objetivo,
    reps_objetivo,
    notas_entrenador,
    id: rutinaId,
  } = routineEntry;

  const [history, setHistory] = useState([]);
  const [loadingHistory, setLoadingHistory] = useState(true);
  const [open, setOpen] = useState(false);

  const [peso, setPeso] = useState("");
  const [reps, setReps] = useState("");
  const [serie, setSerie] = useState(1);
  const [saving, setSaving] = useState(false);

  const loadHistory = async () => {
    setLoadingHistory(true);
    const { entries } = await listExerciseHistory(clientId, ejercicioId, 5);
    setHistory(entries);
    setLoadingHistory(false);
  };

  useEffect(() => {
    loadHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ejercicioId]);

  const handleSave = async (e) => {
    e.preventDefault();
    if (!peso || !reps) return;
    setSaving(true);
    const { error } = await addProgressEntry({
      clientId,
      ejercicioId,
      pesoKg: Number(peso),
      reps: Number(reps),
      serieNumero: Number(serie),
      rutinaId,
    });
    setSaving(false);
    if (error) {
      alert("Error al guardar: " + error.message);
      return;
    }
    setPeso("");
    setReps("");
    setSerie((s) => Number(s) + 1);
    loadHistory();
  };

  return (
    <div className="rounded-xl bg-surface-soft p-3">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between text-left"
      >
        <div>
          <p className="text-sm font-semibold text-navy">
            {ejercicios?.nombre}
          </p>
          <p className="text-[11px] text-text-secondary">
            {series_objetivo}×{reps_objetivo ?? "?"} objetivo
            {notas_entrenador ? ` · "${notas_entrenador}"` : ""}
          </p>
        </div>
        <span className="text-orange">{open ? "−" : "+"}</span>
      </button>

      {open && (
        <div className="mt-3 border-t border-slate-200 pt-3">
          {!loadingHistory && history.length > 0 && (
            <div className="mb-3 space-y-1">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-text-secondary">
                Últimas series
              </p>
              {history.map((h) => (
                <p key={h.id} className="text-xs text-navy-light">
                  {h.peso_kg}kg × {h.reps} reps
                  <span className="ml-2 text-text-secondary">
                    ({new Date(h.created_at).toLocaleDateString("es-ES")})
                  </span>
                </p>
              ))}
            </div>
          )}

          <form
            onSubmit={handleSave}
            className="flex flex-wrap items-end gap-2"
          >
            <div>
              <label className="block text-[10px] text-text-secondary">
                Serie nº
              </label>
              <input
                type="number"
                min="1"
                value={serie}
                onChange={(e) => setSerie(e.target.value)}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-text-secondary">
                Peso (kg)
              </label>
              <input
                type="number"
                step="0.5"
                min="0"
                required
                value={peso}
                onChange={(e) => setPeso(e.target.value)}
                className="w-20 rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
              />
            </div>
            <div>
              <label className="block text-[10px] text-text-secondary">
                Reps
              </label>
              <input
                type="number"
                min="0"
                required
                value={reps}
                onChange={(e) => setReps(e.target.value)}
                className="w-16 rounded-lg border border-slate-200 px-2 py-1.5 text-xs"
              />
            </div>
            <button
              type="submit"
              disabled={saving}
              className="rounded-full bg-orange px-4 py-1.5 text-xs font-semibold text-white transition hover:bg-orange-dark disabled:opacity-60"
            >
              {saving ? "…" : "Apuntar"}
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
