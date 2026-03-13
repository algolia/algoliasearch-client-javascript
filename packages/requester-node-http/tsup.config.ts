import { defineConfig } from 'tsup';

import { getBaseNodeOptions } from '../../base.tsup.config';

import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  {
    ...getBaseNodeOptions(pkg, __dirname, 'http', 'es2018'),
    format: 'cjs',
    entry: { 'requester.http': 'src/index.ts' },
    dts: { entry: { 'requester.http': 'src/index.ts' } },
  },
  {
    ...getBaseNodeOptions(pkg, __dirname),
    format: 'esm',
    entry: { 'requester.http': 'src/index.ts' },
    dts: { entry: { 'requester.http': 'src/index.ts' } },
  },
]);
