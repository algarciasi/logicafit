import { DIAS_SEMANA } from './routines'
import { MEALS } from './macros'

const NAVY = [30, 41, 59]
const ORANGE = [249, 115, 22]
const GRAY = [100, 116, 139]
const LIGHT_LINE = [226, 232, 240]

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

export async function generateRoutinePdf(client, routineEntries) {
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

  doc.save('logica-fit-mi-rutina.pdf')
}

export async function generateDietPdf(client, dietEntries) {
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

  const totalKcal = dietEntries.reduce((sum, e) => {
    const factor = e.cantidad_g / 100
    return sum + (e.foods?.calorias || 0) * factor
  }, 0)

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(10)
  doc.setTextColor(...ORANGE)
  doc.text(`Total del día: ${Math.round(totalKcal)} kcal`, margin, y)
  y += 26

  MEALS.forEach((meal) => {
    const items = dietEntries.filter((e) => e.momento_dia === meal.id)
    if (items.length === 0) return

    ensureSpace(30)
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(12)
    doc.setTextColor(...NAVY)
    doc.text(meal.label, margin, y)
    y += 18

    items.forEach((it) => {
      ensureSpace(16)
      const factor = it.cantidad_g / 100
      const kcal = Math.round((it.foods?.calorias || 0) * factor)
      doc.setFont('helvetica', 'normal')
      doc.setFontSize(10)
      doc.setTextColor(...NAVY)
      doc.text(`•  ${it.foods?.nombre} (${it.cantidad_g}g)`, margin + 12, y)
      doc.setTextColor(...ORANGE)
      doc.text(`${kcal} kcal`, pageWidth - margin, y, { align: 'right' })
      y += 15
    })
    y += 8
    doc.setDrawColor(...LIGHT_LINE)
    doc.line(margin, y, pageWidth - margin, y)
    y += 20
  })

  doc.save('logica-fit-mi-dieta.pdf')
}