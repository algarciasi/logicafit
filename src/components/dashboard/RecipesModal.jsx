import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { listActiveRecipes } from "../../lib/recipes";

const splitLines = (value) =>
  String(value || "")
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

export default function RecipesModal({ open, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [recipes, setRecipes] = useState([]);
  const [selectedRecipe, setSelectedRecipe] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  const [activeCategory, setActiveCategory] = useState("Todas");

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!open) return;

    setSelectedRecipe(null);
    setActiveCategory("Todas");
    setLoading(true);
    setError(null);

    listActiveRecipes().then(({ recipes, error }) => {
      setRecipes(recipes || []);
      setError(error);
      setLoading(false);
    });
  }, [open]);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        if (selectedRecipe) {
          setSelectedRecipe(null);
        } else {
          onClose();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, onClose, selectedRecipe]);

  if (!open || !mounted) return null;

  const recipeImage = selectedRecipe?.imagen_url;

  const categories = [
    "Todas",
    ...new Set(recipes.map((r) => r.categoria).filter(Boolean)),
  ];

  const filteredRecipes =
    activeCategory === "Todas"
      ? recipes
      : recipes.filter((r) => r.categoria === activeCategory);

  const modalContent = (
    <div
      className="fixed inset-0 z-[9999] flex items-end justify-center bg-navy/75 p-0 backdrop-blur-sm sm:items-center sm:p-6"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose();
      }}
    >
      <div className="flex max-h-[94vh] w-full max-w-md flex-col overflow-hidden rounded-t-[2rem] bg-surface shadow-2xl sm:max-h-[90vh] sm:rounded-[2rem]">
        {/* Cabecera */}
        <div className="flex shrink-0 items-center justify-between border-b border-slate-100 px-5 py-4 sm:px-6">
          <div className="min-w-0">
            {selectedRecipe ? (
              <button
                type="button"
                onClick={() => setSelectedRecipe(null)}
                className="mb-1 inline-flex items-center gap-1 text-[11px] font-extrabold uppercase tracking-wider text-orange"
              >
                ← Todas las recetas
              </button>
            ) : (
              <p className="text-[11px] font-extrabold uppercase tracking-[0.16em] text-orange">
                Lógica Fit
              </p>
            )}

            <h2 className="font-display text-2xl font-extrabold text-navy">
              {selectedRecipe ? selectedRecipe.titulo : "Recetas"}
            </h2>
          </div>

          <button
            type="button"
            onClick={onClose}
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-slate-100 text-slate-500 transition hover:bg-slate-200 hover:text-navy"
            aria-label="Cerrar recetas"
          >
            <svg
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18 18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="overflow-y-auto bg-white">
          {loading && (
            <div className="grid gap-5 p-5 sm:p-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="h-44 animate-pulse rounded-2xl bg-slate-100"
                />
              ))}
            </div>
          )}

          {!loading && error && (
            <div className="p-5 sm:p-6">
              <div className="rounded-2xl border border-red-100 bg-red-50 p-4">
                <p className="font-bold text-red-600">
                  No se pudieron cargar las recetas
                </p>
                <p className="mt-1 text-sm text-red-500">{error.message}</p>
              </div>
            </div>
          )}

          {!loading && !error && !selectedRecipe && recipes.length === 0 && (
            <div className="px-6 py-16 text-center">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-orange/10 text-2xl">
                🍳
              </div>

              <h3 className="mt-4 font-display text-xl font-extrabold text-navy">
                Próximamente
              </h3>

              <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-slate-500">
                Aquí irán apareciendo las recetas que vaya añadiendo a Lógica Fit.
              </p>
            </div>
          )}

          {/* BARRA DE CATEGORÍAS */}
          {!loading && !error && !selectedRecipe && recipes.length > 0 && categories.length > 1 && (
            <div className="sticky top-0 z-10 border-b border-slate-100 bg-white/95 px-5 py-3 backdrop-blur-md sm:px-6">
              <style>{`.no-scrollbar::-webkit-scrollbar { display: none; }`}</style>
              
              <div className="no-scrollbar flex gap-2 overflow-x-auto" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setActiveCategory(cat)}
                    className={`shrink-0 rounded-full px-3.5 py-1.5 text-[10px] font-extrabold uppercase tracking-wider transition-all ${
                      activeCategory === cat
                        ? "brand-gradient text-navy shadow-sm ring-1 ring-[#DBAA1E]/30" // <-- ¡Aquí está tu degradado dorado!
                        : "bg-slate-50 text-slate-500 ring-1 ring-inset ring-slate-200 hover:bg-slate-100 hover:text-navy"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* VISTA CUADRÍCULA */}
          {!loading && !error && !selectedRecipe && recipes.length > 0 && (
            <div className="grid grid-cols-1 gap-5 p-5 sm:p-6">
              {filteredRecipes.length > 0 ? (
                filteredRecipes.map((recipe) => (
                  <button
                    key={recipe.id}
                    type="button"
                    onClick={() => setSelectedRecipe(recipe)}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-100 bg-white text-left shadow-sm transition hover:-translate-y-0.5 hover:shadow-md"
                  >
                    {recipe.imagen_url ? (
                      <div className="aspect-[16/9] w-full shrink-0 overflow-hidden bg-slate-100">
                        <img
                          src={recipe.imagen_url}
                          alt={recipe.titulo}
                          className="h-full w-full object-cover transition duration-500 group-hover:scale-[1.03]"
                          loading="lazy"
                        />
                      </div>
                    ) : (
                      <div className="brand-gradient flex aspect-[16/9] w-full shrink-0 items-center justify-center">
                        <span className="text-4xl">🍽️</span>
                      </div>
                    )}

                    <div className="p-4 sm:p-5">
                      <h3 className="font-display text-lg font-extrabold leading-snug text-navy">
                        {recipe.titulo}
                      </h3>
                    </div>
                  </button>
                ))
              ) : (
                <div className="py-12 text-center">
                  <p className="text-sm font-medium text-slate-500">
                    No hay recetas en esta categoría todavía.
                  </p>
                </div>
              )}
            </div>
          )}

          {/* VISTA DETALLE DE LA RECETA */}
          {!loading && !error && selectedRecipe && (
            <div className="mx-auto max-w-md pb-6">
              {recipeImage && (
                <div className="aspect-[16/9] w-full overflow-hidden bg-slate-100">
                  <img
                    src={recipeImage}
                    alt={selectedRecipe.titulo}
                    className="h-full w-full object-cover"
                  />
                </div>
              )}

              <div className="p-5 sm:p-6">
                {selectedRecipe.detalle && (
                  <div className="rounded-2xl bg-slate-50 p-4 ring-1 ring-slate-100 sm:p-5">
                    <p className="whitespace-pre-line text-base font-medium leading-7 text-slate-600">
                      {selectedRecipe.detalle}
                    </p>
                  </div>
                )}

                <div className="mt-6 grid grid-cols-3 gap-2">
                  {selectedRecipe.kcal !== null && selectedRecipe.kcal !== undefined && (
                    <Metric label="Kcal" value={selectedRecipe.kcal} />
                  )}
                  {selectedRecipe.proteinas !== null && selectedRecipe.proteinas !== undefined && (
                    <Metric label="Proteína" value={`${selectedRecipe.proteinas}g`} />
                  )}
                  {selectedRecipe.carbos !== null && selectedRecipe.carbos !== undefined && (
                    <Metric label="Carbos" value={`${selectedRecipe.carbos}g`} />
                  )}
                  {selectedRecipe.grasas !== null && selectedRecipe.grasas !== undefined && (
                    <Metric label="Grasas" value={`${selectedRecipe.grasas}g`} />
                  )}
                  {selectedRecipe.porciones && (
                    <Metric label="Porciones" value={selectedRecipe.porciones} />
                  )}
                </div>

                {(selectedRecipe.ingredientes || selectedRecipe.preparacion) && (
                  <div className="mt-8 grid gap-8">
                    {selectedRecipe.ingredientes && (
                      <section>
                        <h3 className="font-display text-xl font-extrabold text-navy">
                          Ingredientes
                        </h3>
                        <ul className="mt-4 space-y-3">
                          {splitLines(selectedRecipe.ingredientes).map((ingredient, index) => (
                            <li
                              key={`${ingredient}-${index}`}
                              className="flex gap-3 text-sm leading-5 text-slate-600"
                            >
                              <span className="mt-1.5 h-2 w-2 shrink-0 rounded-full bg-orange" />
                              <span>{ingredient}</span>
                            </li>
                          ))}
                        </ul>
                      </section>
                    )}

                    {selectedRecipe.preparacion && (
                      <section>
                        <h3 className="font-display text-xl font-extrabold text-navy">
                          Preparación
                        </h3>
                        <ol className="mt-4 space-y-4">
                          {splitLines(selectedRecipe.preparacion).map((step, index) => (
                            <li
                              key={`${step}-${index}`}
                              className="flex gap-3 text-sm leading-6 text-slate-600"
                            >
                              <span className="brand-gradient flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[11px] font-extrabold text-navy">
                                {index + 1}
                              </span>
                              <span className="pt-0.5">{step}</span>
                            </li>
                          ))}
                        </ol>
                      </section>
                    )}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );

  return createPortal(modalContent, document.body);
}

function Metric({ label, value }) {
  return (
    <div className="flex flex-col justify-center rounded-xl bg-slate-50 px-3 py-3 ring-1 ring-slate-100 items-center text-center">
      <p className="text-[9px] font-bold uppercase tracking-wider text-slate-400">
        {label}
      </p>
      <p className="mt-1 font-display text-base font-extrabold text-navy">
        {value}
      </p>
    </div>
  );
}