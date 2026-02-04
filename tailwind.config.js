/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0152CC',
          dark: '#003D99',
          light: '#3D7FE6',
          50: '#E6F0FF',
          100: '#CCE0FF',
        },
        secondary: {
          DEFAULT: '#4A90D9',
          dark: '#2E6EB8',
          light: '#7AB5E8',
        },
        positive: {
          DEFAULT: '#4ADE80',
          dark: '#22C55E',
          light: '#86EFAC',
          bg: '#F0FDF4',
        },
        negative: {
          DEFAULT: '#F87171',
          dark: '#EF4444',
          light: '#FCA5A5',
          bg: '#FEF2F2',
        },
        discount: {
          DEFAULT: '#F87171',
          dark: '#EF4444',
        },
        section: {
          blue: '#F0F7FF',
          gray: '#F5F5F5',
        },
      },
      fontFamily: {
        sans: ['Pretendard', '-apple-system', 'BlinkMacSystemFont', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
