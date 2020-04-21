const { resolve } = require('path');

const PACKAGE_DIR = './packages';

const noExtraneousOverrides = require('./scripts/packages').map(package => {
  return {
    files: [`${PACKAGE_DIR}/${package}/**/*`],
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: true,
          optionalDependencies: true,
          peerDependencies: true,
          packageDir: [resolve(__dirname, PACKAGE_DIR, package)],
        },
      ],
    },
  };
});

module.exports = {
  plugins: ['functional', 'sonarjs', 'wdio', 'simple-import-sort', 'promise'],
  extends: [
    'algolia/jest',
    'algolia/typescript',
    'plugin:functional/recommended',
    'plugin:sonarjs/recommended',
    'plugin:wdio/recommended',
    'plugin:promise/recommended',
  ],
  rules: {
    'eslint-comments/disable-enable-pair': ['error', { allowWholeFile: true }],
    'simple-import-sort/sort': 'error',
    'max-len': [1, 120, 2, { ignoreComments: true }],
    'prettier/prettier': ['error', {}, { usePrettierrc: true }],
    'object-shorthand': ['error', 'always', { avoidExplicitReturnArrows: true }],
    'lines-between-class-members': ['error', 'always'],
    'newline-before-return': ['error'],
    'import/no-extraneous-dependencies': ['error', { packageDir: './', devDependencies: true }],
    'import/extensions': ['off'],
    'no-bitwise': ['off'],
    'valid-jsdoc': ['off'],
    'functional/no-expression-statement': ['off'],
    'functional/no-conditional-statement': ['off'],
    'functional/no-throw-statement': ['off'],
    'functional/no-mixed-type': ['off'],
    'promise/always-return': ['off'],
    'functional/functional-parameters': ['off'],
    'functional/no-return-void': ['off'],
    '@typescript-eslint/no-triple-slash-reference': ['off'],
  },
  settings: {
    'import/resolver': {
      alias: {
        map: [
          ['^algoliasearch', './packages/algoliasearch/src'],
          ['@algolia/cache-browser-local-storage', './packages/cache-browser-local-storage/src'],
          ['@algolia/cache-common', './packages/cache-common/src'],
          ['@algolia/cache-in-memory', './packages/cache-in-memory/src'],
          ['@algolia/client-account', './packages/client-account/src'],
          ['@algolia/client-analytics', './packages/client-analytics/src'],
          ['@algolia/client-common', './packages/client-common/src'],
          ['@algolia/client-search', './packages/client-search/src'],
          ['@algolia/client-recommendation', './packages/client-recommendation/src'],
          ['@algolia/logger-common', './packages/logger-common/src'],
          ['@algolia/logger-console', './packages/logger-console/src'],
          ['@algolia/requester-browser-xhr', './packages/requester-browser-xhr/src'],
          ['@algolia/requester-common', './packages/requester-common/src'],
          ['@algolia/requester-node-http', './packages/requester-node-http/src'],
          ['@algolia/transporter', './packages/transporter/src'],
        ],
        extensions: ['.ts'],
      },
      node: {
        extensions: ['.ts'],
      },
    },
  },
  overrides: [
    ...noExtraneousOverrides,
    {
      files: ['**/__tests__/**'],
      rules: {
        'functional/immutable-data': 0,
        'import/no-extraneous-dependencies': 0,
        'functional/no-let': 0,
        'functional/no-this-expression': 0,
        'functional/no-loop-statement': 0,
        'functional/no-try-statement': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'functional/prefer-readonly-type': 0,
        'sonarjs/no-duplicate-string': 0,
        'jest/expect-expect': 0,
      },
    },
    {
      files: ['**/src/types/*Response.ts'],
      rules: {
        'functional/prefer-readonly-type': 0,
      },
    },
  ],
  globals: {
    testing: 'readonly',
    browser: 'readonly',
  },
};
