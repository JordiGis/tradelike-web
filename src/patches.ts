export type Patch = {
  version: string;
  date: string;
  highlights: string[];
};

// Newest first. One entry per release that actually changed something a
// player would notice — internal version bumps with no player-facing change
// get folded into the next real entry instead of getting their own line.
export const PATCHES: Patch[] = [
  {
    version: "0.6.12",
    date: "3 de agosto de 2026",
    highlights: [
      "El booster de tiempo real paga bien de una vez — el fallo de payout está corregido.",
      "Las llamadas del teléfono respetan mejor su propio cooldown.",
      "Arreglado un bug de navegación y varios retoques de interfaz.",
    ],
  },
  {
    version: "0.6.11",
    date: "3 de agosto de 2026",
    highlights: [
      "Inicio de sesión con Google Play Games y partidas guardadas en la nube.",
      "El Tocadiscos pasa a ser una pantalla propia, no una tira en el pie de la mesa.",
      "El booster ya aparece en el registro de operaciones, y los favores se pueden subir de nivel.",
    ],
  },
  {
    version: "0.6.9",
    date: "3 de agosto de 2026",
    highlights: [
      "Demo de una sola plaza con anuncios, para probar el desk sin comprometerse a un run entero.",
      "Booster en tiempo real, con la dificultad reequilibrada alrededor de él.",
      "Panel del booster y ficha de órdenes pulidos; Hacienda suma un registro de operaciones solo de bolsa.",
    ],
  },
  {
    version: "0.6.8",
    date: "2 de agosto de 2026",
    highlights: [
      "Sonido: efectos de interfaz y música que entra con un fundido al arrancar.",
      "El Tocadiscos estrena las 14 pistas completas, con reproducción siempre aleatoria.",
      "Corregido un fallo que desincronizaba el historial de velas al cargar una partida.",
    ],
  },
  {
    version: "0.6.5",
    date: "1 de agosto de 2026",
    highlights: [
      "Tanda de pulido en cartera, órdenes y teléfono — y el mural de fotos de Madrid.",
      "Cada plaza estrena su propia textura de mesa: tablones en Wall Street, piedra seca en Madrid.",
      "El efecto visual de dificultad pasa a ser un deslizador de intensidad, no un simple on/off.",
    ],
  },
  {
    version: "0.6.1",
    date: "29 de julio de 2026",
    highlights: [
      "La guía de órdenes ahora enseña a comprar y vender antes de tocar el precio.",
      "La pantalla de fin de partida estrena una cabecera propia en vez de otra fila de estadísticas.",
    ],
  },
  {
    version: "0.1.0 – 0.5.0",
    date: "22 – 28 de julio de 2026",
    highlights: [
      "Los primeros pasos de la mesa: elegir plaza, la deuda del banco, la ladder de dificultad y el tutorial.",
      "Bancarrota como la única forma real de perder, y el informe de fin de día.",
      "La Tienda de Favores, el reparto de acciones una a una y la identidad visual — tipografía Fraunces y logotipo.",
    ],
  },
];
