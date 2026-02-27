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
        western: ['var(--font-rye)', 'Georgia', 'serif'],
        bebas: ['var(--font-bebas)', 'Arial', 'sans-serif'],
      },
      colors: {
        void: {
          DEFAULT: '#0f0e0c',
          elevated: '#1a1816',
          card: '#221f1b',
        },
        cream: {
          DEFAULT: '#f5ead6',
          light: '#fffcf2',
          muted: '#b8a892',
          dark: '#8b7d6b',
        },
        accent: {
          DEFAULT: '#d4a574',
          hover: '#e6ba8a',
          dim: '#a37f58',
        },
      },
    },
  },
  plugins: [],
}
export default config
