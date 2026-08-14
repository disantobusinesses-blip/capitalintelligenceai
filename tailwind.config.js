/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Three-tone brown system sourced from the IAS monogram logo.
        // Values live in app/globals.css as CSS variables so the palette is
        // swappable in one place. See that file for the per-tone usage rules:
        // `light` is for large display surfaces and 18px+ display text only.
        ias: {
          'brown-dark': 'rgb(var(--ias-brown-dark-rgb) / <alpha-value>)',
          'brown-mid': 'rgb(var(--ias-brown-mid-rgb) / <alpha-value>)',
          'brown-light': 'rgb(var(--ias-brown-light-rgb) / <alpha-value>)',
        },
        // Luxury dark brown leather theme
        // Note: Token names retain 'baby-blue' prefix for backward compatibility
        // with all component references. Actual values are dark brown leather tones.
        tech: {
          black: '#000000',
          white: '#FFFFFF',
          platinum: '#E5E4E2',
          'platinum-light': '#F0F0EE',
          'platinum-dark': '#C9C8C6',
          'baby-blue': '#8B5E3C',
          'baby-blue-light': '#A67B5B',
          'baby-blue-dark': '#5C3A1E',
          'baby-blue-glow': 'rgba(139, 94, 60, 0.3)',
          gray: '#1A1A1A',
          'gray-light': '#2A2A2A',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-tech': 'linear-gradient(135deg, #000000 0%, #1A1A1A 50%, #8B5E3C 100%)',
        'gradient-blue': 'linear-gradient(135deg, #8B5E3C 0%, #5C3A1E 100%)',
        'gradient-platinum': 'linear-gradient(135deg, #F0F0EE 0%, #E5E4E2 100%)',
      },
      fontFamily: {
        sans: ['system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
      boxShadow: {
        'glow': '0 0 20px rgba(139, 94, 60, 0.5)',
        'glow-sm': '0 0 10px rgba(139, 94, 60, 0.3)',
        'glow-lg': '0 0 30px rgba(139, 94, 60, 0.6)',
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
          '0%': { boxShadow: '0 0 5px rgba(139, 94, 60, 0.5)' },
          '100%': { boxShadow: '0 0 20px rgba(139, 94, 60, 0.8)' },
        },
      },
    },
  },
  plugins: [],
}
