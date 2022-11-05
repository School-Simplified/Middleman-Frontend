/** @type {import('tailwindcss').Config} */

const colors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
    "./node_modules/vue-tailwind-datepicker/**/*.js",
  ],
  theme: {
    extend: {
      colors: {
        brand: "#6C7DFE",
        grey: "#343D46",
        selected: "#FFD470",
        white: "#E6E7E8",
        hovered: "#EBEBEB",
        chalk: "#FFFFFF",
        "vtd-primary": colors.sky,
        "vtd-secondary": colors.gray,
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
