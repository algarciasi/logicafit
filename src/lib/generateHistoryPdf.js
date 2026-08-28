const NAVY = [30, 41, 59]
const GRAY = [100, 116, 139]

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

export async function generateHistorySnapshotPdf({ subtitle, nombre, fecha, contenido }) {
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

  y = 122

  doc.setFont('helvetica', 'bold')
  doc.setFontSize(15)
  doc.setTextColor(...NAVY)
  doc.text(nombre, margin, y)
  y += 18

  doc.setFont('helvetica', 'normal')
  doc.setFontSize(9.5)
  doc.setTextColor(...GRAY)
  doc.text(fecha, margin, y)
  y += 26

  doc.setDrawColor(226, 232, 240)
  doc.line(margin, y, pageWidth - margin, y)
  y += 22

  const lines = contenido.split('\n')
  lines.forEach((line) => {
    ensureSpace(16)
    const isHeader = line.trim() && !line.trim().startsWith('-')
    doc.setFont('helvetica', isHeader ? 'bold' : 'normal')
    doc.setFontSize(9.5)
    doc.setTextColor(...NAVY)
    const wrapped = doc.splitTextToSize(line || ' ', pageWidth - margin * 2)
    doc.text(wrapped, margin, y)
    y += wrapped.length * 13
  })

  const safeName = nombre.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  doc.save(`logica-fit-${safeName || 'historico'}.pdf`)
}