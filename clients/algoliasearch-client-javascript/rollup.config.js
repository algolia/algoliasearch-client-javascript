import path from 'path';

import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';

import generatorConfig from '../../openapitools.json';

import { version } from './version';

// Retrieve package to build
const client = process.env.CLIENT?.replace('@algolia/', '');
const UTILS = ['client-common', 'requester-browser-xhr', 'requester-node-http'];

function createLicence(name) {
  return `/*! ${name}.umd.js | ${version} | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */`;
}

function createBundlers({ output, clientPath }) {
  return {
    'esm-node': {
      file: `${clientPath}/dist/${output}.esm.node.js`,
      format: 'es',
    },
    'esm-browser': {
      file: `${clientPath}/dist/${output}.esm.browser.js`,
      format: 'es',
    },
    'umd-browser': {
      file: `${clientPath}/dist/${output}.umd.browser.js`,
      format: 'umd',
    },
    'cjs-node': {
      file: `${clientPath}/dist/${output}.cjs.node.js`,
      format: 'cjs',
    },
    'cjs-browser': {
      file: `${clientPath}/dist/${output}.cjs.browser.js`,
      format: 'cjs',
    },
  };
}

function getAvailableClients() {
  // We default `algoliasearch` as it's not a generated client, but an aggregation of
  // multiple clients.
  const availableClients = ['algoliasearch'];
  const generators = Object.entries(
    generatorConfig['generator-cli'].generators
  );

  for (const [name, options] of generators) {
    if (name.startsWith('javascript')) {
      availableClients.push(options.additionalProperties.buildFile);
    }
  }

  return client === 'all'
    ? availableClients
    : availableClients.filter((availableClient) => availableClient === client);
}

function initPackagesConfig() {
  if (UTILS.includes(client)) {
    const commonOptions = {
      input: 'index.ts',
      formats: ['cjs-node', 'esm-node'],
      external: [],
      dependencies: [],
    };

    const availableUtils = [
      // Common
      {
        ...commonOptions,
        output: 'client-common',
        package: 'client-common',
        name: '@algolia/client-common',
      },
      // Browser requester
      {
        ...commonOptions,
        output: 'requester-browser-xhr',
        package: 'requester-browser-xhr',
        name: '@algolia/requester-browser-xhr',
        external: ['dom'],
        dependencies: ['@algolia/client-common'],
      },
      // Node requester
      {
        ...commonOptions,
        output: 'requester-node-http',
        package: 'requester-node-http',
        name: '@algolia/requester-node-http',
        external: ['https', 'http', 'url'],
        dependencies: ['@algolia/client-common'],
      },
    ];

    return client === 'all'
      ? availableUtils
      : availableUtils.filter(
          (availableUtil) => availableUtil.package === client
        );
  }

  const availableClients = getAvailableClients();

  if (availableClients.length === 0) {
    throw new Error(`No clients matching ${client}.`);
  }

  return availableClients.flatMap((packageName) => {
    const isAlgoliasearchClient = packageName.startsWith('algoliasearch');
    const commonConfig = {
      package: packageName,
      name: isAlgoliasearchClient ? packageName : `@algolia/${packageName}`,
      output: packageName,
      dependencies: isAlgoliasearchClient
        ? [
            '@algolia/client-analytics',
            '@algolia/client-common',
            '@algolia/client-personalization',
            '@algolia/client-search',
          ]
        : ['@algolia/client-common'],
      external: [],
    };
    const browserFormats = ['umd-browser', 'esm-browser', 'cjs-browser'];
    const nodeFormats = ['cjs-node', 'esm-node'];

    return [
      {
        ...commonConfig,
        input: 'builds/browser.ts',
        formats: browserFormats,
        external: ['dom'],
        dependencies: [
          ...commonConfig.dependencies,
          '@algolia/requester-browser-xhr',
        ],
        globals: {
          [packageName]: packageName,
        },
      },
      {
        ...commonConfig,
        input: 'builds/node.ts',
        dependencies: [
          ...commonConfig.dependencies,
          '@algolia/requester-node-http',
        ],
        formats: nodeFormats,
      },
    ];
  });
}

const packagesConfig = initPackagesConfig();
const rollupConfig = [];

packagesConfig.forEach((packageConfig) => {
  const clientPath = path.resolve('packages', packageConfig.package);
  const bundlers = createBundlers({
    output: packageConfig.output,
    clientPath,
  });

  packageConfig.formats.forEach((format) => {
    // Avoid generating types multiple times.
    let isTypesGenerated = false;
    const output = bundlers[format];
    const isUmdBuild = format === 'umd-browser';
    const isEsmBrowserBuild = format === 'esm-browser';

    if (isUmdBuild) {
      output.name = packageConfig.name;
      output.banner = createLicence(packageConfig.package);
    }

    const compressorPlugins = isUmdBuild ? [terser()] : [];
    const transpilerPlugins = isUmdBuild
      ? [
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
        ]
      : [];
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

    if (isUmdBuild || isEsmBrowserBuild) {
      // eslint-disable-next-line no-param-reassign
      packageConfig.dependencies = [];
    }

    rollupConfig.push({
      input: path.resolve(clientPath, packageConfig.input),
      external: [...packageConfig.dependencies, ...packageConfig.external],
      plugins: [
        globals({
          global: true,
        }),
        nodeResolve(),
        ts({
          check: !isTypesGenerated,
          tsconfig: path.resolve(clientPath, 'tsconfig.json'),
          tsconfigOverride: {
            compilerOptions: {
              declaration: !isTypesGenerated,
              declarationMap: !isTypesGenerated,
            },
          },
        }),
        ...clientCommonPlugins,
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

    isTypesGenerated = true;
  });
});

export default rollupConfig;
