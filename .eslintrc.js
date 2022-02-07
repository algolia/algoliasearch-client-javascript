module.exports = {
  extends: [
    'algolia',
    'algolia/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
    'plugin:yml/standard',
  ],

  // yml linter
  overrides: [
    {
      files: ['*.yml'],
      parser: 'yaml-eslint-parser',
      rules: {
        '@typescript-eslint/naming-convention': 0,
        'yml/quotes': [
          2,
          {
            prefer: 'single',
            avoidEscape: true,
          },
        ],
        'yml/no-multiple-empty-lines': [
          2,
          {
            max: 1,
            maxEOF: 0,
            maxBOF: 0,
          },
        ],
        'yml/require-string-key': 2,

        // Should be removed once the specs are finished
        'yml/no-empty-document': 0,
      },
    },
  ],

  env: {
    es6: true,
  },

  parser: '@typescript-eslint/parser',

  ignorePatterns: ['.eslintrc.js'],

  settings: {
    'import/extensions': ['.js', '.ts'],
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts'],
    },
    'import/ignore': ['node_modules'],
  },

  plugins: ['algolia', 'unused-imports'],

  rules: {
    // disabled
    'no-bitwise': 0,
    '@typescript-eslint/no-namespace': 0,
    'max-classes-per-file': 0,
    'no-continue': 0,
    '@typescript-eslint/prefer-enum-initializers': 0,

    // in the meantime of finding an alternative, we warn
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['warn'],

    '@typescript-eslint/no-unused-vars': 2,
    'unused-imports/no-unused-imports-ts': 2,
    '@typescript-eslint/member-ordering': [
      'error',
      {
        default: [
          'protected-instance-method',
          'private-instance-method',
          'public-instance-method',
        ],
      },
    ],
    '@typescript-eslint/ban-types': [
      'error',
      {
        types: {
          object: {
            message: 'Use Record instead',
            fixWith: 'Record<string, any>',
          },
        },
      },
    ],
  },
};
