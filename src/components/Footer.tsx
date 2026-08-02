export function Footer() {
  return (
    <footer className="border-t border-[var(--color-hairline)] py-10">
      <div className="mx-auto flex max-w-3xl flex-wrap items-center justify-between gap-3 px-6 text-xs tracking-wide text-ink-mute sm:px-8">
        <span>© {new Date().getFullYear()} Tradelike</span>
        <a href="/legal/" className="transition hover:text-champagne">
          Política de privacidad
        </a>
      </div>
    </footer>
  );
}
