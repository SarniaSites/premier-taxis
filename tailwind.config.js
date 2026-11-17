/** Premier Taxis – Tailwind config. Colours are named by role. */
module.exports = {
  content: ['./index.html', './thanks.html', './404.html', './assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        // ACTION – the deep claret of the round Premier Taxis badge (#680107). Call, Book, links. Nothing else uses it as a fill.
        action: { DEFAULT: '#680107', hover: '#82101a', press: '#4f0005' },
        // BRAND – darker claret from the banner shadow (#480102). Dark bands, footer.
        brand: { DEFAULT: '#480102', deep: '#2e0003', soft: '#f3e3df' },
        // HIGHLIGHT – the taxi-sign amber of the badge lettering (#f8ba07 / #fad737). Road lines, markers, illustration fills.
        highlight: { DEFAULT: '#f8ba07', light: '#fad737', pale: '#fdf1c7' },
        // ACCENT – forget-me-not blue from the dementia-friendly symbol on their badge. Small accessibility icons only.
        accent: { DEFAULT: '#2f62a8', pale: '#e4ecf7' },
        // SURFACE – warm paper neutrals
        surface: { DEFAULT: '#fbf6ec', white: '#fffdf8', line: '#eadfcc', warm: '#f4ebdb' },
        // INK – text
        ink: { DEFAULT: '#241416', soft: '#5b4a47', faint: '#8a7a74' },
      },
      fontFamily: {
        display: ['"Young Serif"', 'Georgia', 'serif'],
        sans: ['"Hanken Grotesk"', 'system-ui', '-apple-system', 'Segoe UI', 'sans-serif'],
      },
      maxWidth: { site: '76rem' },
      keyframes: {
        drive: { '0%': { transform: 'translateX(-160px)' }, '100%': { transform: 'translateX(calc(100vw + 160px))' } },
        dash: { to: { strokeDashoffset: '-48' } },
        pulse2: { '0%': { transform: 'scale(1)', opacity: '.55' }, '100%': { transform: 'scale(2.3)', opacity: '0' } },
        bob: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-5px)' } },
      },
      animation: {
        drive: 'drive 18s linear infinite',
        dash: 'dash 1.6s linear infinite',
        pulse2: 'pulse2 2.2s cubic-bezier(.2,.6,.3,1) infinite',
        bob: 'bob 4s ease-in-out infinite',
      },
    },
  },
  plugins: [],
};
