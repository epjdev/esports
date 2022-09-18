/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/**/*.tsx',
    './index.html'
  ],
  theme: {
    fontFamily:{
      sans: ['Inter', 'sans-serif']
    },
    extend: {
      colors:{
        
      },
      backgroundImage: {
        'backg-galaxy': "url('/background-galaxy.png')",
        'nlw-gradient': 'linear-gradient(90deg, #9572fc 12%, #43e7ad 45%, #e1d55d 90%)',
        'games-gradient': 'linear-gradient(180deg, rgba(0,0,0,0) 0%, rgba(0,0,0,0.8) 80%)'
      },
    },
  },
  plugins: [],
}
