import { RuleTester } from 'eslint';

import { descriptionDot } from '../src/rules/descriptionDot';

const ruleTester = new RuleTester({
  parser: require.resolve('yaml-eslint-parser'),
});

ruleTester.run('description-dot', descriptionDot, {
  valid: [
    `
simple:
  type: number
  description: a number.
    `,
    `
multi:
  description: >
    Creates a new A/B test with provided configuration.

    You can set an A/B test on two different indices with different settings, or on the same index with different search parameters by providing a customSearchParameters setting on one of the variants.
    `,
    `
multiStrip:
  description: >-
    Multiline comment
    on description.
    `,
    `
responses:
  '200':
    description: OK
    `,
  ],
  invalid: [
    {
      code: `
simple:
  description: a number
    `,
      errors: [{ messageId: 'descriptionNoDot' }],
      output: `
simple:
  description: a number.
    `,
    },
    {
      code: `
multi:
  description: >
    Multiline comment
    on description
    `,
      errors: [{ messageId: 'descriptionNoDot' }],
      output: `
multi:
  description: >
    Multiline comment
    on description.
    `,
    },
  ],
});
