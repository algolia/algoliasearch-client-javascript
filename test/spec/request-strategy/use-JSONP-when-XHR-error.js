var test = require('tape');

var requestTimeout = 5000;

test('Request strategy uses JSONP when XHR errors', function(t) {
  t.plan(4);
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');

  var createFixture = require('../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host
      ],
      timeout: requestTimeout
    },
    indexName: 'simple-JSONP-response'
  });

  var searchCallback = sinon.spy(function() {
    t.ok(
      searchCallback.calledOnce,
      'First callback called once'
    );

    t.equal(
      fauxJax.requests.length,
      1,
      'Still one XHR done while there is two hosts'
    );

    fauxJax.restore();

    t.deepEqual(
      searchCallback.args[0],
      [null, {query: 'XHR error use JSONP'}],
      'First callback called with null, {"query": "XHR error use JSONP"}'
    );
  });

  var index = fixture.index;

  fauxJax.install();

  index.search('XHR error use JSONP', searchCallback);

  setTimeout(function() {
    t.equal(
      fauxJax.requests.length,
      1,
      'One request made'
    );

    // hacky way to simulate a network error
    fauxJax.requests[0].onerror();
  }, 200);
});
