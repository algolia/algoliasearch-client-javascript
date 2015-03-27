var test = require('tape');

var requestTimeout = 5000;

// this test uses the utils/support-server to get JSONP responses
test('Request strategy uses JSONP when XHR timedout', function(t) {
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var xhr = require('xhr');

  var createFixture = require('../../utils/create-fixture');
  var ticker = require('../../utils/ticker');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host
      ],
      timeout: requestTimeout
    },
    indexName: 'request-strategy-uses-JSONP'
  });

  var index = fixture.index;

  var searchCallback = sinon.spy(function() {
    t.equal(fauxJax.requests.length, 3, 'Three requests made');
    t.ok(searchCallback.calledOnce, 'Callback was called once');

    t.deepEqual(
      searchCallback.args[0],
      [null, {hello: 'man'}],
      'Callback called with null, {"hello": "man"}'
    );

    fauxJax.restore();

    t.end();
  });

  xhr({
    uri: '/1/indexes/request-strategy-uses-JSONP/reset'
  }, function run(err) {
    t.error(err, 'No error while reseting the /1/indexes/request-strategy-uses-JSONP route');

    fauxJax.install();

    t.equal(fauxJax.requests.length, 0, 'No request made');
    index.search('hello', searchCallback);

    ticker({
      maxTicks: 3,
      tickCb: badResponse,
      ms: 100
    });

    function badResponse(tickIndex) {
      fauxJax.requests[tickIndex - 1]
        .respond(500, {}, JSON.stringify({message: 'Try again', status: 500}));
    }
  });
});
