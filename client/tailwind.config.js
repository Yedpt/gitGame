/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",   
  ],
  theme: {
    colors: {
      'dark': '#2D342D',
      'light': '#D9D9D9',
      'greenLight': '#27B129',
      'greenMid': '#325C33',
      'greenDark': '#253325',
      'greenMidsec': '#338635',
  },
  fontFamily: {
      'title': ['Orbitron', 'sans-serif'],
      'paragraph': ['Inter', 'sans-serif'],
    },
  extend: {},
  plugins: [],
}
}
