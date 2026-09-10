import { DIAS_SEMANA } from './routines'
import { MEALS } from './macros'
import { savePdf } from './pdfSave'

const NAVY = [30, 41, 59]
const ORANGE = [249, 115, 22]
const GRAY = [100, 116, 139]
const LIGHT_LINE = [226, 232, 240]

const DAYS_MAP = {
  1: 'Lunes',
  2: 'Martes',
  3: 'Miércoles',
  4: 'Jueves',
  5: 'Viernes',
  6: 'Sábado',
  7: 'Domingo',
}

const KCAL_KEYS = ['calorias', 'kcal']
const PROT_KEYS = ['proteinas', 'p']
const CARB_KEYS = ['carbos', 'carbohidratos', 'c']
const FAT_KEYS = ['grasas', 'f']

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

async function startDoc(subtitle) {
  const { default: jsPDF } = await import('jspdf')
  const doc = new jsPDF({ unit: 'pt', format: 'a4' })
  const pageWidth = doc.internal.pageSize.getWidth()
  const margin = 44

  doc.setFillColor(...NAVY)
  doc.rect(0, 0, pageWidth, 92, 'F')

  try {
    const logoDataUrl = await loadImageAsDataUrl('/brand/logo.png')
    doc.addImage(logoDataUrl, 'PNG', margin, 21, 50, 50)
    doc.setTextColor('#ffffff')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(19)
    doc.text('Lógica Fit', margin + 62, 46)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(subtitle, margin + 62, 68)
  } catch {
    doc.setTextColor('#ffffff')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(19)
    doc.text('Lógica Fit', margin, 46)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text(subtitle, margin, 68)
  }

  return { doc, pageWidth, margin }
}

// 🚀 RUTINA PDF CON SOPORTE DE PREVIEW
export async function generateRoutinePdf(client, routineEntries, preview = false) {
  const { doc, pageWidth, margin } = await startDoc('Tu rutina de entrenamiento')
  const pageHeight = doc.internal.pageSize.getHeight()
  let y = 122

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - 40) {
      doc.addPage()
      y = 50
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...NAVY)
  doc.text(client.full_name || client.email, margin, y)
  y += 26

  DIAS_SEMANA.forEach((dia) => {
    const items = routineEntries
      .filter((e) => e.dia_semana === dia.value)
      .sort((a, b) => (a.orden ?? 0) - (b.orden ?? 0))
    if (items.length === 0) return

    ensureSpace(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...NAVY)
    doc.text(dia.label, margin, y)
    y += 18

    items.forEach((it) => {
      ensureSpace(20)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(...NAVY)
      doc.text(`•  ${it.ejercicios?.nombre}`, margin + 12, y)
      doc.setTextColor(...ORANGE)
      doc.text(`${it.series_objetivo}×${it.reps_objetivo ?? '?'}`, pageWidth - margin, y, { align: 'right' })
      y += 14
      if (it.notas_entrenador) {
        doc.setFontSize(8.5)
        doc.setTextColor(...GRAY)
        doc.text(`   "${it.notas_entrenador}"`, margin + 12, y)
        y += 13
      }
    })
    y += 10
    doc.setDrawColor(...LIGHT_LINE)
    doc.line(margin, y, pageWidth - margin, y)
    y += 20
  })

  if (preview) {
    const pdfUrl = doc.output('bloburl')
    window.open(pdfUrl, '_blank')
    return pdfUrl
  } else {
    await savePdf(doc, 'logica-fit-mi-rutina.pdf')
  }
}

// ── Cálculo de macros con opciones ────────────────────────────────────────────
const getMacroVal = (food, keys) => {
  for (const k of keys) {
    if (food[k] !== undefined && food[k] !== null) return Number(food[k])
  }
  return 0
}

function calcMealAverage(items, macroKeys) {
  if (items.length === 0) return 0

  const optionsMap = {}
  let baseTotal = 0

  items.forEach((e) => {
    const opt = Number(e.opcion || 1)
    if (!optionsMap[opt]) optionsMap[opt] = 0
    if (e.foods) {
      const val = (getMacroVal(e.foods, macroKeys) * (Number(e.cantidad_g) || 0)) / 100
      optionsMap[opt] += val
      if (!e.dia_semana && opt === 1) baseTotal += val
    }
  })

  const optionKeys = Object.keys(optionsMap)
  if (optionKeys.length === 0) return 0

  let totalSum = 0
  optionKeys.forEach((k) => {
    let optVal = optionsMap[k]
    if (Number(k) !== 1) optVal += baseTotal
    totalSum += optVal
  })

  return totalSum / optionKeys.length
}

function mealMacros(items) {
  return {
    kcal: calcMealAverage(items, KCAL_KEYS),
    protein: calcMealAverage(items, PROT_KEYS),
    carbs: calcMealAverage(items, CARB_KEYS),
    fat: calcMealAverage(items, FAT_KEYS),
  }
}

const macroLine = (m) =>
  `P ${Math.round(m.protein)}g  ·  C ${Math.round(m.carbs)}g  ·  G ${Math.round(m.fat)}g`

// 🚀 DIETA PDF CON SOPORTE DE PREVIEW
export async function generateDietPdf(client, dietEntries, preview = false) {
  const { doc, pageWidth, margin } = await startDoc('Tu plan de nutrición')
  const pageHeight = doc.internal.pageSize.getHeight()
  let y = 122

  const ensureSpace = (needed) => {
    if (y + needed > pageHeight - 40) {
      doc.addPage()
      y = 50
    }
  }

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(14)
  doc.setTextColor(...NAVY)
  doc.text(client.full_name || client.email, margin, y)
  y += 20

  const hasSpecificDays = dietEntries.some((e) => e.dia_semana)
  const dayGroups = hasSpecificDays
    ? [1, 2, 3, 4, 5, 6, 7].map((d) => ({
        label: DAYS_MAP[d],
        items: dietEntries.filter((e) => !e.dia_semana || Number(e.dia_semana) === d),
      }))
    : [{ label: null, items: dietEntries }]

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(...GRAY)
  doc.text(
    'Cuando una comida tiene varias opciones, elige solo una. Los totales son la media de las opciones.',
    margin,
    y
  )
  y += 22

  dayGroups.forEach((group) => {
    if (group.items.length === 0) return

    const dayTotals = { kcal: 0, protein: 0, carbs: 0, fat: 0 }
    MEALS.forEach((meal) => {
      const m = mealMacros(group.items.filter((e) => e.momento_dia === meal.id))
      dayTotals.kcal += m.kcal
      dayTotals.protein += m.protein
      dayTotals.carbs += m.carbs
      dayTotals.fat += m.fat
    })

    ensureSpace(60)

    if (group.label) {
      doc.setFillColor(...NAVY)
      doc.roundedRect(margin, y - 13, pageWidth - margin * 2, 38, 6, 6, 'F')
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11.5)
      doc.setTextColor('#ffffff')
      doc.text(group.label, margin + 12, y + 3)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9.5)
      doc.text(`${Math.round(dayTotals.kcal)} kcal`, pageWidth - margin - 12, y + 3, { align: 'right' })
      doc.setFontSize(8.5)
      doc.setTextColor(203, 213, 225)
      doc.text(macroLine(dayTotals), margin + 12, y + 17)
      y += 46
    } else {
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(11)
      doc.setTextColor(...ORANGE)
      doc.text(`Total del día: ${Math.round(dayTotals.kcal)} kcal`, margin, y)
      y += 14
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...GRAY)
      doc.text(macroLine(dayTotals), margin, y)
      y += 22
    }

    MEALS.forEach((meal) => {
      const items = group.items.filter((e) => e.momento_dia === meal.id)
      if (items.length === 0) return

      const mm = mealMacros(items)

      ensureSpace(34)
      doc.setFont('helvetica', 'bold')
      doc.setFontSize(12)
      doc.setTextColor(...NAVY)
      doc.text(meal.label, margin, y)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(9)
      doc.setTextColor(...GRAY)
      doc.text(`${Math.round(mm.kcal)} kcal`, pageWidth - margin, y, { align: 'right' })
      y += 13
      doc.setFontSize(8)
      doc.setTextColor(...GRAY)
      doc.text(macroLine(mm), margin, y)
      y += 16

      const byOption = {}
      items.forEach((it) => {
        const opt = Number(it.opcion || 1)
        if (!byOption[opt]) byOption[opt] = []
        byOption[opt].push(it)
      })

      const optionKeys = Object.keys(byOption).sort((a, b) => Number(a) - Number(b))
      const multipleOptions = optionKeys.length > 1

      optionKeys.forEach((optKey) => {
        if (multipleOptions) {
          ensureSpace(18)
          doc.setFont('helvetica', 'bold')
          doc.setFontSize(9)
          doc.setTextColor(...ORANGE)
          doc.text(`Opción ${optKey}`, margin + 12, y)
          y += 14
        }

        byOption[optKey].forEach((it) => {
          ensureSpace(26)
          const food = it.foods || {}
          const factor = (Number(it.cantidad_g) || 0) / 100
          const kcal = Math.round(getMacroVal(food, KCAL_KEYS) * factor)
          const itemMacros = {
            protein: getMacroVal(food, PROT_KEYS) * factor,
            carbs: getMacroVal(food, CARB_KEYS) * factor,
            fat: getMacroVal(food, FAT_KEYS) * factor,
          }
          const indent = multipleOptions ? margin + 24 : margin + 12

          doc.setFont('helvetica', 'normal')
          doc.setFontSize(10)
          doc.setTextColor(...NAVY)
          doc.text(`•  ${food.nombre} (${it.cantidad_g}${it.unidad || 'g'})`, indent, y)
          doc.setTextColor(...ORANGE)
          doc.text(`${kcal} kcal`, pageWidth - margin, y, { align: 'right' })
          y += 11

          doc.setFontSize(8)
          doc.setTextColor(...GRAY)
          doc.text(macroLine(itemMacros), indent + 10, y)
          y += 15
        })

        if (multipleOptions) y += 4
      })

      y += 8
      doc.setDrawColor(...LIGHT_LINE)
      doc.line(margin, y, pageWidth - margin, y)
      y += 20
    })

    if (group.label) y += 6
  })

  if (preview) {
    const pdfUrl = doc.output('bloburl')
    window.open(pdfUrl, '_blank')
    return pdfUrl
  } else {
    await savePdf(doc, 'logica-fit-plan-nutricion.pdf')
  }
}