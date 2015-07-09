'use strict';

var test = require('tape');

// this test ensures we can call index.search() without any argument
test('index.search() no arguments', function(t) {
  t.plan(1);
  var fauxJax = require('faux-jax');

  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  index.search().then(function(content) {
    fauxJax.restore();

    t.deepEqual(content, {
      YAW: 'empty query resolved'
    }, 'Content matches');
  });

  fauxJax.once('request', function(req) {
    req.respond(
      200,
      {},
      JSON.stringify({
        YAW: 'empty query resolved'
      })
    );
  });
});
