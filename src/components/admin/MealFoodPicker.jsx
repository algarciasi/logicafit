import { useEffect, useState } from "react";
import { listAllFoods } from "../../lib/foods";
import { DIAS_SEMANA } from "../../lib/routines";

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
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (cachedFoods) return;
    listAllFoods().then(({ foods }) => {
      cachedFoods = foods;
      setFoods(foods);
      setLoading(false);
    });
  }, []);

  // Extraer lista única de supermercados para el filtro (Ignorando los que estén vacíos)
  const supermarkets = [
    ...new Set(foods.map((f) => f.supermercado).filter(Boolean)),
  ].sort();

  // Filtrar alimentos según el supermercado seleccionado
  const filteredFoods = foods.filter(
    (f) => !superFilter || f.supermercado === superFilter,
  );

  const handleSearchChange = (e) => {
    const val = e.target.value;
    setSearchText(val);

    // Buscar si coincide
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

  const handleAdd = async () => {
    if (!selectedId) return;
    const food = foods.find((f) => f.id === Number(selectedId));
    if (!food) return;

    setSaving(true);

    if (todosLosDias) {
      // AQUÍ: Añadida la variable "unidad" al final
      await onAdd(mealId, food, Number(cantidad), null, Number(opcion), unidad);
    } else {
      for (const dia of selectedDays) {
        // AQUÍ TAMBIÉN: Añadida la variable "unidad" al final
        // eslint-disable-next-line no-await-in-loop
        await onAdd(
          mealId,
          food,
          Number(cantidad),
          dia,
          Number(opcion),
          unidad,
        );
      }
    }

    setSaving(false);
    setSelectedId("");
    setSearchText("");
    setCantidad(100);
    setUnidad("g");
  };

  if (loading) {
    return (
      <p className="mt-4 text-xs font-medium text-slate-400">
        Cargando base de datos de alimentos…
      </p>
    );
  }

  const canAdd = selectedId && (todosLosDias || selectedDays.length > 0);

  return (
    <div className="mt-4 rounded-2xl bg-slate-50 border border-slate-100 p-4">
      {/* FILA 1: Supermercado y Buscador */}
      <div className="flex flex-col sm:flex-row gap-3 mb-3">
        {/* Filtro de Supermercado con flecha custom */}
        <div className="relative sm:w-48 shrink-0">
          <select
            value={superFilter}
            onChange={(e) => {
              setSuperFilter(e.target.value);
              setSearchText("");
              setSelectedId("");
            }}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-bold text-navy outline-none focus:border-orange focus:ring-1 focus:ring-orange cursor-pointer transition-colors hover:border-slate-300"
          >
            <option value="">Todos los súpers</option>
            {supermarkets.map((s) => (
              <option key={s} value={s}>
                {s}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-slate-400">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>

        {/* Buscador de Alimento con Datalist */}
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
              <option
                key={f.id}
                value={
                  f.supermercado ? `${f.nombre} (${f.supermercado})` : f.nombre
                }
              />
            ))}
          </datalist>
        </div>
      </div>

      {/* FILA 2: Cantidad, Unidad y Opción */}
      <div className="flex flex-col sm:flex-row gap-3">
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

          {/* Selector g / ml con flecha custom */}
          <div className="relative w-16 shrink-0">
            <select
              value={unidad}
              onChange={(e) => setUnidad(e.target.value)}
              className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-2 py-2.5 text-sm font-bold text-slate-500 outline-none focus:border-orange focus:ring-1 focus:ring-orange text-center cursor-pointer transition-colors hover:border-slate-300"
            >
              <option value="g">g</option>
              <option value="ml">ml</option>
            </select>
          </div>
        </div>

        {/* Bloque: Opción con flecha custom */}
        <div className="relative w-full sm:w-32 shrink-0">
          <select
            value={opcion}
            onChange={(e) => setOpcion(e.target.value)}
            className="w-full appearance-none rounded-xl border border-slate-200 bg-white px-3 py-2.5 pr-8 text-sm font-bold text-orange outline-none focus:border-orange focus:ring-1 focus:ring-orange cursor-pointer transition-colors hover:border-slate-300"
          >
            {[1, 2, 3, 4, 5].map((n) => (
              <option key={n} value={n}>
                Opción {n}
              </option>
            ))}
          </select>
          <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-3 text-orange">
            <svg
              className="h-4 w-4"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2.5"
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </div>
        </div>
      </div>

      {/* FILA 3: Días de la semana y Guardar */}
      <div className="mt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-t border-slate-200/60 pt-4">
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
          onClick={handleAdd}
          disabled={saving || !canAdd}
          className="shrink-0 rounded-xl bg-orange px-6 py-2.5 text-xs font-bold text-white shadow-md shadow-orange/20 transition-all hover:bg-orange-dark hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
        >
          {saving ? "Añadiendo…" : "+ Añadir a dieta"}
        </button>
      </div>
    </div>
  );
}
