import { Nav } from "./components/Nav";
import { CandleField } from "./components/CandleField";
import { Footer } from "./components/Footer";
import { PATCHES } from "./patches";

function PatchEntry({ version, date, highlights }: { version: string; date: string; highlights: string[] }) {
  return (
    <article className="border-t border-[var(--color-hairline)] py-10">
      <div className="mb-4 flex flex-wrap items-baseline gap-x-4 gap-y-1">
        <span className="font-display text-lg font-medium text-ink">v{version}</span>
        <span className="text-xs tracking-wide text-ink-mute">{date}</span>
      </div>
      <ul className="list-disc space-y-1.5 pl-5 text-sm leading-relaxed font-light text-ink-dim">
        {highlights.map((line) => (
          <li key={line}>{line}</li>
        ))}
      </ul>
    </article>
  );
}

export function Novedades() {
  return (
    <div className="min-h-screen text-ink">
      <CandleField className="fixed inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <Nav variant="novedades" />

        <main className="mx-auto max-w-2xl px-6 py-16 sm:px-8 sm:py-24">
          <p className="eyebrow mb-5">Novedades</p>
          <h1 className="font-display text-4xl font-medium text-ink">Qué ha cambiado</h1>
          <p className="mt-3 text-sm leading-relaxed font-light text-ink-dim">
            Cada parche de Tradelike, más reciente primero.
          </p>

          {PATCHES.map((patch) => (
            <PatchEntry key={patch.version} {...patch} />
          ))}
        </main>

        <Footer />
      </div>
    </div>
  );
}
