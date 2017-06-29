'use strict';

const test = require('tape');

test.skip('index.browseAll() no arguments', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');
  const keys = require('lodash-compat/object/keys');
  const parse = require('url-parse');

  const bind = require('lodash-compat/function/bind');
  const createFixture = require('../../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  const browser = index.browseAll();

  fauxJax.once('request', browse);
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    const qs = parse(req.requestURL, true).query;
    t.equal(3, keys(qs).length, 'We do not add any query parameter');

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
