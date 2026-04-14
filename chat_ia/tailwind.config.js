/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#4F46E5',
        'primary-dim': '#4338CA',
        'primary-container': '#E0E7FF',
        'on-primary': '#FFFFFF',
        'on-primary-container': '#1E1B4B',
        secondary: '#6366F1',
        'secondary-container': '#EEF2FF',
        'on-secondary-container': '#312E81',
        surface: '#F9FAFB',
        'surface-dim': '#F3F4F6',
        'surface-bright': '#FFFFFF',
        'surface-container-lowest': '#FFFFFF',
        'surface-container-low': '#F9FAFB',
        'surface-container': '#F3F4F6',
        'surface-container-high': '#E5E7EB',
        'surface-container-highest': '#D1D5DB',
        'on-surface': '#111827',
        'on-surface-variant': '#4B5563',
        outline: '#9CA3AF',
        'outline-variant': '#E5E7EB',
        background: '#F9FAFB',
        'on-background': '#111827',
      },
      fontFamily: {
        headline: ['Manrope', 'sans-serif'],
        body: ['Inter', 'sans-serif'],
        label: ['Inter', 'sans-serif'],
      },
      borderRadius: {
        DEFAULT: '0.5rem',
        lg: '0.5rem',
        xl: '0.75rem',
        full: '9999px',
      },
    },
  },
  plugins: [],
}