module.exports = testXHRCall;

var sinon = require('sinon');
var AlgoliaSearch = require('algoliasearch');
var url = require('url');

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

  opts.call.args.push(function apiCallback(success, content) {

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
  });

  object[opts.methodName].apply(object, opts.call.args);

  xhr.respond(
    opts.call.fakeResponse.statusCode,
    opts.call.fakeResponse.headers,
    JSON.stringify(opts.call.fakeResponse.body)
  );

  xhrMock.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 3;
