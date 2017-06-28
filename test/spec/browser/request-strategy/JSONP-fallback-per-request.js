'use strict';

const test = require('tape');

const requestTimeout = 5000;

test('Request strategy uses JSONP fallback on a per requests basis', t => {
  t.plan(6);
  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  const sinon = require('sinon');

  const createFixture = require('../../../utils/create-fixture');

  const currentURL = parse(location.href);
  const fixture = createFixture({
    clientOptions: {
      hosts: [currentURL.host, currentURL.host],
      timeout: requestTimeout,
    },
    indexName: 'simple-JSONP-response',
  });

  const index = fixture.index;

  var XHRCallback = sinon.spy(() => {
    t.deepEqual(
      XHRCallback.args[0],
      [null, { HEY: 'XHR RESPONSE BABY!' }],
      'XHR callback callback called with null, {"HEY": "XHR RESPONSE BABY!"}'
    );
    fauxJax.restore();
  });

  var JSONPCallback = sinon.spy(() => {
    t.ok(JSONPCallback.calledOnce, 'JSONP callback called once');

    t.deepEqual(
      JSONPCallback.args[0],
      [null, { query: 'XHR error use JSONP' }],
      'JSONP callback called with null, {"query": "XHR error use JSONP"}'
    );

    index.search('Youpi', XHRCallback);
  });

  fauxJax.install();

  index.search('XHR error use JSONP', JSONPCallback);

  let reqCount = 0;
  fauxJax.on('request', req => {
    t.pass();
    reqCount++;
    if (reqCount === 3) {
      req.respond(200, {}, JSON.stringify({ HEY: 'XHR RESPONSE BABY!' }));
    } else {
      // hacky way to simulate a network error
      req.onerror();
    }
  });
});
