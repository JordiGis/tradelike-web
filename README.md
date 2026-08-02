# tradelike-web

Web de aterrizaje de [Tradelike](https://github.com/JordiGis/tradelike) — solo
front, sin backend. React 19 + Vite + Tailwind CSS v4, dos páginas estáticas
sin router (`/` y `/legal/`), desplegada en GitHub Pages.

## Desarrollo

```bash
npm install
npm run dev      # servidor local con recarga en caliente
npm run build    # compila a dist/
npm run preview  # sirve dist/ tal cual quedaría en producción
```

## Estructura

- `index.html` / `legal/index.html` — los dos puntos de entrada de Vite.
- `src/App.tsx` — la landing (`Nav`, `Hero`, `Features`, `Plazas`, `Footer`).
- `src/Legal.tsx` — la política de privacidad.
- `src/components/` — piezas reutilizadas entre ambas páginas.
- `public/icon.png` — icono real de la app, copiado de
  `tradelike/assets/icons/app_icon.png`. Si el icono cambia en el juego, hay
  que volver a copiarlo aquí a mano — no hay symlink entre repos.
- Paleta y tipografías (`src/index.css`, bloque `@theme`) calcadas de
  `resources/Palette.gd` del juego: Fraunces de display, Source Sans 3 de
  cuerpo, mismos colores de tapete/latón/tinta.

## Despliegue

`.github/workflows/deploy.yml` compila y publica `dist/` en GitHub Pages en
cada push a `main`. En **Settings → Pages** del repo, el «Source» tiene que
estar en **GitHub Actions** (no «Deploy from branch»).

## Pendiente

- [ ] **Dominio propio** — cuando se decida, añadir `public/CNAME` con el
  dominio y crear el registro DNS (CNAME o A, según el proveedor) apuntando a
  GitHub Pages.
- [ ] **Rellenar `/legal/`** — `src/Legal.tsx` tiene varios campos marcados en
  rojo (`<Fill>`) pendientes de datos reales: responsable del tratamiento,
  país, email de contacto, y confirmar mediación de anuncios/analítica antes
  de publicar.
- [ ] **Badge de Google Play** — el CTA del hero dice «Próximamente»; cuando
  haya ficha publicada, sustituir por el enlace y el badge oficial de Play
  Store.
