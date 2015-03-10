var bind = require('lodash-compat/function/bind');
var test = require('tape');

var algoliasearch = require('../../');

test('algoliasearch()', function(t) {
  t.throws(
    algoliasearch,
    Error,
    'No parameters throws'
  );

  t.end();
});

test('algoliasearch(applicationID)', function(t) {
  t.throws(
    bind(algoliasearch, null, 'dsa'),
    Error,
    'Only `applicationID` throws'
  );

  t.end();
});

test('algoliasearch(applicationID, apiKey)', function(t) {
  t.doesNotThrow(
    bind(algoliasearch, null, 'dsa', 'hey'),
    'Providing required parameters does not throw'
  );

  t.end();
});
