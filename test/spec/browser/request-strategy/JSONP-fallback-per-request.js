'use strict';

var test = require('tape');

var requestTimeout = 5000;

test('Request strategy uses JSONP fallback on a per requests basis', function(t) {
  t.plan(6);
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
      timeout: requestTimeout
    },
    indexName: 'simple-JSONP-response'
  });

  var index = fixture.index;

  var XHRCallback = sinon.spy(function() {
    t.deepEqual(
      XHRCallback.args[0],
      [null, {HEY: 'XHR RESPONSE BABY!'}],
      'XHR callback callback called with null, {"HEY": "XHR RESPONSE BABY!"}'
    );
    fauxJax.restore();
  });

  var JSONPCallback = sinon.spy(function() {
    t.ok(
      JSONPCallback.calledOnce,
      'JSONP callback called once'
    );

    t.deepEqual(
      JSONPCallback.args[0],
      [null, {query: 'XHR error use JSONP'}],
      'JSONP callback called with null, {"query": "XHR error use JSONP"}'
    );

    index.search('Youpi', XHRCallback);
  });

  fauxJax.install();

  index.search('XHR error use JSONP', JSONPCallback);

  var reqCount = 0;
  fauxJax.on('request', function(req) {
    t.pass();
    reqCount++;
    if (reqCount === 3) {
      req.respond(200, {}, JSON.stringify({HEY: 'XHR RESPONSE BABY!'}));
    } else {
      // hacky way to simulate a network error
      req.onerror();
    }
  });
});
