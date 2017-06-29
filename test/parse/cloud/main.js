'use strict';

/* global Parse */

Parse.Cloud.define('search', (request, response) => {
  const algoliasearch = require('cloud/algoliasearch.parse.js');
  const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
  const index = client.initIndex('contacts');

  index.search(request.params.query, (err, results) => {
    if (err) {
      response.error(err);
      throw err;
    }

    response.success(
      `OK! Query was: ${results.query} @ ${request.params
        .timestamp} using ${algoliasearch.version}`
    );
  });
});
