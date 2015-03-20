var test = require('tape');

// this test ensures we can call index.search() without any argument
test('index.search()', function(t) {
  t.plan(3);
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

  index.search().then(function(content) {
    t.equal(
      fauxJax.requests.length,
      1,
      'One request made'
    );

    fauxJax.restore();

    t.deepEqual(content, {
      YAW: 'empty query resolved'
    }, 'Content matches');
  });

  fauxJax.requests[0].respond(
    200,
    {},
    JSON.stringify({
      YAW: 'empty query resolved'
    })
  );
});
