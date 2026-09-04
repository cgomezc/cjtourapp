import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // Forwards /api requests to the local API, avoiding CORS and
      // self-signed certificate issues in the browser during development.
      '/api': {
        target: 'https://localhost:7053',
        changeOrigin: true,
        secure: false,
      },
    },
  },
})
