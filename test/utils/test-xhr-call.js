module.exports = testXHRCall;

var algoliasearch = require('../../');
var fauxJax = require('faux-jax');
var parse = require('url-parse');

var findMethodCallback = require('./find-method-callback');

function testXHRCall(opts) {
  var assert = opts.assert;
  var testCase = opts.testCase;

  var client = algoliasearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  var methodCallback = testCase.methodCallback = findMethodCallback(testCase.callArguments);

  // this needs to be done here to be as close as possible to the new XMLHttpRequest() call
  fauxJax.install();

  object[opts.methodName].apply(object, testCase.callArguments);

  var actualRequest = fauxJax.requests[0];
  var expectedRequest = testCase.expectedRequest;

  actualRequest.respond(
    testCase.fakeResponse.statusCode,
    testCase.fakeResponse.headers,
    JSON.stringify(testCase.fakeResponse.body)
  );

  assert.equal(
    actualRequest.requestMethod,
    expectedRequest.method,
    'Request method matches'
  );

  var actualRequestURL = parse(actualRequest.requestURL, true);
  var expectedRequestURL = expectedRequest.URL;

  assert.equal(
    actualRequestURL.host,
    expectedRequestURL.host.toLowerCase(),
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
    expectedRequest.body || null,
    'Request body matches'
  );

  if (fauxJax.support.xhr.cors) {
    assert.deepEqual(
      actualRequest.requestHeaders,
      expectedRequest.headers,
      'Request headers matches'
    );
  } else {
    assert.pass('Cannot check requestHeaders, CORS not supported');
  }

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
