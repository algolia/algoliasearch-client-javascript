'use strict';

var test = require('tape');

if (process.browser) {
  test('Cached results are cloned', function(t) {
    t.plan(3);

    var fauxJax = require('faux-jax');

    var createFixture = require('../../../utils/create-fixture');
    var fixture = createFixture();
    var index = fixture.index;

    fauxJax.install();

    fauxJax.once('request', function(req) {
      req.respond(200, {}, '{"ok": "then"}');
      fauxJax.restore();
    });

    index.search('something', function(_, firstContent) {
      firstContent.AHAH = true;
      index.search('something', function(__, secondContent) {
        t.deepEqual(firstContent, {
          ok: 'then',
          AHAH: true
        }, 'Content matches for first search');

        t.deepEqual(secondContent, {
          ok: 'then'
        }, 'Content matches for second search');

        t.notEqual(
          firstContent,
          secondContent,
          'Cached content is another reference (firstContent !== secondContent)'
        );
      });
    });
  });
}
