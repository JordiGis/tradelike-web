import { Reveal } from "./Reveal";

const PLAZAS = [
  { n: "01", name: "Wall Street", target: "25.000 €", cond: "siempre abierta" },
  { n: "02", name: "Londres", target: "120.000 €", cond: "al superar Wall Street" },
  { n: "03", name: "Hong Kong", target: "400.000 €", cond: "al superar Londres" },
  { n: "04", name: "Madrid", target: "1.000.000 €", cond: "al superar Hong Kong" },
];

export function Plazas() {
  return (
    <section id="plazas" className="border-t border-[var(--color-hairline)] py-16 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-5">Cuatro plazas encadenadas</p>
          <p className="max-w-xl text-[0.95rem] leading-relaxed font-light text-ink-dim sm:text-[1.05rem]">
            Cada una con su horario, sus ocho empresas de parodia, sus reglas de la casa y su
            propia escalera de dificultad.
          </p>
        </Reveal>

        <div className="mt-10 border-t border-[var(--color-hairline)] sm:mt-16">
          {PLAZAS.map((p, i) => (
            <Reveal key={p.name} delay={i * 60}>
              <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1 border-b border-[var(--color-hairline)] py-5 sm:gap-x-6 sm:py-7">
                <div className="flex items-baseline gap-3 sm:gap-6">
                  <span className="font-display text-xs text-champagne-dim sm:text-sm">{p.n}</span>
                  <h3 className="font-display text-base font-medium text-ink sm:text-xl">{p.name}</h3>
                </div>
                <span className="font-display text-base text-champagne sm:text-lg">{p.target}</span>
                <span className="w-full pl-[2.25rem] text-[0.7rem] text-ink-mute sm:pl-[3.25rem] sm:text-xs">{p.cond}</span>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
