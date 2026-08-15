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
        // dark --canvas-* tokens) rather than a color invented for this site
        // alone - one brand across the app and the marketing site. Every page
        // is dark now (see the 2026-08-15 follow-up pass), so this scale is
        // anchored on the app's DARK canvas values, not its light ones -
        // higher numbers read as MORE emphasis/brighter (600 -> 900 = the
        // hover/emphasis direction on a dark ground), the reverse of
        // Tailwind's usual "bigger number = darker" convention.
        pine: {
          50: '#0f2337',
          100: '#132a41',
          200: '#1c3b57',
          300: '#28577c',
          400: '#4d6d85',
          500: '#7ba3c2',
          600: '#4fd1ff',
          700: '#6fdcff',
          800: '#dbeeff',
          900: '#ffffff',
        },
      },
      fontFamily: {
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'monospace'],
        sans: ['"IBM Plex Sans"', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      typography: {
        // Full dark palette for `.prose` (DocSection/DocumentationSection's
        // custom `children` prose) - every consumer is a dark page now, so
        // this is the DEFAULT theme itself, not a `-invert` variant bolted on.
        DEFAULT: {
          css: {
            '--tw-prose-body': '#a9c3d8',
            '--tw-prose-headings': '#dbeeff',
            '--tw-prose-lead': '#a9c3d8',
            '--tw-prose-links': '#4fd1ff',
            '--tw-prose-bold': '#dbeeff',
            '--tw-prose-counters': '#6f97b5',
            '--tw-prose-bullets': '#2c5578',
            '--tw-prose-hr': '#22496b',
            '--tw-prose-quotes': '#dbeeff',
            '--tw-prose-quote-borders': '#2c5578',
            '--tw-prose-captions': '#6f97b5',
            '--tw-prose-code': '#4fd1ff',
            '--tw-prose-pre-code': '#dbeeff',
            '--tw-prose-pre-bg': '#0f2337',
            '--tw-prose-th-borders': '#2c5578',
            '--tw-prose-td-borders': '#1a3552',
            color: '#a9c3d8',
            maxWidth: 'none',
            code: {
              color: '#4fd1ff',
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