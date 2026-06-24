const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    extend: {
      fontFamily: {
        cinzel: ['Cinzel', ...defaultTheme.fontFamily.serif],
        crimson: ['Crimson Pro', ...defaultTheme.fontFamily.serif],
      },
    },
  },
};
