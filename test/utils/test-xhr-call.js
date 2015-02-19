module.exports = testXHRCall;

var AlgoliaSearch = require('algoliasearch');
var fauxJax = require('faux-jax');
var url = require('url');

function testXHRCall(opts) {
  fauxJax.install();

  var assert = opts.assert;

  var client = new AlgoliaSearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  object[opts.methodName].apply(object, opts.testCase.callArguments);

  var xhr = fauxJax.requests[0];

  xhr.respond(
    opts.testCase.fakeResponse.statusCode,
    opts.testCase.fakeResponse.headers,
    JSON.stringify(opts.testCase.fakeResponse.body)
  );

  assert.equal(
    xhr.requestMethod,
    opts.testCase.expectedRequest.method,
    'Request method matches'
  );

  assert.deepEqual(
    url.parse(xhr.requestURL),
    url.parse(url.format(opts.testCase.expectedRequest.URL, true)),
    'Request url matches'
  );

  assert.deepEqual(
    JSON.parse(xhr.requestBody),
    opts.testCase.expectedRequest.body,
    'Request body matches'
  );

  assert.deepEqual(
    xhr.requestHeaders,
    opts.testCase.expectedRequest.headers,
    'Request headers matches'
  );

  fauxJax.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 3;
