const base = import.meta.env.BASE_URL;

export function Nav({ variant = "home" }: { variant?: "home" | "legal" | "novedades" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-hairline)] bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a href={base} className="flex items-center gap-2.5 sm:gap-3">
          <img src={`${base}icon.png`} alt="" className="h-6 w-6 rounded-sm sm:h-7 sm:w-7" />
          <img src={`${base}wordmark.png`} alt="Tradelike" className="h-3.5 w-auto sm:h-4" />
        </a>
        {variant === "home" ? (
          <nav className="flex items-center gap-4 text-[0.62rem] font-medium tracking-[0.1em] text-ink-dim uppercase sm:gap-10 sm:text-[0.72rem] sm:tracking-[0.18em]">
            <a href="#que-es" className="transition hover:text-champagne">Qué es</a>
            <a href="#plazas" className="transition hover:text-champagne">Plazas</a>
            <a href={`${base}novedades/`} className="transition hover:text-champagne">Novedades</a>
            <a href={`${base}legal/`} className="transition hover:text-champagne">Legal</a>
          </nav>
        ) : (
          <a href={base} className="text-[0.62rem] font-medium tracking-[0.1em] text-ink-dim uppercase transition hover:text-champagne sm:text-[0.72rem] sm:tracking-[0.18em]">
            ← Volver
          </a>
        )}
      </div>
    </header>
  );
}
