'use strict';

var test = require('tape');
var browser = require('bowser');

// somehow and unfortunately, on ios Safari, JSONP tests are too flaky
if (browser.ios !== true) {
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
        protocol: currentURL.protocol,
        timeout: 4000
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
        [null, {status: 200, slowResponse: 'ok'}],
        'Callback called with null, {"status": 200, "slowResponse": "ok"}'
      );

      fauxJax.restore();

      t.end();
    });

    xhr({
      uri: '/1/indexes/slow-response/reset'
    }, function run(err) {
      t.error(err, 'No error while reseting the /1/indexes/slow-response route');

      fauxJax.install();
      fauxJax.on('request', function(req) {
        req.respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
      });
      index.search('hello', searchCallback);
    });
  });
}
