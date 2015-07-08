'use strict';

var test = require('tape');

test('dsn not used on indexing requests', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var parse = require('url-parse');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  fauxJax.once('request', function(req) {
    var requestHostname = parse(req.requestURL).hostname;
    var dsnHostname = fixture.credentials.applicationID + '-dsn.algolia.net';

    t.notEqual(
      requestHostname,
      dsnHostname.toLowerCase(),
      'Request hostname is not DSN'
    );

    req.respond(200, {}, '{}');
    fauxJax.restore();
  });

  index.addObject({
    hello: 'world'
  });
});
