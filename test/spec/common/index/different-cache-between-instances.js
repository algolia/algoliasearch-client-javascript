'use strict';

var test = require('tape');

test("index's cache is different between instances", function(t) {
  t.plan(1);

  var async = require('async');
  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');

  var index1 = createFixture().index;
  var index2 = createFixture().index;
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
    index1.search('HEY!', cb);
  }

  function secondRequest(cb) {
    index2.search('HEY!', cb);
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
