const colors = require('tailwindcss/colors')

module.exports = {
  purge: ['./pages/**/*.{js,ts,jsx,tsx}', './component/**/*.{js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class',
  theme: {
    colors: {
      blackBg: 'rgb(2, 2, 2)',
      grayBlack: 'rgb(20, 20, 20)',
      black: 'rgb(0, 0, 0)',
      whiteText: 'rgb(230, 230, 230)',
      gray: colors.gray,
      yellow: colors.yellow,
      red: colors.red,
      green:colors.green,
      white: colors.white,
      pink: colors.pink,
      blue: colors.blue,
      indigo: colors.indigo,
      orange: colors.orange
    },
    screens: {
      "xsm": "200px",
      // => @media (min-width:  280px) { ... }
      xxs: "320px",
      // => @media (min-width: 320px) { ... }

      xs: "420px",
      // => @media (min-width: 420px) { ... }

      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "768px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }

      xxl: "1536px",
      // => @media (min-width: 1536px) { ... }
    },
    minWidth: {
      "0": "0",
      "1/4": "25%",
      "1/2": "50%",
      "3/4": "75%",
      "full": "100%",
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};