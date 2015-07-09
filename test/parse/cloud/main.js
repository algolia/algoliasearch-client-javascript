'use strict';

/* global Parse */

Parse.Cloud.define('search', function(request, response) {
  var algoliasearch = require('cloud/algoliasearch.parse.js');
  var client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');
  var index = client.initIndex('contacts');

  index.search(request.params.query, function(err, results) {
    if (err) {
      response.error(err);
      throw err;
    }

    response.success('OK! Query was: ' + results.query + ' @ ' + request.params.timestamp + ' using ' + algoliasearch.version);
  });
});
