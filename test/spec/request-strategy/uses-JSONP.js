var test = require('tape');

var requestTimeout = 2000;

// this test uses the utils/support-server to get JSONP responses
test('Request strategy uses JSONP when all XHR timed out', function(t) {
    console.time('start');

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var xhr = require('xhr');

  var createFixture = require('../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      dsnHost: currentURL.host,
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host
      ]
    },
    indexName: 'request-strategy-uses-JSONP'
  });

  var index = fixture.index;

  var spy = sinon.spy(function searchCallback() {
    t.ok(spy.calledOnce, 'Callback was called once');
    t.deepEqual(
      spy.getCall(0).args, [
        true, {
          hello: 'man'
        }
      ],
      'Callback called with true, {"hello": "man"}'
    );

    console.timeEnd('start');
    t.end();

  });

  xhr({
    uri: '/1/indexes/request-strategy-uses-JSONP/reset'
  }, function run(err) {
     t.error(err, 'No error while reseting the /1/indexes/request-strategy-uses-JSONP route');
     fauxJax.install();

     var clock = sinon.useFakeTimers();

     index.search('hello', spy);

     t.notOk(spy.calledOnce, 'Callback not called on first request');
     t.equal(fauxJax.requests.length, 1, 'One request made');

     clock.tick(requestTimeout);
     t.equal(fauxJax.requests.length, 2, 'Second requests made');
     t.notOk(spy.calledOnce, 'Callback not called on second request');

     clock.tick(requestTimeout * 2);
     t.equal(fauxJax.requests.length, 3, 'Third requests made');
     t.notOk(spy.calledOnce, 'Callback not called on third request');

     clock.tick(requestTimeout * 3);
     t.equal(fauxJax.requests.length, 4, 'Fourth request made');
     t.notOk(spy.calledOnce, 'Callback not called on fourth request');

     clock.tick(requestTimeout * 4);
     // TODO: check JSONP script tags creation using clock

     fauxJax.restore();
     clock.restore();
  });
});
