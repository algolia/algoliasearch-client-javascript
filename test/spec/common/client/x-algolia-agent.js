'use strict';

const test = require('tape');

test('There is a default x-algolia-agent sent', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();
  const env = process.browser ? 'vanilla JavaScript' : 'Node.js';
  const version = require('../../../../src/version.js');

  const index = fixture.index;
  index.search('algolia agent');

  const expectedAgent = `Algolia for ${env} ${version}`;

  fauxJax.once('request', req => {
    const agent = process.browser
      ? parse(req.requestURL, true).query['x-algolia-agent']
      : req.requestHeaders['x-algolia-agent'];

    t.equal(agent, expectedAgent, 'Algolia Agent matches');

    req.respond(200, {}, '{}');

    fauxJax.restore();
  });
});
