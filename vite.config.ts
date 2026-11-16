import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import { seoPlugin } from './scripts/seo.ts'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), seoPlugin()],
  build: {
    target: 'es2020',
    cssMinify: true,
  },
})
