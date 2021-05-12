module.exports = {
  purge: [
    './components/**/*.{vue,js}',

    './layouts/**/*.vue',

    './pages/**/*.vue',

    './plugins/**/*.{js,ts}',

    './nuxt.config.{js,ts}'
  ],
  darkMode: 'media', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        xs: '360'
      },
      gridTemplateRows: {
        7: 'repeat(7, minmax(0, 1fr))',
        8: 'repeat(8, minmax(0, 1fr))',
        9: 'repeat(9, minmax(0, 1fr))'
      },
      gridRow: {
        'span-6': 'span 6 / span 6',
        'span-7': 'span 7 / span 7',
        'span-8': 'span 8 / span 8'
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
