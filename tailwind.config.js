/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        grey: "#343D46",
        selected: "#FFD470",
        white: "#E6E7E8",
        hovered: "#EBEBEB"
      }
    },
  },
  plugins: [],
}
