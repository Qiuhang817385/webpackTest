module.exports = {
  plugins: {
    'postcss-px-to-viewport': {
      unitToConvert: 'px',
      viewportWidth: 375,
      viewportHeight: 1334, // 视口高度（数字）
      unitPrecision: 3,
      viewportUnit: 'vw',
      fontViewportUnit: 'vw',
      selectorBlackList: ['.vwignore', 'html', /^body$/, '.ignore', '.hairlines'],
      minPixelValue: 1,
      mediaQuery: false,
    },
  },
};