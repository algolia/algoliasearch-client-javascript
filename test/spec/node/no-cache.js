'use strict';

const test = require('tape');

test('no cache between two requests', t => {
  t.plan(6);

  const fauxJax = require('faux-jax');

  fauxJax.install({ gzip: true });

  const createFixture = require('../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  function firstSearch(cb) {
    index.search('HAI', (err, content) => {
      t.error(err, 'No error for first search');
      t.deepEqual(
        content,
        {
          hai: 1,
        },
        'Content matches for first response'
      );
      cb();
    });

    fauxJax.once('request', req => {
      t.pass('First request');
      req.respond(200, {}, '{"hai": 1}');
    });
  }

  firstSearch(secondSearch);

  function secondSearch() {
    index.search('HAI', (err, content) => {
      t.error(err, 'No error for first search');
      t.deepEqual(content, {
        hai: 2,
      });

      fauxJax.restore();
    });

    fauxJax.once('request', req => {
      t.pass('First request');
      req.respond(200, {}, '{"hai": 2}');
    });
  }
});
