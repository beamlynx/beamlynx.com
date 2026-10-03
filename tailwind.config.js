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
        // beamlynx-ui's own dark theme (styles/palette/themes.ts there), so
        // the site and the app look like one product. Every page is dark, so
        // higher numbers mean MORE emphasis (brighter), the reverse of
        // Tailwind's usual "bigger number = darker" convention.
        pine: {
          50: '#1f2335',
          100: '#24283b',
          200: '#2a2f45',
          300: '#3b4261',
          400: '#565f89',
          500: '#9aa5ce',
          600: '#7aa2f7',
          700: '#9ab8ff',
          800: '#c0caf5',
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
            '--tw-prose-body': '#a9b1d6',
            '--tw-prose-headings': '#c0caf5',
            '--tw-prose-lead': '#a9b1d6',
            '--tw-prose-links': '#7aa2f7',
            '--tw-prose-bold': '#c0caf5',
            '--tw-prose-counters': '#8890b5',
            '--tw-prose-bullets': '#3b4261',
            '--tw-prose-hr': '#363b58',
            '--tw-prose-quotes': '#c0caf5',
            '--tw-prose-quote-borders': '#3b4261',
            '--tw-prose-captions': '#8890b5',
            '--tw-prose-code': '#7aa2f7',
            '--tw-prose-pre-code': '#c0caf5',
            '--tw-prose-pre-bg': '#1f2335',
            '--tw-prose-th-borders': '#3b4261',
            '--tw-prose-td-borders': '#292e42',
            color: '#a9b1d6',
            maxWidth: 'none',
            code: {
              color: '#7aa2f7',
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