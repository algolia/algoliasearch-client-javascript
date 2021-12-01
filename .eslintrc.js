module.exports = {
  extends: [
    'algolia',
    'algolia/typescript',
    'plugin:import/errors',
    'plugin:import/warnings',
    'plugin:import/typescript',
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
    'no-unused-vars': 0,
    '@typescript-eslint/prefer-enum-initializers': 0,
    // there's a conflict when declaring `type` and `namespaces`, even with `ignoreDeclarationMerge`
    'no-redeclare': 0,
    '@typescript-eslint/no-redeclare': 0,

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
