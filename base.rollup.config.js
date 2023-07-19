import babel from '@rollup/plugin-babel';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import globals from 'rollup-plugin-node-globals';
import terser from '@rollup/plugin-terser';
import ts from 'rollup-plugin-typescript2';

// Org where the packages are pushed
const NPM_ORG = '@algolia/';

// Output formats
const BROWSER_FORMATS = ['esm-browser', 'umd'];
const NODE_FORMATS = ['esm-node', 'cjs'];

// A mapping that saves the types that have already been checked during the build process
// it avoid checking/generating the same types multiple times
const TYPES_TO_CHECK = {};

// Utils package with default options
const UTILS = {
  'client-common': {
    external: [],
    plugins: [
      babel({
        babelrc: false,
        extensions: ['.ts'],
        exclude: 'node_modules/**',
        plugins: ['@babel/plugin-proposal-class-properties'],
      }),
    ],
  },
  'requester-browser-xhr': {
    external: ['dom'],
    plugins: [],
  },
  'requester-fetch': {
    external: ['dom'],
    plugins: [],
  },
  'requester-node-http': {
    external: ['https', 'http', 'url'],
    plugins: [],
  },
};

/**
 * Returns the license at the top of the UMD bundled file.
 */
function createLicense(name, version) {
  return `/*! ${name}.umd.js | ${version} | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */`;
}

/**
 * Bundlers with their output format and file name for the given client.
 */
function createBundlers({ output, isLiteClient }) {
  const commonOptions = {
    exports: 'named',
  };

  const path = isLiteClient ? `./dist/lite` : `./dist`;

  return {
    'esm-node': {
      ...commonOptions,
      file: `${path}/${output}.esm.node.js`,
      format: 'es',
    },
    'esm-browser': {
      ...commonOptions,
      file: `${path}/${output}.esm.browser.js`,
      format: 'es',
    },
    umd: {
      ...commonOptions,
      file: `${path}/${output}.umd.js`,
      format: 'umd',
      esModule: false,
    },
    cjs: {
      ...commonOptions,
      file: `${path}/${output}.cjs.js`,
      format: 'cjs',
    },
  };
}

/**
 * Build configs to iterate on based on the given `package.json`.
 */
function getBaseConfigs(pkg) {
  const packageName = pkg.name.replace(NPM_ORG, '');
  const isUtils = UTILS[packageName] !== undefined;
  const commonConfig = {
    dependencies: pkg.dependencies ? Object.keys(pkg.dependencies) : [],
    package: packageName,
    name: pkg.name,
    output: packageName,
    plugins: [],
    external: [],
    formats: NODE_FORMATS,
  };

  if (isUtils) {
    return [
      {
        ...commonConfig,
        ...UTILS[packageName],
        input: 'index.ts',
      },
    ];
  }

  const isAlgoliasearchClient = packageName === 'algoliasearch';
  const configPerEnv = {
    browser: {
      ...commonConfig,
      input: 'builds/browser.ts',
      formats: BROWSER_FORMATS,
      external: ['dom'],
      globals: {
        [packageName]: packageName,
      },
    },
    node: {
      ...commonConfig,
      input: 'builds/node.ts',
    },
  };

  if (!isAlgoliasearchClient) {
    return [configPerEnv.browser, configPerEnv.node];
  }

  /**
   * Algoliasearch is am aggregation of sub clients, plus provide a `lite` version
   * that needs its own build.
   */
  const litePackageName = `${packageName}/lite`;
  return [
    // algoliasearch client configs
    configPerEnv.browser,
    configPerEnv.node,
    // lite client configs
    {
      ...commonConfig,
      ...configPerEnv.browser,
      package: litePackageName,
      name: litePackageName,
      output: 'lite',
      input: 'lite/builds/browser.ts',
      dependencies: [
        `${NPM_ORG}client-common`,
        `${NPM_ORG}requester-browser-xhr`,
      ],
      globals: {
        [litePackageName]: litePackageName,
      },
    },
    // Node build
    {
      ...commonConfig,
      ...configPerEnv.node,
      package: litePackageName,
      name: litePackageName,
      output: 'lite',
      input: 'lite/builds/node.ts',
      dependencies: [
        `${NPM_ORG}client-common`,
        `${NPM_ORG}requester-node-http`,
      ],
    },
  ];
}

/**
 * Decides whether the currently built client should check for types or not.
 */
function shouldCheckForTypes(name, currentFormat, isLiteClient) {
  const defaults = {
    node: true,
    browser: true,
    lite: true,
  };

  // Initialize with defaults
  if (TYPES_TO_CHECK[name] === undefined) {
    TYPES_TO_CHECK[name] = defaults;
  }

  // We then set the value for the key to false when it matches its build format
  if (BROWSER_FORMATS.includes(currentFormat) && TYPES_TO_CHECK[name].browser) {
    TYPES_TO_CHECK[name].browser = false;

    return true;
  }

  if (NODE_FORMATS.includes(currentFormat) && TYPES_TO_CHECK[name].node) {
    TYPES_TO_CHECK[name].node = false;

    return true;
  }

  if (isLiteClient && TYPES_TO_CHECK[name].lite) {
    TYPES_TO_CHECK[name].lite = false;

    return true;
  }

  return false;
}

export function buildConfigs(pkg) {
  const baseConfigs = getBaseConfigs(pkg);
  const rollupConfig = [];

  baseConfigs.forEach((baseConfig) => {
    const isLiteClient = baseConfig.name === 'algoliasearch/lite';
    const bundlers = createBundlers({
      output: baseConfig.output,
      isLiteClient,
    });

    baseConfig.formats.forEach((format) => {
      const checkForTypes = shouldCheckForTypes(
        baseConfig.name,
        format,
        isLiteClient
      );
      const isUmdBuild = format === 'umd';
      const isEsmBrowserBuild = format === 'esm-browser';
      const umdConfig = {
        compressorPlugins: [],
        transpilerPlugins: [],
      };

      if (isUmdBuild || isEsmBrowserBuild) {
        // eslint-disable-next-line no-param-reassign
        baseConfig.dependencies = [];
      }

      if (isUmdBuild) {
        bundlers[format].name = baseConfig.name;
        bundlers[format].banner = createLicense(
          baseConfig.package,
          pkg.version
        );

        umdConfig.compressorPlugins = [terser()];
        umdConfig.transpilerPlugins = [
          babel({
            babelrc: false,
            babelHelpers: 'runtime',
            extensions: ['builds/*.ts', 'src/*.ts', 'model/*.ts', 'index.ts'],
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

      rollupConfig.push({
        input: baseConfig.input,
        external: [...baseConfig.external, ...baseConfig.dependencies],
        plugins: [
          globals({
            global: true,
          }),
          nodeResolve({
            preferBuiltins: true,
          }),
          ts({
            check: checkForTypes,
            tsconfig: isLiteClient ? 'lite/tsconfig.json' : 'tsconfig.json',
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
          ...baseConfig.plugins,
        ],
        output: bundlers[format],
        onwarn(msg, warn) {
          if (!/Circular/.test(msg)) {
            warn(msg);
          }
        },
      });
    });
  });

  return rollupConfig;
}
