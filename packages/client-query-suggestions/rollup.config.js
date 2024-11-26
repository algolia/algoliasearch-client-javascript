export default [
  {
    input: 'dist/builds/browser.min.js',
    external: ['dom'],
    cache: false,
    output: {
      esModule: false,
      file: 'dist/builds/browser.umd.js',
      name: '@algolia/client-query-suggestions',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['querySuggestionsClient']: 'querySuggestionsClient',
      },
    },
  },
];
