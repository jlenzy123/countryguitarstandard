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
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
        display: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        void: {
          DEFAULT: '#050506',
          elevated: '#101013',
          card: '#16161b',
        },
        cream: {
          DEFAULT: '#f9f7f4',
          muted: '#c0bab2',
        },
        // Map all accent names into a single red/neutral brand palette
        denim: {
          DEFAULT: '#c62828',
          hover: '#e53935',
        },
        saddle: {
          DEFAULT: '#8e0000',
          hover: '#b71c1c',
        },
        barn: {
          DEFAULT: '#c62828',
          hover: '#8e0000',
        },
        gold: {
          DEFAULT: '#f9f7f4',
          hover: '#ffffff',
        },
        teal: {
          DEFAULT: '#c62828',
          hover: '#e53935',
        },
      },
    },
  },
  plugins: [],
}
export default config
