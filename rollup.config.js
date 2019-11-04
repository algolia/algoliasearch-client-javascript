/* eslint-disable functional/immutable-data, functional/no-let, no-param-reassign */

import fs from 'fs';
import path from 'path';
import alias from 'rollup-plugin-alias';
import babel from 'rollup-plugin-babel';
import filesize from 'rollup-plugin-filesize';
import json from 'rollup-plugin-json';
import builtins from 'rollup-plugin-node-builtins';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';

const browserPackages = ['cache-browser-local-storage', 'requester-browser-xhr'];
const nodePackages = ['requester-node-http'];
const defaultInput = 'src/index.ts';

if (!process.env.TARGET) {
  throw new Error('TARGET package must be specified via --environment flag.');
}

const packagesConfig = [
  'cache-common',
  'cache-in-memory',
  'client-analytics',
  'client-common',
  'client-search',
  'logger-common',
  'logger-console',
  'requester-common',
  'transporter',
].map(packageId => {
  return {
    output: packageId,
    package: packageId,
    input: defaultInput,
    formats: ['esm', 'cjs'],
  };
});

browserPackages.forEach(packageId => {
  packagesConfig.push({
    output: packageId,
    package: packageId,
    input: defaultInput,
    formats: ['esm', 'cjs'],
    external: ['dom'],
  });
});

nodePackages.forEach(packageId => {
  packagesConfig.push({
    output: packageId,
    package: packageId,
    input: defaultInput,
    formats: ['esm', 'cjs'],
    external: ['https'],
  });
});

packagesConfig.push({
  output: 'algoliasearch',
  package: 'algoliasearch',
  input: `src/builds/node.ts`,
  formats: ['esm', 'cjs'],
  external: ['https'],
});

['browser', 'browser-lite'].forEach(build => {
  packagesConfig.push({
    output: build === 'browser' ? 'algoliasearch' : 'algoliasearch-lite',
    package: 'algoliasearch',
    input: `src/builds/${build}.ts`,
    formats: ['umd', 'esm-browser'],
    external: ['dom'],
  });
});

const packagesDir = path.resolve(__dirname, 'packages');
const aliasOptions = { resolve: ['.ts'] };

fs.readdirSync(packagesDir).forEach(dir => {
  if (dir === 'algoliasearch') {
    return;
  }
  if (fs.statSync(path.resolve(packagesDir, dir)).isDirectory()) {
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
        file: `dist/${packageConfig.output}.esm.js`,
        format: `es`,
      },
      cjs: {
        file: `dist/${packageConfig.output}.cjs.js`,
        format: `cjs`,
      },
      umd: {
        file: `dist/${packageConfig.output}.umd.js`,
        format: `umd`,
        name: 'main',
      },
      'esm-browser': {
        file: `dist/${packageConfig.output}.esm-browser.js`,
        format: `es`,
      },
    };

    packageConfig.formats.forEach(format => {
      const output = bundlers[format];

      output.name = 'main'; // @todo check this...
      output.file = packageResolve(`${output.file}`);

      const isUmdBuild = /\.umd.js$/.test(output.file);
      const isBrowserBuild = /\.umd.js$/.test(output.file) || /esm-browser.js$/.test(output.file);
      const compressorPlugins = isBrowserBuild ? [terser()] : [];
      const transpilerPlugins = isUmdBuild
        ? [
            babel({
              rootMode: 'upward',
              runtimeHelpers: true,
            }),
          ]
        : [];
      let dependencies = require(packageResolve('package.json')).dependencies;
      if (dependencies === undefined) {
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
          builtins(),
          ts({
            check: !hasTSChecked,
            tsconfig: path.resolve(__dirname, 'tsconfig.json'),
            cacheRoot: path.resolve(__dirname, 'node_modules/.rts2_cache'),
            tsconfigOverride: {
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
        onwarn: (msg, warn) => {
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
