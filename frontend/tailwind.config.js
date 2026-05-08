/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#1B3A6B',
        accent: '#E8A020',
        dark: '#0D1F3C',
        lightbg: '#F4F7FB',
        muted: '#6B7280',
        bodytext: '#1A1A2E',
      },
      fontFamily: {
        heading: ['"Cormorant Garamond"', 'serif'],
        body: ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
