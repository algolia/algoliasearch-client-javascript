import { defineConfig } from 'tsup';

import { getBaseBrowserOptions } from '../../base.tsup.config';

import pkg from './package.json' with { type: 'json' };

export default defineConfig({
  ...getBaseBrowserOptions(pkg, __dirname),
  minify: true,
  globalName: 'requesterxhr',
  entry: { 'requester.xhr': 'src/index.ts' },
  dts: { entry: { 'requester.xhr': 'src/index.ts' } },
});
