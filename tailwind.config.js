/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        "roboto": ["Roboto", "sans-serif"],
      },
      height: {
        "dashboard-outlet": "calc(100vh - 8rem)"
      }
    },
  },
  plugins: [],
}