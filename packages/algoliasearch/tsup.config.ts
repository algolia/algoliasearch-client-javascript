import type { Options } from 'tsup';
import { defineConfig } from 'tsup';

import { getBaseNodeOptions, getBaseBrowserOptions, getDependencies } from '../../base.tsup.config';

import pkg from './package.json' with { type: 'json' };

const nodeOptions: Options = {
  ...getBaseNodeOptions(pkg, __dirname),
  dts: { entry: { node: 'lite/builds/node.ts' } },
  entry: ['lite/builds/node.ts', 'lite/src/*.ts'],

  outDir: 'dist/lite',
};

const nodeConfigs: Options[] = [
  {
    ...nodeOptions,
    format: 'cjs',
    name: 'node lite cjs',
  },
  {
    ...nodeOptions,
    format: 'esm',
    name: 'node lite esm',
  },
  {
    ...nodeOptions,
    format: 'cjs',
    name: 'node cjs',
    dts: { entry: { node: 'builds/node.ts' } },
    entry: ['builds/node.ts'],
    outDir: 'dist',
  },
  {
    ...nodeOptions,
    format: 'esm',
    name: 'node esm',
    dts: { entry: { node: 'builds/node.ts' } },
    entry: ['builds/node.ts'],
    outDir: 'dist',
  },
];

const browserOptions: Options = {
  ...getBaseBrowserOptions(pkg, __dirname),

  globalName: 'lite',
  outDir: 'dist/lite',
};

const browserConfigs: Options[] = [
  {
    ...browserOptions,
    minify: false,
    name: 'browser esm',
    dts: { entry: { browser: 'lite/builds/browser.ts' } },
    entry: ['lite/builds/browser.ts', 'lite/src/*.ts'],
    external: ['dom', '@algolia/client-common', '@algolia/requester-browser-xhr'],
  },
  {
    ...browserOptions,
    dts: false,
    minify: true,
    name: 'browser min esm',
    entry: { 'builds/browser.min': 'lite/builds/browser.ts' },
    external: [],
    noExternal: ['dom', '@algolia/client-common', '@algolia/requester-browser-xhr'],
  },
  {
    ...browserOptions,
    name: 'algoliasearch esm',
    globalName: 'algoliasearch',
    dts: { entry: { browser: 'builds/browser.ts' } },
    entry: ['builds/browser.ts'],
    outDir: 'dist',
    minify: false,
  },
  {
    ...browserOptions,
    name: 'algoliasearch min esm',
    globalName: 'algoliasearch',
    dts: false,
    minify: true,
    entry: { 'browser.min': 'builds/browser.ts' },
    outDir: 'dist',
    external: [],
    noExternal: getDependencies(pkg, 'browser'),
  },
];

export default defineConfig([...nodeConfigs, ...browserConfigs]);
