'use strict';

const test = require('tape');

const requestTimeout = 5000;

test('Request strategy handles slow JSONP responses (no double callback)', t => {
  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  const sinon = require('sinon');
  const xhr = require('xhr');

  const createFixture = require('../../../utils/create-fixture');

  const currentURL = parse(location.href);
  const fixture = createFixture({
    clientOptions: {
      hosts: [
        currentURL.host,
        currentURL.host,
        currentURL.host,
        currentURL.host,
      ],
      timeout: requestTimeout,
    },
    indexName: 'slow-response',
  });

  const index = fixture.index;

  // we will receive the response from the second JSONP call in the searchCallback
  // the first JSONP call will still respond, after 2000ms
  // This test checks that we are called only once
  var searchCallback = sinon.spy(() => {
    t.ok(searchCallback.calledOnce, 'Callback was called once');

    t.deepEqual(
      searchCallback.args[0],
      [null, { slowResponse: 'ok' }],
      'Callback called with null, {"slowResponse": "ok"}'
    );

    fauxJax.restore();

    t.end();
  });

  xhr(
    {
      uri: '/1/indexes/slow-response/reset',
    },
    err => {
      t.error(
        err,
        'No error while reseting the /1/indexes/slow-response route'
      );

      fauxJax.install();

      index.search('hello', searchCallback);

      fauxJax.on('request', req => {
        req.respond(
          500,
          {},
          JSON.stringify({ status: 500, message: 'woops!' })
        );
      });
    }
  );
});
