/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      colors: {
        'prestige-charcoal': '#3C4A4D',
        'prestige-teal': '#43C4B2',
        'prestige-light-gray': '#F8F9FA',
        'prestige-gray': '#E9ECEF',
        'prestige-text': '#6C757D',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0px', opacity: '0' },
          to: { height: 'var(--accordion-content-height)', opacity: '1' },
        },
        'accordion-up': {
          from: { height: 'var(--accordion-content-height)', opacity: '1' },
          to: { height: '0px', opacity: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
    }
  },
  plugins: [],
}
