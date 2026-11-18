/** Premier Taxis — Tailwind config
 *  Every colour is sampled from the business's own livery (see comments).
 */
module.exports = {
  content: ['./index.html', './thanks.html', './404.html', './assets/js/main.js'],
  theme: {
    extend: {
      colors: {
        // brand — the deep burgundy disc of the logo (#680107) and the darker banner ground (#480102)
        brand: {
          50: '#fbf3f2', 100: '#f5e2e0', 200: '#e9c2be', 300: '#d4918a',
          400: '#b5584f', 500: '#922520', 600: '#7a0d0e', 700: '#680107',
          800: '#560107', 900: '#480102', 950: '#2c0104',
        },
        // action — the yellow of the TAXI roof sign and logo lettering (#FAD737). Reserved for Call / Quote / links.
        action: { DEFAULT: '#fad737', hover: '#f8ca10', press: '#f8ba07' },
        // highlight — the bronze paint of the Premier Cars Ford Tourneo on the banner (#764828 → lifted). Route, markers, illustrations.
        highlight: { DEFAULT: '#a8692f', light: '#d9a46a', pale: '#f1dcc2', dark: '#764828' },
        // accent — the blue forget-me-not (dementia friendly) from the logo's badge row. Accessibility icons only.
        accent: { DEFAULT: '#2f6fd0', pale: '#dde8fa' },
        // ink — text: burgundy pushed almost to black, never #000
        ink: { DEFAULT: '#2a0b0e', soft: '#5b3a3c', faint: '#8a6d6e' },
        // surface — grounds tinted toward the burgundy hue, never pure white
        surface: { DEFAULT: '#f8f2ef', raised: '#fdfaf8', sunk: '#efe5e0', line: '#e0d0ca' },
      },
      fontFamily: {
        display: ['"Anybody Variable"', 'Arial Narrow', 'sans-serif'],
        sans: ['"Reddit Sans Variable"', 'system-ui', 'sans-serif'],
        mono: ['"Martian Mono Variable"', 'ui-monospace', 'monospace'],
      },
      maxWidth: { site: '82rem' },
      transitionTimingFunction: { out: 'cubic-bezier(.2,.7,.2,1)' },
    },
  },
  plugins: [],
};
