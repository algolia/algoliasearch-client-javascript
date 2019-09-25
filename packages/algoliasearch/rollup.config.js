import resolve from 'rollup-plugin-node-resolve';
import commonjs from 'rollup-plugin-commonjs';
import babel from 'rollup-plugin-babel';
import globals from 'rollup-plugin-node-globals';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';
import filesize from 'rollup-plugin-filesize';

const clear = x => x.filter(Boolean);

const version = process.env.VERSION || 'UNRELEASED';
const algolia = '© Algolia, inc.';
const link = 'https://github.com/algolia/algoliasearch-client-javascript';
const createLicence = () => `/*! AlgoliaSearch Client ${version} | ${algolia} | ${link} */`;

const plugins = [
  babel({
    exclude: ['../../node_modules/**'],
    extensions: ['.ts', '.js'],
    rootMode: 'upward',
    runtimeHelpers: true,
  }),
  resolve({
    browser: true,
    preferBuiltins: false,
    extensions: ['.ts', '.js'],
  }),
  commonjs(),
  globals(),
  replace({
    'process.env.NODE_ENV': JSON.stringify('production'),
  }),
  filesize({
    showMinifiedSize: false,
    showGzippedSize: true,
  }),
];

const createConfiguration = ({ input, name, minify = false } = {}) => ({
  input,
  external: ['dom'],
  output: {
    file: `dist/umd/${name}${minify ? '.min' : ''}.js`,
    name: `AlgoliaSearch Lite${name}`,
    format: 'umd',
    banner: createLicence(),
    sourcemap: true,
  },
  plugins: plugins.concat(
    clear([
      minify &&
        uglify({
          output: {
            preamble: createLicence(),
          },
        }),
    ])
  ),
});

export default [
  createConfiguration({
    input: 'src/builds/algoliasearch-lite.ts',
    name: 'algoliasearch-lite',
    minify: true,
  }),
];
