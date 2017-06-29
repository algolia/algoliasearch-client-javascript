'use strict';

const test = require('tape');

test('when indexing content, we retry if timeout occurs', t => {
  t.plan(7);

  const fauxJax = require('faux-jax');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture({
    clientOptions: {
      timeout: 20,
    },
  });

  const index = fixture.index;

  fauxJax.install({ gzip: true });
  fauxJax.on('request', () => {
    t.pass('One request made');
  });

  index.addObject(
    {
      hello: 'world',
    },
    err => {
      fauxJax.restore();
      t.ok(err instanceof Error);

      t.equal(
        err.name,
        'AlgoliaSearchRequestTimeoutError',
        'error name matches'
      );

      t.equal(
        err.message,
        'Request timedout before getting a response',
        'error messag ematches'
      );
    }
  );
});
