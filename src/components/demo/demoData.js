// Datos de ejemplo para la demo pública — misma forma que los datos reales de Supabase,
// para que la demo enseñe exactamente la interfaz real, no una versión distinta.

export const demoClient = {
  full_name: 'Alberto García',
  email: 'demo@logicafit.com',
  objetivo_entrenamiento: 'recomposicion',
  tipo_plan: 'Método Lógica',
  plan_vigente_hasta: '2026-12-20',
  proxima_revision: '2026-09-14',
}

export const demoRoutineEntries = [
  {
    id: 1,
    dia_semana: 1,
    orden: 1,
    series_objetivo: 1,
    reps_objetivo: 5,
    notas_entrenador: 'Top set al 85-88%, controla la bajada',
    ejercicios: { nombre: 'Sentadilla con barra', grupo_muscular: 'Pierna' },
  },
  {
    id: 2,
    dia_semana: 1,
    orden: 2,
    series_objetivo: 3,
    reps_objetivo: 10,
    notas_entrenador: 'Última serie a dropset',
    ejercicios: { nombre: 'Press banca mancuernas', grupo_muscular: 'Pectoral' },
  },
  {
    id: 3,
    dia_semana: 3,
    orden: 1,
    series_objetivo: 1,
    reps_objetivo: 6,
    notas_entrenador: 'Tempo 3-1-1 en las series de bajada',
    ejercicios: { nombre: 'Peso muerto rumano', grupo_muscular: 'Femoral' },
  },
  {
    id: 4,
    dia_semana: 3,
    orden: 2,
    series_objetivo: 3,
    reps_objetivo: 12,
    notas_entrenador: 'Escápulas atrás y abajo',
    ejercicios: { nombre: 'Remo en polea', grupo_muscular: 'Espalda' },
  },
  {
    id: 5,
    dia_semana: 5,
    orden: 1,
    series_objetivo: 1,
    reps_objetivo: 5,
    notas_entrenador: 'Core firme, sin arquear lumbar',
    ejercicios: { nombre: 'Press militar de pie', grupo_muscular: 'Hombro' },
  },
]

export const demoDietEntries = [
  {
    id: 1,
    momento_dia: 'desayuno',
    cantidad_g: 100,
    foods: { nombre: 'Avena con chocolate', calorias: 405, proteinas: 10.8, carbos: 59.5, grasas: 11.4 },
  },
  {
    id: 2,
    momento_dia: 'comida',
    cantidad_g: 180,
    foods: { nombre: 'Pechuga de pollo', calorias: 108, proteinas: 22, carbos: 1, grasas: 2 },
  },
  {
    id: 3,
    momento_dia: 'comida',
    cantidad_g: 150,
    foods: { nombre: 'Arroz basmati', calorias: 347, proteinas: 6.5, carbos: 78, grasas: 0.8 },
  },
  {
    id: 4,
    momento_dia: 'merienda',
    cantidad_g: 1,
    foods: { nombre: 'Manzana roja', calorias: 52, proteinas: 0.5, carbos: 14, grasas: 0.2 },
  },
  {
    id: 5,
    momento_dia: 'cena',
    cantidad_g: 150,
    foods: { nombre: 'Salmón', calorias: 208, proteinas: 20, carbos: 0, grasas: 13 },
  },
]

export const demoProgressEntries = [
  { created_at: '2026-06-01', peso: 64, cintura: 76, pecho: 96 },
  { created_at: '2026-06-15', peso: 63.4, cintura: 75, pecho: 96.5 },
  { created_at: '2026-07-01', peso: 63, cintura: 74, pecho: 97 },
  { created_at: '2026-07-15', peso: 62.7, cintura: 73.5, pecho: 97.5 },
  { created_at: '2026-08-01', peso: 62.5, cintura: 73, pecho: 98 },
]

export const demoStravaActivities = [
  { id: 1, nombre: 'Rodaje matutino', tipo: 'Run', distancia_m: 6200, duracion_s: 1860, fecha: '2026-08-04' },
  { id: 2, nombre: 'Fuerza · Tren superior', tipo: 'WeightTraining', distancia_m: 0, duracion_s: 3120, fecha: '2026-08-02' },
  { id: 3, nombre: 'Serie de cuestas', tipo: 'Run', distancia_m: 4800, duracion_s: 1740, fecha: '2026-07-30' },
]