'use strict';

const test = require('tape');

const requestTimeout = 5000;

// this test uses the utils/support-server to get JSONP responses
test('Request strategy uses JSONP when XHR are failing', t => {
  t.plan(4);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  const sinon = require('sinon');
  const xhr = require('xhr');

  const createFixture = require('../../../utils/create-fixture');

  let nbRequests = 0;

  const currentURL = parse(location.href);
  const fixture = createFixture({
    clientOptions: {
      hosts: [currentURL.host, currentURL.host, currentURL.host],
      timeout: requestTimeout,
    },
    indexName: 'request-strategy-uses-JSONP',
  });

  const index = fixture.index;

  var searchCallback = sinon.spy(() => {
    t.equal(nbRequests, 3, 'Three requests made');
    t.ok(searchCallback.calledOnce, 'Callback was called once');

    t.deepEqual(
      searchCallback.args[0],
      [null, { hello: 'man' }],
      'Callback called with null, {"hello": "man"}'
    );

    fauxJax.restore();
  });

  xhr(
    {
      uri: '/1/indexes/request-strategy-uses-JSONP/reset',
    },
    err => {
      t.error(
        err,
        'No error while reseting the /1/indexes/request-strategy-uses-JSONP route'
      );

      fauxJax.install();

      index.search('hello', searchCallback);

      fauxJax.on('request', req => {
        nbRequests++;
        req.respond(
          500,
          {},
          JSON.stringify({ message: 'Try again', status: 500 })
        );
      });
    }
  );
});
