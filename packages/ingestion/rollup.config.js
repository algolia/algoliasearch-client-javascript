export default [
  {
    input: 'dist/builds/browser.min.js',
    external: ['dom'],
    cache: false,
    output: {
      esModule: false,
      file: 'dist/builds/browser.umd.js',
      name: '@algolia/ingestion',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['ingestionClient']: 'ingestionClient',
      },
    },
  },
];
