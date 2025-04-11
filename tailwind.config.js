/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts,tsx}"],
  mode: "jit",
  theme: {
    extend: {
      colors: {
        primary: "#FEF9E1",
        secondary: "#E5D0AC",
        tertiary: "#A31D1D",
        quaternary: "#6D2323",
        textPrimary: "#000000",
        textSecondary: "#ffffff",
        "black-100": "#100d25",
        "black-200": "#090325",
        "white-100": "#f3f3f3",
        "electric-purple": "#915eff",
      },
      boxShadow: {
        card: "0px 35px 120px -15px #211e35",
      },
      fontSize: {
        workwithme: "1.3rem", 
      },
      screens: {
        xs: "450px",
      },
      backgroundImage: {
        "hero-pattern": "url('/src/assets/lightbg.jpg')",
      },
      fontFamily: {
        noto: ["Noto Serif", "serif"],
      },
    },
  },
  plugins: [],
};
