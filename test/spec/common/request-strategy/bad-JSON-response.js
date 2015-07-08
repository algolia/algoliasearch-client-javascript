'use strict';

var test = require('tape');

test('Bad JSON is catched', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  fauxJax.once('request', function(req) {
    req.respond(200, {}, 'OMGBADJSON;;;;;"');
    fauxJax.restore();
  });

  index.search('something', function(err) {
    t.ok(err instanceof Error);
    t.equal(err.message, 'Could not parse the incoming response as JSON, see err.more for details');
  });
});
