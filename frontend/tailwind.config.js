/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        gibson: ["Gibson", "sans-serif"],
        dairymilk: ["DairyMilk", "cursive"],
      },
      height: {
        '0.75': '3px', 
      },
    },
  },
  plugins: [],
}
