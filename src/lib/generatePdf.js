import { MEALS, mealTarget, ACTIVITY_LABELS, GOAL_LABELS } from './macros'

const NAVY = [30, 41, 59]
const ORANGE = [249, 115, 22]
const GRAY = [100, 116, 139]
const RED = [220, 38, 38]
const LIGHT_LINE = [226, 232, 240]

export function scaleFood(food, grams) {
  const factor = grams / 100
  return {
    kcal: food.calorias * factor,
    protein: food.proteinas * factor,
    carbs: food.carbos * factor,
    fat: food.grasas * factor,
  }
}

async function loadImageAsDataUrl(url) {
  const response = await fetch(url)
  const blob = await response.blob()
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
  })
}

export async function generateMacroPdf({ formData, target, mealItems }) {
  const { default: jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const pageHeight = doc.internal.pageSize.getHeight()
  const margin = 44
  let y = 0

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - 40) {
      doc.addPage()
      y = 50
    }
  }

  // Header
  doc.setFillColor(...NAVY)
  doc.rect(0, 0, pageWidth, 92, 'F')

  try {
    const logoDataUrl = await loadImageAsDataUrl('/brand/logo.png')
    doc.addImage(logoDataUrl, 'PNG', margin, 21, 50, 50)
    doc.setTextColor('#ffffff')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('Lógica Fit', margin + 62, 46)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Tu plan de macros y menú del día', margin + 62, 68)
  } catch {
    doc.setTextColor('#ffffff')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(20)
    doc.text('Lógica Fit', margin, 46)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Tu plan de macros y menú del día', margin, 68)
  }

  y = 122

  // Datos personales — todos los campos del formulario
  doc.setTextColor(...NAVY)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Tus datos', margin, y)
  y += 16

  const sexLabel = formData.sex === 'hombre' ? 'Hombre' : 'Mujer'
  const personalRows = [
    ['Sexo', sexLabel],
    ['Edad', `${formData.age} años`],
    ['Peso', `${formData.weight} kg`],
    ['Altura', `${formData.height} cm`],
    ['Nivel de actividad', ACTIVITY_LABELS[formData.activity] || formData.activity],
    ['Objetivo', GOAL_LABELS[formData.goal] || formData.goal],
  ]

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  const colWidth = (pageWidth - margin * 2) / 2
  personalRows.forEach((row, i) => {
    const col = i % 2
    const rowIndex = Math.floor(i / 2)
    const x = margin + col * colWidth
    const rowY = y + rowIndex * 15
    doc.setTextColor(...GRAY)
    doc.text(`${row[0]}:`, x, rowY)
    doc.setTextColor(...NAVY)
    doc.text(row[1], x + 90, rowY)
  })
  y += Math.ceil(personalRows.length / 2) * 15 + 16

  doc.setDrawColor(...LIGHT_LINE)
  doc.line(margin, y, pageWidth - margin, y)
  y += 20

  // Objetivo diario
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...NAVY)
  doc.text(`Objetivo diario: ${target.calories} kcal`, margin, y)
  y += 18

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...ORANGE)
  doc.setFont('helvetica', 'bold')
  doc.text(
    `Proteína ${target.protein}g   ·   Carbohidratos ${target.carbs}g   ·   Grasas ${target.fat}g`,
    margin,
    y
  )
  y += 26

  doc.setDrawColor(...LIGHT_LINE)
  doc.line(margin, y, pageWidth - margin, y)
  y += 24

  // Un cuadrado de color en vez de emoji (los emojis no se renderizan en PDF)
  const drawMealBullet = (x, yPos) => {
    doc.setFillColor(...ORANGE)
    doc.roundedRect(x, yPos - 9, 10, 10, 2, 2, 'F')
  }

  const grandTotal = { kcal: 0, protein: 0, carbs: 0, fat: 0 }

  MEALS.forEach((meal) => {
    const items = mealItems[meal.id] || []
    const mt = mealTarget(target, meal.pct)

    ensureSpace(40)

    drawMealBullet(margin, y)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12.5)
    doc.setTextColor(...NAVY)
    doc.text(meal.label, margin + 16, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9)
    doc.setTextColor(...GRAY)
    doc.text(`objetivo ~${mt.calories} kcal`, pageWidth - margin, y, { align: 'right' })
    y += 18

    if (items.length === 0) {
      doc.setFontSize(9.5)
      doc.setTextColor(...GRAY)
      doc.text('Sin alimentos añadidos.', margin + 16, y)
      y += 22
    } else {
      let totals = { kcal: 0, protein: 0, carbs: 0, fat: 0 }

      items.forEach((it) => {
        ensureSpace(16)
        const s = scaleFood(it, it.grams)
        totals.kcal += s.kcal
        totals.protein += s.protein
        totals.carbs += s.carbs
        totals.fat += s.fat

        doc.setFontSize(9.5)
        doc.setTextColor(...NAVY)
        doc.text(`•  ${it.nombre} (${it.grams} g)`, margin + 16, y)
        doc.setTextColor(...ORANGE)
        doc.text(`${Math.round(s.kcal)} kcal`, pageWidth - margin, y, { align: 'right' })
        y += 15
      })

      grandTotal.kcal += totals.kcal
      grandTotal.protein += totals.protein
      grandTotal.carbs += totals.carbs
      grandTotal.fat += totals.fat

      ensureSpace(20)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(9)
      doc.setTextColor(...GRAY)
      doc.text(
        `Total: ${Math.round(totals.kcal)} kcal  ·  P ${Math.round(totals.protein)}g  ·  C ${Math.round(
          totals.carbs
        )}g  ·  G ${Math.round(totals.fat)}g`,
        margin + 16,
        y
      )
      doc.setFont('helvetica', 'normal')
      y += 24
    }
    y += 6
  })

  // Recuento total del día — con aviso si se supera algún macro
  ensureSpace(90)
  doc.setDrawColor(...LIGHT_LINE)
  doc.line(margin, y, pageWidth - margin, y)
  y += 22

  doc.setFillColor(...NAVY)
  doc.roundedRect(margin, y - 16, pageWidth - margin * 2, 76, 8, 8, 'F')

  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('Total del día (todos los alimentos añadidos)', margin + 14, y + 4)

  const summaryFields = [
    { label: 'Kcal', value: grandTotal.kcal, targetValue: target.calories, unit: '' },
    { label: 'Proteína', value: grandTotal.protein, targetValue: target.protein, unit: 'g' },
    { label: 'Carbohidratos', value: grandTotal.carbs, targetValue: target.carbs, unit: 'g' },
    { label: 'Grasas', value: grandTotal.fat, targetValue: target.fat, unit: 'g' },
  ]

  const fieldWidth = (pageWidth - margin * 2 - 28) / 4
  summaryFields.forEach((f, i) => {
    const x = margin + 14 + i * fieldWidth
    const exceeded = f.value > f.targetValue
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(13)
    doc.setTextColor(exceeded ? 252 : 255, exceeded ? 165 : 255, exceeded ? 165 : 255)
    doc.text(`${Math.round(f.value)}${f.unit}`, x, y + 28)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(8)
    doc.setTextColor(203, 213, 225)
    doc.text(`${f.label} (obj. ${Math.round(f.targetValue)}${f.unit})`, x, y + 40)
    if (exceeded) {
      doc.setTextColor(252, 165, 165)
      doc.setFontSize(7.5)
      doc.text('SUPERADO', x, y + 51)
    }
  })

  y += 76

  doc.save('logica-fit-plan-macros.pdf')
}