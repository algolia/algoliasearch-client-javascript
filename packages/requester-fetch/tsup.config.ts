import { defineConfig } from 'tsup';

import { getBaseBrowserOptions, getBaseNodeOptions } from '../../base.tsup.config';

import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  {
    ...getBaseNodeOptions(pkg, __dirname),
    format: 'cjs',
    name: 'node cjs',
    entry: { 'requester.fetch.node': 'index.ts' },
    dts: { entry: { 'requester.fetch.node': 'index.ts' } },
  },
  {
    ...getBaseNodeOptions(pkg, __dirname),
    format: 'esm',
    name: 'node esm',
    entry: { 'requester.fetch.node': 'index.ts' },
    dts: { entry: { 'requester.fetch.node': 'index.ts' } },
  },
  {
    ...getBaseBrowserOptions(pkg, __dirname),
    minify: true,
    name: 'browser esm',
    entry: { 'requester.fetch.browser': 'index.ts' },
    dts: { entry: { 'requester.fetch.browser': 'index.ts' } },
    globalName: 'requesterfetch',
  },
]);
