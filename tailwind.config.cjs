/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'copa-blue': {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fc',
          300: '#89CFF0',
          400: '#63b8e8',
          500: '#3b9ddb',
          600: '#2b82c9',
          700: '#2368af',
          800: '#1e518d',
          900: '#1a3f6f',
          950: '#0f2847',
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/aspect-ratio'),
    require('@tailwindcss/typography'),
  ],
};
