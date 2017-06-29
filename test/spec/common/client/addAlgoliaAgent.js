'use strict';

const test = require('tape');

test('AddAlgoliaAgent and custom search-time agent with x-algolia-agent', t => {
  t.plan(1);

  const fauxJax = require('faux-jax');
  const parse = require('url-parse');
  fauxJax.install({ gzip: true });

  const createFixture = require('../../../utils/create-fixture');
  const fixture = createFixture();

  const client = fixture.client;
  const index = fixture.index;

  client.addAlgoliaAgent('And some other incredible agent');

  // Ensure we de-duplicate by re-adding the same agent a second time.
  client.addAlgoliaAgent('And some other incredible agent');

  index.search('algolia agent', {
    additionalUA: 'the other agent',
  });

  const expectedAgent = `${fixture.algoliasearch
    .ua};And some other incredible agent;the other agent`;

  fauxJax.once('request', req => {
    const agent = process.browser
      ? parse(req.requestURL, true).query['x-algolia-agent']
      : req.requestHeaders['x-algolia-agent'];

    t.equal(agent, expectedAgent, 'Algolia Agent matches');

    req.respond(200, {}, '{}');

    fauxJax.restore();
  });
});
