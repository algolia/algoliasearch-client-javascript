'use strict';

const test = require('tape');

test("index's cache is different between instances", t => {
  t.plan(1);

  const async = require('async');
  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');

  const index1 = createFixture().index;
  const index2 = createFixture().index;
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
    index1.search('HEY!', cb);
  }

  function secondRequest(cb) {
    index2.search('HEY!', cb);
  }

  function end() {
    fauxJax.restore();

    t.equal(nbRequests, 2, 'We received two requests');
  }
});
