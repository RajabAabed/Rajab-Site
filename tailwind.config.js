/** @type {import('tailwindcss').Config} */
import tailwindForms from "@tailwindcss/forms";
import prelinePlugin from "preline/plugin";
export default {
  darkMode: "class",
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "node_modules/preline/dist/*.js",
    "./node_modules/preline/preline.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        Lufga: ["Lufga", "sans-serif"],
      },
      colors: {
        primary: {
          100: "#ffe7d6",
          200: "#ffcead",
          300: "#ffb585",
          400: "#ff9c5c",
          500: "#FD853A", // Base color
          600: "#e67434",
          700: "#cc652e",
          800: "#b25628",
          900: "#994822",
        },
        secondary: "#1D2939",
        text: "#171717",
      },
    },
  },

  plugins: [tailwindForms, prelinePlugin],
};
