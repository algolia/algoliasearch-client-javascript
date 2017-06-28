/* eslint-disable no-console */
'use strict';

// node examples/node.js
const algoliasearch = require('../');
const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
const index = client.initIndex('contacts');

index.search('Atlenta', (err, results) => {
  if (err) {
    throw err;
  }
  console.log(`We got \`${results.nbHits}\` results`);
  console.log('Here is the first one: ', results.hits[0]);

  // call client.destroy() this when you need to stop the node.js client
  // it will release any keepalived connection
  client.destroy();
});
