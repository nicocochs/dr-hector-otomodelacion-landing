import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#1a1614',
        surface: '#2a2320',
        accent: '#c4856a',
        'text-primary': '#f5ede6',
        'text-secondary': '#a89888',
      },
      fontFamily: {
        serif: ['DM Serif Display', 'serif'],
        sans: ['Aeonik', 'sans-serif'],
      },
      borderRadius: {
        'neumorphic': '16px',
      },
      boxShadow: {
        'neumorphic': '8px 8px 16px rgba(0,0,0,0.4), -8px -8px 16px rgba(60,50,42,0.15)',
        'neumorphic-inset': 'inset 2px 2px 4px rgba(0,0,0,0.3), inset -2px -2px 4px rgba(60,50,42,0.1)',
      },
    },
  },
  plugins: [],
};

export default config;
