/* eslint-disable functional/immutable-data, functional/no-let */

import alias from '@rollup/plugin-alias';
import json from '@rollup/plugin-json';
import fs from 'fs';
import path from 'path';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import ignore from 'rollup-plugin-ignore';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';

const defaultInput = 'src/index.ts';

// eslint-disable-next-line import/no-commonjs
const version = require('./lerna.json').version;
const algolia = '© Algolia, inc.';
const link = 'https://github.com/algolia/algoliasearch-client-javascript';
const createLicence = name => `/*! ${name} | ${version} | ${algolia} | ${link} */`;

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.');
}

const packagesConfig = [
  'cache-common',
  'cache-in-memory',
  'client-account',
  'client-analytics',
  'client-common',
  'client-recommendation',
  'logger-common',
  'logger-console',
  'requester-common',
  'transporter',
].map(packageId => {
  return {
    output: packageId,
    package: packageId,
    input: defaultInput,
    formats: ['cjs', 'esm'],
  };
});

packagesConfig.push({
  output: 'client-search',
  package: 'client-search',
  input: defaultInput,
  formats: ['cjs', 'esm'],
  external: ['crypto'],
});

['cache-browser-local-storage', 'requester-browser-xhr'].forEach(packageId => {
  packagesConfig.push({
    output: packageId,
    package: packageId,
    input: defaultInput,
    formats: ['cjs', 'esm'],
    external: ['dom'],
  });
});

packagesConfig.push({
  output: 'requester-node-http',
  package: 'requester-node-http',
  input: defaultInput,
  formats: ['cjs', 'esm'],
  external: ['https', 'http', 'url'],
});

packagesConfig.push({
  output: 'algoliasearch',
  package: 'algoliasearch',
  input: `src/builds/node.ts`,
  formats: ['cjs'],
});

['browser', 'browserLite'].forEach(build => {
  packagesConfig.push({
    output: build === 'browser' ? 'algoliasearch' : 'algoliasearch-lite',
    package: 'algoliasearch',
    input: `src/builds/${build}.ts`,
    formats: ['esm-browser'],
    ignore: ['crypto'],
  });

  packagesConfig.push({
    output: build === 'browser' ? 'algoliasearch' : 'algoliasearch-lite',
    package: 'algoliasearch',
    input: `src/builds/${build}.ts`,
    formats: ['umd'],
    external: ['dom'],
    globals: {
      algoliasearch: 'algoliasearch',
    },
    ignore: ['crypto'],
  });
});

const packagesDir = path.resolve(__dirname, 'packages');
const aliasOptions = { resolve: ['.ts'] };

fs.readdirSync(packagesDir).forEach(dir => {
  if (dir !== 'algoliasearch' && fs.statSync(path.resolve(packagesDir, dir)).isDirectory()) {
    aliasOptions[`@algolia/${dir}`] = path.resolve(packagesDir, `${dir}/index`);
  }
});

const rollupConfig = [];

packagesConfig
  .filter(packageConfig => {
    return process.env.TARGET === packageConfig.package;
  })
  .forEach(packageConfig => {
    let hasTSChecked = false;
    const packageResolve = p => path.resolve(packagesDir, `${packageConfig.package}/${p}`);

    const bundlers = {
      esm: {
        file: `${packageConfig.output}.esm.js`,
        format: `es`,
      },
      'esm-browser': {
        file: `${packageConfig.output}.esm.browser.js`,
        format: `es`,
      },
      cjs: {
        file: `${packageConfig.output}.cjs.js`,
        format: `cjs`,
      },
      umd: {
        file: `${packageConfig.output}.umd.js`,
        format: `umd`,
      },
    };

    packageConfig.formats.forEach(format => {
      const output = bundlers[format];

      const isUmdBuild = /\.umd.js$/.test(output.file);
      const isEsmBrowserBuild = /\.esm.browser.js$/.test(output.file);

      if (isUmdBuild) {
        output.name = 'algoliasearch';
        output.banner = createLicence(output.file);
      }

      output.file = packageResolve(`dist/${output.file}`);

      const compressorPlugins = isUmdBuild ? [terser()] : [];
      const transpilerPlugins = isUmdBuild
        ? [
            babel({
              babelrc: false,
              extensions: ['.ts'],
              presets: [
                [
                  '@babel/preset-env',
                  {
                    modules: false,
                    targets: {
                      browsers: ['last 2 versions', 'ie >= 11'],
                    },
                  },
                ],
              ],
            }),
          ]
        : [];

      let dependencies = require(packageResolve('package.json')).dependencies;

      if (isUmdBuild || isEsmBrowserBuild || dependencies === undefined) {
        dependencies = [];
      }

      rollupConfig.push({
        input: packageResolve(packageConfig.input),
        external: Object.keys(dependencies).concat(packageConfig.external),
        plugins: [
          json({
            namedExports: false,
          }),
          globals({
            global: true,
          }),
          ignore(packageConfig.ignore || []),
          ts({
            check: !hasTSChecked,
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            // cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
            tsconfigOverride: {
              include: ['packages/**/src/**/*.ts'],
              exclude: ['packages/**/src/__tests__/**/*.ts'],
              compilerOptions: {
                declaration: !hasTSChecked,
                declarationMap: !hasTSChecked,
              },
            },
          }),
          alias(aliasOptions),
          ...transpilerPlugins,
          ...compressorPlugins,
          filesize({
            showMinifiedSize: false,
            showGzippedSize: true,
          }),
        ],
        output,
        onwarn(msg, warn) {
          if (!/Circular/.test(msg)) {
            warn(msg);
          }
        },
      });

      // We just generate TS declarations once for each package.
      hasTSChecked = true;
    });
  });

export default rollupConfig;
