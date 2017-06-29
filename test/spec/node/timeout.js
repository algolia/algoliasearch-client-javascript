'use strict';

const test = require('tape');

test('Request timeout is used', t => {
  t.plan(3);
  const fauxJax = require('faux-jax');

  const createFixture = require('../../utils/create-fixture');
  const fixture = createFixture({
    clientOptions: {
      timeout: 500,
    },
  });
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  const start = Date.now();
  fauxJax.waitFor(2, (err, requests) => {
    t.error(err, 'We got two requests');

    const elapsed = Math.round((Date.now() - start) / 1000);
    requests[1].respond(200, {}, '{"timeout": "ok"}');
    fauxJax.restore();
    t.equal(
      elapsed,
      1,
      'Two requests made in 500ms since timeout of 500ms asked'
    );
  });

  index
    .search('dsads')
    .then(content => {
      t.deepEqual(
        content,
        {
          timeout: 'ok',
        },
        'content matches'
      );
    })
    .catch(t.fail.bind(t));
});
