// tailwind.config.js
import { tailwindTheme } from './src/theme/tailwind.theme.config.js';

/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  ...tailwindTheme,
};
