import type { Config } from 'tailwindcss';
import { heroui } from '@heroui/react';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
        fontFamily: {
          sans: ['Montserrat Alternates', 'sans-serif'],
        },
        dropShadow: {
            soft: '0 10px 25px rgba(0, 0, 0, 0.15)',
        },
    },
  },
  darkMode: 'class',
  plugins: [heroui()],
};
export default config;