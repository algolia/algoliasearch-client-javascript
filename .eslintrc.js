module.exports = {
  plugins: ['functional'],
  extends: ['algolia/jest', 'algolia/typescript', 'plugin:functional/recommended'],
  rules: {
    'max-len': [
      'error',
      {
        code: 200,
        ignoreComments: true,
        ignoreTrailingComments: true,
        ignoreUrls: true,
      },
    ],
    'prettier/prettier': [
      'error',
      {
        trailingComma: 'es5',
        singleQuote: true,
        printWidth: 100,
      },
    ],
    'import/no-extraneous-dependencies': ['error', { packageDir: './', devDependencies: true }],
    'no-bitwise': ['off'],
    'import/no-extraneous-dependencies': ['off'],
  },
  settings: {
    'import/resolver': {
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
        '@typescript-eslint/explicit-function-return-type': 0,
        'functional/prefer-readonly-types': 0,
      },
    },
  ],
};
