export function Nav({ variant = "home" }: { variant?: "home" | "legal" }) {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--color-hairline)] bg-bg/90 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5 sm:px-8 sm:py-6">
        <a href="/" className="flex items-center gap-2.5 font-display text-base tracking-tight text-ink sm:gap-3 sm:text-[1.05rem]">
          <img src="/icon.png" alt="" className="h-6 w-6 rounded-sm sm:h-7 sm:w-7" />
          Tradelike
        </a>
        {variant === "home" ? (
          <nav className="flex items-center gap-4 text-[0.62rem] font-medium tracking-[0.1em] text-ink-dim uppercase sm:gap-10 sm:text-[0.72rem] sm:tracking-[0.18em]">
            <a href="#que-es" className="transition hover:text-champagne">Qué es</a>
            <a href="#plazas" className="transition hover:text-champagne">Plazas</a>
            <a href="/legal/" className="transition hover:text-champagne">Legal</a>
          </nav>
        ) : (
          <a href="/" className="text-[0.62rem] font-medium tracking-[0.1em] text-ink-dim uppercase transition hover:text-champagne sm:text-[0.72rem] sm:tracking-[0.18em]">
            ← Volver
          </a>
        )}
      </div>
    </header>
  );
}
