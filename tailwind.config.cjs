/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary' : '#E020FF',
        'black' : '#121212',
        'gray' : '#505050',
        'darkgray': '#252525'
      }
    },
  },
  plugins: [],
}