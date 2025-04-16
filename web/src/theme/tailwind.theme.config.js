// 📁 src/theme/tailwind.theme.config.js

export const tailwindTheme = {
    theme: {
      extend: {
        fontFamily: {
          mulish: ['Mulish', 'sans-serif'],
        },
        fontSize: {
          display: ['3rem', { lineHeight: '1.1', letterSpacing: '-0.01em' }],
          headline: ['2.25rem', { lineHeight: '1.2' }],
          title: ['1.5rem', { lineHeight: '1.3' }],
          subtitle: ['1.25rem', { lineHeight: '1.5' }],
          body: ['1rem', { lineHeight: '1.6' }],
          caption: ['0.875rem', { lineHeight: '1.4' }],
          label: ['0.75rem', { lineHeight: '1.2' }],
        },
        fontWeight: {
          light: '300',
          regular: '400',
          semibold: '600',
          bold: '700',
          extrabold: '800',
        },
        colors: {
          brand: {
            green: '#C1FF72', // principal
            dark: '#4E9E24', // hover/acción
            black: '#000000',
            gray: '#1A202C', // texto
            light: '#F7F7F7', // fondos suaves
            white: '#FFFFFF',
          },
        },
      },
    },
    plugins: [],
  };
  
  // 💡 Puedes importar esto en tu tailwind.config.js así:
  // import { tailwindTheme } from './src/theme/tailwind.theme.config';
  // export default defineConfig({
  //   content: [...],
  //   ...tailwindTheme,
  // });
  