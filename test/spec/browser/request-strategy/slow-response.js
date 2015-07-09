'use strict';

var test = require('tape');

var requestTimeout = 1000;

test('Request strategy handles slow responses (no double callback)', function(t) {
  t.plan(4);

  var sinon = require('sinon');
  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');

  var fixture = createFixture({
    clientOptions: {
      timeout: requestTimeout
    }
  });

  var index = fixture.index;

  var searchCallback = sinon.spy(function() {
    t.ok(
      searchCallback.calledOnce,
      'Callback was called once'
    );

    t.deepEqual(
      searchCallback.args[0],
      [null, {slowResponse: 'ok'}],
      'Callback called with null, {"slowResponse": "ok"}'
    );

    fauxJax.restore();
  });

  fauxJax.install();

  index.search('hello', searchCallback);

  // wait for two requests,
  // first request will be already timedout
  fauxJax.waitFor(2, function(err, requests) {
    t.error(err);
    t.equal(requests.length, 2, 'Two requests made');
    var firstRequest = requests[0];
    var secondRequest = requests[1];

    // now wait requestTimeout / 2 and respond to both,
    // only the second response should be taken into account
    setTimeout(function() {
      firstRequest.respond(
        200,
        {},
        JSON.stringify({slowResponse: 'timeout response'})
      );

      secondRequest.respond(
        200,
        {},
        JSON.stringify({slowResponse: 'ok'})
      );
    }, requestTimeout / 2);
  });
});
