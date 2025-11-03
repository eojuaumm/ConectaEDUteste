/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      'transparent': 'transparent',
      'current': 'currentColor',
      'white': '#ffffff',
      'black': '#000000',
      'gray': { 
        300: '#d1d5db',
        700: '#374151',
        900: '#111827',
      },
      'blue': { 
         500: '#3b82f6',
         600: '#2563eb',
         700: '#1d4ed8',
      },
      'conecta-purple': '#5B3A9A',
      'conecta-teal': '#40C0B4',
      'conecta-blue-bg': '#007BFF',
    },
    borderRadius: {
      'none': '0',
      'sm': '0.125rem',
      '': '0.25rem',
      'md': '0.375rem',
      'lg': '0.5rem',
      'xl': '0.75rem',
      '2xl': '1rem',
      '3xl': '1.5rem',
      '4xl': '2rem',
      '5xl': '3rem', 
      'full': '9999px', 
    },
  },
  plugins: [],
}

module.exports = config