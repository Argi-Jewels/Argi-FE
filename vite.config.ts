import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    port: 3000,
    proxy: {
      '/api/sms': {
        target: 'http://control.yourbulksms.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sms/, ''),
      },
    },
  },
  preview: {
    port: 3000,
    proxy: {
      '/api/sms': {
        target: 'http://control.yourbulksms.com/api',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api\/sms/, ''),
      },
    },
  },
})

