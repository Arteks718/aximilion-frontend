/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        headline: ["Manrope", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        primary: '#006c49',
        surface: '#f6f9ff',
        'surface-container': '#e8eef6',
        'surface-container-low': '#eef4fc',
        'surface-container-lowest': '#ffffff',
        'surface-container-high': '#e3e9f1',
        'surface-container-highest': '#dde3eb',
        'surface-variant': '#dde3eb',
        'brand-green': '#047857',
        'brand-dark': '#111827',
        'brand-gray': '#6B7280',
        'brand-lightGreen': '#D1FAE5',
      }
    },
  },
  plugins: [],
}
