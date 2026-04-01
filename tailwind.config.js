/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        cell: {
          0: "#ef4444", // Red 500
          1: "#3b82f6", // Blue 500
          2: "#84cc16", // Lime 500
          3: "#facc15", // Yellow 400
          4: "#a855f7", // Purple 500
          5: "#06b6d4", // Cyan 500
          6: "#14b8a6", // Teal 500 (extra)
          7: "#f97316", // Orange 500 (extra)
        },
        board: {
          800: "#1e293b", // Slate 800
          900: "#0f172a", // Slate 900
        }
      },
      gridTemplateColumns: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      gridTemplateRows: {
        '30': 'repeat(30, minmax(0, 1fr))',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'bounce-light': 'bounce 2s infinite',
      }
    },
  },
  plugins: [],
}
