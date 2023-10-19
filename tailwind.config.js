/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.tsx"
  ],
  theme: {
    extend: {
      boxShadow: {
        'backdrop': "20px 20px 20px 2000px rgba(0,0,0,0.5)",
      }
    },
  },
  plugins: [],
}

