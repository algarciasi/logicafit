import { useEffect, useState } from "react";
import { listAllFoods } from "../../lib/foods";
import { DIAS_SEMANA } from "../../lib/routines";
import { diaLabel } from "../../lib/routines"; // Importamos para mostrar el día bonito

// Cache simple en memoria
let cachedFoods = null;

export default function MealFoodPicker({ mealId, onAdd }) {
  const [foods, setFoods] = useState(cachedFoods || []);
  const [loading, setLoading] = useState(!cachedFoods);

  const [superFilter, setSuperFilter] = useState("");
  const [searchText, setSearchText] = useState("");
  const [selectedId, setSelectedId] = useState("");

  const [cantidad, setCantidad] = useState(100);
  const [unidad, setUnidad] = useState("g");
  const [opcion, setOpcion] = useState(1);

  const [todosLosDias, setTodosLosDias] = useState(true);
  const [selectedDays, setSelectedDays] = useState([]);
  
  // 🚀 NUEVO: Array para guardar los alimentos temporalmente antes de subirlos
  const [stagedItems, setStagedItems] = useState([]);
  const [saving, setSaving] = useState(false);

  // Estados para los menús desplegables custom
  const [superOpen, setSuperOpen] = useState(false);
  const [unidadOpen, setUnidadOpen] = useState(false);
  const [opcionOpen, setOpcionOpen] = useState(false);

  useEffect(() => {
    if (cachedFoods) return;
    listAllFoods().then(({ foods }) => {
      cachedFoods = foods;
      setFoods(foods);
      setLoading(false);
    });
  }, []);

  const supermarkets = [
    ...new Set(foods.map((f) => f.supermercado).filter(Boolean)),
  ].sort();

  const filteredFoods = foods.filter(
    (f) => !superFilter || f.supermercado === superFilter,
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);

    const found = filteredFoods.find((f) => {
      const label = f.supermercado
        ? `${f.nombre} (${f.supermercado})`
        : f.nombre;
      return label === val;
    });

    setSelectedId(found ? found.id : "");
  };

  const toggleDay = (value) => {
    setSelectedDays((prev) =>
      prev.includes(value) ? prev.filter((d) => d !== value) : [...prev, value],
    );
  };

  // 🚀 NUEVO: Añadir a la lista temporal
  const handleStageItem = () => {
    if (!selectedId) return;
    const food = foods.find((f) => f.id === Number(selectedId));
    if (!food) return;

    const newItems = [];
    if (todosLosDias) {
      newItems.push({ food, cantidad: Number(cantidad), dia: null, opcion: Number(opcion), unidad });
    } else {
      for (const dia of selectedDays) {
        newItems.push({ food, cantidad: Number(cantidad), dia, opcion: Number(opcion), unidad });
      }
    }

    setStagedItems([...stagedItems, ...newItems]);
    
    // Limpiamos solo el buscador para añadir rápido el siguiente
    setSelectedId("");
    setSearchText("");
    setCantidad(100);
  };

  const handleRemoveStaged = (indexToRemove) => {
    setStagedItems(stagedItems.filter((_, idx) => idx !== indexToRemove));
  };

  // 🚀 NUEVO: Guardar todo de golpe en la base de datos
  const handleSaveAll = async () => {
    setSaving(true);
    // Ejecutamos todos los guardados secuencialmente
    for (const item of stagedItems) {
      // eslint-disable-next-line no-await-in-loop
      await onAdd(mealId, item.food, item.cantidad, item.dia, item.opcion, item.unidad);
    }
    setStagedItems([]);
    setSaving(false);
  };

  if (loading) {
    return <p className="mt-4 text-xs font-medium text-slate-400">Cargando base de datos de alimentos…</p>;
  }

  const canStage = selectedId && (todosLosDias || selectedDays.length > 0);

  return (
    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
      
      {/* 🚀 LISTA TEMPORAL (Solo se muestra si hay items preparados) */}
      {stagedItems.length > 0 && (
        <div className="mb-5 rounded-xl bg-white p-3 ring-1 ring-slate-200/60 shadow-sm animate-fade-in-up">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-[10px] font-extrabold uppercase tracking-widest text-slate-400">
              Listos para guardar ({stagedItems.length})
            </p>
          </div>
          <ul className="mb-3 space-y-1.5">
            {stagedItems.map((it, idx) => (
              <li key={idx} className="flex items-center justify-between rounded-lg bg-slate-50 px-3 py-2 text-xs">
                <span className="text-navy font-semibold truncate pr-2">
                  {it.food.nombre} — <span className="text-orange">{it.cantidad}{it.unidad}</span>
                  <span className="ml-1 text-[10px] text-slate-400 font-medium">
                    ({it.dia ? diaLabel(it.dia).slice(0,3) : "todos"} · Opc {it.opcion})
                  </span>
                </span>
                <button
                  type="button"
                  onClick={() => handleRemoveStaged(idx)}
                  className="text-slate-400 hover:text-red-500 font-bold px-1"
                >
                  ✕
                </button>
              </li>
            ))}
          </ul>
          <button
            type="button"
            onClick={handleSaveAll}
            disabled={saving}
            className="w-full rounded-xl bg-navy py-2.5 text-xs font-bold text-white shadow-md transition-all hover:bg-orange active:scale-95 disabled:opacity-50"
          >
            {saving ? "Guardando todos…" : "Confirmar y guardar en el plan"}
          </button>
        </div>
      )}

      {/* FILA 1: Supermercado y Buscador */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3 relative z-30">
        
        {/* CUSTOM DROPDOWN: Supermercado */}
        <div className="relative sm:w-48 shrink-0">
          <button
            type="button"
            onClick={() => setSuperOpen(!superOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 hover:border-slate-300"
          >
            <span className="truncate">{superFilter || "Todos los súpers"}</span>
            <svg className={`h-4 w-4 text-slate-400 transition-transform ${superOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          
          {superOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setSuperOpen(false)}></div>
              <div className="absolute left-0 top-full z-50 mt-1 max-h-60 w-full overflow-y-auto rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                <button
                  type="button"
                  onClick={() => { setSuperFilter(""); setSearchText(""); setSelectedId(""); setSuperOpen(false); }}
                  className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${!superFilter ? 'bg-orange/10 text-orange' : 'text-navy hover:bg-slate-50'}`}
                >
                  Todos los súpers
                </button>
                {supermarkets.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => { setSuperFilter(s); setSearchText(""); setSelectedId(""); setSuperOpen(false); }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${superFilter === s ? 'bg-orange/10 text-orange' : 'text-navy hover:bg-slate-50'}`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>

        {/* Buscador de Alimento con Datalist (Nativo está OK porque es un input de texto) */}
        <div className="flex-1 relative">
          <input
            list={`foods-list-${mealId}`}
            value={searchText}
            onChange={handleSearchChange}
            placeholder="Buscar o escribir alimento..."
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange"
          />
          <datalist id={`foods-list-${mealId}`}>
            {filteredFoods.map((f) => (
              <option key={f.id} value={f.supermercado ? `${f.nombre} (${f.supermercado})` : f.nombre} />
            ))}
          </datalist>
        </div>
      </div>

      {/* FILA 2: Cantidad, Unidad y Opción */}
      <div className="flex flex-col sm:flex-row gap-3 relative z-20">
        <div className="flex gap-2 w-full sm:w-auto">
          <div className="relative w-24 shrink-0">
            <input
              type="number"
              min="1"
              value={cantidad}
              onChange={(e) => setCantidad(e.target.value)}
              className="w-full rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange text-center"
            />
          </div>

          {/* CUSTOM DROPDOWN: Unidad */}
          <div className="relative w-20 shrink-0">
            <button
              type="button"
              onClick={() => setUnidadOpen(!unidadOpen)}
              className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 text-sm font-bold text-slate-500 outline-none hover:border-slate-300"
            >
              <span>{unidad}</span>
              <svg className={`h-3 w-3 text-slate-400 transition-transform ${unidadOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            {unidadOpen && (
              <>
                <div className="fixed inset-0 z-40" onClick={() => setUnidadOpen(false)}></div>
                <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                  {["g", "ml"].map((u) => (
                    <button
                      key={u}
                      type="button"
                      onClick={() => { setUnidad(u); setUnidadOpen(false); }}
                      className={`block w-full rounded-lg px-2 py-2 text-center text-xs font-extrabold transition-colors ${unidad === u ? 'bg-orange/10 text-orange' : 'text-slate-500 hover:bg-slate-50'}`}
                    >
                      {u}
                    </button>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>

        {/* CUSTOM DROPDOWN: Opción */}
        <div className="relative w-full sm:w-36 shrink-0 z-10">
          <button
            type="button"
            onClick={() => setOpcionOpen(!opcionOpen)}
            className="flex w-full items-center justify-between rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-orange outline-none hover:border-slate-300"
          >
            <span>Opción {opcion}</span>
            <svg className={`h-3 w-3 text-orange transition-transform ${opcionOpen ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          {opcionOpen && (
            <>
              <div className="fixed inset-0 z-40" onClick={() => setOpcionOpen(false)}></div>
              <div className="absolute left-0 top-full z-50 mt-1 w-full rounded-xl border border-slate-100 bg-white p-1.5 shadow-xl animate-fade-in-up">
                {[1, 2, 3, 4, 5].map((n) => (
                  <button
                    key={n}
                    type="button"
                    onClick={() => { setOpcion(n); setOpcionOpen(false); }}
                    className={`block w-full rounded-lg px-3 py-2 text-left text-xs font-extrabold transition-colors ${opcion === n ? 'bg-orange/10 text-orange' : 'text-navy hover:bg-slate-50'}`}
                  >
                    Opción {n}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* FILA 3: Días de la semana y Añadir a lista */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/60 pt-4 relative z-0">
        <div className="flex flex-wrap items-center gap-3">
          <label className="flex items-center gap-2 text-xs font-bold text-navy cursor-pointer">
            <input
              type="checkbox"
              checked={todosLosDias}
              onChange={(e) => {
                setTodosLosDias(e.target.checked);
                if (e.target.checked) setSelectedDays([]);
              }}
              className="h-4 w-4 rounded border-slate-300 text-orange focus:ring-orange"
            />
            Todos los días
          </label>

          {!todosLosDias && (
            <div className="flex flex-wrap gap-2 border-l border-slate-200 pl-3">
              {DIAS_SEMANA.map((d) => (
                <label
                  key={d.value}
                  className={`flex cursor-pointer items-center justify-center rounded-lg px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    selectedDays.includes(d.value)
                      ? "bg-navy text-white"
                      : "bg-white text-slate-400 border border-slate-200 hover:border-navy hover:text-navy"
                  }`}
                >
                  <input
                    type="checkbox"
                    className="hidden"
                    checked={selectedDays.includes(d.value)}
                    onChange={() => toggleDay(d.value)}
                  />
                  {d.label.slice(0, 3)}
                </label>
              ))}
            </div>
          )}
        </div>

        <button
          type="button"
          onClick={handleStageItem}
          disabled={!canStage}
          className="shrink-0 rounded-xl bg-orange/10 border border-orange/20 px-6 py-2.5 text-xs font-extrabold text-orange transition-all hover:bg-orange/20 active:scale-95 disabled:opacity-50 disabled:hover:scale-100"
        >
          + Pre-añadir alimento
        </button>
      </div>
    </div>
  );
}