module.exports = testXHRCall;

var AlgoliaSearch = require('algoliasearch');
var fauxJax = require('faux-jax');
var url = require('url');

var findMethodCallback = require('./find-method-callback');

function testXHRCall(opts) {
  fauxJax.install();

  var assert = opts.assert;
  var testCase = opts.testCase;

  var client = new AlgoliaSearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  var methodCallback = testCase.methodCallback = findMethodCallback(testCase.callArguments);

  object[opts.methodName].apply(object, testCase.callArguments);

  var actualRequest = fauxJax.requests[0];

  actualRequest.respond(
    testCase.fakeResponse.statusCode,
    testCase.fakeResponse.headers,
    JSON.stringify(testCase.fakeResponse.body)
  );

  assert.equal(
    actualRequest.requestMethod,
    testCase.expectedRequest.method,
    'Request method matches'
  );

  var actualRequestURL = url.parse(actualRequest.requestURL, true);
  var expectedRequestURL = url.parse(url.format(testCase.expectedRequest.URL), true);

  assert.equal(
    actualRequestURL.host,
    expectedRequestURL.host,
    'URL.host matches'
  );

  assert.equal(
    actualRequestURL.pathname,
    expectedRequestURL.pathname,
    'URL.pathname matches'
  );

  assert.equal(
    actualRequestURL.protocol,
    expectedRequestURL.protocol,
    'URL.protocol matches'
  );

  assert.deepEqual(
    actualRequestURL.query,
    expectedRequestURL.query,
    'URL.query matches'
  );

  assert.deepEqual(
    JSON.parse(actualRequest.requestBody),
    testCase.expectedRequest.body || null,
    'Request body matches'
  );

  assert.deepEqual(
    actualRequest.requestHeaders,
    testCase.expectedRequest.headers,
    'Request headers matches'
  );

  assert.ok(
    methodCallback.calledOnce,
    'Callback was called once'
  );

  var success = testCase.fakeResponse.statusCode === 200 ? true : false;

  assert.deepEqual(
    methodCallback.getCall(0).args,
    [success, testCase.fakeResponse.body],
    'Callback called with callback(true, fakeResponse.body)'
  );

  fauxJax.restore();
}

// we do 3 asserts per test
testXHRCall.assertCount = 9;
