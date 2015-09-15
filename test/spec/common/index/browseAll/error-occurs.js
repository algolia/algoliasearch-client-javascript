'use strict';

var test = require('tape');

test('index.browseAll() and an error occurs', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');

  var bind = require('lodash/function/bind');
  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  var browser = index.browseAll('some', {
    hitsPerPage: 200
  });

  fauxJax.once('request', browse);
  browser.once('error', error);
  browser.once('end', bind(t.fail, t));

  function browse(req) {
    req.respond(
      400,
      {},
      JSON.stringify({
        message: 'You are doomed',
        status: 400
      })
    );

    fauxJax.restore();
  }

  function error(err) {
    t.ok(err instanceof Error, 'We got an error');
    t.equal(
      err.message,
      'You are doomed',
      'error message matches'
    );
  }
});
