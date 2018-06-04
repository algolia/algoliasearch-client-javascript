'use strict';

var test = require('tape');

var requestTimeout = 5000;

var browser = require('bowser');

// somehow and unfortunately, on ios Safari, JSONP tests are too flaky
if (browser.ios !== true) {
  test('Request strategy uses JSONP when XHR errors', function(t) {
    t.plan(4);
    var fauxJax = require('faux-jax');
    var parse = require('url-parse');
    var sinon = require('sinon');

    var createFixture = require('../../../utils/create-fixture');

    var currentURL = parse(location.href);
    var fixture = createFixture({
      clientOptions: {
        hosts: [
          currentURL.host,
          currentURL.host
        ],
        timeout: requestTimeout,
        protocol: currentURL.protocol
      },
      indexName: 'simple-JSONP-response'
    });

    var searchCallback = sinon.spy(function() {
      t.ok(
        searchCallback.calledOnce,
        'First callback called once'
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

    fauxJax.on('request', function(req) {
      // we should pass here as much time as the number of hosts (2)
      t.pass();
      // simulate network error
      req.onerror();
    });
  });
}
