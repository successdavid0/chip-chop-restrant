/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Chip Chop Brand Colors
        golden: {
          50: '#FFFBEB',
          100: '#FEF3C7',
          200: '#FDE68A',
          300: '#FCD34D',
          400: '#FBBF24',
          500: '#D4A528', // Primary Golden Brown
          600: '#B8860B', // Dark Golden
          700: '#92710C',
          800: '#78590A',
          900: '#5C4408',
        },
        charcoal: {
          50: '#FAFAFA',
          100: '#F4F4F5',
          200: '#E4E4E7',
          300: '#D4D4D8',
          400: '#A1A1AA',
          500: '#71717A',
          600: '#52525B',
          700: '#3F3F46',
          800: '#27272A',
          900: '#18181B',
        },
        cream: {
          50: '#FFFDFB',
          100: '#FFF9F0',
          200: '#FFF5E6',
          300: '#FFEDD5',
          400: '#FED7AA',
          500: '#FDBA74',
        },
        // Light mode specific warm colors
        warm: {
          50: '#FFFBF7',
          100: '#FFF7ED',
          200: '#FFEDD5',
          300: '#FED7AA',
          400: '#FDBA74',
          500: '#FB923C',
        },
        // Light mode surface colors
        surface: {
          50: '#FFFFFF',
          100: '#FEFEFE',
          200: '#FAFAF9',
          300: '#F5F5F4',
          400: '#E7E5E4',
          500: '#D6D3D1',
        },
      },
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'system-ui', '-apple-system', 'sans-serif'],
        accent: ['Cormorant Garamond', 'serif'],
      },
      backgroundImage: {
        'hero-gradient': 'linear-gradient(135deg, rgba(31, 31, 31, 0.95) 0%, rgba(212, 165, 40, 0.15) 100%)',
        'hero-gradient-light': 'linear-gradient(135deg, rgba(255, 251, 247, 0.98) 0%, rgba(212, 165, 40, 0.08) 100%)',
        'golden-gradient': 'linear-gradient(135deg, #D4A528 0%, #B8860B 50%, #92710C 100%)',
        'golden-gradient-soft': 'linear-gradient(135deg, #FBBF24 0%, #D4A528 50%, #B8860B 100%)',
        'dark-gradient': 'linear-gradient(180deg, #1F1F1F 0%, #0A0A0A 100%)',
        'light-gradient': 'linear-gradient(180deg, #FFFBF7 0%, #FFF7ED 100%)',
        'card-gradient': 'linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%)',
        'card-gradient-light': 'linear-gradient(145deg, rgba(255,255,255,0.9) 0%, rgba(255,251,247,0.8) 100%)',
      },
      boxShadow: {
        'golden': '0 4px 30px rgba(212, 165, 40, 0.3)',
        'golden-lg': '0 10px 50px rgba(212, 165, 40, 0.4)',
        'golden-soft': '0 4px 20px rgba(212, 165, 40, 0.15)',
        'golden-glow': '0 0 40px rgba(212, 165, 40, 0.2)',
        'elegant': '0 25px 50px -12px rgba(0, 0, 0, 0.5)',
        'elegant-light': '0 25px 50px -12px rgba(0, 0, 0, 0.08)',
        'card': '0 4px 20px rgba(0, 0, 0, 0.15)',
        'card-light': '0 2px 15px rgba(0, 0, 0, 0.04), 0 4px 6px rgba(0, 0, 0, 0.02)',
        'card-hover': '0 12px 40px rgba(0, 0, 0, 0.25)',
        'card-hover-light': '0 10px 30px rgba(0, 0, 0, 0.08), 0 4px 10px rgba(212, 165, 40, 0.1)',
        'soft': '0 2px 8px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 12px rgba(0, 0, 0, 0.06)',
        'lifted': '0 8px 25px rgba(0, 0, 0, 0.08)',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 1.5s linear infinite',
        'pulse-golden': 'pulse-golden 2s ease-in-out infinite',
        'slide-up': 'slideUp 0.3s ease-out',
        'fade-in': 'fadeIn 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'spin': 'spin 0.8s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'pulse-golden': {
          '0%, 100%': { boxShadow: '0 0 0 0 rgba(212, 165, 40, 0.4)' },
          '50%': { boxShadow: '0 0 0 15px rgba(212, 165, 40, 0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.95)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        spin: {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '250': '250ms',
      },
    },
  },
  plugins: [],
  future: {
    hoverOnlyWhenSupported: true,
  },
}
