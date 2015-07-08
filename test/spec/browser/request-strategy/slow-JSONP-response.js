'use strict';

var test = require('tape');

var requestTimeout = 5000;

test('Request strategy handles slow JSONP responses (no double callback)', function(t) {
  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  var sinon = require('sinon');
  var xhr = require('xhr');

  var createFixture = require('../../../utils/create-fixture');

  var currentURL = parse(location.href);
  var fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host,
        currentURL.host
      ],
      timeout: requestTimeout
    },
    indexName: 'slow-response'
  });

  var index = fixture.index;

  // we will receive the response from the second JSONP call in the searchCallback
  // the first JSONP call will still respond, after 2000ms
  // This test checks that we are called only once
  var searchCallback = sinon.spy(function() {
    t.ok(searchCallback.calledOnce, 'Callback was called once');

    t.deepEqual(
      searchCallback.args[0],
      [null, {slowResponse: 'ok'}],
      'Callback called with null, {"slowResponse": "ok"}'
    );

    fauxJax.restore();

    t.end();
  });

  xhr({
    uri: '/1/indexes/slow-response/reset'
  }, function run(err) {
    t.error(err, 'No error while reseting the /1/indexes/slow-response route');

    fauxJax.install();

    index.search('hello', searchCallback);

    fauxJax.on('request', function(req) {
      req.respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
    });
  });
});
