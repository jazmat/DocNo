/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",

    // ALL React files
    "./src/**/*.{js,ts,jsx,tsx}",

    // Explicit safety includes (important after git recovery)
    "./src/pages/**/*.{js,jsx}",
    "./src/pages/admin/**/*.{js,jsx}",
    "./src/components/**/*.{js,jsx}",
    "./src/layouts/**/*.{js,jsx}",
  ],

  theme: {
    extend: {},
  },

  plugins: [],
};