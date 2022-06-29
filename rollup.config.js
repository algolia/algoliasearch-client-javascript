import fs from 'fs';
import path from 'path';

import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';

import {
  createBundlers,
  createLicense,
  getPackageConfigs,
} from './base.rollup.config';

const packageConfigs = getPackageConfigs();
const rollupConfig = [];

packageConfigs.forEach((packageConfig) => {
  const isLiteClient = packageConfig.package === 'algoliasearch/lite';
  let checkForTypes = true;
  const clientPath = path.resolve(
    'packages',
    packageConfig.package,
    isLiteClient ? '..' : ''
  );
  const clientPackageJson = JSON.parse(
    fs.readFileSync(path.resolve(clientPath, 'package.json'))
  );

  if (!clientPackageJson) {
    throw new Error(`No 'package.json' found for '${packageConfig.name}'`);
  }

  const bundlers = createBundlers({
    output: packageConfig.output,
    clientPath,
    isLiteClient,
  });

  packageConfig.formats.forEach((format) => {
    const isUmdBuild = format === 'umd';
    const isEsmBrowserBuild = format === 'esm-browser';
    const umdConfig = {
      compressorPlugins: [],
      transpilerPlugins: [],
    };

    if (isUmdBuild || isEsmBrowserBuild) {
      // eslint-disable-next-line no-param-reassign
      packageConfig.dependencies = [];
    }

    if (isUmdBuild) {
      bundlers[format].name = packageConfig.name;
      bundlers[format].banner = createLicense(
        packageConfig.package,
        clientPackageJson.version
      );

      umdConfig.compressorPlugins = [terser()];
      umdConfig.transpilerPlugins = [
        babel({
          babelrc: false,
          babelHelpers: 'runtime',
          extensions: ['.ts'],
          exclude: 'node_modules/**',
          presets: [
            [
              '@babel/preset-env',
              {
                targets: {
                  browsers: ['> .5%', 'ie >= 11'],
                },
              },
            ],
          ],
          plugins: ['@babel/plugin-transform-runtime'],
        }),
      ];
    }

    const clientCommonPlugins =
      packageConfig.package === 'client-common'
        ? [
            babel({
              babelrc: false,
              extensions: ['.ts'],
              exclude: 'node_modules/**',
              plugins: ['@babel/plugin-proposal-class-properties'],
            }),
          ]
        : [];

    rollupConfig.push({
      input: path.resolve(clientPath, packageConfig.input),
      external: [...packageConfig.dependencies, ...packageConfig.external],
      plugins: [
        globals({
          global: true,
        }),
        nodeResolve(),
        ts({
          check: checkForTypes,
          tsconfig: path.resolve(clientPath, 'tsconfig.json'),
          tsconfigOverride: {
            compilerOptions: {
              declaration: checkForTypes,
              declarationMap: checkForTypes,
              noEmit: !checkForTypes,
            },
          },
        }),
        ...umdConfig.transpilerPlugins,
        ...umdConfig.compressorPlugins,
        ...clientCommonPlugins,
      ],
      output: bundlers[format],
      onwarn(msg, warn) {
        if (!/Circular/.test(msg)) {
          warn(msg);
        }
      },
    });

    checkForTypes = false;
  });
});

export default rollupConfig;
