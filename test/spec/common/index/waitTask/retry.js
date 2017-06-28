'use strict';

const test = require('tape');

test('index.waitTask(taskID) retry', t => {
  t.plan(11);

  const fauxJax = require('faux-jax');
  const sinon = require('sinon');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();

  const index = fixture.index;
  var cbSpy = sinon.spy((err, content) => {
    t.ok(cbSpy.calledOnce, 'Callback called since task was published');

    t.error(err, 'No error while using the callback waitTask API');

    t.deepEqual(
      content,
      {
        status: 'published',
      },
      'Content matches'
    );
  });

  var promiseSpy = sinon.spy(content => {
    t.deepEqual(
      content,
      {
        status: 'published',
      },
      'Content matches'
    );

    t.ok(
      promiseSpy.calledOnce,
      'Promise resolved once since task was published'
    );
  });

  fauxJax.install({ gzip: true });

  index.waitTask(28000, cbSpy);
  index.waitTask(27000).then(promiseSpy);

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

    fauxJax.waitFor(2, publish);
  });

  function publish(err, requests) {
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
      200,
      {},
      JSON.stringify({
        status: 'published',
      })
    );

    requests[1].respond(
      200,
      {},
      JSON.stringify({
        status: 'published',
      })
    );
  }
});
