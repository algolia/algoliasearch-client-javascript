var test = require('tape');

test('index.waitTask(taskID) retry', function(t) {
  t.plan(9);

  var fauxJax = require('faux-jax');
  var sinon = require('sinon');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;
  var cbSpy = sinon.spy(function(err, content) {
    t.ok(
      cbSpy.calledOnce,
      'Callback called since task was published'
    );

    t.error(err, 'No error while using the callback waitTask API');

    t.deepEqual(content, {
      status: 'published'
    }, 'Content matches');
  });

  var promiseSpy = sinon.spy(function(content) {
    t.deepEqual(content, {
      status: 'published'
    }, 'Content matches');

    t.ok(
      promiseSpy.calledOnce,
      'Promise resolved once since task was published'
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
        200,
        {},
        JSON.stringify({
          status: 'published'
        })
      );

      fauxJax.requests[3].respond(
        200,
        {},
        JSON.stringify({
          status: 'published'
        })
      );

      fauxJax.restore();
    });

  }, 200);
});
