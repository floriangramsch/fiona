/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./components/**/*.{js,vue,ts}",
    "./layouts/**/*.vue",
    "./pages/**/*.vue",
    "./plugins/**/*.{js,ts}",
    "./app.vue",
    "./error.vue",
  ],
  theme: {
    extend: {
      colors: {
        bg: "#D5BDAF",
        fg: "#F7E1D7",
        text: "#E3D5CA",
        special: "#F5EBE0",
      },
    },
  },
  plugins: [],
};
