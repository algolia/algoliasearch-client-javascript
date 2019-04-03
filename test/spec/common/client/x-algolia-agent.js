'use strict';

var test = require('tape');

test('There is a default x-algolia-agent sent', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');
  fauxJax.install({gzip: true});

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var version = require('../../../../src/version.js');
  var env = !process.browser
    ? 'Node.js (' + process.versions.node + ')'
    : 'Browser';

  var index = fixture.index;
  index.search('algolia agent');

  var expectedAgent = 'Algolia for JavaScript (' + version + '); ' + env;

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
