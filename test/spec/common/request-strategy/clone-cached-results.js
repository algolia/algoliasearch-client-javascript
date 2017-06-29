'use strict';

const test = require('tape');

if (process.browser) {
  test('Cached results are cloned', t => {
    t.plan(3);

    const fauxJax = require('faux-jax');

    const createFixture = require('../../../utils/create-fixture');
    const fixture = createFixture();
    const index = fixture.index;

    fauxJax.install({ gzip: true });

    fauxJax.once('request', req => {
      req.respond(200, {}, '{"ok": "then"}');
      fauxJax.restore();
    });

    index.search('something', (_, firstContent) => {
      firstContent.AHAH = true;
      index.search('something', (__, secondContent) => {
        t.deepEqual(
          firstContent,
          {
            ok: 'then',
            AHAH: true,
          },
          'Content matches for first search'
        );

        t.deepEqual(
          secondContent,
          {
            ok: 'then',
          },
          'Content matches for second search'
        );

        t.notEqual(
          firstContent,
          secondContent,
          'Cached content is another reference (firstContent !== secondContent)'
        );
      });
    });
  });
}
