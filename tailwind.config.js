/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        'ph': '100px',
        'xs': '480px',      // Extra-small screen
        'sm': '640px',      // Small screen
        'md': '768px',      // Medium screen
        'lg': '1024px',     // Large screen
        'xl': '1280px',     // Extra-large screen
        '2xl': '1536px',    // Extra-extra-large screen
      },
    },
  },
  plugins: [],
}
