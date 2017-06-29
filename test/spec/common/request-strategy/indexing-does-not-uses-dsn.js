'use strict';

const test = require('tape');

test('dsn not used on indexing requests', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const index = fixture.index;

  fauxJax.install({ gzip: true });

  fauxJax.once('request', req => {
    const requestHostname = parse(req.requestURL).hostname;
    const dsnHostname = `${fixture.credentials.applicationID}-dsn.algolia.net`;

    t.notEqual(
      requestHostname,
      dsnHostname.toLowerCase(),
      'Request hostname is not DSN'
    );

    req.respond(200, {}, '{}');
    fauxJax.restore();
  });

  index.addObject({
    hello: 'world',
  });
});
