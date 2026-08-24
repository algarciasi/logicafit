export const ACTIVITY_FACTORS = {
  sedentario: 1.2,
  ligero: 1.375,
  moderado: 1.55,
  intenso: 1.725,
  muy_intenso: 1.9,
}

export const GOAL_ADJUSTMENTS = {
  perder: -0.15,
  mantener: 0,
  ganar: 0.1,
}

export const MEALS = [
  { id: 'desayuno', label: 'Desayuno', icon: '🍳', pct: 0.25 },
  { id: 'almuerzo', label: 'Almuerzo', icon: '🍎', pct: 0.1 },
  { id: 'comida', label: 'Comida', icon: '🍽️', pct: 0.35 },
  { id: 'merienda', label: 'Merienda', icon: '🥪', pct: 0.1 },
  { id: 'cena', label: 'Cena', icon: '🌙', pct: 0.2 },
]

export const ACTIVITY_LABELS = {
  sedentario: 'Sedentario (trabajo de oficina, sin ejercicio)',
  ligero: 'Ligero (1-3 días/semana)',
  moderado: 'Moderado (3-5 días/semana)',
  intenso: 'Intenso (6-7 días/semana)',
  muy_intenso: 'Muy intenso (2x al día, físico)',
}

export const GOAL_LABELS = {
  perder: 'Perder grasa',
  mantener: 'Mantener',
  ganar: 'Ganar músculo',
}

// Mifflin-St Jeor
export function calcMacros({ sex, age, weight, height, activity, goal }) {
  const bmr =
    sex === 'hombre'
      ? 10 * weight + 6.25 * height - 5 * age + 5
      : 10 * weight + 6.25 * height - 5 * age - 161

  const tdee = bmr * (ACTIVITY_FACTORS[activity] ?? 1.375)
  const calories = Math.round(tdee * (1 + (GOAL_ADJUSTMENTS[goal] ?? 0)))

  const protein = Math.round(weight * 2)
  const fat = Math.round(weight * 0.8)
  const proteinKcal = protein * 4
  const fatKcal = fat * 9
  const carbs = Math.max(0, Math.round((calories - proteinKcal - fatKcal) / 4))

  return { calories, protein, carbs, fat }
}

export function mealTarget(daily, pct) {
  return {
    calories: Math.round(daily.calories * pct),
    protein: Math.round(daily.protein * pct),
    carbs: Math.round(daily.carbs * pct),
    fat: Math.round(daily.fat * pct),
  }
}