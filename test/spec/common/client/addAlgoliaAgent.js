'use strict';

var test = require('tape');

test('AddAlgoliaAgent and custom search-time agent with x-algolia-agent', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var client = fixture.client;
  var index = fixture.index;

  client.addAlgoliaAgent('And some other incredible agent');

  // Ensure we de-duplicate by re-adding the same agent a second time.
  client.addAlgoliaAgent('And some other incredible agent');

  index.search('algolia agent', {
    additionalUA: 'the other agent'
  });

  var expectedAgent = fixture.algoliasearch.ua + ';And some other incredible agent;the other agent';

  fauxJax.once('request', function(req) {
    var agent = process.browser ?
      parse(req.requestURL, true).query['x-algolia-agent'] :
      req.requestHeaders['x-algolia-agent'];

    t.equal(
      agent,
      expectedAgent,
      'Algolia Agent matches'
    );

    req.respond(200, {}, '{}');

    fauxJax.restore();
  });
});
