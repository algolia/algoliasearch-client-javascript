'use strict';

var test = require('tape');

test.skip('index.browseAll() no arguments', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');
  var keys = require('lodash/object/keys');
  var parse = require('url-parse');

  var bind = require('lodash/function/bind');
  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  var browser = index.browseAll();

  fauxJax.once('request', browse);
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    var qs = parse(req.requestURL, true).query;
    t.equal(3, keys(qs).length, 'We do not add any query parameter');

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
