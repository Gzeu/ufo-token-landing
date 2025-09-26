/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        cosmic: {
          purple: '#6B46C1',
          blue: '#3B82F6',
          pink: '#EC4899',
          green: '#10B981',
          yellow: '#F59E0B',
          dark: '#1a1b3a',
          darker: '#0f1022',
        },
        ufo: {
          beam: '#00D4FF',
          glow: '#7C3AED',
          silver: '#E5E7EB',
          gold: '#FBBF24',
        }
      },
      backgroundImage: {
        'cosmic-gradient': 'linear-gradient(135deg, #1a1b3a 0%, #0f1022 100%)',
        'beam-gradient': 'linear-gradient(90deg, transparent 0%, #00D4FF 50%, transparent 100%)',
        'glow-gradient': 'radial-gradient(circle, #7C3AED 0%, transparent 70%)',
      },
      animation: {
        'float': 'float 3s ease-in-out infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
        'beam': 'beam 2s linear infinite',
        'twinkle': 'twinkle 1.5s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        glow: {
          '0%': { boxShadow: '0 0 20px #7C3AED' },
          '100%': { boxShadow: '0 0 40px #7C3AED, 0 0 60px #7C3AED' },
        },
        beam: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        twinkle: {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
      },
    },
  },
  plugins: [],
}