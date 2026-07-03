/**
 * Tailwind CSS Configuration - Ultra Premium Light Theme
 */
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './index.html',
    './public/**/*.html'
  ],
  theme: {
    extend: {
      colors: {
        white: '#ffffff',
        silver: '#c0c0c0',
        lightBlue: '#a6c8ff',
        purple: '#b89bff',
        cyan: '#a5f3fc',
        gold: '#ffd700',
        // UI element colors
        primary: '#f8fafc',
        secondary: '#475569',
        accent: '#06b6d4', // cyan accent
      },
      backgroundImage: {
        'gradient-primary': 'linear-gradient(135deg, #ffffff, #c0c0c0, #a6c8ff, #b89bff, #a5f3fc, #ffd700)',
        'gradient-subtle': 'radial-gradient(circle at 50% 50%, #f1f5f9 0%, #cbd5e1 100%)',
      },
      boxShadow: {
        'glass': '0 4px 30px rgba(0, 0, 0, 0.1)',
        'neumorph': '8px 8px 15px rgba(0,0,0,0.1), -8px -8px 15px rgba(255,255,255,0.7)'
      },
      backdropBlur: {
        xs: '2px',
        sm: '4px',
        md: '8px',
        lg: '12px',
        xl: '16px',
      },
      borderRadius: {
        'lg': '20px',
        'xl': '32px'
      }
    }
  },
  plugins: []
};
