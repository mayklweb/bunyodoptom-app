// tailwind.config.js
module.exports = {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "#0a0a0a",
        primary: "#2e3192",
        secondary: "#cecfff",
        red: "#ff0000",
        gray: "#e5e7eb",
        accent: "#f5f5f5"
      },
      fontFamily: {
        sans: "'Roboto', sans-serif",
      },
    },
  },
  plugins: [],
};