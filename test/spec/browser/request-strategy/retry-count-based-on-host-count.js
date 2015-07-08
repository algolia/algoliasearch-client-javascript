'use strict';

var test = require('tape');

test('Request strategy does as many tries as hosts', function(t) {
  var fauxJax = require('faux-jax');
  var sinon = require('sinon');

  var createFixture = require('../../../utils/create-fixture');

  var fixture = createFixture({
    clientOptions: {
      hosts: [
        'first.com',
        'second.com',
        'third.com',
        'fourth.com',
        'fifth.com'
      ]
    }
  });

  var nbRequests = 0;

  var index = fixture.index;

  var searchCallback = sinon.spy(function() {
    t.ok(
      searchCallback.calledOnce,
      'Search callback was called once'
    );

    t.deepEqual(
      searchCallback.args[0],
      [null, {hosts: 'YES!'}]
    );

    fauxJax.restore();

    t.end();
  });

  fauxJax.install();

  index.search('smg', searchCallback);

  fauxJax.on('request', function(req) {
    nbRequests++;
    if (nbRequests === 5) {
      goodResponse(req);
      return;
    }

    badResponse(req);
  });

  function badResponse(req) {
    req.respond(500, {}, JSON.stringify({status: 500, message: 'woops!'}));
  }

  function goodResponse(req) {
    req.respond(200, {}, JSON.stringify({hosts: 'YES!'}));
  }
});
