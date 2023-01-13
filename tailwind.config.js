/** @type {import('tailwindcss').Config} */

const { defaultTheme } = require('@nextui-org/react');

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
        EdensorFree:["EdensorFree"],
        SimpleDaily:["SimpleDaily"],
        Calisga:["Calisga"],
        PoppinsMedium:["PoppinsMedium"],
        PoppinsRegular:["PoppinsRegular"],
        PoppinsBold:["PoppinsBold"],
        PoppinsLight:["PoppinsLight"],
        PoppinsExtraLight:["PoppinsExtraLight"],
      }
    },
  },
  plugins: [],
}