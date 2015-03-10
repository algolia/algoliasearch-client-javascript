var test = require('tape');

var requestTimeout = 5000;

// this test uses the utils/support-server to get JSONP responses
test('Request strategy uses JSONP when all XHR timed out', function(t) {
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var xhr = require('xhr');

  var createFixture = require('../../utils/create-fixture');

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

  xhr({
    uri: '/1/indexes/request-strategy-uses-JSONP/reset'
  }, function run(err) {
     t.error(err, 'No error while reseting the /1/indexes/request-strategy-uses-JSONP route');
     fauxJax.install();

     var clock = sinon.useFakeTimers();

     var searchCallback = sinon.spy(function() {
       t.ok(searchCallback.calledOnce, 'Callback was called once');
       t.deepEqual(
         searchCallback.args[0], [
           true, {
             hello: 'man'
           }
         ],
         'Callback called with true, {"hello": "man"}'
       );

       fauxJax.restore();
       clock.restore();

       t.end();
     });

     index.search('hello', searchCallback);

     t.notOk(searchCallback.calledOnce, 'Callback not called on first request');
     t.equal(fauxJax.requests.length, 1, 'One request made');

     clock.tick(requestTimeout);
     t.equal(fauxJax.requests.length, 2, 'Second requests made');
     t.notOk(searchCallback.calledOnce, 'Callback not called on second request');

     clock.tick(requestTimeout * 2);
     t.equal(fauxJax.requests.length, 3, 'Third requests made');
     t.notOk(searchCallback.calledOnce, 'Callback not called on third request');

     clock.tick(requestTimeout * 3);
  });
});
