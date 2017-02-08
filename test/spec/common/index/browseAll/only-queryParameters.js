'use strict';

var test = require('tape');

test('index.browseAll(queryParameters)', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');

  var bind = require('lodash-compat/function/bind');
  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install({gzip: true});

  var browser = index.browseAll({
    hitsPerPage: 1200
  });

  fauxJax.once('request', browse);
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    t.deepEqual(
      JSON.parse(req.requestBody),
      {params: 'hitsPerPage=1200'},
      'query param matches'
    );

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
