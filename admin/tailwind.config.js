/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Poppins", "sans-serif"],
        heading: ["Montserrat", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      colors: {
        primary: {
          DEFAULT: "#5f6FFF",
          dark: "#4F5FEF",
        },
        secondary: {
          DEFAULT: "#FF6B6B",
          dark: "#FF5252",
        },
      },
    },
  },
  plugins: [],
};
