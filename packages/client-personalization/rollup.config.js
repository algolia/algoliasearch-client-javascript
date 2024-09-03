export default [
  {
    input: 'dist/builds/browser.min.js',
    external: ['dom'],
    output: {
      esModule: false,
      file: 'dist/builds/browser.umd.js',
      name: 'personalizationClient',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['personalizationClient']: 'personalizationClient',
      },
    },
  },
]