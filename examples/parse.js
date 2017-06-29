'use strict';

/* global Parse */
/* eslint-disable import/no-extraneous-dependencies */
// put this file in your `cloud/` folder of your Parse application
// also copy the `dist/algoliasearch.parse.js` to `cloud/algoliasearch.parse.js`
const algoliasearch = require('cloud/algoliasearch.parse.js');
const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
const index = client.initIndex('contacts');

Parse.Cloud.define('hello', (request, response) => {
  index.search('Atlenta', (err, results) => {
    if (err) {
      throw err;
    }

    response.success(`We got ${results.nbHits} results`);
  });
});
