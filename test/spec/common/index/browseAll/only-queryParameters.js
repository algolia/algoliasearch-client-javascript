'use strict';

const test = require('tape');

test('index.browseAll(queryParameters)', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');

  const bind = require('lodash-compat/function/bind');
  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  const browser = index.browseAll({
    hitsPerPage: 1200,
  });

  fauxJax.once('request', browse);
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    t.deepEqual(
      JSON.parse(req.requestBody),
      { params: 'hitsPerPage=1200' },
      'query param matches'
    );

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
      })
    );

    fauxJax.restore();
  }
});
