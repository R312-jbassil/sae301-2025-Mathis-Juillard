/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'manrope': ['Manrope', 'sans-serif'],
      },
    },
  },
  plugins: [require('daisyui')],
  daisyui: {
    themes: [
      {
        tavue: {
          /* Couleurs principales */
          'base-100': '#FAFAF7',
          'base-200': '#F5F3EF',
          'base-300': '#EAE6E1',
          'base-content': '#1E1E1E',

          'primary': '#2C3E50',
          'primary-content': '#FFFFFF',

          'secondary': '#D4B483',
          'secondary-content': '#1E1E1E',

          'accent': '#CDAE7C',
          'accent-content': '#1E1E1E',

          'neutral': '#D9D9D9',
          'neutral-content': '#1E1E1E',

          /* Couleurs système */
          'info': '#7BA8AC',
          'success': '#9CCBB8',
          'warning': '#E2C07C',
          'error': '#B55445',

          /* Rayons et bordures */
          '--rounded-box': '1rem',
          '--rounded-btn': '0.5rem',
          '--rounded-badge': '1rem',

          '--border-btn': '1px',
        },
      },
    ],
  },
}
