/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        maroon: '#7A1E24',
        'maroon-deep': '#5C1519',
        gold: '#C9971F',
        'gold-light': '#E8C169',
        teal: '#1B5470',
        navy: '#0E2A47',
        'navy-light': '#173A5E',
        amber: '#E8823C',
        cream: '#FBF3E3',
        ink: '#2A1E14',
        grey: '#8a8378',
        line: '#EAE1CF',
      },
      fontFamily: {
        tiro: ['"Tiro Devanagari Marathi"', 'serif'],
        mukta: ['Mukta', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
