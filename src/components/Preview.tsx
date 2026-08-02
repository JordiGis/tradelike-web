import { Reveal } from "./Reveal";

const base = import.meta.env.BASE_URL;

const SHOTS = [
  { src: `${base}screenshots/mainmenu.png`, caption: "Menú de inicio" },
  { src: `${base}screenshots/desk.png`, caption: "La mesa" },
  { src: `${base}screenshots/difficulty.png`, caption: "Escalera de dificultad" },
  { src: `${base}screenshots/favors.png`, caption: "Tienda de Favores" },
];

export function Preview() {
  return (
    <section className="border-t border-[var(--color-hairline)] py-16 sm:py-24">
      <div className="mx-auto max-w-4xl px-6 text-center sm:px-8">
        <Reveal>
          <p className="eyebrow mb-10 sm:mb-14">La mesa, tal cual</p>
        </Reveal>
        <div className="grid grid-cols-2 gap-4 sm:gap-8 lg:grid-cols-4">
          {SHOTS.map((s, i) => (
            <Reveal key={s.src} delay={i * 80}>
              <img
                src={s.src}
                alt={s.caption}
                className="w-full rounded-md border border-[var(--color-hairline)]"
              />
              <p className="mt-2 text-[0.62rem] tracking-wide text-ink-mute uppercase sm:mt-3 sm:text-[0.7rem]">
                {s.caption}
              </p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
