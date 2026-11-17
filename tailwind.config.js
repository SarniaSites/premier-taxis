/** @type {import('tailwindcss').Config} */
// ─────────────────────────────────────────────────────────────
//  Premier Taxis – Tailwind config
//  Brand colours live here. Change them, then:
//    npm install   (first time only)
//    npm run build
// ─────────────────────────────────────────────────────────────
module.exports = {
  content: ['./*.html', './assets/js/**/*.js'],
  theme: {
    extend: {
      colors: {
        // Deep maroon – the main colour of the Premier Taxis logo (#680107)
        // and the red used on every flyer
        claret: {
          50: '#fbf2f2',
          100: '#f5e1e1',
          200: '#e9bcbd',
          600: '#8a0b12',
          700: '#7a050c',
          800: '#680107',
          900: '#4a0105', // banner shadow tone (#480102)
          950: '#2c0003',
        },
        // Gold – the logo lettering (#fad737 → #f8ba07)
        gold: {
          100: '#fef6d4',
          200: '#fdeba0',
          300: '#fad737',
          400: '#f8c51c',
          500: '#f0ae07',
          600: '#c98a04',
        },
        // Warm off-white paper – softens the white of the logo ring
        paper: {
          50: '#fffdf8',
          100: '#fbf6ec',
          200: '#f3ead8',
        },
        ink: '#221516', // near-black with a hint of maroon for body text
      },
      fontFamily: {
        display: ['Fraunces', 'Georgia', 'serif'],
        sans: ['Figtree', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      keyframes: {
        marquee: { to: { transform: 'translateX(-50%)' } },
        drift: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-6px)' } },
      },
      animation: {
        marquee: 'marquee 38s linear infinite',
        drift: 'drift 6s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
