'use strict';

var test = require('tape');

test('index.ttAdapter(params, cb)', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;
  var fakeResponse = {
    hits: [1, 2, 3]
  };
  var ttAdapter = index.ttAdapter({
    hitsPerPage: 200
  });

  fauxJax.install();

  fauxJax.on('request', function(req) {
    fauxJax.restore();
    t.equal(
      req.requestBody,
      JSON.stringify({params: 'query=a%20search&hitsPerPage=200'}),
      'We set a specific `hitsPerPage` when searching'
    );
    req.respond(200, {}, JSON.stringify(fakeResponse));
  });

  ttAdapter('a search', function(actualHits) {
    t.deepEqual(
      actualHits,
      fakeResponse.hits,
      'We received some hits'
    );
  });
});
