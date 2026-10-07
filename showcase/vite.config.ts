import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Relative paths, so the built page works wherever it is served:
  // GitHub Pages puts it under /adecla-design/, not at the root.
  base: './',
  server: { port: 5190 },
})
