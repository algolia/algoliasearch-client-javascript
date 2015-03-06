var test = require('tape');

test('index\'s cache is different between instances', function(t) {
  t.plan(3);

  var fauxJax = require('faux-jax');

  var createFixture = require('../../utils/create-fixture');

  var index1 = createFixture().index;
  var index2 = createFixture().index;

  fauxJax.install();

  t.equal(
    fauxJax.requests.length,
    0,
    'No request done'
  );

  index1.search('HEY!');
  fauxJax.requests[0].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    1,
    'One request done'
  );

  index2.search('HEY!');
  fauxJax.requests[1].respond(200, {}, '{}');
  t.equal(
    fauxJax.requests.length,
    2,
    'Two request done'
  );

  fauxJax.restore();
});
