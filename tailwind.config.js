/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cell: {
          0: "#FF0000",
          1: "#191970", 
          2: "#006400",
          3: "#ffd700",
          4: "#00ff00",
          5: "#1e90ff",
          6: "#c71585",
          7: "#ffb6c1",
        },
        board: {
          800: "#999999",
          900: "#BBBBBB",
        }
      },
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      }
    },
  },
  plugins: [],
}
