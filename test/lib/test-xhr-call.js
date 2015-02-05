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

  opts.call.args.push(function(success, content) {
    t.deepEqual(
      url.parse(xhr.url),
      url.parse(url.format(opts.call.expectedXhr.url, true)),
      'Request url matches'
    );

    t.deepEqual(
      JSON.parse(xhr.requestBody),
      opts.call.expectedXhr.body,
      'Request body matches'
    );

    t.deepEqual(
      xhr.requestHeaders,
      opts.call.expectedXhr.headers,
      'Request headers matches'
    );

    console.log(content)
  });

  object[opts.methodName].apply(object, opts.call.args);

  xhr.respond(
    opts.call.response.statusCode,
    opts.call.response.headers,
    JSON.stringify(opts.call.response.body)
  );

  xhrMock.restore();
}

// we do 3 asserts per xhr test
testXHRCall.assertCount = 3;
