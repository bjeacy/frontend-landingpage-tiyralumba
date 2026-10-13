import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: '#0077B6',
        cyan: '#00B4D8',
        azure: '#E0FBFC',
        coral: '#FF6F59',
        neutralLight: '#F8F9FA',
        dashboardBase: '#F3F4F6',
        textDark: '#1D3557',
      },
      fontFamily: {
        heading: ['var(--font-plus-jakarta)', 'sans-serif'],
        body: ['var(--font-inter)', 'sans-serif'],
      },
    },
  },
  plugins: [],
};

export default config;
