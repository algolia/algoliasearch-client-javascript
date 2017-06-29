'use strict';

const test = require('tape');

test('window.__algolia', t => {
  t.plan(4);

  const algoliasearch = require('../../../');

  t.ok(window.__algolia, 'we exported it');
  t.equal(
    window.__algolia.algoliasearch.version,
    algoliasearch.version,
    'version matches'
  );
  t.equal(window.__algolia.algoliasearch.ua, algoliasearch.ua, 'ua matches');
  t.ok(window.__algolia.debug, 'debug is present');
});
