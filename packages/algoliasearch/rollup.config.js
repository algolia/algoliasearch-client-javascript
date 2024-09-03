export default [
  {
    input: 'dist/lite/builds/browser.min.js',
    external: ['dom'],
    output: {
      esModule: false,
      file: 'dist/lite/builds/browser.umd.js',
      name: 'lite',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['lite']: 'lite',
      },
    },
  },
  {
    input: 'dist/browser.min.js',
    external: ['dom'],
    output: {
      esModule: false,
      file: 'dist/algoliasearch.umd.js',
      name: 'algoliasearch',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['algoliasearch']: 'algoliasearch',
      },
    },
  }
]