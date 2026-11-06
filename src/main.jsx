import { StrictMode, startTransition } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import "lenis/dist/lenis.css";
import "./index.css";
import App from "./App.jsx";

const container = document.getElementById("root");
const app = (
  <StrictMode>
    <App />
  </StrictMode>
);

// Production HTML is prerendered (scripts/prerender.js); dev serves an empty root.
if (container.firstElementChild) {
  // Hydrating inside a transition lets React yield to the browser instead of
  // blocking the main thread in one long task.
  startTransition(() => {
    hydrateRoot(container, app);
  });
} else {
  createRoot(container).render(app);
}
