import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Modern techy theme: Black, White, Platinum, Baby Blue
        tech: {
          black: '#000000',
          white: '#FFFFFF',
          platinum: '#E5E4E2',
          'platinum-light': '#F0F0EE',
          'platinum-dark': '#C9C8C6',
          'baby-blue': '#89CFF0',
          'baby-blue-light': '#A8DFFF',
          'baby-blue-dark': '#6AB8D8',
          'baby-blue-glow': 'rgba(137, 207, 240, 0.3)',
          gray: '#1A1A1A',
          'gray-light': '#2A2A2A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-tech': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #89CFF0 100%)',
        'gradient-blue': 'linear-gradient(135deg, #89CFF0 0%, #6AB8D8 100%)',
        'gradient-platinum': 'linear-gradient(135deg, #F0F0EE 0%, #E5E4E2 100%)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(137, 207, 240, 0.5)',
        'glow-sm': '0 0 10px rgba(137, 207, 240, 0.3)',
        'glow-lg': '0 0 30px rgba(137, 207, 240, 0.6)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 5px rgba(137, 207, 240, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(137, 207, 240, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
