'use strict';

var test = require('tape');

test('browser = index.browseAll(); browser.stop()', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');

  var bind = require('lodash/function/bind');
  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  var browser = index.browseAll({
    hitsPerPage: 1200
  });

  fauxJax.once('request', browse);
  browser.on('result', function() {
    // if we pass two times here then it will fail
    t.pass('We received a result event');
    browser.stop();
  });
  browser.once('end', bind(t.fail, t));
  browser.once('error', bind(t.fail, t));

  function browse(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        nbHits: 100,
        cursor: 'fslajf21rf31fé==!'
      })
    );

    fauxJax.restore();
  }
});
