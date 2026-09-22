// src/lib/nativeSplash.js
//
// Quita el splash nativo de Android/iOS. Es idempotente: se puede llamar
// varias veces sin problema.
//
// El import es dinámico a propósito: el plugin solo se carga dentro de la
// app nativa. Si se importara arriba del todo, @capacitor/core definiría
// window.Capacitor también en la web y isNativeApp() devolvería true en el
// navegador.
export const hideNativeSplash = () => {
  if (typeof window === 'undefined') return
  if (!window.Capacitor?.isNativePlatform?.()) return

  import('@capacitor/splash-screen')
    .then(({ SplashScreen }) => SplashScreen.hide({ fadeOutDuration: 250 }))
    .catch(() => {})
}