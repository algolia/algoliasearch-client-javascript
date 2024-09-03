export default [
  {
    input: 'dist/builds/browser.min.js',
    external: ['dom'],
    output: {
      esModule: false,
      file: 'dist/builds/browser.umd.js',
      name: 'analyticsClient',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['analyticsClient']: 'analyticsClient',
      },
    },
  },
]