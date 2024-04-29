/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./**/*.{html,js}"],
  theme: {
    fontFamily: {
      'sans': ['Roboto', 'sans-serif'],
      'cursive': ['Great Vibes', 'Roboto']
    },
    extend: {
      backgroundImage: {
        "home": "url('/assets/bg-rosa.png')",
        "picole-cobertura": "url('/assets/bg-blue.png')",
        "icecream": "url('/assets/bg-gray.png')",
      }
    },
  },
  plugins: [],
}

