'use strict';

const test = require('tape');

test('algoliasearch(applicationID, apiKey, opts), `opts` is not mutated', t => {
  t.plan(1);

  const keys = require('lodash-compat/object/keys');
  const opts = {};

  const algoliasearch = require('../../../../');
  algoliasearch('applicationID', 'apiKey', opts);

  t.equal(
    keys(opts).length,
    0,
    'No keys were added to our `opts` object by algoliasearch()'
  );
});
