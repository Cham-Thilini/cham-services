import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Custom domain serves the site from the root path.
  base: '/',
  build: {
    rollupOptions: {
      input: {
        portfolio: 'index.html',
        services: 'services.html',
        monitoring: 'monitoring.html',
      },
    },
  },
})
