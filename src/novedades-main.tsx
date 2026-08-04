import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Novedades } from "./Novedades";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Novedades />
  </StrictMode>,
);
