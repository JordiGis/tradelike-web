import { Reveal } from "./Reveal";

const FEATURES = [
  {
    n: "01",
    title: "La deuda es el reloj",
    body: "El banco te dejó la factura: una cuota cada 7 días que sube cada vez y sale de tu efectivo. Cancelarla es como se gana.",
  },
  {
    n: "02",
    title: "Desbloqueas mercados",
    body: "Con habilidades abres el cripto y luego las memecoins, que nunca cierran y se mueven el doble.",
  },
  {
    n: "03",
    title: "El teléfono no siempre dice la verdad",
    body: "Avisos de subida, bajada o «no toques nada», con una fiabilidad estimada, nunca una garantía.",
  },
  {
    n: "04",
    title: "Un motor de mercado real",
    body: "Factor de mercado, volatilidad GARCH, saltos, seis regímenes, horquilla, impacto de precio — nada de mentira.",
  },
  {
    n: "05",
    title: "Dos economías",
    body: "Los euros compran posiciones y habilidades; los favores compran mejoras permanentes que sobreviven a una partida perdida.",
  },
  {
    n: "06",
    title: "Colección y logros",
    body: "Una carta por cada activo de cada plaza y un logro por cada hito — lo que sobrevive a una partida.",
  },
];

export function Features() {
  return (
    <section id="que-es" className="border-t border-[var(--color-hairline)] py-16 sm:py-28">
      <div className="mx-auto max-w-3xl px-6 sm:px-8">
        <Reveal>
          <p className="eyebrow mb-5">Qué es</p>
          <p className="max-w-xl text-[0.95rem] leading-relaxed font-light text-ink-dim sm:text-[1.05rem]">
            Eliges una <span className="text-ink">plaza</span> — como eliges un mazo en Balatro —
            y juegas una partida entera en ella. La mesa abre casi vacía y crece con la partida:
            el teléfono, Hacienda, el banco y el árbol de habilidades aparecen solo cuando te los
            has ganado.
          </p>
        </Reveal>

        <div className="mt-12 sm:mt-20">
          {FEATURES.map((f, i) => (
            <Reveal key={f.n} delay={i * 50}>
              <div className="grid grid-cols-[2.25rem_1fr] gap-4 border-t border-[var(--color-hairline)] py-6 sm:grid-cols-[4rem_1fr] sm:gap-6 sm:py-8">
                <span className="font-display text-sm text-champagne-dim">{f.n}</span>
                <div className="sm:flex sm:items-baseline sm:gap-10">
                  <h3 className="font-display text-lg font-medium text-ink sm:w-40 sm:shrink-0">
                    {f.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed font-light text-ink-dim sm:mt-0">
                    {f.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
