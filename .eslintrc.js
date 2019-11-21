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
    'simple-import-sort/sort': 'error',
    'max-len': [1, 120, 2, { ignoreComments: true }],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
    'lines-between-class-members': ['error', 'always'],
    'newline-before-return': ['error'],
    'import/no-extraneous-dependencies': ['error', { packageDir: './', devDependencies: true }],
    'no-bitwise': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'functional/no-expression-statement': ['off'],
    'functional/no-conditional-statement': ['off'],
    'functional/no-throw-statement': ['off'],
    'functional/no-mixed-type': ['off'],
    'functional/functional-parameters': ['off'],
    'functional/no-return-void': ['off'],
    '@typescript-eslint/no-triple-slash-reference': ['off'],
  },
  settings: {
    'import/resolver': {
      "alias" : {
        "map" : [
          ["^algoliasearch", "./packages/algoliasearch/src"],
          ["@algolia/cache-browser-local-storage", "./packages/cache-browser-local-storage/src"],
          ["@algolia/cache-common", "./packages/cache-common/src"],
          ["@algolia/cache-in-memory", "./packages/cache-in-memory/src"],
          ["@algolia/client-account", "./packages/client-account/src"],
          ["@algolia/client-analytics", "./packages/client-analytics/src"],
          ["@algolia/client-common", "./packages/client-common/src"],
          ["@algolia/client-search", "./packages/client-search/src"],
          ["@algolia/logger-common", "./packages/logger-common/src"],
          ["@algolia/logger-console", "./packages/logger-console/src"],
          ["@algolia/requester-browser-xhr", "./packages/requester-browser-xhr/src"],
          ["@algolia/requester-common", "./packages/requester-common/src"],
          ["@algolia/requester-node-http", "./packages/requester-node-http/src"],
          ["@algolia/transporter", "./packages/transporter/src"],
        ],
        "extensions": [".ts"]
      },
      node: {
        extensions: ['.ts'],
      },
    },
  },
  overrides: [
    {
      files: ['**/__tests__/**'],
      rules: {
        'functional/immutable-data': 0,
        'functional/no-let': 0,
        'functional/no-this-expression': 0,
        'functional/no-loop-statement': 0,
        'functional/no-try-statement': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'functional/prefer-readonly-type': 0,
        'sonarjs/no-duplicate-string': 0,
      },
    },
  ],
};
