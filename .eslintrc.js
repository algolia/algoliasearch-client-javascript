module.exports = {
  extends: ['algolia/jest', 'algolia/typescript'],
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
};
