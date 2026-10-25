import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

const ruta = (archivo: string) => fileURLToPath(new URL(archivo, import.meta.url))

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      '@': ruta('./src'),
    },
  },
  build: {
    // La landing y las tres páginas legales (en Vercel se sirven sin .html gracias a cleanUrls)
    rollupOptions: {
      input: {
        inicio: ruta('./index.html'),
        avisoLegal: ruta('./aviso-legal.html'),
        privacidad: ruta('./privacidad.html'),
        cookies: ruta('./cookies.html'),
      },
    },
  },
})
