/* eslint-disable no-console */
export default function deprecateDefaultImport() {
  if (process && process.env === 'production') {
    throw new Error(
      `You're importing default, see https://alg.li/clientv4migration for more information`
    );
  } else {
    throw new Error(`
Hello there, thanks for using Algolia. You tried importing default from 'algoliasearch'.

This was the old way of importing, you can now do:

import { initClient, initIndex } from 'algoliasearch';

const client = initClient({ appId, apiKey });
const index = initIndex({ appId, apiKey, indexName });

// any of the possible methods, like:
client.search({ requests: [{ query: 'test', indexName: 'YourIndex' }] });
index.search({ query: 'test' });
index.addObject({ color: 'red' });

read more on https://alg.li/clientv4migration`);
  }
}
