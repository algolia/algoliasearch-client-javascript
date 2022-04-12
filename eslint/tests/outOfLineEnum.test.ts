import { RuleTester } from 'eslint';

import { outOfLineEnum } from '../src/rules/outOfLineEnum';

const ruleTester = new RuleTester({
  parser: require.resolve('yaml-eslint-parser'),
});

ruleTester.run('out-of-line-enum', outOfLineEnum, {
  valid: [
    `
simple:
  type: string
  enum: [bla, blabla]
`,
    `
simple:
  type: string
  enum:
    - bla
    - blabla
`,
    `
simple:
  type: string
  enum: [bla, blabla]

useIt:
  $ref: '#/simple'
`,
    `
servers:
  - url: http://test-server.com
    variables:
      region:
        default: us
        enum:
          - us
          - de
`,
  ],
  invalid: [
    {
      code: `
root:
  inside:
    type: string
    enum: [bla, blabla]
  `,
      errors: [{ messageId: 'enumNotOutOfLine' }],
    },
    {
      code: `
root:
  inside:
    deeper:
      type: string
      enum: [bla, blabla]

useIt:
  $ref: '#/root/inside/deeper'
  `,
      errors: [{ messageId: 'enumNotOutOfLine' }],
    },
  ],
});
