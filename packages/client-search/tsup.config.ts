import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

import { getBaseNodeOptions, getBaseBrowserOptions, getDependencies } from '../../base.tsup.config';

import pkg from './package.json' with { type: 'json' };

const nodeOptions: Options = {
  ...getBaseNodeOptions(pkg, __dirname),
  dts: { entry: { node: 'builds/node.ts' } },
  entry: ['builds/node.ts', 'src/*.ts'],
};

const nodeConfigs: Options[] = [
  {
    ...nodeOptions,
    format: 'cjs',
    name: 'node cjs',
  },
  {
    ...nodeOptions,
    format: 'esm',
    name: 'node esm',
  },
];

const browserOptions: Options = {
  ...getBaseBrowserOptions(pkg, __dirname),
  globalName: 'searchClient',
};

const browserConfigs: Options[] = [
  {
    ...browserOptions,
    minify: false,
    name: 'browser esm',
    dts: { entry: { browser: 'builds/browser.ts' } },
    entry: ['builds/browser.ts', 'src/*.ts'],
  },
  {
    ...browserOptions,
    dts: false,
    minify: true,
    name: 'browser min esm',
    entry: { 'builds/browser.min': 'builds/browser.ts' },
    external: [],
    noExternal: getDependencies(pkg, 'browser'),
  },
];

export default defineConfig([...nodeConfigs, ...browserConfigs]);
