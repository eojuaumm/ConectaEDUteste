// Caminho: tailwind.config.js

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    // NÃO ESTAMOS MAIS DENTRO DO 'EXTEND'
    // Estamos sobrescrevevendo a paleta de cores
    colors: {
      // Cores normais que o tailwind precisa
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'gray': { // Adicionando alguns cinzas para os links
        300: '#d1d5db',
        700: '#374151',
        900: '#111827',
      },
      'blue': { // Adicionando alguns azuis
         500: '#3b82f6',
         600: '#2563eb',
         700: '#1d4ed8',
      },

      // NOSSAS CORES CUSTOMIZADAS
      'conecta-purple': '#5B3A9A',
      'conecta-teal': '#40C0B4',
      'conecta-blue-bg': '#007BFF',
    },
    borderRadius: {
      // Também movi isso para fora do extend
      'none': '0',
      'sm': '0.125rem',
      '': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '2rem',   // Nossa borda
      '5xl': '3rem',   // Nossa borda
      'full': '9999px', // Para os inputs
    },
  },
  plugins: [],
}

module.exports = config