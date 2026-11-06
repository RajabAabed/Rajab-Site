// Renders the app to static HTML and injects it into the client build, so the page
// paints (and is crawlable) before any JavaScript runs. React then hydrates it.
import fs from "node:fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const root = process.cwd();
const indexPath = path.join(root, "dist", "index.html");
const ssrDir = path.join(root, "dist-ssr");

const { render } = await import(pathToFileURL(path.join(ssrDir, "entry-server.js")).href);

const template = fs.readFileSync(indexPath, "utf8");
const placeholder = "<!--app-html-->";
if (!template.includes(placeholder)) {
  throw new Error(`Prerender placeholder ${placeholder} not found in dist/index.html`);
}

let html = template.replace(placeholder, render());

// Inline the (small) stylesheet so first paint doesn't wait on another round trip.
html = html.replace(/<link rel="stylesheet"[^>]*href="\/(static\/[^"]+\.css)"[^>]*>/, (tag, file) => {
  const css = fs.readFileSync(path.join(root, "dist", file), "utf8");
  return `<style>${css}</style>`;
});

// The prerendered page is complete without JavaScript (the intro is CSS), so the app
// bundle is requested after first paint instead of competing with it for bandwidth.
const entry = html.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/);
const preloads = [...html.matchAll(/<link rel="modulepreload" crossorigin href="([^"]+)">/g)].map((m) => m[1]);
if (!entry) throw new Error("Vite entry script not found in dist/index.html");
html = html.replace(entry[0], "").replace(/<link rel="modulepreload"[^>]*>/g, "");
const loader = `<script>(function(){var done=false;function load(){if(done)return;done=true;${JSON.stringify(preloads)}.forEach(function(h){var l=document.createElement("link");l.rel="modulepreload";l.crossOrigin="";l.href=h;document.head.appendChild(l)});var s=document.createElement("script");s.type="module";s.crossOrigin="";s.src=${JSON.stringify(entry[1])};document.head.appendChild(s)}requestAnimationFrame(function(){requestAnimationFrame(load)});setTimeout(load,3000)})()</script>`;
html = html.replace("</body>", `${loader}\n  </body>`);

fs.writeFileSync(indexPath, html);
fs.rmSync(ssrDir, { recursive: true, force: true });
console.log("Prerendered dist/index.html");
