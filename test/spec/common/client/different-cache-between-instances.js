'use strict';

var test = require('tape');

test("client's cache is different between instances", function(t) {
  t.plan(1);

  var async = require('async');
  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');

  var client1 = createFixture().client;
  var client2 = createFixture().client;
  var nbRequests = 0;

  fauxJax.install();

  fauxJax.on('request', function(req) {
    nbRequests++;

    if (nbRequests === 1 || nbRequests === 2) {
      req.respond(200, {}, '{}');
    } else {
      t.fail('Too much requests received');
    }
  });

  async.series([
    firstRequest,
    secondRequest
  ], end);

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

    t.equal(
      nbRequests,
      2,
      'We received two requests'
    );
  }
});
