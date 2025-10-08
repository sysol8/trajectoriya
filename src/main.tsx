import "./styles/variables.css";
import "./styles/global.css";
import "./styles/style.css";
// @ts-ignore
import "@fontsource-variable/arimo";

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
