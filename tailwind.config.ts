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
          DEFAULT: '#0a0a0a',
          elevated: '#141414',
          card: '#1a1a1a',
        },
        cream: {
          DEFAULT: '#ffffff',
          muted: '#a3a3a3',
        },
        // Warm gold accent palette
        denim: {
          DEFAULT: '#d4a24e',
          hover: '#e2b86a',
        },
        saddle: {
          DEFAULT: '#8b6914',
          hover: '#a37c1e',
        },
        barn: {
          DEFAULT: '#d4a24e',
          hover: '#c08e3a',
        },
        gold: {
          DEFAULT: '#d4a24e',
          hover: '#e2b86a',
        },
        teal: {
          DEFAULT: '#d4a24e',
          hover: '#e2b86a',
        },
      },
    },
  },
  plugins: [],
}
export default config
