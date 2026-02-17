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
        // White + Silver luxury theme
        luxury: {
          silver: '#C0C0C0',
          'silver-light': '#E8E8E8',
          'silver-dark': '#A8A8A8',
          white: '#FFFFFF',
          'off-white': '#FAFAFA',
          charcoal: '#2C2C2C',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-silver': 'linear-gradient(135deg, #E8E8E8 0%, #C0C0C0 100%)',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
export default config
