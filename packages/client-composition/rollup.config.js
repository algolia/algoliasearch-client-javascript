export default [
  {
    input: 'dist/builds/browser.min.js',
    external: ['dom'],
    output: {
      esModule: false,
      file: 'dist/builds/browser.umd.js',
      name: '@algolia/client-composition',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['compositionClient']: 'compositionClient',
      },
    },
  },
];
