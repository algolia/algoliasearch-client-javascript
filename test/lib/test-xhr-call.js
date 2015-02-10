module.exports = testXHRCall;

var sinon = require('sinon');
var url = require('url');

var AlgoliaSearch = require('algoliasearch');

function testXHRCall(opts) {
  var t = opts.test;

  var xhrMock = sinon.useFakeXMLHttpRequest();
  var xhr;
  xhrMock.onCreate = function(newXhr) {
    xhr = newXhr;
  };

  var client = new AlgoliaSearch(opts.applicationID, opts.searchOnlyAPIKey);
  var object;
  if (opts.object === 'index') {
    object = client.initIndex(opts.indexName);
  } else {
    object = client;
  }

  object[opts.methodName].apply(object, opts.call.args);

  xhr.respond(
    opts.call.fakeResponse.statusCode,
    opts.call.fakeResponse.headers,
    JSON.stringify(opts.call.fakeResponse.body)
  );

  t.deepEqual(
    url.parse(xhr.url),
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

  xhrMock.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 3;
