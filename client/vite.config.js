import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    outDir: '../server/public',
    emptyOutDir: true
  },
  server: {
    proxy: {
      '/destinations': { target: 'http://localhost:3001' },
      '/events': { target: 'http://localhost:3001' },
      '/api': { target: 'http://localhost:3001' }
    }
  }
})
