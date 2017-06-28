'use strict';

const test = require('tape');

test('client.clearCache()', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const client = fixture.client;
  let nbRequests = 0;

  fauxJax.install();

  fauxJax.on('request', req => {
    nbRequests++;

    if (nbRequests === 1 || nbRequests === 2) {
      req.respond(200, {}, '{}');
    } else {
      t.fail('Too much requests received');
    }
  });

  // store the query in the cache
  client.startQueriesBatch();
  client.sendQueriesBatch(makeSecondRequest);

  function makeSecondRequest() {
    // same request again
    client.startQueriesBatch();
    client.sendQueriesBatch(makeThirdRequest);
  }

  function makeThirdRequest() {
    client.clearCache();

    // same request again
    client.startQueriesBatch();
    client.sendQueriesBatch(() => {
      fauxJax.restore();

      t.equal(
        nbRequests,
        2,
        'Received two requests for three searches, one was cached'
      );
    });
  }
});
