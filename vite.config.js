import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    // Sin sourcemaps en producción: el código llega minificado, sin un mapa
    // que lo traduzca de vuelta al original.
    sourcemap: false,
    // Terser en vez del minificador por defecto: además de comprimir,
    // acorta nombres de variables/funciones, quita console.log y comentarios.
    // Esto NO oculta el código (eso es imposible en una web), solo lo hace
    // bastante más incómodo de leer.
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
      },
      mangle: {
        toplevel: true,
      },
      format: {
        comments: false,
      },
    },
  },
})