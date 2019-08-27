module.exports = {
  plugins: ['functional', 'sonarjs'],
  extends: [
    'algolia/jest',
    'algolia/typescript',
    'plugin:functional/recommended',
    'plugin:sonarjs/recommended',
  ],
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
    'lines-between-class-members': ['error', 'always'],
    'import/no-extraneous-dependencies': ['error', { packageDir: './', devDependencies: true }],
    'no-bitwise': ['off'],
    'import/no-extraneous-dependencies': ['off'],
    'functional/no-expression-statement': ['off'],
    'functional/no-conditional-statement': ['off'],
    'functional/no-throw-statement': ['off'],
    'functional/functional-parameters': ['off'],
    'functional/no-this-expression': ['off'],
    'functional/no-class': ['off'],
    'functional/no-return-void': ['off'],
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
        'functional/no-loop-statement': 0,
        'functional/no-try-statement': 0,
        '@typescript-eslint/explicit-function-return-type': 0,
        'functional/prefer-readonly-type': 0,
        'sonarjs/no-duplicate-string': 0,
      },
    },
  ],
};
