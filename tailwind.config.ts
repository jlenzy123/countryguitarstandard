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
        // Clean red accent palette
        denim: {
          DEFAULT: '#dc2626',
          hover: '#ef4444',
        },
        saddle: {
          DEFAULT: '#7f1d1d',
          hover: '#991b1b',
        },
        barn: {
          DEFAULT: '#dc2626',
          hover: '#b91c1c',
        },
        gold: {
          DEFAULT: '#fbbf24',
          hover: '#fcd34d',
        },
        teal: {
          DEFAULT: '#dc2626',
          hover: '#ef4444',
        },
      },
    },
  },
  plugins: [],
}
export default config
