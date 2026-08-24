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

const PLAN = [
  {
    week: 'Semana 1',
    detail: '3 sesiones · 8 series de (1 min corriendo + 2 min andando)',
  },
  {
    week: 'Semana 2',
    detail: '3 sesiones · 6 series de (2 min corriendo + 1,5 min andando)',
  },
  {
    week: 'Semana 3',
    detail: '3 sesiones · 4 series de (4 min corriendo + 2 min andando)',
  },
  {
    week: 'Semana 4',
    detail: '3 sesiones · 3 series de (6 min corriendo + 90 s andando)',
  },
  {
    week: 'Semana 5',
    detail: '3 sesiones · 2 series de (10 min corriendo + 2 min andando)',
  },
  {
    week: 'Semana 6',
    detail: '3 sesiones · corre 20-25 min seguidos, al ritmo que puedas mantener hablando',
  },
]

const TIPS = [
  'Deja siempre 1 día de descanso entre sesiones esta primeras semanas.',
  'El ritmo correcto es aquel al que puedes hablar sin ahogarte.',
  'Unos minutos de caminata + movilidad antes de cada sesión evitan lesiones.',
  'Si un día no llegas al tiempo indicado, no pasa nada: repite esa sesión antes de avanzar.',
  'Hidrátate bien, sobre todo si entrenas en calor.',
  'Si sientes dolor (no solo cansancio), para y descansa un día extra.',
]

export async function generateRunningGuide() {
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
    doc.text('Guía gratuita: tus primeros 5K', margin + 62, 68)
  } catch {
    doc.setTextColor('#ffffff')
    doc.setFont('helvetica', 'bold')
    doc.setFontSize(19)
    doc.text('Lógica Fit', margin, 46)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(11)
    doc.text('Guía gratuita: tus primeros 5K', margin, 68)
  }

  y = 128

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...NAVY)
  doc.text('De cero a 5K en 6 semanas', margin, y)
  y += 20

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...GRAY)
  const intro = doc.splitTextToSize(
    'Un plan progresivo de caminar-correr, pensado para gente que no ha corrido antes o vuelve después de mucho tiempo. Antes de empezar, consulta con tu médico si tienes alguna condición previa.',
    pageWidth - margin * 2
  )
  doc.text(intro, margin, y)
  y += intro.length * 12 + 18

  doc.setDrawColor(...LIGHT_LINE)
  doc.line(margin, y, pageWidth - margin, y)
  y += 22

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...NAVY)
  doc.text('Tu plan semana a semana', margin, y)
  y += 18

  PLAN.forEach((row) => {
    ensureSpace(24)
    doc.setFillColor(...ORANGE)
    doc.roundedRect(margin, y - 9, 10, 10, 2, 2, 'F')

    doc.setFont('helvetica', 'bold')
    doc.setFontSize(10)
    doc.setTextColor(...NAVY)
    doc.text(row.week, margin + 16, y)

    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...GRAY)
    doc.text(row.detail, margin + 16, y + 13)
    y += 32
  })

  y += 10
  doc.setDrawColor(...LIGHT_LINE)
  doc.line(margin, y, pageWidth - margin, y)
  y += 22

  ensureSpace(30)
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(12)
  doc.setTextColor(...NAVY)
  doc.text('Consejos clave', margin, y)
  y += 18

  TIPS.forEach((tip) => {
    ensureSpace(20)
    doc.setFont('helvetica', 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...NAVY)
    const lines = doc.splitTextToSize(`•  ${tip}`, pageWidth - margin * 2 - 10)
    doc.text(lines, margin + 4, y)
    y += lines.length * 13 + 6
  })

  y += 16
  ensureSpace(60)
  doc.setFillColor(...NAVY)
  doc.roundedRect(margin, y - 14, pageWidth - margin * 2, 56, 8, 8, 'F')
  doc.setTextColor('#ffffff')
  doc.setFont('helvetica', 'bold')
  doc.setFontSize(11)
  doc.text('¿Quieres un plan aún más ajustado a ti?', margin + 14, y + 8)
  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9)
  doc.setTextColor(203, 213, 225)
  doc.text('Escríbeme por WhatsApp y lo vemos juntos, sin compromiso.', margin + 14, y + 24)

  doc.save('logica-fit-guia-primeros-5k.pdf')
}