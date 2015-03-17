var test = require('tape');

var requestTimeout = 5000;

// this test uses the utils/support-server to get JSONP responses
test('Request strategy uses JSONP when all XHR timed out', function(t) {
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

    process.nextTick(function() {
      var clock = sinon.useFakeTimers();
      fauxJax.install();

      index.search('hello', searchCallback);

      // 3 XHR timeouts
      ticker({
        clock: clock,
        maxTicks: 3,
        tickDuration: requestTimeout,
        tickCb: tickCheck,
        cb: restoreClock
      });

      function tickCheck(tickIndex) {
        t.notOk(searchCallback.calledOnce, 'Callback not yet called');
        t.equal(fauxJax.requests.length, tickIndex, tickIndex + ' request(s) made');
      }

      function restoreClock() {
        clock.restore();
      }
    });
  });
});
