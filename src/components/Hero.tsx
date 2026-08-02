import { Sky } from "./Sky";
import { Reveal } from "./Reveal";

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <Sky className="absolute inset-0 h-full w-full" />
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-bg" />

      <div className="relative mx-auto max-w-2xl px-6 pt-24 pb-28 text-center sm:px-8 sm:pt-32 sm:pb-32">
        <Reveal>
          <img
            src={`${import.meta.env.BASE_URL}icon.png`}
            alt="Icono de Tradelike"
            className="mx-auto mb-8 h-24 w-24 rounded-xl border border-[var(--color-hairline)] sm:mb-10 sm:h-28 sm:w-28"
          />
        </Reveal>

        <Reveal delay={80}>
          <p className="eyebrow mb-5 sm:mb-6">Una mesa de trading roguelike</p>
        </Reveal>

        <Reveal delay={140}>
          <h1 className="mx-auto">
            <img
              src={`${import.meta.env.BASE_URL}wordmark.png`}
              alt="Tradelike"
              className="mx-auto h-10 w-auto sm:h-14"
            />
          </h1>
        </Reveal>

        <Reveal delay={200}>
          <p className="mx-auto mt-7 max-w-lg text-[0.98rem] leading-relaxed font-light text-ink-dim sm:mt-8 sm:text-[1.05rem]">
            Empiezas con <span className="text-champagne">1.000&nbsp;€</span> y una deuda que el
            banco te dejó a nombre. Operas en bolsa, te abres paso hasta el cripto y luego a las
            memecoins, y cancelas la deuda antes de que el banco se quede con la mesa.
          </p>
        </Reveal>

        <Reveal delay={260}>
          <div className="mt-10 flex justify-center sm:mt-12">
            <span className="inline-flex items-center gap-2 rounded-full border border-[var(--color-hairline)] px-4 py-2 text-[0.68rem] font-medium tracking-[0.12em] text-ink-mute uppercase sm:px-5 sm:py-2.5 sm:text-[0.72rem] sm:tracking-[0.14em]">
              <span className="h-1 w-1 rounded-full bg-champagne" />
              Próximamente en Google Play
            </span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
