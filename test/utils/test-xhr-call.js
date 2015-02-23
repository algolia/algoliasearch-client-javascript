module.exports = testXHRCall;

var AlgoliaSearch = require('algoliasearch');
var fauxJax = require('faux-jax');
var url = require('url');

var findMethodCallback = require('./find-method-callback');

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

  var methodCallback = findMethodCallback(opts.testCase.callArguments);

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

  assert.equal(
    xhr.requestURL,
    url.format(opts.testCase.expectedRequest.URL, true),
    'Request URL matches'
  );

  assert.deepEqual(
    JSON.parse(xhr.requestBody),
    opts.testCase.expectedRequest.body || null,
    'Request body matches'
  );

  assert.deepEqual(
    xhr.requestHeaders,
    opts.testCase.expectedRequest.headers,
    'Request headers matches'
  );

  assert.ok(
    methodCallback.calledOnce,
    'Callback was called once'
  );

  assert.deepEqual(
    methodCallback.getCall(0).args,
    [true, opts.testCase.fakeResponse.body],
    'Callback called with callback(true, fakeResponse.body)'
  );

  fauxJax.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 6;
