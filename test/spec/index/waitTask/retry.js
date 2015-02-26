var test = require('tape');

test('index.waitTask(taskID) retry', function(t) {
  t.plan(4);

  var fauxJax = require('faux-jax');
  var sinon = require('sinon');

  var clock = sinon.useFakeTimers();

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;
  var spy = sinon.spy();

  fauxJax.install();

  index.waitTask(28000, spy);

  t.equal(
    fauxJax.requests.length,
    1,
    'First request was made'
  );

  fauxJax.requests[0].respond(
    200,
    {},
    JSON.stringify({
      status: 'notPublished'
    })
  );

  clock.tick(50);

  t.notOk(
    spy.calledOnce,
    'Callback not called since task was not published'
  );

  clock.tick(60);

  t.equal(
    fauxJax.requests.length,
    2,
    'Second request was made'
  );

  fauxJax.requests[1].respond(
    200,
    {},
    JSON.stringify({
      status: 'published'
    })
  );

  t.ok(
    spy.calledOnce,
    'Callback called since task was published'
  );

  fauxJax.restore();
  clock.restore();
});
