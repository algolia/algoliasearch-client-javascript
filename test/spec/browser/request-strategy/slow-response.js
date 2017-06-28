'use strict';

const test = require('tape');

const requestTimeout = 1000;

test('Request strategy handles slow responses (no double callback)', t => {
  t.plan(4);

  const sinon = require('sinon');
  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');

  const fixture = createFixture({
    clientOptions: {
      timeout: requestTimeout,
    },
  });

  const index = fixture.index;

  var searchCallback = sinon.spy(() => {
    t.ok(searchCallback.calledOnce, 'Callback was called once');

    t.deepEqual(
      searchCallback.args[0],
      [null, { slowResponse: 'ok' }],
      'Callback called with null, {"slowResponse": "ok"}'
    );

    fauxJax.restore();
  });

  fauxJax.install();

  index.search('hello', searchCallback);

  // wait for two requests,
  // first request will be already timedout
  fauxJax.waitFor(2, (err, requests) => {
    t.error(err);
    t.equal(requests.length, 2, 'Two requests made');
    const firstRequest = requests[0];
    const secondRequest = requests[1];

    // now wait requestTimeout / 2 and respond to both,
    // only the second response should be taken into account
    setTimeout(() => {
      firstRequest.respond(
        200,
        {},
        JSON.stringify({ slowResponse: 'timeout response' })
      );

      secondRequest.respond(200, {}, JSON.stringify({ slowResponse: 'ok' }));
    }, requestTimeout / 2);
  });
});
