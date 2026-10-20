/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        void: '#000000',
        space: { 950: '#000000', 900: '#0b0b0d', 850: '#111113' },
        graphite: { 800: '#161617', 700: '#1d1d1f', 600: '#2c2c2e', 500: '#424245' },
        bone: { DEFAULT: '#f5f5f7', dim: '#a1a1a6', muted: '#86868b' },
        signal: { DEFAULT: '#ff6a3d', dim: '#e5532a' },
        link: '#2997ff',
        vhal: { primary: '#A7ADB5', secondary: '#24272D', accent: '#E7E9EC' },
        ilvani: { primary: '#B8D9F2', secondary: '#243B59', accent: '#F4F6F8' },
        sazhi: { primary: '#73854A', secondary: '#381D20', accent: '#D7A64B' },
        xhalen: { primary: '#758D7C', secondary: '#171C1B', accent: '#B8C5BD' },
      },
      fontFamily: {
        display: ['"SF Pro Display"', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
        sans: ['"SF Pro Text"', '-apple-system', 'BlinkMacSystemFont', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'ui-monospace', 'monospace'],
      },
      letterSpacing: { stamp: '0.22em' },
      keyframes: {
        orbit: { to: { transform: 'rotate(360deg)' } },
        flicker: {
          '0%,100%': { opacity: '1' },
          '45%': { opacity: '0.85' },
          '48%': { opacity: '0.4' },
          '50%': { opacity: '0.95' },
        },
        fadeUp: { from: { opacity: '0', transform: 'translateY(16px) scale(0.98)' }, to: { opacity: '1', transform: 'none' } },
        marquee: { to: { transform: 'translateX(-50%)' } },
        drift: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        orbit: 'orbit 120s linear infinite',
        'orbit-slow': 'orbit 240s linear infinite',
        flicker: 'flicker 4s steps(1) infinite',
        drift: 'drift 7s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
