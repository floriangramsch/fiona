/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./app/components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        "fiona-bg": "#D5BDAF",
        "fiona-fg": "#F7E1D7",
        "fiona-text": "#E3D5CA",
        "fiona-special": "#F5EBE0",
      },
      fontFamily: {
        vibes: ["Great Vibes"],
      },
    },
  },
  plugins: [],
};
