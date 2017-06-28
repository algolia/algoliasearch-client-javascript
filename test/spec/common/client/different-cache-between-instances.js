'use strict';

const test = require('tape');

test("client's cache is different between instances", t => {
  t.plan(1);

  const async = require('async');
  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');

  const client1 = createFixture().client;
  const client2 = createFixture().client;
  let nbRequests = 0;

  fauxJax.install({ gzip: true });

  fauxJax.on('request', req => {
    nbRequests++;

    if (nbRequests === 1 || nbRequests === 2) {
      req.respond(200, {}, '{}');
    } else {
      t.fail('Too much requests received');
    }
  });

  async.series([firstRequest, secondRequest], end);

  function firstRequest(cb) {
    client1.startQueriesBatch();
    client1.sendQueriesBatch(cb);
  }

  function secondRequest() {
    client2.startQueriesBatch();
    client2.sendQueriesBatch(end);
  }

  function end() {
    fauxJax.restore();

    t.equal(nbRequests, 2, 'We received two requests');
  }
});
