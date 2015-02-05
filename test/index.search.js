var test = require('tape');

var testXHRCall = require('./lib/test-xhr-call');
var table = require('./tables/index.search.js');

table.calls.forEach(function(call) {
  test('index.search spec: ' + call.testName, function(t) {
    t.plan(testXHRCall.assertCount);

    testXHRCall({
      call: call,
      methodName: 'search',
      object: 'index',
      applicationID: table.applicationID,
      searchOnlyAPIKey: table.searchOnlyAPIKey,
      indexName: table.indexName,
      test: t
    });

  });
});
