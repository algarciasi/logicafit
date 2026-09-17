import { supabase } from "./supabaseClient";

// dia_semana: 1 = Lunes ... 7 = Domingo
// Convención propia, consistente en toda la app.
export const DIAS_SEMANA = [
  { value: 1, label: "Lunes" },
  { value: 2, label: "Martes" },
  { value: 3, label: "Miércoles" },
  { value: 4, label: "Jueves" },
  { value: 5, label: "Viernes" },
  { value: 6, label: "Sábado" },
  { value: 7, label: "Domingo" },
];

const ROUTINE_SELECT =
  "id, dia_semana, ejercicio_id, orden, series_objetivo, reps_objetivo, notas_entrenador, ejercicios(nombre, grupo_muscular, video_url)";

export function diaLabel(diaSemana) {
  const value = Number(diaSemana);

  return (
    DIAS_SEMANA.find((d) => d.value === value)?.label || `Día ${diaSemana}`
  );
}

export async function listClientRoutine(clientId) {
  const { data, error } = await supabase
    .from("rutinas")
    .select(ROUTINE_SELECT)
    .eq("client_id", clientId)
    .order("dia_semana", { ascending: true })
    .order("orden", { ascending: true })
    .order("id", { ascending: true });

  return {
    entries: data || [],
    error,
  };
}

export async function addRoutineEntry({
  clientId,
  diaSemana,
  ejercicioId,
  orden,
  seriesObjetivo,
  repsObjetivo,
  notasEntrenador,
}) {
  const { data, error } = await supabase
    .from("rutinas")
    .insert({
      client_id: clientId,
      dia_semana: Number(diaSemana),
      ejercicio_id: Number(ejercicioId),
      orden: Number(orden),
      series_objetivo: Number(seriesObjetivo),
      reps_objetivo:
        repsObjetivo === null ||
        repsObjetivo === undefined ||
        repsObjetivo === ""
          ? null
          : Number(repsObjetivo),
      notas_entrenador: notasEntrenador?.trim() || null,
    })
    .select(ROUTINE_SELECT)
    .single();

  return {
    entry: data,
    error,
  };
}

export async function updateRoutineEntry(
  id,
  {
    diaSemana,
    ejercicioId,
    orden,
    seriesObjetivo,
    repsObjetivo,
    notasEntrenador,
  },
) {
  const { data, error } = await supabase
    .from("rutinas")
    .update({
      dia_semana: Number(diaSemana),
      ejercicio_id: Number(ejercicioId),
      orden: Number(orden),
      series_objetivo: Number(seriesObjetivo),
      reps_objetivo:
        repsObjetivo === null ||
        repsObjetivo === undefined ||
        repsObjetivo === ""
          ? null
          : Number(repsObjetivo),
      notas_entrenador: notasEntrenador?.trim() || null,
    })
    .eq("id", id)
    .select(ROUTINE_SELECT)
    .single();

  return {
    entry: data,
    error,
  };
}

/*
  Reordena COMPLETAMENTE un día.

  Recibe los ejercicios YA en el orden deseado y termina guardándolos
  como 1, 2, 3, 4...

  Se hace en dos pasos:
    1. Orden temporal alto.
    2. Orden definitivo 1..N.

  Esto evita conflictos incluso si en Supabase existe una restricción
  única sobre día + orden.
*/
export async function reorderRoutineDay(orderedEntries = []) {
  if (!orderedEntries.length) {
    return { error: null };
  }

  // Paso 1: mover todos a números temporales que no colisionen.
  for (let index = 0; index < orderedEntries.length; index += 1) {
    const entry = orderedEntries[index];

    const { error } = await supabase
      .from("rutinas")
      .update({
        orden: 10000 + index,
      })
      .eq("id", entry.id);

    if (error) {
      return { error };
    }
  }

  // Paso 2: normalizar definitivamente a 1, 2, 3...
  for (let index = 0; index < orderedEntries.length; index += 1) {
    const entry = orderedEntries[index];

    const { error } = await supabase
      .from("rutinas")
      .update({
        orden: index + 1,
      })
      .eq("id", entry.id);

    if (error) {
      return { error };
    }
  }

  return { error: null };
}

export async function deleteRoutineEntry(id) {
  const { data, error } = await supabase
    .from("rutinas")
    .delete()
    .eq("id", id)
    .select();

  if (error) {
    return { error };
  }

  if (!data || data.length === 0) {
    return {
      error: {
        message:
          "No se ha borrado ninguna fila (0 filas afectadas). Revisa los permisos/RLS de la tabla rutinas en Supabase.",
      },
    };
  }

  return { error: null };
}
