import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Two static entry points, no router: the site is two pages (landing, legal),
// each its own tiny React root — a client router would be paying for a third
// route that doesn't exist.
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
      },
    },
  },
})
