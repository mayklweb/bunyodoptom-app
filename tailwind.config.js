// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: "#2e3192",
        secondary: "#cecfff",
        red: "#ff0000",
      },
      fontFamily: {
        sans: "Instrument Sans, sans-serif",
        nunito: "var(--font-nunito)",
      },
    },
  },
  plugins: [],
};