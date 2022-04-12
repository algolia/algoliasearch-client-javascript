module.exports = {
  ignorePatterns: ['.eslintrc.js', '**/node_modules', '**/build', '**/dist', '**/target', '**/.yarn'],

  overrides: [
    {
      // yml linter
      files: ['*.yml'],

      extends: [
        'plugin:yml/standard',
      ],

      parser: 'yaml-eslint-parser',
      plugins: ["automation-custom"],
      rules: {
        'yml/plain-scalar': [
          2,
          "always"
          , {
            // ignore path from ref, that must be quoted
            ignorePatterns: [
              '[./#a-zA-Z0-9_]+'
            ]
          }
        ],
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
      },
      overrides: [{
        files: ['specs/**/*.yml'],
        rules: {
          "automation-custom/description-dot": "error",
          "automation-custom/single-quote-ref": "error",
        },
        overrides: [
          {
            files: ['!specs/bundled/*.yml'],
            rules: {
              "automation-custom/out-of-line-enum": "error",
            }
          }
        ]
      }
      ]
    },
    {
      // es linter
      files: ['*.ts', '*.js'],

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
    }
  ],
};
