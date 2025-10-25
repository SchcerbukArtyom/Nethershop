/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html"
  ],
  safelist: [
    'lg:hidden',
    'lg:flex'
  ],
  theme: {
    extend: {},
  },
  plugins: [],
}


