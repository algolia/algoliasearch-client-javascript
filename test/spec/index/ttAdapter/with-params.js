var test = require('tape');

test('index.ttAdapter(params, cb)', function(t) {
  t.plan(2);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;

  var ttAdapter = index.ttAdapter({
    hitsPerPage: 200
  });

  fauxJax.install();

  var fakeResponse = {
    hits: [1, 2, 3]
  };

  ttAdapter('a search', function(actualHits) {
    t.deepEqual(
      actualHits,
      fakeResponse.hits,
      'We received some hits'
    );

    t.equal(
      fauxJax.requests[0].requestBody,
      JSON.stringify({params: 'query=a%20search&hitsPerPage=200'}),
      'We set a specific `hitsPerPage` when searching'
    );

    fauxJax.restore();
  });

  fauxJax.requests[0].respond(200, {}, JSON.stringify(fakeResponse));
});
