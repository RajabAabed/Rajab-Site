/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        ink: { DEFAULT: "#0B0B0A", 2: "#131311" },
        bone: "#EDE9E2",
        mute: "#8D877E",
        gold: "#D4B88A",
        line: "rgba(237, 233, 226, 0.14)",
      },
      fontFamily: {
        sans: ["Lufga", "ui-sans-serif", "system-ui", "sans-serif"],
        serif: ['"Instrument Serif"', "ui-serif", "Georgia", "serif"],
      },
      spacing: {
        gutter: "var(--gutter)",
      },
      transitionTimingFunction: {
        expo: "cubic-bezier(0.16, 1, 0.3, 1)",
      },
    },
  },
  plugins: [],
};
