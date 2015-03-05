var test = require('tape');

test('client\'s cache is different between instances', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');

  var client1 = createFixture().client;
  var client2 = createFixture().client;

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No request done'
  );

  client1.startQueriesBatch();
  client1.sendQueriesBatch();
  fauxJax.requests[0].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    1,
    'One request done'
  );

  client2.startQueriesBatch();
  client2.sendQueriesBatch();
  fauxJax.requests[1].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    2,
    'Two request done'
  );

  fauxJax.restore();
});
