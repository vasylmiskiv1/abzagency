/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        "primary": "#facc15",
        "primary-hover": "#fde047",
        "secondary": "#0891b2",
        "background": "#f8fafc",
        "dark": "#18181b",
        "input-border": "#bdbdbd",
        "disabled": "#a8a29e",
        "error": "#dc2626"
      },
    },
  },
  plugins: [],
};
