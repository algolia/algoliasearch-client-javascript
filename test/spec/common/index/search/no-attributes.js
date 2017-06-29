'use strict';

const test = require('tape');

// this test ensures we can call index.search() without any argument
test('index.search() no arguments', t => {
  t.plan(1);
  const fauxJax = require('faux-jax');

  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  index.search().then(content => {
    fauxJax.restore();

    t.deepEqual(
      content,
      {
        YAW: 'empty query resolved',
      },
      'Content matches'
    );
  });

  fauxJax.once('request', req => {
    req.respond(
      200,
      {},
      JSON.stringify({
        YAW: 'empty query resolved',
      })
    );
  });
});
