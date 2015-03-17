var test = require('tape');

var requestTimeout = 2000;

test('Request strategy handles slow responses (no double callback)', function(t) {
  var sinon = require('sinon');
  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');

  var clock = sinon.useFakeTimers();
  var fixture = createFixture();

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

    clock.restore();
    fauxJax.restore();
    t.end();
  });

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No requests made'
  );

  index.search('hello', searchCallback);

  var firstRequest = fauxJax.requests[0];

  t.equal(
    fauxJax.requests.length,
    1,
    'One request made'
  );

  clock.tick(requestTimeout);

  process.nextTick(function() {
    var secondRequest = fauxJax.requests[1];

    t.equal(
      fauxJax.requests.length,
      2,
      'Second request made'
    );

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
  });

  // IE10 fix, run next nextTick^
  clock.tick(0);
});
