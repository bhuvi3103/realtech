/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          navy: '#102A43',
          dark: '#0B1728',
          cardDark: '#132238',
          teal: '#39C6B0',
          tealHover: '#2bb39e',
          tealLight: 'rgba(57, 198, 176, 0.12)',
          lightBg: '#F5F8FC',
          muted: '#60758B',
          border: '#D9E3EE',
          darkBorder: '#1E334D',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'subtle': '0 2px 10px rgba(11, 23, 40, 0.04)',
        'premium': '0 10px 30px -10px rgba(16, 42, 67, 0.08), 0 4px 6px -2px rgba(16, 42, 67, 0.03)',
        'card-hover': '0 20px 35px -10px rgba(16, 42, 67, 0.12), 0 8px 10px -4px rgba(57, 198, 176, 0.08)',
        'glow-teal': '0 0 25px rgba(57, 198, 176, 0.25)',
      }
    },
  },
  plugins: [],
}
