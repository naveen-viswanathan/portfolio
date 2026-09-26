/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        dark: '#121212',
        light: '#F2F2F2',
        accent: '#00F700'
      }
    },
  },
  plugins: [],
}