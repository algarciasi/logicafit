import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { getClientById } from "../../lib/clients";
import { listClientDiet, addDietEntry, deleteDietEntry } from "../../lib/diets";
import { listWeightHistory } from "../../lib/notes";
import { listClientRoutine } from "../../lib/routines";
import { listRoutineHistory, listDietHistory } from "../../lib/history";
import WeightChart from "../../components/dashboard/WeightChart";
import MealFoodPicker from "../../components/admin/MealFoodPicker";
import AdminRoutineEditor from "../../components/admin/AdminRoutineEditor";
import ClientPlanEditor from "../../components/admin/ClientPlanEditor";
import RoutineHistoryPanel from "../../components/admin/RoutineHistoryPanel";
import DietHistoryPanel from "../../components/admin/DietHistoryPanel";
import { MEALS } from "../../lib/macros";
import { diaLabel } from "../../lib/routines";
import { generateRoutinePdf, generateDietPdf } from "../../lib/clientPdfs";

const FIELD =
  "w-full rounded-xl border border-slate-200 px-3.5 py-2.5 text-sm text-navy focus:border-orange focus:outline-none focus:ring-1 focus:ring-orange";

export default function AdminClientDetail() {
  const { id } = useParams();
  const [client, setClient] = useState(null);
  const [dietEntries, setDietEntries] = useState([]);
  const [weightHistory, setWeightHistory] = useState([]);
  const [routineEntries, setRoutineEntries] = useState([]);
  const [routineHistory, setRoutineHistory] = useState([]);
  const [dietHistory, setDietHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [saving, setSaving] = useState(false);
  const [generatingPdf, setGeneratingPdf] = useState(false);
  const [generatingRoutinePdf, setGeneratingRoutinePdf] = useState(false);

  const loadAll = async () => {
    setLoading(true);
    const [
      { client, error: clientError },
      { entries },
      { entries: weights },
      { entries: routine },
      { entries: routineHist },
      { entries: dietHist },
    ] = await Promise.all([
      getClientById(id),
      listClientDiet(id),
      listWeightHistory(id),
      listClientRoutine(id),
      listRoutineHistory(id),
      listDietHistory(id),
    ]);
    setClient(client);
    setError(clientError);
    setDietEntries(entries);
    setWeightHistory(weights);
    setRoutineEntries(routine);
    setRoutineHistory(routineHist);
    setDietHistory(dietHist);
    setLoading(false);
  };

  useEffect(() => {
    loadAll();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id]);

  const handleAddMealFood = async (mealId, food, grams, diaSemana, opcion, unidad = 'g') => {
    const { error } = await addDietEntry({
      clientId: id,
      foodId: food.id,
      momentoDia: mealId,
      diaSemana,
      opcion,
      cantidadG: grams,
      unidad, 
    });
    if (error) {
      alert("Error al guardar: " + error.message);
      return;
    }
    loadAll();
  };

  const handlePreviewRoutinePDF = async () => {
    setGeneratingRoutinePdf(true);
    try {
      await generateRoutinePdf(client, routineEntries, true);
    } catch (err) {
      alert("Error al previsualizar la rutina: " + err.message);
    } finally {
      setGeneratingRoutinePdf(false);
    }
  };

  const handleDelete = async (entryId) => {
    const { error } = await deleteDietEntry(entryId);
    if (error) {
      alert("Error al borrar: " + error.message);
      return;
    }
    loadAll();
  };

  const handlePreviewPDF = async () => {
    setGeneratingPdf(true);
    try {
      await generateDietPdf(client, dietEntries, true);
    } catch (err) {
      alert("Error al previsualizar PDF: " + err.message);
    } finally {
      setGeneratingPdf(false);
    }
  };

  if (loading) {
    return (
      <p className="mx-auto max-w-3xl px-6 pt-32 pb-12 text-sm text-text-secondary">
        Cargando…
      </p>
    );
  }

  if (error || !client) {
    return (
      <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 lg:px-8">
        <div className="mx-auto max-w-3xl">
          <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
            No se pudo cargar este cliente{error ? `: ${error.message}` : ""}.
          </p>
        </div>
      </div>
    );
  }

  const entriesByMeal = MEALS.map((meal) => ({
    meal,
    items: dietEntries.filter((e) => e.momento_dia === meal.id),
  }));

  return (
    <div className="min-h-screen bg-slate-50 pt-32 pb-20 px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <Link
          to="/admin/clientes"
          className="text-xs font-semibold text-text-secondary hover:text-navy"
        >
          ← Volver a clientes
        </Link>

        <h1 className="mt-2 font-display text-2xl font-extrabold text-navy">
          {client.full_name || client.email}
        </h1>
        <p className="text-sm text-text-secondary">
          {client.email} {client.telefono ? `· ${client.telefono}` : ""}
        </p>
        {client.objetivo_entrenamiento && (
          <p className="mt-1 text-sm text-text-secondary">
            Objetivo: {client.objetivo_entrenamiento}
          </p>
        )}

        <div className="mt-8">
          <WeightChart points={weightHistory} />
        </div>

        <div className="mt-8">
          <ClientPlanEditor client={client} onSaved={loadAll} />
        </div>

        <div className="mt-10">
          
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">
              Asignar dieta
            </h2>
            <button
              onClick={handlePreviewPDF}
              disabled={generatingPdf || dietEntries.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-xs font-bold text-navy transition-colors hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingPdf ? (
                "Generando..."
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Previsualizar PDF
                </>
              )}
            </button>
          </div>

          <div className="mt-4 space-y-4">
            {entriesByMeal.map(({ meal, items }) => (
              <div
                key={meal.id}
                className="rounded-2xl border border-slate-100 bg-white p-4 shadow-sm"
              >
                <p className="font-display text-sm font-bold text-navy">
                  {meal.icon} {meal.label}
                </p>
                {items.length === 0 ? (
                  <p className="mt-2 text-xs text-text-secondary">
                    Sin alimentos asignados.
                  </p>
                ) : (
                  <ul className="mt-2 space-y-1.5">
                    {items.map((it) => (
                      <li
                        key={it.id}
                        className="flex items-center justify-between rounded-lg bg-surface-soft px-3 py-1.5 text-xs"
                      >
                        <span className="text-navy-light">
                          {it.foods?.nombre} — {it.cantidad_g}{it.unidad || 'g'}
                          <span className="ml-1.5 text-[10px] text-text-secondary">
                            (
                            {it.dia_semana
                              ? diaLabel(it.dia_semana)
                              : "todos los días"}
                            {it.opcion ? ` · Opción ${it.opcion}` : ""})
                          </span>
                        </span>
                        <button
                          type="button"
                          onClick={() => handleDelete(it.id)}
                          className="text-text-secondary hover:text-red-500"
                        >
                          ✕
                        </button>
                      </li>
                    ))}
                  </ul>
                )}

                <MealFoodPicker mealId={meal.id} onAdd={handleAddMealFood} />
              </div>
            ))}
          </div>

          <DietHistoryPanel
            clientId={id}
            dietEntries={dietEntries}
            history={dietHistory}
            onChange={loadAll}
          />
        </div>

        <div className="mt-10">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-lg font-bold text-navy">
              Asignar rutina
            </h2>
            <button
              onClick={handlePreviewRoutinePDF}
              disabled={generatingRoutinePdf || routineEntries.length === 0}
              className="inline-flex items-center gap-2 rounded-full bg-slate-200 px-4 py-2 text-xs font-bold text-navy transition-colors hover:bg-slate-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {generatingRoutinePdf ? (
                "Generando..."
              ) : (
                <>
                  <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                  Previsualizar PDF
                </>
              )}
            </button>
          </div>

          <div className="mt-4">
            <AdminRoutineEditor
              clientId={id}
              entries={routineEntries}
              onChange={loadAll}
            />
          </div>

          <RoutineHistoryPanel
            clientId={id}
            routineEntries={routineEntries}
            history={routineHistory}
            onChange={loadAll}
          />
        </div>
      </div>
    </div>
  );
}