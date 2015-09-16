'use strict';

var test = require('tape');

test('client.addAlgoliaAgent(algoliaAgent)', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install();

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var client = fixture.client;
  var index = fixture.index;

  client.addAlgoliaAgent('And some other incredible agent');
  index.search('algolia agent');

  var expectedAgent = fixture.algoliasearch.ua + ';And some other incredible agent';

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
