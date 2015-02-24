var test = require('tape');

test('index.ttAdapter(cb)', function(t) {
  t.plan(1);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../../utils/create-fixture');
  var fixture = createFixture();

  var index = fixture.index;

  var ttAdapter = index.ttAdapter();

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
  });

  fauxJax.requests[0].respond(200, {}, JSON.stringify(fakeResponse));

  fauxJax.restore();
});
