/** @type {import('tailwindcss').Config} */

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        Inter : ["Inter"],
        GilroyLight:["GilroyLight"],
        GilroyExtraBold:["GilroyExtraBold"],
        WigglyCurvesRegular:["WigglyCurvesRegular"],
        BoncheLight:["BoncheLight"],
        EdensorFree:["EdensorFree"]

      }
    },
  },
  plugins: [],
}