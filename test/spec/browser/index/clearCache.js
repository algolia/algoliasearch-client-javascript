'use strict';

const test = require('tape');

test('index.clearCache()', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;
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
  index.search('hey!', makeSecondRequest);

  function makeSecondRequest() {
    // same request again
    index.search('hey!', makeThirdRequest);
  }

  function makeThirdRequest() {
    index.clearCache();

    // same request again
    index.search('hey!', () => {
      fauxJax.restore();

      t.equal(
        nbRequests,
        2,
        'Received two requests for three searches, one was cached'
      );
    });
  }
});
