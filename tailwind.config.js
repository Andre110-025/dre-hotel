 /** @type {import('tailwindcss').Config} */
 export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        wordSlide: {
          '0%': { opacity: '0', transform: 'translateY(12px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        wordSlide: 'wordSlide 0.5s ease-out forwards',
        fadeUp: 'fadeUp 1s ease-out',
      },
      colors: {
        mainColor: '#b01e1e',
        textColor: '#1F2937',
      },
      fontFamily: {
        handwritten: ['Great Vibes', 'cursive'],
      },
    },
  },
  plugins: [],
}