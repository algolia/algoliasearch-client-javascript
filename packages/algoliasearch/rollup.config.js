import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import resolve from 'rollup-plugin-node-resolve';
import replace from 'rollup-plugin-replace';
import { uglify } from 'rollup-plugin-uglify';

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
    browser: false,
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

const createConfiguration = ({ input, name, format, external } = {}) => ({
  input,
  external,
  output: {
    file: `dist/${name}.js`,
    name: `AlgoliaSearch Lite${name}`,
    format,
    banner: createLicence(),
    sourcemap: true,
  },
  plugins: plugins.concat(
    clear([
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
    input: 'src/builds/algoliasearch.ts',
    name: 'algoliasearch.umd.min',
    format: 'umd',
    external: ['dom'],
  }),
  createConfiguration({
    input: 'src/builds/algoliasearch-lite.ts',
    name: 'algoliasearch-lite.umd.min',
    format: 'umd',
    external: ['dom'],
  }),
  createConfiguration({
    input: 'src/builds/node.ts',
    name: 'algoliasearch.cjs.min',
    format: 'cjs',
    external: ['https'],
  }),
];
