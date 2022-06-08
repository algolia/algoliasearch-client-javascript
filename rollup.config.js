import fs from 'fs';
import path from 'path';

import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';
import globals from 'rollup-plugin-node-globals';
import { terser } from 'rollup-plugin-terser';
import ts from 'rollup-plugin-typescript2';

// Retrieve package to build
const client = process.env.CLIENT?.replace(
  '@experimental-api-clients-automation/',
  ''
);
const UTILS = ['client-common', 'requester-browser-xhr', 'requester-node-http'];
const BROWSER_FORMATS = ['umd-browser', 'esm-browser', 'cjs-browser'];
const NODE_FORMATS = ['cjs-node', 'esm-node'];
const CLIENT_ALL = 'all';
const CLIENT_UTILS = 'utils';

function createLicence(name, version) {
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
  // ['algoliasearch', 'client-abtesting', ... ]
  const availableClients = fs
    .readdirSync('packages/')
    .filter((_client) => !UTILS.includes(_client));

  return client === CLIENT_ALL
    ? availableClients
    : availableClients.filter((availableClient) => availableClient === client);
}

function getUtilConfigs() {
  const commonOptions = {
    input: 'index.ts',
    formats: NODE_FORMATS,
    external: [],
    dependencies: ['@experimental-api-clients-automation/client-common'],
  };

  return [
    // Common
    {
      ...commonOptions,
      output: 'client-common',
      package: 'client-common',
      name: '@experimental-api-clients-automation/client-common',
      dependencies: [],
    },
    // Browser requester
    {
      ...commonOptions,
      output: 'requester-browser-xhr',
      package: 'requester-browser-xhr',
      name: '@experimental-api-clients-automation/requester-browser-xhr',
      external: ['dom'],
    },
    // Node requester
    {
      ...commonOptions,
      output: 'requester-node-http',
      package: 'requester-node-http',
      name: '@experimental-api-clients-automation/requester-node-http',
      external: ['https', 'http', 'url'],
    },
  ];
}

function shouldBuildUtil(utilClient) {
  if (process.env.SKIP_UTILS === 'true') {
    return false;
  }

  // Checking existence of `dist` folder doesn't really guarantee the built files are up-to-date.
  // However, on the CI, it's very likely.
  // For the local environment, we simply return `false`, which will trigger unnecessary builds.
  // We can come back here and improve this part (checking if `dist` folder exists and if it's up-to-date).
  return process.env.CI
    ? !fs.existsSync(path.resolve('packages', utilClient, 'dist'))
    : true;
}

function getPackageConfigs() {
  if (client === CLIENT_UTILS) {
    return getUtilConfigs();
  }

  if (UTILS.includes(client)) {
    return getUtilConfigs().filter((config) => config.package === client);
  }

  const availableClients = getAvailableClients();

  if (availableClients.length === 0) {
    throw new Error(`No clients matches '${client}'.`);
  }

  const configs = availableClients.flatMap((packageName) => {
    const isAlgoliasearchClient = packageName === 'algoliasearch';
    const commonConfig = {
      package: packageName,
      name: isAlgoliasearchClient
        ? packageName
        : `@experimental-api-clients-automation/${packageName}`,
      output: packageName,
      dependencies: isAlgoliasearchClient
        ? [
            '@experimental-api-clients-automation/client-analytics',
            '@experimental-api-clients-automation/client-common',
            '@experimental-api-clients-automation/client-personalization',
            '@experimental-api-clients-automation/client-search',
          ]
        : ['@experimental-api-clients-automation/client-common'],
      external: [],
    };

    return [
      {
        ...commonConfig,
        input: 'builds/browser.ts',
        formats: BROWSER_FORMATS,
        external: ['dom'],
        dependencies: [
          ...commonConfig.dependencies,
          '@experimental-api-clients-automation/requester-browser-xhr',
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
          '@experimental-api-clients-automation/requester-node-http',
        ],
        formats: NODE_FORMATS,
      },
    ];
  });

  return [
    ...getUtilConfigs().filter((config) => shouldBuildUtil(config.package)),
    ...configs,
  ];
}

const packageConfigs = getPackageConfigs();
const rollupConfig = [];

packageConfigs.forEach((packageConfig) => {
  const clientPath = path.resolve('packages', packageConfig.package);
  const clientPackage = JSON.parse(
    fs.readFileSync(path.resolve(clientPath, 'package.json'))
  );

  if (!clientPackage) {
    throw new Error(`No package.json found for '${packageConfig.name}'`);
  }

  const bundlers = createBundlers({
    output: packageConfig.output,
    clientPath,
  });

  packageConfig.formats.forEach((format) => {
    // Avoid generating types multiple times.
    let areTypesGenerated = false;
    const output = bundlers[format];
    const isUmdBuild = format === 'umd-browser';
    const isEsmBrowserBuild = format === 'esm-browser';

    if (isUmdBuild) {
      output.name = packageConfig.name;
      output.banner = createLicence(
        packageConfig.package,
        clientPackage.version
      );
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
          check: !areTypesGenerated,
          tsconfig: path.resolve(clientPath, 'tsconfig.json'),
          tsconfigOverride: {
            compilerOptions: {
              declaration: !areTypesGenerated,
              declarationMap: !areTypesGenerated,
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

    areTypesGenerated = true;
  });
});

export default rollupConfig;
