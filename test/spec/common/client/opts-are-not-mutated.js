'use strict';

var test = require('tape');

test('algoliasearch(applicationID, apiKey, opts), `opts` is not mutated', function(t) {
  t.plan(1);

  var keys = require('lodash/object/keys');
  var opts = {};

  var algoliasearch = require('../../../../');
  algoliasearch('applicationID', 'apiKey', opts);

  t.equal(
    keys(opts).length,
    0,
    'No keys were added to our `opts` object by algoliasearch()'
  );
});
