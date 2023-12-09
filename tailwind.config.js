/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        darkPurple:"#140A26",
      },
      fontFamily: {
        Montserrat: ["Montserrat"],
        Raleway: ["Raleway"],
      },
    },
  },
  plugins: [],
};
