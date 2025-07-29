export default [
  {
    input: 'dist/builds/browser.min.js',
    external: ['dom'],
    cache: false,
    output: {
      esModule: false,
      file: 'dist/builds/browser.umd.js',
      name: '@algolia/abtesting',
      format: 'umd',
      sourcemap: false,
      globals: {
        ['abtestingV3Client']: 'abtestingV3Client',
      },
    },
  },
];
