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
    'algolia',
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
          ['@sefai/cache-browser-local-storage', './packages/cache-browser-local-storage/src'],
          ['@sefai/cache-common', './packages/cache-common/src'],
          ['@sefai/cache-in-memory', './packages/cache-in-memory/src'],
          ['@sefai/client-account', './packages/client-account/src'],
          ['@sefai/client-analytics', './packages/client-analytics/src'],
          ['@sefai/client-common', './packages/client-common/src'],
          ['@sefai/client-personalization', './packages/client-personalization/src'],
          ['@sefai/client-recommendation', './packages/client-recommendation/src'],
          ['@sefai/client-search', './packages/client-search/src'],
          ['@sefai/logger-common', './packages/logger-common/src'],
          ['@sefai/logger-console', './packages/logger-console/src'],
          ['@sefai/recommend', './packages/recommend/src'],
          ['@sefai/requester-browser-xhr', './packages/requester-browser-xhr/src'],
          ['@sefai/requester-common', './packages/requester-common/src'],
          ['@sefai/requester-fetch', './packages/requester-fetch/src'],
          ['@sefai/transporter', './packages/transporter/src'],
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
