module.exports = testXHRCall;

var fauxJax = require('faux-jax');
var url = require('url');

var AlgoliaSearch = require('algoliasearch');

function testXHRCall(opts) {
  fauxJax.install();

  var t = opts.test;

  var client = new AlgoliaSearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  object[opts.methodName].apply(object, opts.call.args);

  var xhr = fauxJax.requests[0];

  xhr.respond(
    opts.call.fakeResponse.statusCode,
    opts.call.fakeResponse.headers,
    JSON.stringify(opts.call.fakeResponse.body)
  );

  t.deepEqual(
    url.parse(xhr.requestURL),
    url.parse(url.format(opts.call.expectedRequest.url, true)),
    'Request url matches'
  );

  t.deepEqual(
    JSON.parse(xhr.requestBody),
    opts.call.expectedRequest.body,
    'Request body matches'
  );

  t.deepEqual(
    xhr.requestHeaders,
    opts.call.expectedRequest.headers,
    'Request headers matches'
  );

  opts.call.args.forEach(function doTestCheck(p) {
    if(p && p.test && typeof p.test === 'function') {
      p.test(t);
    }
  });

  fauxJax.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 3;
