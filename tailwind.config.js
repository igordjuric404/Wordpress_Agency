/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'neo-white': '#FFFEF9',
        'neo-black': '#111111',
        'neo-gray': '#F5F5F5',
        'neo-gray-light': '#9ca3af',
        'neo-gray-dark': '#333333',
        'beige': '#fcfbf5',
        'beige-dark': '#d4d0c0',
        'beige-darker': '#E8E5D8',

        // Vibrant colors
        'bold-pink': '#FF2D95',
        'bold-green': '#00E676',
        'bold-yellow': '#FFB703',
        'bold-blue': '#00B2FF',
        'bold-purple': '#A100FF',
        'bold-orange': '#FF6B35',

        // Pastel colors
        'soft-pink': '#FFE0EE',
        'soft-green': '#E3FCE6',
        'soft-yellow': '#FFF9D8',
        'soft-blue': '#D1E9FF',
        'soft-blue-dark': '#B0D4F0',
        'soft-purple': '#F1E1FF',
        'soft-orange': '#FFE0D6',

        // Legacy (aliases)
        'brutal-vibrant-pink': '#FF2D95',
        'brutal-vibrant-green': '#00E676',
        'brutal-vibrant-yellow': '#FFB703',
        'brutal-vibrant-blue': '#00B2FF',
        'brutal-vibrant-purple': '#A100FF',
        'brutal-pastel-pink': '#FFE0EE',
        'brutal-pastel-green': '#E3FCE6',
        'brutal-pastel-yellow': '#FFF9D8',
        'brutal-pastel-blue': '#D1E9FF',
        'brutal-pastel-purple': '#F1E1FF',
      },
      fontFamily: {
        display: ['Poppins', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        sora: ['Sora', 'sans-serif'],
      },
      boxShadow: {
        'neo-sm': '4px 4px 0 #111111',
        'neo': '6px 6px 0 #111111',
        'neo-lg': '8px 8px 0 #111111',
        'neo-hover': '3px 3px 0 #111111',
        'neo-active': '2px 2px 0 #111111',
        'neo-pink': '6px 6px 0 #B8005C',
        'neo-green': '6px 6px 0 #00532A',
        'neo-yellow': '6px 6px 0 #B88200',
        'neo-blue': '6px 6px 0 #007DB3',
        'neo-purple': '6px 6px 0 #7000B3',
        'neo-orange': '6px 6px 0 #CC5529',
      },
      borderWidth: {
        '3': '3px',
        '4': '4px',
      },
    },
  },
  plugins: [],
}
