'use strict';

/* global Parse */

// put this file in your `cloud/` folder of your Parse application
// also copy the `dist/algoliasearch.parse.js` to `cloud/algoliasearch.parse.js`
var algoliasearch = require('cloud/algoliasearch.parse.js');
var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
var index = client.initIndex('contacts');

Parse.Cloud.define('hello', function(request, response) {
  index.search('Atlenta', function(err, results) {
    if (err) {
      throw err;
    }

    response.success('We got ' + results.nbHits + ' results');
  });
});
