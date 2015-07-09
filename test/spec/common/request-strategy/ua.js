'use strict';

var test = require('tape');

test('Algolia Agent can be passed as an option', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install();

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture({
    clientOptions: {
      _ua: 'Algolia Search for tests 1.0.0'
    }
  });

  var index = fixture.index;

  index.search('algolia agent');

  fauxJax.once('request', function(req) {
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
