// This file ensures that previous V2 globals are throwing accordingly
// And redirecting the user to our migration guide
// This exists to prevent and warn

/*eslint no-new:0*/

var test = require('tape');

var message = 'You are trying to use a new version of the AlgoliaSearch JavaScript client with an old notation.' +
  '\nPlease read our migration guide at https://github.com/algolia/algoliasearch-client-js/wiki/Migration-guide-from-2.x.x-to-3.x.x';

test('new AlgoliaSearch() throws', function(t) {
  t.plan(3);

  t.throws(newAlgoliaSearch, Error);

  var err = getError();

  t.ok(err instanceof Error, 'We got an Error');
  t.equal(
    err.message,
    message,
    'We got a migration guide message'
  );

  function newAlgoliaSearch() {
    new global.AlgoliaSearch();
  }

  function getError() {
    try {
      new global.AlgoliaSearch();
    } catch (e) {
      return e;
    }
  }
});

test('new AlgoliaSearchHelper() throws', function(t) {
  t.plan(3);

  t.throws(newAlgoliaSearchHelper, Error);

  var err = getError();

  t.ok(err instanceof Error, 'We got an Error');
  t.equal(
    err.message,
    message,
    'We got a migration guide message'
  );

  function newAlgoliaSearchHelper() {
    new global.AlgoliaSearchHelper();
  }

  function getError() {
    try {
      new global.AlgoliaSearchHelper();
    } catch (e) {
      return e;
    }
  }
});

test('AlgoliaExplainResults() throws', function(t) {
  t.plan(3);

  t.throws(global.AlgoliaExplainResults, Error);

  var err = getError();

  t.ok(err instanceof Error, 'We got an Error');
  t.equal(
    err.message,
    message,
    'We got a migration guide message'
  );

  function getError() {
    try {
      global.AlgoliaExplainResults();
    } catch (e) {
      return e;
    }
  }
});
