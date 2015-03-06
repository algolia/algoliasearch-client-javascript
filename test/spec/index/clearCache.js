var test = require('tape');

test('index.clearCache()', function(t) {
  t.plan(4);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');
  var fixture = createFixture();
  var index = fixture.index;

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No request done'
  );

  // store the query in the cache
  index.search('hey!');
  fauxJax.requests[0].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    1,
    'One request done'
  );

  // same request again
  index.search('hey!');
  t.equal(
    fauxJax.requests.length,
    1,
    'Still one request done'
  );

  index.clearCache();

  // same request again
  index.search('hey!');
  fauxJax.requests[1].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    2,
    'Second request done'
  );

  fauxJax.restore();
});
