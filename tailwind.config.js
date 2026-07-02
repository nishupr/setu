/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: '#00d4aa',
        kavach: '#ff6b35',
        sachchi: '#00d084',
        sangam: '#a78bfa',
        dastaan: '#f59e0b',
        panah: '#38bdf8',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        grotesk: ['Space Grotesk', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
    },
  },
  plugins: [],
}
