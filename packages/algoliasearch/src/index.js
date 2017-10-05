// @flow

export { default as initClient } from './constructors/initClient';
export { default as initIndex } from './constructors/initIndex';
export { default as initPlaces } from './constructors/initPlaces';
export { default as generateSecuredApiKey } from './generateSecuredApiKey';

/* eslint-disable no-console */
export default function deprecateDefaultImport() {
  if (process && process.env === 'development') {
    console.warn(`
Hello there, thanks for using Algolia. You tried importing default from 'algoliasearch'.

This was the old way of importing, you can now do:

import { initClient, initIndex } from 'algoliasearch';

const client = initClient({ appId, apiKey });
const client = initClient({ appId, apiKey, indexName });

// any of the possible methods, like:
client.search({ requests: [{ query: 'test', indexName: 'YourIndex' }] });
index.search({ query: 'test' });
index.addObject({ color: 'red' });

read more on https://alg.li/clientv4migration
  `);
  } else {
    console.warn(
      `You're importing default, see https://alg.li/clientv4migration for more information`
    );
  }
}
