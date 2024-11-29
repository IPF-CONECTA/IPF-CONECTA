import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Redirige las solicitudes que empiezan con /uploads al servidor backend
      '/uploads': {
        target: 'http://localhost:4000', // Cambia al puerto donde está corriendo tu backend
        changeOrigin: true,
        secure: false,
      },
    },
    host: true
  },
})
