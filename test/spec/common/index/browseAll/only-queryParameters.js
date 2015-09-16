'use strict';

var test = require('tape');

test('index.browseAll(queryParameters)', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');
  var keys = require('lodash/object/keys');
  var parse = require('url-parse');

  var bind = require('lodash/function/bind');
  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  var browser = index.browseAll({
    hitsPerPage: 1200
  });

  fauxJax.once('request', browse);
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    var parsedURL = parse(req.requestURL, true);
    var qs = parsedURL.query;

    t.equal(qs.hitsPerPage, '1200', 'query param matches');

    if (process.browser) {
      t.equal(keys(qs).length, 4, 'We added only one parameter to the standard query string');
    } else {
      t.equal(keys(qs).length, 1, 'We added only one parameter to the standard query string');
    }

    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100
      })
    );

    fauxJax.restore();
  }
});
