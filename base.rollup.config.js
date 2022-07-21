import fs from 'fs';

// Org where the packages are pushed
const NPM_ORG = '@algolia/';

// Output formats
const BROWSER_FORMATS = ['esm-browser', 'umd'];
const NODE_FORMATS = ['esm-node', 'cjs'];

// Utils package with default options
const UTILS = {
  'client-common': {
    dependencies: [],
  },
  'requester-browser-xhr': {
    external: ['dom'],
    dependencies: [`${NPM_ORG}client-common`],
  },
  'requester-fetch': {
    external: ['dom'],
    dependencies: [`${NPM_ORG}client-common`],
  },
  'requester-node-http': {
    external: ['https', 'http', 'url'],
    dependencies: [`${NPM_ORG}client-common`],
  },
};

/**
 * Returns the `UTILS` packages configuration with their default bundler options.
 */
function getUtilConfigs() {
  const commonOptions = {
    input: 'index.ts',
    formats: NODE_FORMATS,
    external: [],
  };

  return Object.entries(UTILS).map(([key, utilOptions]) => {
    return {
      ...commonOptions,
      ...utilOptions,
      output: key,
      package: key,
      name: `${NPM_ORG}${key}`,
    };
  });
}

/**
 * Whether to build the given `utilClient` or not.
 */
function shouldBuildUtil(utilClient) {
  if (process.env.SKIP_UTILS === 'true') {
    return false;
  }

  if (!process.env.CI) {
    return true;
  }

  // Checking existence of `dist` folder doesn't really guarantee the built files are up-to-date.
  // However, on the CI, it's very likely.
  return !fs.existsSync(path.resolve('packages', utilClient, 'dist'));
}

/**
 * Reads available packages in the monorepo.
 */
function getAvailableClients(client) {
  const availableClients = fs
    .readdirSync('packages/')
    .filter((packageName) => !Object.keys(UTILS).includes(packageName));

  return client === 'all'
    ? availableClients
    : availableClients.filter((availableClient) => availableClient === client);
}

/**
 * Returns the packages to bundled based on environment variables and run conditions.
 */
export function getPackageConfigs() {
  const UTIL_CONFIGS = getUtilConfigs();
  const CLIENT = process.env.CLIENT.replace(NPM_ORG, '');

  if (CLIENT === 'utils') {
    return UTIL_CONFIGS;
  }

  if (Object.keys(UTILS).includes(CLIENT)) {
    return UTIL_CONFIGS.filter((config) => config.package === CLIENT);
  }

  const availableClients = getAvailableClients(CLIENT);

  if (availableClients.length === 0) {
    throw new Error(`No clients matches '${CLIENT}'.`);
  }

  const configs = availableClients.flatMap((packageName) => {
    const isAlgoliasearchClient = packageName === 'algoliasearch';
    const commonConfig = {
      package: packageName,
      name: `${NPM_ORG}${packageName}`,
      output: packageName,
      dependencies: [`${NPM_ORG}client-common`],
      external: [],
    };
    let liteBuildConfig = [];

    // This non-generated client is an aggregation of client, hence does not follow
    // the same build process.
    if (isAlgoliasearchClient) {
      const litePackageName = `${packageName}/lite`;
      // `algoliasearch/lite` related
      liteBuildConfig = [
        {
          ...commonConfig,
          package: litePackageName,
          name: litePackageName,
          output: 'lite',
          input: 'lite/builds/browser.ts',
          formats: BROWSER_FORMATS,
          external: ['dom'],
          dependencies: [
            ...commonConfig.dependencies,
            `${NPM_ORG}requester-browser-xhr`,
          ],
          globals: {
            [litePackageName]: litePackageName,
          },
        },
        // Node build
        {
          ...commonConfig,
          package: litePackageName,
          name: litePackageName,
          output: 'lite',
          input: 'lite/builds/node.ts',
          formats: NODE_FORMATS,
          dependencies: [
            ...commonConfig.dependencies,
            `${NPM_ORG}requester-node-http`,
          ],
        },
      ];

      // `algoliasearch` related
      commonConfig.name = packageName;
      commonConfig.dependencies = [
        `${NPM_ORG}client-analytics`,
        `${NPM_ORG}client-common`,
        `${NPM_ORG}client-personalization`,
        `${NPM_ORG}client-search`,
      ];
    }

    return [
      ...liteBuildConfig,
      // Browser build
      {
        ...commonConfig,
        input: 'builds/browser.ts',
        formats: BROWSER_FORMATS,
        external: ['dom'],
        dependencies: [
          ...commonConfig.dependencies,
          `${NPM_ORG}requester-browser-xhr`,
        ],
        globals: {
          [packageName]: packageName,
        },
      },
      // Node build
      {
        ...commonConfig,
        input: 'builds/node.ts',
        formats: NODE_FORMATS,
        dependencies: [
          ...commonConfig.dependencies,
          `${NPM_ORG}requester-node-http`,
        ],
      },
    ];
  });

  return [
    ...UTIL_CONFIGS.filter((config) => shouldBuildUtil(config.package)),
    ...configs,
  ];
}

/**
 * Returns the license at the top of the UMD bundled file.
 */
export function createLicense(name, version) {
  return `/*! ${name}.umd.js | ${version} | © Algolia, inc. | https://github.com/algolia/algoliasearch-client-javascript */`;
}

/**
 * Bundlers with their output format and file name for the given client.
 */
export function createBundlers({ output, clientPath, isLiteClient }) {
  const commonOptions = {
    exports: 'named',
  };

  const path = isLiteClient ? `${clientPath}/dist/lite` : `${clientPath}/dist`;

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
