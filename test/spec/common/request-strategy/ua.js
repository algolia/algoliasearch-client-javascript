'use strict';

const test = require('tape');

test('Algolia Agent can be passed as an option', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture({
    clientOptions: {
      _ua: 'Algolia Search for tests 1.0.0',
    },
  });

  const index = fixture.index;

  index.search('algolia agent');

  fauxJax.once('request', req => {
    if (process.browser) {
      t.equal(
        parse(req.requestURL, true).query['x-algolia-agent'],
        'Algolia Search for tests 1.0.0',
        'Algolia Agent matches'
      );
    } else {
      t.equal(
        req.requestHeaders['x-algolia-agent'],
        'Algolia Search for tests 1.0.0',
        'Algolia Agent matches'
      );
    }

    req.respond(200, {}, '{}');

    fauxJax.restore();
  });
});
