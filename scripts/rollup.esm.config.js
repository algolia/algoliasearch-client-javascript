const commonjs = require('rollup-plugin-commonjs');

export default {
  entry: 'dist/algoliasearch.js',
  plugins: [
    commonjs()
  ],
  targets: [
    { dest: 'dist/algoliasearch.esm.js', format: 'es' }
  ]
};
