/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'modal-backdrop': 'rgba(0, 0, 0, 0.65)',
      },
      fontFamily: {
        sans: ['Roboto', ...defaultTheme.fontFamily.sans],
      },
      gridTemplateColumns: {
        'settings-upload': '1fr 100px',
      },
      spacing: {
        18: '72px',
      },
    },
  },
  plugins: [],
};
