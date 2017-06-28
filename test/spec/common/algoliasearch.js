'use strict';

const bind = require('lodash-compat/function/bind');
const test = require('tape');

const algoliasearch = require('../../../');

test('algoliasearch()', t => {
  t.throws(algoliasearch, Error, 'No parameters throws');

  t.end();
});

test('algoliasearch(applicationID)', t => {
  t.throws(
    bind(algoliasearch, null, 'dsa'),
    Error,
    'Only `applicationID` throws'
  );

  t.end();
});

test('algoliasearch(applicationID, apiKey)', t => {
  t.doesNotThrow(
    bind(algoliasearch, null, 'dsa', 'hey'),
    'Providing required parameters does not throw'
  );

  t.end();
});

test('algoliasearch.version returns the package version', t => {
  t.equal(
    algoliasearch.version,
    require('../../../package.json').version,
    'We get the package version in algoliasearch.version'
  );
  t.end();
});
