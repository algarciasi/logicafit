// jsPDF descarga con un <a download>, algo que el WebView de Android ignora.
// En la app nativa escribimos el PDF en caché y lo abrimos con el visor del
// sistema; en web se mantiene la descarga de siempre.

const isNativeApp = () =>
  typeof window !== 'undefined' && window.Capacitor?.isNativePlatform?.()

export async function savePdf(doc, filename) {
  if (!isNativeApp()) {
    doc.save(filename)
    return { error: null }
  }

  try {
    const { Filesystem, Directory } = await import('@capacitor/filesystem')
    const { Share } = await import('@capacitor/share')

    // "data:application/pdf;filename=...;base64,XXXX" → nos quedamos con XXXX
    const base64 = doc.output('datauristring').split(',')[1]

    await Filesystem.writeFile({
      path: filename,
      data: base64,
      directory: Directory.Cache,
    })

    const { uri } = await Filesystem.getUri({
      path: filename,
      directory: Directory.Cache,
    })

    await Share.share({
      title: filename,
      url: uri,
      dialogTitle: 'Abrir o compartir PDF',
    })

    return { error: null }
  } catch (error) {
    return { error }
  }
}