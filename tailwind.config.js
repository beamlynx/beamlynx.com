/** @type {import('tailwindcss').Config} */
import typography from '@tailwindcss/typography'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Reuses beamlynx-ui's own "schematic/blueprint" palette (canvas mode's
        // --canvas-* tokens) rather than a color invented for this site alone -
        // one brand across the app and the marketing site. Light-mode canvas
        // values here (not the app's dark-mode ones) since most pages using
        // pine-* are still on a white background this pass - see
        // beamlynx-plans/pending for the redesign this is unifying with.
        pine: {
          50: '#eef4fa',
          100: '#e3edf6',
          200: '#c8dced',
          300: '#9fc0dc',
          400: '#6a93ad',
          500: '#4d6d85',
          600: '#1c6fa8',
          700: '#145683',
          800: '#0f2337',
          900: '#0a1826',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"IBM Plex Sans"', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            code: {
              color: '#1c6fa8',
              '&::before': {
                content: '""',
              },
              '&::after': {
                content: '""',
              },
            },
          },
        },
      },
    },
  },
  plugins: [
    typography,
  ],
} 