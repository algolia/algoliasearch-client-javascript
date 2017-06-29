'use strict';

const test = require('tape');

const requestTimeout = 5000;

test('Request strategy uses JSONP when XHR errors', t => {
  t.plan(4);
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

  var searchCallback = sinon.spy(() => {
    t.ok(searchCallback.calledOnce, 'First callback called once');

    fauxJax.restore();

    t.deepEqual(
      searchCallback.args[0],
      [null, { query: 'XHR error use JSONP' }],
      'First callback called with null, {"query": "XHR error use JSONP"}'
    );
  });

  const index = fixture.index;

  fauxJax.install();

  index.search('XHR error use JSONP', searchCallback);

  fauxJax.on('request', req => {
    // we should pass here as much time as the number of hosts (2)
    t.pass();
    // simulate network error
    req.onerror();
  });
});
