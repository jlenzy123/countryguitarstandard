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
        display: ['var(--font-playfair)', 'Georgia', 'serif'],
      },
      colors: {
        void: {
          DEFAULT: '#0a0a0a',
          elevated: '#111111',
          card: '#161616',
        },
        cream: {
          DEFAULT: '#f5f0e8',
          muted: '#9a9590',
        },
        accent: {
          DEFAULT: '#c9a84c',
          hover: '#dabb5e',
          dim: '#8b7a3a',
        },
      },
    },
  },
  plugins: [],
}
export default config
