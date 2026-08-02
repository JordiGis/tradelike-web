import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'node:path'

// Two static entry points, no router: the site is two pages (landing, legal),
// each its own tiny React root — a client router would be paying for a third
// route that doesn't exist.
// Served from https://jordigis.github.io/tradelike-web/ until a custom
// domain is wired up — a GitHub Pages project site, not a root domain, so
// every asset has to resolve under this subpath. Drop back to '/' the day a
// custom domain goes live (root-served); every component reads this through
// `import.meta.env.BASE_URL`, not a hardcoded path, so that's the only edit.
const BASE = '/tradelike-web/'

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
