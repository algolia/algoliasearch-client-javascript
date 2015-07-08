'use strict';

var test = require('tape');

test('index.ttAdapter(cb) supports typeahead 0.11', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();

  var fakeResponse = {
    hits: [1, 2, 3]
  };
  var index = fixture.index;
  var ttAdapter = index.ttAdapter();

  fauxJax.install();

  fauxJax.on('request', function(req) {
    fauxJax.restore();
    req.respond(200, {}, JSON.stringify(fakeResponse));
  });


  // typeAhead 0.11 sends 3 parameters
  ttAdapter('a search', undefined, function(actualHits) {
    t.deepEqual(
      actualHits,
      fakeResponse.hits,
      'We received some hits'
    );
  });
});
