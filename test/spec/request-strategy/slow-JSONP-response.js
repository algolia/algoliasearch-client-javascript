var test = require('tape');

var requestTimeout = 50;

test('Request strategy handles slow JSONP responses (no double callback)', function(t) {
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
      ],
      requestTimeoutInMs: requestTimeout
    },
    indexName: 'slow-JSONP-response'
  });

  var index = fixture.index;

  // we will receive the response from the second JSONP call in the searchCallback
  // the first JSONP call will still respond, after 2000ms
  // This test checks that we are called only once
  var spy = sinon.spy(function searchCallback() {
    t.ok(spy.calledOnce, 'Callback was called once');

    t.deepEqual(
      spy.getCall(0).args, [
        true, {
          slowJSONP: 'ok'
        }
      ],
      'Callback called with true, {"slowJSONP": "ok"}'
    );

    t.end();
  });

  xhr({
    uri: '/1/indexes/slow-JSONP-response/reset'
  }, function run(err) {
     t.error(err, 'No error while reseting the /1/indexes/slow-JSONP-response route');

     fauxJax.install();

     index.search('hello', spy);

     fauxJax.requests[0].respond(400, {}, '');
     fauxJax.restore();
  });
});
