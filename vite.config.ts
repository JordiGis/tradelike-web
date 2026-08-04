import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Static entry points, no router: each page is its own tiny React root — a
// client router would be paying for routes that don't exist.
//
// Root-served from https://tradelike.jordigis.dev/ (see public/CNAME) — every
// component reads its base path through `import.meta.env.BASE_URL`, not a
// hardcoded path, so this is the only edit a domain change ever needs.
const BASE = '/'

export default defineConfig({
  base: BASE,
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(import.meta.dirname, 'index.html'),
        legal: resolve(import.meta.dirname, 'legal/index.html'),
        novedades: resolve(import.meta.dirname, 'novedades/index.html'),
      },
    },
  },
})
