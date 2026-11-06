import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ isSsrBuild }) => ({
  plugins: [react()],
  // gsap ships ESM in .js files without "type": "module", so Node can't import it raw
  ssr: { noExternal: ["gsap", "@gsap/react", "lenis"] },
  build: {
    // Hashed output lives apart from /assets (public files with stable names), so only
    // it gets the long-lived immutable cache in netlify.toml.
    assetsDir: "static",
    chunkSizeWarningLimit: 600, // three.js lives in its own ~128 kB gzip chunk
    rollupOptions: isSsrBuild
      ? {}
      : {
          output: {
            manualChunks: {
              three: ["three"],
              motion: ["gsap", "@gsap/react", "lenis"],
              react: ["react", "react-dom"],
            },
          },
        },
  },
}));
