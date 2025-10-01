module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        playfair: ['"Playfair Display"', 'serif'],
        lato: ['Lato', 'sans-serif'],
      },
      keyframes: {
        'fade-in-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateY(0)'
          },
        },
        'fade-in': {
          '0%': {
            opacity: '0'
          },
          '100%': {
            opacity: '1'
          }
        },
        'slide-in': {
          '0%': {
            opacity: '0',
            transform: 'translateX(-50px)'
          },
          '100%': {
            opacity: '1',
            transform: 'translateX(0)'
          }
        }
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out',
        'fade-in-up-delay': 'fade-in-up 0.8s ease-out 0.2s',
        'fade-in': 'fade-in 1.2s ease-in-out',
        'slide-in': 'slide-in 0.8s cubic-bezier(0.25, 0.46, 0.45, 0.94) forwards'
      }
    },
  },
  plugins: [],
}