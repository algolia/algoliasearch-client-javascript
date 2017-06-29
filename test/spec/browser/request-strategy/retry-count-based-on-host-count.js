'use strict';

const test = require('tape');

test('Request strategy does as many tries as hosts', t => {
  const fauxJax = require('faux-jax');
  const sinon = require('sinon');

  const createFixture = require('../../../utils/create-fixture');

  const fixture = createFixture({
    clientOptions: {
      hosts: [
        'first.com',
        'second.com',
        'third.com',
        'fourth.com',
        'fifth.com',
      ],
    },
  });

  let nbRequests = 0;

  const index = fixture.index;

  var searchCallback = sinon.spy(() => {
    t.ok(searchCallback.calledOnce, 'Search callback was called once');

    t.deepEqual(searchCallback.args[0], [null, { hosts: 'YES!' }]);

    fauxJax.restore();

    t.end();
  });

  fauxJax.install();

  index.search('smg', searchCallback);

  fauxJax.on('request', req => {
    nbRequests++;
    if (nbRequests === 5) {
      goodResponse(req);
      return;
    }

    badResponse(req);
  });

  function badResponse(req) {
    req.respond(500, {}, JSON.stringify({ status: 500, message: 'woops!' }));
  }

  function goodResponse(req) {
    req.respond(200, {}, JSON.stringify({ hosts: 'YES!' }));
  }
});
