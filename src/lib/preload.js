// src/lib/preload.js
export function preloadImages(urls) {
  if (!urls || urls.length === 0) return;
  
  urls.forEach((url) => {
    if (!url) return;
    const img = new Image();
    img.src = url; // Esto fuerza al navegador a descargarla en caché sin mostrarla
  });
}