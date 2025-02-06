/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mine-shaft': {
        '50': '#f6f6f6',
        '100': '#e7e7e7',
        '200': '#d1d1d1',
        '300': '#b0b0b0',
        '400': '#888888',
        '500': '#6d6d6d',
        '600': '#5d5d5d',
        '700': '#4f4f4f',
        '800': '#454545',
        '900': '#3d3d3d',
        '950': '#2d2d2d',
    },
    'kashmir-blue': {
        '50': '#f5f7fa',
        '100': '#e9eef5',
        '200': '#cfdce8',
        '300': '#a5bfd4',
        '400': '#759dbb',
        '500': '#5381a4',
        '600': '#467095',
        '700': '#35536f',
        '800': '#2f475d',
        '900': '#2b3d4f',
        '950': '#1d2834',
    },
  
      }
    },
  },
  plugins: [],
}