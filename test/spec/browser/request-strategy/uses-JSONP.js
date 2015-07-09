'use strict';

var test = require('tape');

var requestTimeout = 5000;

// this test uses the utils/support-server to get JSONP responses
test('Request strategy uses JSONP when XHR are failing', function(t) {
  t.plan(4);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var xhr = require('xhr');

  var createFixture = require('../../../utils/create-fixture');

  var nbRequests = 0;

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
    t.equal(nbRequests, 3, 'Three requests made');
    t.ok(searchCallback.calledOnce, 'Callback was called once');

    t.deepEqual(
      searchCallback.args[0],
      [null, {hello: 'man'}],
      'Callback called with null, {"hello": "man"}'
    );

    fauxJax.restore();
  });

  xhr({
    uri: '/1/indexes/request-strategy-uses-JSONP/reset'
  }, function run(err) {
    t.error(err, 'No error while reseting the /1/indexes/request-strategy-uses-JSONP route');

    fauxJax.install();

    index.search('hello', searchCallback);

    fauxJax.on('request', function(req) {
      nbRequests++;
      req.respond(500, {}, JSON.stringify({message: 'Try again', status: 500}));
    });
  });
});
