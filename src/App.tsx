import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { CandleField } from "./components/CandleField";
import { Preview } from "./components/Preview";
import { Features } from "./components/Features";
import { Plazas } from "./components/Plazas";
import { Footer } from "./components/Footer";

// No `bg-bg` here: a solid background on this wrapper paints *above* a
// fixed, negative-z-index descendant once it escapes to the root stacking
// context, which is exactly what buried CandleField behind plain black. The
// page's real background lives on `body` (src/index.css) instead, and every
// section above the canvas gets its own `relative z-10` to stay on top of it.
export function App() {
  return (
    <div className="min-h-screen text-ink">
      <CandleField className="fixed inset-0 z-0 h-full w-full" />
      <div className="relative z-10">
        <Nav variant="home" />
        <Hero />
        <Preview />
        <Features />
        <Plazas />
        <Footer />
      </div>
    </div>
  );
}
