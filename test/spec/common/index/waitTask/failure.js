'use strict';

const test = require('tape');

test('index.waitTask(taskID) failure', t => {
  t.plan(10);

  const bind = require('lodash-compat/function/bind');

  const fauxJax = require('faux-jax');
  const sinon = require('sinon');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();

  const index = fixture.index;
  var cbSpy = sinon.spy(err => {
    t.ok(cbSpy.calledOnce, 'Callback called');

    t.equal(err.message, 'Task not found (callback)');
  });

  var promiseSpy = sinon.spy(err => {
    t.ok(promiseSpy.calledOnce, 'Promise resolved');

    t.equal(err.message, 'Task not found (promise)');
  });

  fauxJax.install({ gzip: true });

  index.waitTask(28000, cbSpy);
  index.waitTask(27000).then(bind(t.fail, t), promiseSpy);

  fauxJax.waitFor(2, (err, requests) => {
    t.error(err);
    t.equal(requests.length, 2, 'Two requests done');

    requests[0].respond(
      200,
      {},
      JSON.stringify({
        status: 'notPublished',
      })
    );

    requests[1].respond(
      200,
      {},
      JSON.stringify({
        status: 'notPublished',
      })
    );

    fauxJax.waitFor(2, fail);
  });

  function fail(err, requests) {
    t.error(err);
    fauxJax.restore();

    // after 100, waitTask retried
    t.equal(requests.length, 2, 'Two more requests done');

    t.notOk(
      cbSpy.calledOnce,
      'Callback not called since task was not published'
    );

    t.notOk(
      promiseSpy.calledOnce,
      'Callback not called since task was not published'
    );

    requests[0].respond(
      404,
      {},
      JSON.stringify({
        message: 'Task not found (callback)',
        status: 404,
      })
    );

    requests[1].respond(
      404,
      {},
      JSON.stringify({
        message: 'Task not found (promise)',
        status: 404,
      })
    );
  }
});
