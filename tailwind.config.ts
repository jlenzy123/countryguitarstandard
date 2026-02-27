import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Resolve Sans', 'system-ui', 'sans-serif'],
        display: ['Resolve Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: {
          DEFAULT: '#fafaf8',
          elevated: '#f0ede8',
          card: '#ffffff',
        },
        cream: {
          DEFAULT: '#1a1a1a',
          muted: '#6b7280',
        },
        // Warm gold accent palette
        denim: {
          DEFAULT: '#b8860b',
          hover: '#a37608',
        },
        saddle: {
          DEFAULT: '#d4a24e',
          hover: '#c08e3a',
        },
        barn: {
          DEFAULT: '#b8860b',
          hover: '#a37608',
        },
        gold: {
          DEFAULT: '#b8860b',
          hover: '#a37608',
        },
        teal: {
          DEFAULT: '#b8860b',
          hover: '#a37608',
        },
      },
    },
  },
  plugins: [],
}
export default config
