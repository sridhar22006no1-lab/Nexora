/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        nebula: {
          purple: '#8b5cf6',
          violet: '#7c3aed',
          blue: '#3b82f6',
          cyan: '#06b6d4',
          glow: 'rgba(139, 92, 246, 0.15)',
        },
        surface: {
          50: '#f8fafc',
          100: '#f1f5f9',
          800: '#1e293b',
          900: '#0f172a',
          950: '#090d16',
          card: '#111827',
          border: '#1f293d',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'nebula-gradient': 'linear-gradient(135deg, #7c3aed 0%, #4f46e5 50%, #2563eb 100%)',
      }
    },
  },
  plugins: [],
}
