var test = require('tape');

test('index.waitTask(taskID) failure', function(t) {
  t.plan(8);

  var fauxJax = require('faux-jax');
  var sinon = require('sinon');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;
  var cbSpy = sinon.spy(function(err) {
    t.ok(
      cbSpy.calledOnce,
      'Callback called'
    );

    t.equal(
      err.message,
      'Task not found (callback)'
    );
  });

  var promiseSpy = sinon.spy(function(err) {
    t.ok(
      promiseSpy.calledOnce,
      'Callback called'
    );

    t.equal(
      err.message,
      'Task not found (promise)'
    );
  });

  fauxJax.install();

  index.waitTask(28000, cbSpy);
  index.waitTask(27000).then(promiseSpy);

  t.equal(
    fauxJax.requests.length,
    2,
    'Two requests done'
  );

  fauxJax.requests[0].respond(
    200,
    {},
    JSON.stringify({
      status: 'notPublished'
    })
  );

  fauxJax.requests[1].respond(
    200,
    {},
    JSON.stringify({
      status: 'notPublished'
    })
  );

  setTimeout(function() {
    process.nextTick(function() {
      t.notOk(
        cbSpy.calledOnce,
        'Callback not called since task was not published'
      );

      t.notOk(
        promiseSpy.calledOnce,
        'Callback not called since task was not published'
      );

      t.equal(
        fauxJax.requests.length,
        4,
        'Four requests were made'
      );

      fauxJax.requests[2].respond(
        404,
        {},
        JSON.stringify({
          message: 'Task not found (callback)',
          status: 404
        })
      );

      fauxJax.requests[3].respond(
        404,
        {},
        JSON.stringify({
          message: 'Task not found (promise)',
          status: 404
        })
      );

      fauxJax.restore();
    });

  }, 200);
});
