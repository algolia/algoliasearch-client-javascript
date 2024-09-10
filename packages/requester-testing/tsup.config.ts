import { defineConfig } from 'tsup';

import { getBaseBrowserOptions, getBaseNodeOptions } from '../../base.tsup.config';

import pkg from './package.json' with { type: 'json' };

export default defineConfig([
  {
    ...getBaseNodeOptions(pkg, __dirname),
    format: 'cjs',
    entry: { node: 'src/nodeEchoRequester.ts' },
    dts: { entry: { node: 'src/nodeEchoRequester.ts' } },
  },
  {
    ...getBaseNodeOptions(pkg, __dirname),
    format: 'esm',
    entry: { node: 'src/nodeEchoRequester.ts' },
    dts: { entry: { node: 'src/nodeEchoRequester.ts' } },
  },
  {
    ...getBaseBrowserOptions(pkg, __dirname),
    format: 'esm',
    entry: { browser: 'src/browserEchoRequester.ts' },
    dts: { entry: { browser: 'src/browserEchoRequester.ts' } },
  },
]);
